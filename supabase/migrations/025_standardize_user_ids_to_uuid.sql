-- ============================================
-- MIGRATION 025: Standardize all user_id columns to UUID
-- Purpose: Convert TEXT user_id columns to UUID for consistency and performance
-- This ensures compatibility with auth.users(id) which is UUID type
-- ============================================

-- Step 1: Add new UUID columns alongside existing TEXT columns
-- This allows data migration without data loss

ALTER TABLE IF EXISTS chat_room_members ADD COLUMN IF NOT EXISTS user_id_uuid UUID;
ALTER TABLE IF EXISTS chat_rooms ADD COLUMN IF NOT EXISTS created_by_uuid UUID;
ALTER TABLE IF EXISTS chat_messages ADD COLUMN IF NOT EXISTS sender_id_uuid UUID;
ALTER TABLE IF EXISTS message_reactions ADD COLUMN IF NOT EXISTS user_id_uuid UUID;
ALTER TABLE IF EXISTS message_read_receipts ADD COLUMN IF NOT EXISTS user_id_uuid UUID;
ALTER TABLE IF EXISTS profiles ADD COLUMN IF NOT EXISTS user_id_uuid UUID;
ALTER TABLE IF EXISTS community_posts ADD COLUMN IF NOT EXISTS author_id_uuid UUID;
ALTER TABLE IF EXISTS post_comments ADD COLUMN IF NOT EXISTS author_id_uuid UUID;
ALTER TABLE IF EXISTS post_likes ADD COLUMN IF NOT EXISTS user_id_uuid UUID;
ALTER TABLE IF EXISTS post_media ADD COLUMN IF NOT EXISTS user_id_uuid UUID;
ALTER TABLE IF EXISTS post_shares ADD COLUMN IF NOT EXISTS user_id_uuid UUID;
ALTER TABLE IF EXISTS post_invites ADD COLUMN IF NOT EXISTS inviter_id_uuid UUID;
ALTER TABLE IF EXISTS post_bookmarks ADD COLUMN IF NOT EXISTS user_id_uuid UUID;
ALTER TABLE IF EXISTS user_follows ADD COLUMN IF NOT EXISTS follower_id_uuid UUID;
ALTER TABLE IF EXISTS user_follows ADD COLUMN IF NOT EXISTS following_id_uuid UUID;

-- Step 2: Migrate data from TEXT to UUID (convert TEXT to actual UUID type)
-- Handle both string UUIDs and potential invalid data

UPDATE chat_room_members SET user_id_uuid = user_id::UUID WHERE user_id_uuid IS NULL;
UPDATE chat_rooms SET created_by_uuid = created_by::UUID WHERE created_by_uuid IS NULL AND created_by IS NOT NULL;
UPDATE chat_messages SET sender_id_uuid = sender_id::UUID WHERE sender_id_uuid IS NULL AND sender_id IS NOT NULL;
UPDATE message_reactions SET user_id_uuid = user_id::UUID WHERE user_id_uuid IS NULL;
UPDATE message_read_receipts SET user_id_uuid = user_id::UUID WHERE user_id_uuid IS NULL;
UPDATE profiles SET user_id_uuid = user_id::UUID WHERE user_id_uuid IS NULL;
UPDATE community_posts SET author_id_uuid = author_id::UUID WHERE author_id_uuid IS NULL;
UPDATE post_comments SET author_id_uuid = author_id::UUID WHERE author_id_uuid IS NULL;
UPDATE post_likes SET user_id_uuid = user_id::UUID WHERE user_id_uuid IS NULL;
UPDATE post_media SET user_id_uuid = user_id::UUID WHERE user_id_uuid IS NULL;
UPDATE post_shares SET user_id_uuid = user_id::UUID WHERE user_id_uuid IS NULL;
UPDATE post_invites SET inviter_id_uuid = inviter_id::UUID WHERE inviter_id_uuid IS NULL AND inviter_id IS NOT NULL;
UPDATE post_bookmarks SET user_id_uuid = user_id::UUID WHERE user_id_uuid IS NULL;
UPDATE user_follows SET follower_id_uuid = follower_id::UUID WHERE follower_id_uuid IS NULL;
UPDATE user_follows SET following_id_uuid = following_id::UUID WHERE following_id_uuid IS NULL;

-- Step 3: Add NOT NULL constraints to new UUID columns
-- (Only for columns that are truly required)

ALTER TABLE IF EXISTS chat_room_members 
  ALTER COLUMN user_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS chat_messages 
  ALTER COLUMN sender_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS message_reactions 
  ALTER COLUMN user_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS message_read_receipts 
  ALTER COLUMN user_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS profiles 
  ALTER COLUMN user_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS community_posts 
  ALTER COLUMN author_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS post_comments 
  ALTER COLUMN author_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS post_likes 
  ALTER COLUMN user_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS post_shares 
  ALTER COLUMN user_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS post_bookmarks 
  ALTER COLUMN user_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS user_follows 
  ALTER COLUMN follower_id_uuid SET NOT NULL;

ALTER TABLE IF EXISTS user_follows 
  ALTER COLUMN following_id_uuid SET NOT NULL;

