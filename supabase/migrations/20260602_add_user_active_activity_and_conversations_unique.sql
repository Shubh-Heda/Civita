-- Migration: Add user_active_activity table and enforce conversation uniqueness
-- Idempotent: safe to run multiple times

-- 1) Create user_active_activity table
CREATE TABLE IF NOT EXISTS user_active_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  activity TEXT CHECK (activity IN ('sports', 'events', 'parties')) NOT NULL,
  last_used_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) Dedupe existing conversations (keep the earliest created_at per unordered pair)
DO $$
BEGIN
  WITH pairs AS (
    SELECT
      LEAST(user1_id::text, user2_id::text) AS a,
      GREATEST(user1_id::text, user2_id::text) AS b,
      array_agg(id ORDER BY created_at) AS ids
    FROM conversations
    GROUP BY a, b
    HAVING count(*) > 1
  )
  DELETE FROM conversations c
  USING pairs p
  WHERE c.id = ANY(p.ids) AND c.id <> p.ids[1];
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'De-duplication of conversations failed: %', SQLERRM;
END $$;

-- 3) Create a unique index on the unordered user pair to prevent swapped duplicates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'idx_conversations_unique_pair'
  ) THEN
    CREATE UNIQUE INDEX idx_conversations_unique_pair ON conversations (
      LEAST(user1_id::text, user2_id::text),
      GREATEST(user1_id::text, user2_id::text)
    );
  END IF;
EXCEPTION WHEN OTHERS THEN
  RAISE NOTICE 'Creating unique index failed: %', SQLERRM;
END $$;

-- 4) Ensure matches and match_participants are part of the supabase_realtime publication
DO $$
BEGIN
  IF to_regclass('public.matches') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'matches'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;
  END IF;

  IF to_regclass('public.match_participants') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'match_participants'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.match_participants;
  END IF;
END $$;

-- Migration complete
SELECT 'migration complete' as message;
