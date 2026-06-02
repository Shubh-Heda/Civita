-- ============================================
-- FIX: Disable RLS and create permissive policies
-- Run this in Supabase SQL Editor
-- ============================================

-- First, disable RLS on all modern chat tables
ALTER TABLE conversations DISABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_members DISABLE ROW LEVEL SECURITY;
ALTER TABLE messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE message_reactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE message_reads DISABLE ROW LEVEL SECURITY;

-- Drop any existing policies (in case they exist)
DROP POLICY IF EXISTS "Allow all conversations access" ON conversations;
DROP POLICY IF EXISTS "Allow all conversation_members access" ON conversation_members;
DROP POLICY IF EXISTS "Allow all messages access" ON messages;
DROP POLICY IF EXISTS "Allow all message_reactions access" ON message_reactions;
DROP POLICY IF EXISTS "Allow all message_reads access" ON message_reads;

-- Verify tables exist and show their structure
SELECT 
  table_name,
  (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('conversations', 'conversation_members', 'messages', 'message_reactions', 'message_reads')
ORDER BY table_name;

-- Show any rows that exist
SELECT 'conversations' as table_name, count(*) as row_count FROM conversations
UNION ALL
SELECT 'conversation_members', count(*) FROM conversation_members
UNION ALL
SELECT 'messages', count(*) FROM messages
UNION ALL
SELECT 'message_reactions', count(*) FROM message_reactions
UNION ALL
SELECT 'message_reads', count(*) FROM message_reads;
