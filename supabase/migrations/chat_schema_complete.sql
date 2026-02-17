-- ============================================
-- COMPLETE CHAT SCHEMA FOR SUPABASE
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. DROP EXISTING TABLES (if they exist)
-- CASCADE will also drop dependent objects like triggers and policies
DROP TABLE IF EXISTS chat_invitations CASCADE;
DROP TABLE IF EXISTS chat_pinned_messages CASCADE;
DROP TABLE IF EXISTS message_reactions CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS chat_room_members CASCADE;
DROP TABLE IF EXISTS chat_rooms CASCADE;

-- 2. CHAT ROOMS TABLE
CREATE TABLE chat_rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  room_type TEXT CHECK (room_type IN ('match', 'event', 'party', 'gaming', 'custom', 'dm')) NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  is_private BOOLEAN DEFAULT false,
  category TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_message_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CHAT ROOM MEMBERS TABLE
CREATE TABLE chat_room_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT CHECK (role IN ('admin', 'moderator', 'member')) DEFAULT 'member',
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  is_muted BOOLEAN DEFAULT false,
  UNIQUE(room_id, user_id)
);

-- 4. CHAT MESSAGES TABLE (Enhanced)
CREATE TABLE chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  message_type TEXT CHECK (message_type IN ('text', 'image', 'video', 'audio', 'file', 'system')) DEFAULT 'text',
  media_url TEXT,
  media_thumbnail TEXT,
  reply_to UUID REFERENCES chat_messages(id) ON DELETE SET NULL,
  is_edited BOOLEAN DEFAULT false,
  is_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. MESSAGE REACTIONS TABLE
CREATE TABLE message_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_id UUID REFERENCES chat_messages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(message_id, user_id, emoji)
);

-- 6. PINNED MESSAGES TABLE
CREATE TABLE chat_pinned_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  message_id UUID REFERENCES chat_messages(id) ON DELETE CASCADE,
  pinned_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  pinned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(room_id, message_id)
);

-- 7. USER INVITATIONS TABLE
CREATE TABLE chat_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID REFERENCES chat_rooms(id) ON DELETE CASCADE,
  inviter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  invitee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  responded_at TIMESTAMPTZ,
  UNIQUE(room_id, invitee_id)
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_chat_rooms_created_by ON chat_rooms(created_by);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_last_message_at ON chat_rooms(last_message_at DESC);

