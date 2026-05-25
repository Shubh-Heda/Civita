-- Hard reset chat RLS policies to remove recursive legacy policies.

ALTER TABLE IF EXISTS conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS messages ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  p RECORD;
BEGIN
  FOR p IN
    SELECT tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('conversations', 'conversation_members', 'messages')
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', p.policyname, p.tablename);
  END LOOP;
END $$;

CREATE POLICY conversations_select_policy ON conversations
  FOR SELECT USING (true);

CREATE POLICY conversations_insert_policy ON conversations
  FOR INSERT WITH CHECK (true);

CREATE POLICY conversations_update_policy ON conversations
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY conversations_delete_policy ON conversations
  FOR DELETE USING (true);

CREATE POLICY conversation_members_select_policy ON conversation_members
  FOR SELECT USING (true);

CREATE POLICY conversation_members_insert_policy ON conversation_members
  FOR INSERT WITH CHECK (true);

CREATE POLICY conversation_members_update_policy ON conversation_members
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY conversation_members_delete_policy ON conversation_members
  FOR DELETE USING (true);

CREATE POLICY messages_select_policy ON messages
  FOR SELECT USING (true);

CREATE POLICY messages_insert_policy ON messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY messages_update_policy ON messages
  FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY messages_delete_policy ON messages
  FOR DELETE USING (true);
