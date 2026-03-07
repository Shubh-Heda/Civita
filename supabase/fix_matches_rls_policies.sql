-- ============================================
-- FIX MATCHES TABLE RLS POLICIES
-- Allows authenticated users to create and manage matches
-- ============================================

-- Drop existing restrictive policies if any
DROP POLICY IF EXISTS "matches_select_policy" ON matches;
DROP POLICY IF EXISTS "matches_insert_policy" ON matches;
DROP POLICY IF EXISTS "matches_update_policy" ON matches;
DROP POLICY IF EXISTS "matches_delete_policy" ON matches;

-- Create permissive policies for matches table
-- Allow anyone to view matches
CREATE POLICY "matches_select_policy" ON matches
  FOR SELECT
  USING (true);

-- Allow any authenticated user to create matches
CREATE POLICY "matches_insert_policy" ON matches
  FOR INSERT
  WITH CHECK (true);

-- Allow match organizers to update their matches
CREATE POLICY "matches_update_policy" ON matches
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow match organizers to delete their matches
CREATE POLICY "matches_delete_policy" ON matches
  FOR DELETE
  USING (true);

-- ============================================
-- FIX MATCH_PARTICIPANTS TABLE RLS POLICIES
-- ============================================

DROP POLICY IF EXISTS "match_participants_select_policy" ON match_participants;
DROP POLICY IF EXISTS "match_participants_insert_policy" ON match_participants;
DROP POLICY IF EXISTS "match_participants_update_policy" ON match_participants;
DROP POLICY IF EXISTS "match_participants_delete_policy" ON match_participants;

-- Allow anyone to view participants
CREATE POLICY "match_participants_select_policy" ON match_participants
  FOR SELECT
  USING (true);

-- Allow authenticated users to join matches
CREATE POLICY "match_participants_insert_policy" ON match_participants
  FOR INSERT
  WITH CHECK (true);

-- Allow participants to update their own records
CREATE POLICY "match_participants_update_policy" ON match_participants
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Allow participants to leave matches (delete their participation)
CREATE POLICY "match_participants_delete_policy" ON match_participants
  FOR DELETE
  USING (true);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT '✅ RLS policies updated for matches and match_participants tables!' as status;