CREATE INDEX IF NOT EXISTS idx_chat_room_members_user_id ON chat_room_members(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_room_members_room_id ON chat_room_members(room_id);

CREATE INDEX IF NOT EXISTS idx_chat_messages_room_id ON chat_messages(room_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender_id ON chat_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_messages_is_deleted ON chat_messages(is_deleted);

CREATE INDEX IF NOT EXISTS idx_message_reactions_message_id ON message_reactions(message_id);
CREATE INDEX IF NOT EXISTS idx_message_reactions_user_id ON message_reactions(user_id);

CREATE INDEX IF NOT EXISTS idx_chat_invitations_invitee_id ON chat_invitations(invitee_id);
CREATE INDEX IF NOT EXISTS idx_chat_invitations_status ON chat_invitations(status);
CREATE INDEX IF NOT EXISTS idx_chat_invitations_room_id ON chat_invitations(room_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_room_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_pinned_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_invitations ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view rooms they are members of" ON chat_rooms;
DROP POLICY IF EXISTS "Users can create rooms" ON chat_rooms;
DROP POLICY IF EXISTS "Admins can update their rooms" ON chat_rooms;
DROP POLICY IF EXISTS "Users can view members of their rooms" ON chat_room_members;
DROP POLICY IF EXISTS "Admins can add members" ON chat_room_members;
DROP POLICY IF EXISTS "Users can view messages in their rooms" ON chat_messages;
DROP POLICY IF EXISTS "Users can send messages to their rooms" ON chat_messages;
DROP POLICY IF EXISTS "Users can delete their own messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can view reactions in their rooms" ON message_reactions;
DROP POLICY IF EXISTS "Users can add reactions" ON message_reactions;
DROP POLICY IF EXISTS "Users can view their invitations" ON chat_invitations;
DROP POLICY IF EXISTS "Users can create invitations" ON chat_invitations;
DROP POLICY IF EXISTS "Users can update their own invitations" ON chat_invitations;

-- Policies for chat_rooms
CREATE POLICY "Users can view rooms they are members of" ON chat_rooms
  FOR SELECT USING (
    id IN (SELECT room_id FROM chat_room_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can create rooms" ON chat_rooms
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Admins can update their rooms" ON chat_rooms
  FOR UPDATE USING (
    id IN (
      SELECT room_id FROM chat_room_members 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Policies for chat_room_members
CREATE POLICY "Users can view members of their rooms" ON chat_room_members
  FOR SELECT USING (
    room_id IN (SELECT room_id FROM chat_room_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can add members" ON chat_room_members
  FOR INSERT WITH CHECK (
    room_id IN (
      SELECT room_id FROM chat_room_members 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Policies for chat_messages
CREATE POLICY "Users can view messages in their rooms" ON chat_messages
  FOR SELECT USING (
    room_id IN (SELECT room_id FROM chat_room_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can send messages to their rooms" ON chat_messages
  FOR INSERT WITH CHECK (
    sender_id = auth.uid() AND
    room_id IN (SELECT room_id FROM chat_room_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update their own messages" ON chat_messages
  FOR UPDATE USING (sender_id = auth.uid());

CREATE POLICY "Users can delete their own messages" ON chat_messages
  FOR DELETE USING (sender_id = auth.uid());

-- Policies for message_reactions
CREATE POLICY "Users can view reactions in their rooms" ON message_reactions
  FOR SELECT USING (
    message_id IN (
      SELECT id FROM chat_messages WHERE room_id IN (
        SELECT room_id FROM chat_room_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can add reactions" ON message_reactions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can remove their reactions" ON message_reactions
  FOR DELETE USING (user_id = auth.uid());

-- Policies for pinned messages
CREATE POLICY "Users can view pinned messages in their rooms" ON chat_pinned_messages
  FOR SELECT USING (
    room_id IN (SELECT room_id FROM chat_room_members WHERE user_id = auth.uid())
  );

CREATE POLICY "Moderators can pin messages" ON chat_pinned_messages
  FOR INSERT WITH CHECK (
    room_id IN (
      SELECT room_id FROM chat_room_members 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );

-- Policies for invitations
CREATE POLICY "Users can view their invitations" ON chat_invitations
  FOR SELECT USING (invitee_id = auth.uid() OR inviter_id = auth.uid());

CREATE POLICY "Users can create invitations" ON chat_invitations
  FOR INSERT WITH CHECK (inviter_id = auth.uid());

CREATE POLICY "Users can update their own invitations" ON chat_invitations
  FOR UPDATE USING (invitee_id = auth.uid());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to get user's chat rooms with member count
CREATE OR REPLACE FUNCTION get_user_chat_rooms(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  description TEXT,
  room_type TEXT,
  created_by UUID,
  is_private BOOLEAN,
  category TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ,
  last_message_at TIMESTAMPTZ,
  member_count BIGINT,
  unread_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.name,
    r.description,
    r.room_type,
    r.created_by,
    r.is_private,
    r.category,
    r.avatar_url,
    r.created_at,
    r.updated_at,
    r.last_message_at,
    (SELECT COUNT(*) FROM chat_room_members WHERE room_id = r.id) as member_count,
    (SELECT COUNT(*) FROM chat_messages m 
     WHERE m.room_id = r.id 
     AND m.is_deleted = false
     AND m.created_at > COALESCE(
       (SELECT last_read_at FROM chat_room_members 
        WHERE room_id = r.id AND user_id = p_user_id), 
       '1970-01-01'::timestamptz
     )
    ) as unread_count
  FROM chat_rooms r
  INNER JOIN chat_room_members m ON r.id = m.room_id
  WHERE m.user_id = p_user_id
  ORDER BY r.last_message_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update last_message_at when new message is sent
CREATE OR REPLACE FUNCTION update_room_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE chat_rooms 
  SET last_message_at = NEW.created_at,
      updated_at = NEW.created_at
  WHERE id = NEW.room_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS chat_message_update_room_time ON chat_messages;

-- Create trigger
CREATE TRIGGER chat_message_update_room_time
  AFTER INSERT ON chat_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_room_last_message();

-- ============================================
-- ENABLE REALTIME FOR WEBSOCKETS
-- ============================================

-- Enable realtime for all chat tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_room_members;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE message_reactions;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_invitations;

-- ============================================
-- VERIFICATION
-- ============================================

-- Verify tables were created
SELECT 
  schemaname, 
  tablename, 
  tableowner 
FROM pg_tables 
WHERE tablename LIKE 'chat_%' 
ORDER BY tablename;

-- Verify RLS is enabled
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE tablename LIKE 'chat_%';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$ 
BEGIN 
  RAISE NOTICE '✅ Chat schema setup complete!';
  RAISE NOTICE '📋 Next steps:';
  RAISE NOTICE '1. Enable Realtime in Supabase Dashboard > Database > Replication';
  RAISE NOTICE '2. Add these tables: chat_messages, chat_rooms, chat_room_members';
  RAISE NOTICE '3. Use the useRealtimeChat hook in your React components';
  RAISE NOTICE '4. Test by opening 2 browser windows and chatting!';
END $$;
