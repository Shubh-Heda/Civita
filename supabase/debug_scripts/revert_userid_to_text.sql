-- ============================================
-- REVERT: Convert user_id back to TEXT
-- Support all auth providers (Firebase, demo, Supabase, etc.)
-- ============================================

-- Drop all foreign keys
ALTER TABLE conversation_members 
  DROP CONSTRAINT IF EXISTS conversation_members_user_id_fkey,
  DROP CONSTRAINT IF EXISTS conversation_members_conversation_id_fkey;

ALTER TABLE messages 
  DROP CONSTRAINT IF EXISTS messages_sender_id_fkey,
  DROP CONSTRAINT IF EXISTS messages_conversation_id_fkey;

ALTER TABLE message_reactions 
  DROP CONSTRAINT IF EXISTS message_reactions_user_id_fkey,
  DROP CONSTRAINT IF EXISTS message_reactions_message_id_fkey;

ALTER TABLE message_reads 
  DROP CONSTRAINT IF EXISTS message_reads_user_id_fkey,
  DROP CONSTRAINT IF EXISTS message_reads_conversation_id_fkey;

-- Convert user_id columns to TEXT (accept any auth format)
ALTER TABLE conversation_members ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE messages ALTER COLUMN sender_id TYPE TEXT;
ALTER TABLE message_reactions ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE message_reads ALTER COLUMN user_id TYPE TEXT;

-- Recreate only conversation_id foreign keys (keep user_id flexible)
ALTER TABLE conversation_members
  ADD CONSTRAINT conversation_members_conversation_id_fkey 
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE;

ALTER TABLE messages
  ADD CONSTRAINT messages_conversation_id_fkey 
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE;

ALTER TABLE message_reactions
  ADD CONSTRAINT message_reactions_message_id_fkey 
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE;

ALTER TABLE message_reads
  ADD CONSTRAINT message_reads_conversation_id_fkey 
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE;

SELECT 'User ID columns converted to TEXT - all auth providers supported' as status;
