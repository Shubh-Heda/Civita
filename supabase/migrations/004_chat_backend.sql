
CREATE POLICY "Users can view read receipts in their rooms"
  ON message_read_receipts FOR SELECT
  USING (
    message_id IN (
      SELECT id FROM chat_messages
      WHERE room_id IN (
        SELECT room_id FROM chat_room_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Users can mark messages as read"
  ON message_read_receipts FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Function to get unread message count for a user
CREATE OR REPLACE FUNCTION get_unread_message_count(p_user_id UUID, p_room_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_last_read_at TIMESTAMPTZ;
  v_count INTEGER;
BEGIN
  SELECT last_read_at INTO v_last_read_at
  FROM chat_room_members
  WHERE user_id = p_user_id AND room_id = p_room_id;
  
  SELECT COUNT(*) INTO v_count
  FROM chat_messages
  WHERE room_id = p_room_id 
    AND created_at > COALESCE(v_last_read_at, '1970-01-01'::TIMESTAMPTZ)
    AND sender_id != p_user_id;
    
  RETURN v_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user's chat rooms with unread counts
CREATE OR REPLACE FUNCTION get_user_chat_rooms(p_user_id UUID)
RETURNS TABLE (
  room_id UUID,
  room_name TEXT,
  room_type TEXT,
  room_avatar TEXT,
  last_message_at TIMESTAMPTZ,
  unread_count INTEGER,
  member_count INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cr.id,
    cr.name,
    cr.room_type,
    cr.avatar_url,
    cr.last_message_at,
    get_unread_message_count(p_user_id, cr.id),
    (SELECT COUNT(*)::INTEGER FROM chat_room_members WHERE room_id = cr.id)
  FROM chat_rooms cr
  INNER JOIN chat_room_members crm ON cr.id = crm.room_id
  WHERE crm.user_id = p_user_id
  ORDER BY cr.last_message_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable realtime for chat tables
ALTER PUBLICATION supabase_realtime ADD TABLE chat_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_room_members;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE message_reactions;