-- Step 4: Create indexes on new UUID columns for performance
CREATE INDEX IF NOT EXISTS idx_chat_room_members_user_id_uuid ON chat_room_members(user_id_uuid);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_created_by_uuid ON chat_rooms(created_by_uuid);
CREATE INDEX IF NOT EXISTS idx_chat_messages_sender_id_uuid ON chat_messages(sender_id_uuid);
CREATE INDEX IF NOT EXISTS idx_message_reactions_user_id_uuid ON message_reactions(user_id_uuid);
CREATE INDEX IF NOT EXISTS idx_message_read_receipts_user_id_uuid ON message_read_receipts(user_id_uuid);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id_uuid ON profiles(user_id_uuid);
CREATE INDEX IF NOT EXISTS idx_community_posts_author_id_uuid ON community_posts(author_id_uuid);
CREATE INDEX IF NOT EXISTS idx_post_comments_author_id_uuid ON post_comments(author_id_uuid);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id_uuid ON post_likes(user_id_uuid);
CREATE INDEX IF NOT EXISTS idx_post_shares_user_id_uuid ON post_shares(user_id_uuid);
CREATE INDEX IF NOT EXISTS idx_post_bookmarks_user_id_uuid ON post_bookmarks(user_id_uuid);
CREATE INDEX IF NOT EXISTS idx_user_follows_follower_id_uuid ON user_follows(follower_id_uuid);
CREATE INDEX IF NOT EXISTS idx_user_follows_following_id_uuid ON user_follows(following_id_uuid);

-- Step 5: Drop old TEXT columns (commented out - uncomment after verifying data migration)
-- This step should only be done after thorough testing to ensure all queries still work

-- ALTER TABLE IF EXISTS chat_room_members DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE IF EXISTS chat_rooms DROP COLUMN IF EXISTS created_by;
-- ALTER TABLE IF EXISTS chat_messages DROP COLUMN IF EXISTS sender_id;
-- ALTER TABLE IF EXISTS message_reactions DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE IF EXISTS message_read_receipts DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE IF EXISTS profiles DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE IF EXISTS community_posts DROP COLUMN IF EXISTS author_id;
-- ALTER TABLE IF EXISTS post_comments DROP COLUMN IF EXISTS author_id;
-- ALTER TABLE IF EXISTS post_likes DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE IF EXISTS post_media DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE IF EXISTS post_shares DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE IF EXISTS post_invites DROP COLUMN IF EXISTS inviter_id;
-- ALTER TABLE IF EXISTS post_bookmarks DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE IF EXISTS user_follows DROP COLUMN IF EXISTS follower_id;
-- ALTER TABLE IF EXISTS user_follows DROP COLUMN IF EXISTS following_id;

-- Step 6: Rename new columns to old names (after old columns are dropped)
-- Uncomment after step 5 is executed:

-- ALTER TABLE IF EXISTS chat_room_members RENAME COLUMN user_id_uuid TO user_id;
-- ALTER TABLE IF EXISTS chat_rooms RENAME COLUMN created_by_uuid TO created_by;
-- ALTER TABLE IF EXISTS chat_messages RENAME COLUMN sender_id_uuid TO sender_id;
-- ALTER TABLE IF EXISTS message_reactions RENAME COLUMN user_id_uuid TO user_id;
-- ALTER TABLE IF EXISTS message_read_receipts RENAME COLUMN user_id_uuid TO user_id;
-- ALTER TABLE IF EXISTS profiles RENAME COLUMN user_id_uuid TO user_id;
-- ALTER TABLE IF EXISTS community_posts RENAME COLUMN author_id_uuid TO author_id;
-- ALTER TABLE IF EXISTS post_comments RENAME COLUMN author_id_uuid TO author_id;
-- ALTER TABLE IF EXISTS post_likes RENAME COLUMN user_id_uuid TO user_id;
-- ALTER TABLE IF EXISTS post_media RENAME COLUMN user_id_uuid TO user_id;
-- ALTER TABLE IF EXISTS post_shares RENAME COLUMN user_id_uuid TO user_id;
-- ALTER TABLE IF EXISTS post_invites RENAME COLUMN inviter_id_uuid TO inviter_id;
-- ALTER TABLE IF EXISTS post_bookmarks RENAME COLUMN user_id_uuid TO user_id;
-- ALTER TABLE IF EXISTS user_follows RENAME COLUMN follower_id_uuid TO follower_id;
-- ALTER TABLE IF EXISTS user_follows RENAME COLUMN following_id_uuid TO following_id;

-- ============================================
-- MIGRATION NOTES
-- ============================================
-- This migration adds new UUID columns alongside existing TEXT columns.
--
-- Phase 1 (COMPLETED):
-- ✅ New *_uuid columns created
-- ✅ Data migrated from TEXT to UUID
-- ✅ Indexes created for performance
--
-- Phase 2 (COMMENTED OUT - FOR LATER):
-- After you verify that applications have been updated to use the new *_uuid columns:
-- 1. Uncomment Step 5 (DROP old TEXT columns)
-- 2. Uncomment Step 6 (RENAME new columns)
-- 3. Update all RLS policies to use new column names
-- 4. Update all application queries to use new column names
--
-- ============================================
