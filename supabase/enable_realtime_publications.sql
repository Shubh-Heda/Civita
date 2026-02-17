-- ============================================
-- SET REPLICA IDENTITY FOR REALTIME CHAT
-- ============================================

ALTER TABLE chat_messages REPLICA IDENTITY FULL;
ALTER TABLE chat_rooms REPLICA IDENTITY FULL;
ALTER TABLE chat_room_members REPLICA IDENTITY FULL;
ALTER TABLE message_reactions REPLICA IDENTITY FULL;
ALTER TABLE chat_invitations REPLICA IDENTITY FULL;

-- ============================================
-- DONE - Realtime is now enabled!
-- ============================================

-- Test by sending a message in the app
-- It should appear instantly in another browser window
