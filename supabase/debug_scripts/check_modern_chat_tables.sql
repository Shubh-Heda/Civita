-- Check if modern chat tables exist
SELECT 
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('conversations', 'conversation_members', 'messages', 'message_reactions', 'message_reads')
ORDER BY table_name;

-- Check conversation_members columns
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'conversation_members'
ORDER BY ordinal_position;

-- Check messages columns
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'messages'
ORDER BY ordinal_position;
