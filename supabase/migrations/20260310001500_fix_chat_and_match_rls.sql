-- Fix recursive/overly restrictive chat and match policies.
-- Safe to run multiple times.

-- Ensure RLS is enabled before policy updates
ALTER TABLE IF EXISTS conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS match_participants ENABLE ROW LEVEL SECURITY;

-- Chat policies
DROP POLICY IF EXISTS "conversations_select_policy" ON conversations;
DROP POLICY IF EXISTS "conversations_insert_policy" ON conversations;
DROP POLICY IF EXISTS "conversations_update_policy" ON conversations;
DROP POLICY IF EXISTS "conversations_delete_policy" ON conversations;

CREATE POLICY "conversations_select_policy" ON conversations
  FOR SELECT USING (true);

CREATE POLICY "conversations_insert_policy" ON conversations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "conversations_update_policy" ON conversations
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "conversations_delete_policy" ON conversations
  FOR DELETE USING (true);

DROP POLICY IF EXISTS "conversation_members_select_policy" ON conversation_members;
DROP POLICY IF EXISTS "conversation_members_insert_policy" ON conversation_members;
DROP POLICY IF EXISTS "conversation_members_update_policy" ON conversation_members;
DROP POLICY IF EXISTS "conversation_members_delete_policy" ON conversation_members;

CREATE POLICY "conversation_members_select_policy" ON conversation_members
  FOR SELECT USING (true);

CREATE POLICY "conversation_members_insert_policy" ON conversation_members
  FOR INSERT WITH CHECK (true);

CREATE POLICY "conversation_members_update_policy" ON conversation_members
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "conversation_members_delete_policy" ON conversation_members
  FOR DELETE USING (true);

DROP POLICY IF EXISTS "messages_select_policy" ON messages;
DROP POLICY IF EXISTS "messages_insert_policy" ON messages;
DROP POLICY IF EXISTS "messages_update_policy" ON messages;
DROP POLICY IF EXISTS "messages_delete_policy" ON messages;

CREATE POLICY "messages_select_policy" ON messages
  FOR SELECT USING (true);

CREATE POLICY "messages_insert_policy" ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "messages_update_policy" ON messages
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "messages_delete_policy" ON messages
  FOR DELETE USING (true);

-- Match + participant policies (required for history persistence)
DROP POLICY IF EXISTS "matches_select_policy" ON matches;
DROP POLICY IF EXISTS "matches_insert_policy" ON matches;
DROP POLICY IF EXISTS "matches_update_policy" ON matches;
DROP POLICY IF EXISTS "matches_delete_policy" ON matches;

CREATE POLICY "matches_select_policy" ON matches
  FOR SELECT USING (true);

CREATE POLICY "matches_insert_policy" ON matches
  FOR INSERT WITH CHECK (true);

CREATE POLICY "matches_update_policy" ON matches
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "matches_delete_policy" ON matches
  FOR DELETE USING (true);

DROP POLICY IF EXISTS "match_participants_select_policy" ON match_participants;
DROP POLICY IF EXISTS "match_participants_insert_policy" ON match_participants;
DROP POLICY IF EXISTS "match_participants_update_policy" ON match_participants;
DROP POLICY IF EXISTS "match_participants_delete_policy" ON match_participants;

CREATE POLICY "match_participants_select_policy" ON match_participants
  FOR SELECT USING (true);

CREATE POLICY "match_participants_insert_policy" ON match_participants
  FOR INSERT WITH CHECK (true);

CREATE POLICY "match_participants_update_policy" ON match_participants
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "match_participants_delete_policy" ON match_participants
  FOR DELETE USING (true);

-- Realtime publication safety
DO $$
BEGIN
  IF to_regclass('public.messages') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;

  IF to_regclass('public.conversation_members') IS NOT NULL AND NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'conversation_members'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.conversation_members;
  END IF;
END $$;
