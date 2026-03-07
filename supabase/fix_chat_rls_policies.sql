-- ============================================
-- FIX CHAT TABLES RLS POLICIES
-- Allows conversations, messages, and members operations
-- ============================================

-- ============================================
-- CONVERSATIONS TABLE
-- ============================================

DROP POLICY IF EXISTS "conversations_select_policy" ON conversations;
DROP POLICY IF EXISTS "conversations_insert_policy" ON conversations;
DROP POLICY IF EXISTS "conversations_update_policy" ON conversations;
DROP POLICY IF EXISTS "conversations_delete_policy" ON conversations;

CREATE POLICY "conversations_select_policy" ON conversations
  FOR SELECT
  USING (true);

CREATE POLICY "conversations_insert_policy" ON conversations
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "conversations_update_policy" ON conversations
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "conversations_delete_policy" ON conversations
  FOR DELETE
  USING (true);

-- ============================================
-- CONVERSATION_MEMBERS TABLE
-- ============================================

DROP POLICY IF EXISTS "conversation_members_select_policy" ON conversation_members;
DROP POLICY IF EXISTS "conversation_members_insert_policy" ON conversation_members;
DROP POLICY IF EXISTS "conversation_members_update_policy" ON conversation_members;
DROP POLICY IF EXISTS "conversation_members_delete_policy" ON conversation_members;

CREATE POLICY "conversation_members_select_policy" ON conversation_members
  FOR SELECT
  USING (true);

CREATE POLICY "conversation_members_insert_policy" ON conversation_members
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "conversation_members_update_policy" ON conversation_members
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "conversation_members_delete_policy" ON conversation_members
  FOR DELETE
  USING (true);

-- ============================================
-- MESSAGES TABLE
-- ============================================

DROP POLICY IF EXISTS "messages_select_policy" ON messages;
DROP POLICY IF EXISTS "messages_insert_policy" ON messages;
DROP POLICY IF EXISTS "messages_update_policy" ON messages;
DROP POLICY IF EXISTS "messages_delete_policy" ON messages;

CREATE POLICY "messages_select_policy" ON messages
  FOR SELECT
  USING (true);

CREATE POLICY "messages_insert_policy" ON messages
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "messages_update_policy" ON messages
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "messages_delete_policy" ON messages
  FOR DELETE
  USING (true);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

SELECT '✅ RLS policies updated for conversations, conversation_members, and messages!' as status;
