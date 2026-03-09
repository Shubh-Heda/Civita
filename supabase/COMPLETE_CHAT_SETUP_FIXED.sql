-- ============================================
-- COMPLETE CHAT SYSTEM SETUP - FIXED VERSION
-- This script handles all cases including existing tables
-- ============================================

-- Step 1: Create conversations table (skip if exists)
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL DEFAULT 'direct' CHECK (type IN ('direct', 'group')),
  name TEXT NOT NULL,
  description TEXT,
  avatar TEXT,
  is_archived BOOLEAN DEFAULT FALSE,
  is_muted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Create indexes if they don't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_conversations_type') THEN
    CREATE INDEX idx_conversations_type ON conversations(type);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_conversations_created_at') THEN
    CREATE INDEX idx_conversations_created_at ON conversations(created_at DESC);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_conversations_updated_at') THEN
    CREATE INDEX idx_conversations_updated_at ON conversations(updated_at DESC);
  END IF;
END $$;

-- Step 3: Create conversation_members table
-- Note: Changed user_id to TEXT instead of UUID foreign key to auth.users
-- This allows the app to work without requiring Supabase Auth
CREATE TABLE IF NOT EXISTS conversation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,  -- Changed from UUID REFERENCES auth.users(id)
  name TEXT NOT NULL,
  email TEXT,
  avatar TEXT,
  is_online BOOLEAN DEFAULT FALSE,
  last_seen TIMESTAMP WITH TIME ZONE,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'moderator', 'member')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  invite_status TEXT CHECK (invite_status IN ('pending', 'accepted', 'rejected'))
);

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'conversation_members_conversation_id_user_id_key'
  ) THEN
    ALTER TABLE conversation_members 
    ADD CONSTRAINT conversation_members_conversation_id_user_id_key 
    UNIQUE(conversation_id, user_id);
  END IF;
END $$;

-- Create indexes
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_conversation_members_conversation_id') THEN
    CREATE INDEX idx_conversation_members_conversation_id ON conversation_members(conversation_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_conversation_members_user_id') THEN
    CREATE INDEX idx_conversation_members_user_id ON conversation_members(user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_conversation_members_role') THEN
    CREATE INDEX idx_conversation_members_role ON conversation_members(role);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_conversation_members_is_online') THEN
    CREATE INDEX idx_conversation_members_is_online ON conversation_members(is_online);
  END IF;
END $$;

-- Step 4: Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id TEXT NOT NULL,  -- Changed from UUID REFERENCES auth.users(id)
  sender_name TEXT NOT NULL,
  sender_avatar TEXT,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file', 'system', 'location', 'shared-event')),
  is_sent BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  edited_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_messages_conversation_id') THEN
    CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_messages_sender_id') THEN
    CREATE INDEX idx_messages_sender_id ON messages(sender_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_messages_created_at') THEN
    CREATE INDEX idx_messages_created_at ON messages(created_at DESC);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_messages_message_type') THEN
    CREATE INDEX idx_messages_message_type ON messages(message_type);
  END IF;
END $$;

-- Step 5: Create message_reactions table
CREATE TABLE IF NOT EXISTS message_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,  -- Changed from UUID REFERENCES auth.users(id)
  emoji TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'message_reactions_message_id_user_id_emoji_key'
  ) THEN
    ALTER TABLE message_reactions 
    ADD CONSTRAINT message_reactions_message_id_user_id_emoji_key 
    UNIQUE(message_id, user_id, emoji);
  END IF;
END $$;

-- Create indexes
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_message_reactions_message_id') THEN
    CREATE INDEX idx_message_reactions_message_id ON message_reactions(message_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_message_reactions_user_id') THEN
    CREATE INDEX idx_message_reactions_user_id ON message_reactions(user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_message_reactions_emoji') THEN
    CREATE INDEX idx_message_reactions_emoji ON message_reactions(emoji);
  END IF;
END $$;

-- Step 6: Create message_reads table
CREATE TABLE IF NOT EXISTS message_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL,  -- Changed from UUID REFERENCES auth.users(id)
  last_read_message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add unique constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'message_reads_conversation_id_user_id_key'
  ) THEN
    ALTER TABLE message_reads 
    ADD CONSTRAINT message_reads_conversation_id_user_id_key 
    UNIQUE(conversation_id, user_id);
  END IF;
END $$;

-- Create indexes
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_message_reads_conversation_id') THEN
    CREATE INDEX idx_message_reads_conversation_id ON message_reads(conversation_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_message_reads_user_id') THEN
    CREATE INDEX idx_message_reads_user_id ON message_reads(user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_message_reads_read_at') THEN
    CREATE INDEX idx_message_reads_read_at ON message_reads(read_at DESC);
  END IF;
END $$;

-- Step 7: Enable Row-Level Security (RLS) with permissive policies
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reads ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "conversations_all_access" ON conversations;
DROP POLICY IF EXISTS "conversation_members_all_access" ON conversation_members;
DROP POLICY IF EXISTS "messages_all_access" ON messages;
DROP POLICY IF EXISTS "message_reactions_all_access" ON message_reactions;
DROP POLICY IF EXISTS "message_reads_all_access" ON message_reads;

-- Create permissive policies for all users (authenticated and anon)
CREATE POLICY "conversations_all_access" ON conversations FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "conversation_members_all_access" ON conversation_members FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "messages_all_access" ON messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "message_reactions_all_access" ON message_reactions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "message_reads_all_access" ON message_reads FOR ALL USING (true) WITH CHECK (true);

-- Step 8: Enable Realtime (only if tables don't already exist in publication)
DO $$
BEGIN
  -- Add tables to realtime publication if not already added
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE messages;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'conversation_members'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE conversation_members;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'message_reactions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE message_reactions;
  END IF;
END $$;

-- Step 9: Verification
SELECT 
  '✅ Chat system setup complete!' as status,
  (SELECT COUNT(*) FROM conversations) as conversations_count,
  (SELECT COUNT(*) FROM conversation_members) as members_count,
  (SELECT COUNT(*) FROM messages) as messages_count,
  (SELECT COUNT(*) FROM message_reactions) as reactions_count,
  (SELECT COUNT(*) FROM message_reads) as reads_count;

-- Show table structure
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('conversations', 'conversation_members', 'messages', 'message_reactions', 'message_reads')
ORDER BY table_name;
