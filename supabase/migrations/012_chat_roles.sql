
CREATE POLICY "Room admins can update member roles"
  ON chat_room_members FOR UPDATE
  USING (
    room_id IN (
      SELECT room_id FROM chat_room_members 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  )
  WITH CHECK (
    room_id IN (
      SELECT room_id FROM chat_room_members 
      WHERE user_id = auth.uid() AND role IN ('admin', 'moderator')
    )
  );


