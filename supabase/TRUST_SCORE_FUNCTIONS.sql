-- ============================================
-- TRUST SCORE RPC FUNCTIONS
-- Create missing Supabase RPC functions for trust score system
-- ============================================

-- Create trust score tables if they don't exist
CREATE TABLE IF NOT EXISTS user_trust_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  overall_score INTEGER DEFAULT 75 CHECK (overall_score >= 0 AND overall_score <= 100),
  reliability_score INTEGER DEFAULT 75 CHECK (reliability_score >= 0 AND reliability_score <= 100),
  behavior_score INTEGER DEFAULT 75 CHECK (behavior_score >= 0 AND behavior_score <= 100),
  community_score INTEGER DEFAULT 75 CHECK (community_score >= 0 AND community_score <= 100),
  matches_completed INTEGER DEFAULT 0,
  matches_cancelled INTEGER DEFAULT 0,
  on_time_arrivals INTEGER DEFAULT 0,
  late_arrivals INTEGER DEFAULT 0,
  no_shows INTEGER DEFAULT 0,
  positive_feedback INTEGER DEFAULT 0,
  negative_feedback INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trust_score_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  score_type TEXT NOT NULL,
  change INTEGER NOT NULL,
  reason TEXT,
  related_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_trust_scores_user_id') THEN
    CREATE INDEX idx_user_trust_scores_user_id ON user_trust_scores(user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_trust_score_history_user_id') THEN
    CREATE INDEX idx_trust_score_history_user_id ON trust_score_history(user_id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE user_trust_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE trust_score_history ENABLE ROW LEVEL SECURITY;

-- Create permissive policies
DROP POLICY IF EXISTS "trust_scores_all_access" ON user_trust_scores;
DROP POLICY IF EXISTS "trust_history_all_access" ON trust_score_history;

CREATE POLICY "trust_scores_all_access" ON user_trust_scores FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "trust_history_all_access" ON trust_score_history FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- FUNCTION: update_trust_score
-- Updates user trust scores and logs history
-- ============================================

CREATE OR REPLACE FUNCTION update_trust_score(
  p_user_id TEXT,
  p_score_type TEXT,
  p_change INTEGER,
  p_reason TEXT DEFAULT NULL,
  p_related_id TEXT DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_current_score INTEGER;
  v_new_score INTEGER;
BEGIN
  -- Ensure user exists in trust scores table
  INSERT INTO user_trust_scores (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Get current score
  EXECUTE format('SELECT %I FROM user_trust_scores WHERE user_id = $1', p_score_type)
  INTO v_current_score
  USING p_user_id;

  -- Calculate new score (clamp between 0 and 100)
  v_new_score := GREATEST(0, LEAST(100, COALESCE(v_current_score, 75) + p_change));

  -- Update the specific score
  EXECUTE format(
    'UPDATE user_trust_scores SET %I = $1, updated_at = NOW() WHERE user_id = $2',
    p_score_type
  ) USING v_new_score, p_user_id;

  -- Recalculate overall score (average of all scores)
  UPDATE user_trust_scores
  SET overall_score = (reliability_score + behavior_score + community_score) / 3,
      updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Log to history
  INSERT INTO trust_score_history (user_id, score_type, change, reason, related_id)
  VALUES (p_user_id, p_score_type, p_change, p_reason, p_related_id);

END;
$$;

-- ============================================
-- FUNCTION: record_attendance
-- Records attendance at a match
-- ============================================

CREATE OR REPLACE FUNCTION record_attendance(
  p_user_id TEXT,
  p_match_id TEXT,
  p_was_on_time BOOLEAN
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Ensure user exists in trust scores table
  INSERT INTO user_trust_scores (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Update attendance stats
  IF p_was_on_time THEN
    UPDATE user_trust_scores
    SET on_time_arrivals = on_time_arrivals + 1,
        matches_completed = matches_completed + 1,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- Award points for on-time arrival
    PERFORM update_trust_score(p_user_id, 'reliability_score', 2, 'On-time attendance', p_match_id);
  ELSE
    UPDATE user_trust_scores
    SET late_arrivals = late_arrivals + 1,
        matches_completed = matches_completed + 1,
        updated_at = NOW()
    WHERE user_id = p_user_id;
    
    -- Minor penalty for late arrival
    PERFORM update_trust_score(p_user_id, 'reliability_score', -1, 'Late arrival', p_match_id);
  END IF;
END;
$$;

-- ============================================
-- FUNCTION: record_cancellation
-- Records a match cancellation
-- ============================================

CREATE OR REPLACE FUNCTION record_cancellation(
  p_user_id TEXT,
  p_match_id TEXT,
  p_hours_before INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_penalty INTEGER;
BEGIN
  -- Ensure user exists in trust scores table
  INSERT INTO user_trust_scores (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  -- Update cancellation count
  UPDATE user_trust_scores
  SET matches_cancelled = matches_cancelled + 1,
      updated_at = NOW()
  WHERE user_id = p_user_id;

  -- Calculate penalty based on notice time
  IF p_hours_before >= 24 THEN
    v_penalty := -2;  -- Minor penalty for 24+ hours notice
  ELSIF p_hours_before >= 12 THEN
    v_penalty := -5;  -- Moderate penalty for 12-24 hours notice  
  ELSIF p_hours_before >= 4 THEN
    v_penalty := -10; -- Higher penalty for 4-12 hours notice
  ELSE
    v_penalty := -20; -- Severe penalty for less than 4 hours notice
  END IF;

  -- Apply penalty to reliability score
  PERFORM update_trust_score(
    p_user_id, 
    'reliability_score', 
    v_penalty, 
    format('Cancelled with %s hours notice', p_hours_before), 
    p_match_id
  );
END;
$$;

-- ============================================
-- FUNCTION: get_user_trust_score
-- Retrieves complete trust score for a user
-- ============================================

CREATE OR REPLACE FUNCTION get_user_trust_score(p_user_id TEXT)
RETURNS TABLE (
  user_id TEXT,
  overall_score INTEGER,
  reliability_score INTEGER,
  behavior_score INTEGER,
  community_score INTEGER,
  matches_completed INTEGER,
  matches_cancelled INTEGER,
  on_time_arrivals INTEGER,
  late_arrivals INTEGER,
  no_shows INTEGER,
  positive_feedback INTEGER,
  negative_feedback INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Ensure user exists
  INSERT INTO user_trust_scores (user_id)
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN QUERY
  SELECT 
    uts.user_id,
    uts.overall_score,
    uts.reliability_score,
    uts.behavior_score,
    uts.community_score,
    uts.matches_completed,
    uts.matches_cancelled,
    uts.on_time_arrivals,
    uts.late_arrivals,
    uts.no_shows,
    uts.positive_feedback,
    uts.negative_feedback
  FROM user_trust_scores uts
  WHERE uts.user_id = p_user_id;
END;
$$;

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT 
  '✅ Trust score RPC functions created successfully!' as status,
  (SELECT COUNT(*) FROM user_trust_scores) as users_with_scores,
  (SELECT COUNT(*) FROM trust_score_history) as history_records;
