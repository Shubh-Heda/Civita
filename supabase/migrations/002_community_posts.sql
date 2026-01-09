
ALTER TABLE profiles 
ALTER TABLE community_posts 
ALTER TABLE post_media 
ALTER TABLE post_comments 
ALTER TABLE post_likes 
ALTER TABLE user_follows 
ALTER TABLE post_shares 
ALTER TABLE post_invites 
ALTER TABLE post_bookmarks 

-- Profiles: Public read, owner write

CREATE POLICY "Profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);


CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid()::text = id::text);

-- Community Posts: Public posts readable by all, private by followers

CREATE POLICY "Public posts are viewable by everyone"
  ON community_posts FOR SELECT USING (true);


CREATE POLICY "Users can create their own posts"
  ON community_posts FOR INSERT WITH CHECK (author_id::text = auth.uid()::text);


CREATE POLICY "Users can update their own posts"
  ON community_posts FOR UPDATE USING (author_id::text = auth.uid()::text);


CREATE POLICY "Users can delete their own posts"
  ON community_posts FOR DELETE USING (author_id::text = auth.uid()::text);

-- Post Media: Follows post visibility

CREATE POLICY "Post media is viewable with post"
  ON post_media FOR SELECT USING (true);

-- Comments: Readable by all, writable by authenticated users

CREATE POLICY "Comments are viewable by everyone"
  ON post_comments FOR SELECT USING (true);


CREATE POLICY "Authenticated users can create comments"
  ON post_comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);


CREATE POLICY "Users can update their own comments"
  ON post_comments FOR UPDATE USING (author_id::text = auth.uid()::text);


CREATE POLICY "Users can delete their own comments"
  ON post_comments FOR DELETE USING (author_id::text = auth.uid()::text);

-- Likes: Users can manage their own likes

CREATE POLICY "Users can view all likes"
  ON post_likes FOR SELECT USING (true);


CREATE POLICY "Users can create their own likes"
  ON post_likes FOR INSERT WITH CHECK (user_id::text = auth.uid()::text);


CREATE POLICY "Users can delete their own likes"
  ON post_likes FOR DELETE USING (user_id::text = auth.uid()::text);

-- Follows: Users can manage their own follows

CREATE POLICY "Follows are viewable by everyone"
  ON user_follows FOR SELECT USING (true);


CREATE POLICY "Users can create their own follows"
  ON user_follows FOR INSERT WITH CHECK (follower_id::text = auth.uid()::text);


CREATE POLICY "Users can delete their own follows"
  ON user_follows FOR DELETE USING (follower_id::text = auth.uid()::text);

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================
-- Uncomment to insert sample data

-- INSERT INTO profiles (user_id, username, display_name, bio, avatar_url) VALUES
--   (gen_random_uuid(), 'sportsfan123', 'Sports Fan', 'Love playing cricket and football!', 'https://api.dicebear.com/7.x/avataaars/svg?seed=sportsfan'),
--   (gen_random_uuid(), 'partyking', 'Party King', 'Always ready for the next celebration 🎉', 'https://api.dicebear.com/7.x/avataaars/svg?seed=partyking'),
--   (gen_random_uuid(), 'gamer_pro', 'Pro Gamer', 'Esports enthusiast and streamer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=gamer');


