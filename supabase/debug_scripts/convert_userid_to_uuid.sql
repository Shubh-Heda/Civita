-- ============================================
-- CONVERT: user_id columns back to UUID
-- Now that we're using real Supabase Auth
-- ============================================

-- Drop foreign keys first
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

-- Convert user_id columns back to UUID (Supabase Auth generates UUIDs)
ALTER TABLE conversation_members ALTER COLUMN user_id TYPE UUID USING user_id::uuid;
ALTER TABLE messages ALTER COLUMN sender_id TYPE UUID USING sender_id::uuid;
ALTER TABLE message_reactions ALTER COLUMN user_id TYPE UUID USING user_id::uuid;
ALTER TABLE message_reads ALTER COLUMN user_id TYPE UUID USING user_id::uuid;

-- Recreate all foreign key constraints
ALTER TABLE conversation_members
  ADD CONSTRAINT conversation_members_conversation_id_fkey 
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  ADD CONSTRAINT conversation_members_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE messages
  ADD CONSTRAINT messages_conversation_id_fkey 
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  ADD CONSTRAINT messages_sender_id_fkey 
    FOREIGN KEY (sender_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE message_reactions
  ADD CONSTRAINT message_reactions_message_id_fkey 
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE,
  ADD CONSTRAINT message_reactions_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE message_reads
  ADD CONSTRAINT message_reads_conversation_id_fkey 
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
  ADD CONSTRAINT message_reads_user_id_fkey 
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

SELECT 'User ID columns converted back to UUID - Supabase Auth fully integrated' as status;
