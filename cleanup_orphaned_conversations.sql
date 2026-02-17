-- ============================================
-- Clean up orphaned conversations with no members
-- Run this in Supabase SQL Editor
-- ============================================

-- Delete conversations that have no members
DELETE FROM conversations
WHERE id NOT IN (
  SELECT DISTINCT conversation_id 
  FROM conversation_members
);

-- Verify cleanup
SELECT 'After cleanup:' as status;
SELECT 'conversations' as table_name, count(*) as row_count FROM conversations
UNION ALL
SELECT 'conversation_members', count(*) FROM conversation_members
UNION ALL
SELECT 'messages', count(*) FROM messages;
