-- ============================================
-- FIX: Remove auth.users foreign key constraints
-- This allows Firebase Auth UUIDs to work
-- ============================================

-- Drop foreign key constraints that reference auth.users
ALTER TABLE conversation_members 
  DROP CONSTRAINT IF EXISTS conversation_members_user_id_fkey;

ALTER TABLE messages 
  DROP CONSTRAINT IF EXISTS messages_sender_id_fkey;

ALTER TABLE message_reactions 
  DROP CONSTRAINT IF EXISTS message_reactions_user_id_fkey;

ALTER TABLE message_reads 
  DROP CONSTRAINT IF EXISTS message_reads_user_id_fkey;

-- Now user_id can be any UUID (Firebase Auth UUIDs)
-- Verify constraints removed
SELECT 
  conname as constraint_name,
  conrelid::regclass as table_name,
  confrelid::regclass as referenced_table
FROM pg_constraint
WHERE contype = 'f' 
  AND (conrelid::regclass::text IN ('conversation_members', 'messages', 'message_reactions', 'message_reads'))
  AND confrelid::regclass::text = 'users';

-- Show success message
SELECT 'Auth constraints removed - Firebase Auth UUIDs now supported' as status;
