-- ============================================
-- COMPREHENSIVE FIX: Convert all remaining TEXT user_id columns to UUID
-- This will restore group creation functionality
-- ============================================

-- STEP 1: Drop all chat_messages policies (6 total)
DROP POLICY IF EXISTS "Chat members can send messages" ON chat_messages;
DROP POLICY IF EXISTS "Chat messages viewable by chat members" ON chat_messages;
DROP POLICY IF EXISTS "Users can delete their own messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can send messages to their rooms" ON chat_messages;
DROP POLICY IF EXISTS "Users can update their own messages" ON chat_messages;
DROP POLICY IF EXISTS "Users can view messages in their rooms" ON chat_messages;

-- STEP 2: Drop all chat_rooms policies first (they may reference chat_room_members.user_id)
DROP POLICY IF EXISTS "Users can view rooms they are members of" ON chat_rooms;
DROP POLICY IF EXISTS "Users can create rooms" ON chat_rooms;
DROP POLICY IF EXISTS "Users can update their rooms" ON chat_rooms;
DROP POLICY IF EXISTS "Admins can delete rooms" ON chat_rooms;
DROP POLICY IF EXISTS "Admins can update their rooms" ON chat_rooms;

-- STEP 2.5: Drop all chat_pinned_messages policies (they may reference chat_room_members.user_id)
DROP POLICY IF EXISTS "Users can view pinned messages in their rooms" ON chat_pinned_messages;
DROP POLICY IF EXISTS "Admins can pin messages" ON chat_pinned_messages;
DROP POLICY IF EXISTS "Admins can unpin messages" ON chat_pinned_messages;
DROP POLICY IF EXISTS "Moderators can pin messages" ON chat_pinned_messages;
DROP POLICY IF EXISTS "Moderators can unpin messages" ON chat_pinned_messages;

-- STEP 3: Convert chat_rooms.user_id if it's TEXT
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'chat_rooms') THEN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chat_rooms' AND column_name = 'user_id' AND data_type = 'text') THEN
      ALTER TABLE chat_rooms DROP CONSTRAINT IF EXISTS chat_rooms_user_id_fkey;
      
      -- Delete non-UUID data
      DELETE FROM chat_rooms WHERE user_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
      
      -- Convert column type
      ALTER TABLE chat_rooms ALTER COLUMN user_id TYPE UUID USING user_id::uuid;
      
      -- Add foreign key
      ALTER TABLE chat_rooms ADD CONSTRAINT chat_rooms_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
      
      -- Recreate chat_rooms policies (only if user_id column exists)
      CREATE POLICY "Users can view rooms they are members of"
        ON chat_rooms FOR SELECT
        USING (
          user_id = auth.uid() OR
          EXISTS (
            SELECT 1 FROM chat_room_members
            WHERE chat_room_members.room_id = chat_rooms.id
              AND chat_room_members.user_id = auth.uid()
          )
        );
      
      CREATE POLICY "Users can create rooms"
        ON chat_rooms FOR INSERT
        WITH CHECK (auth.uid() = user_id);
      
      CREATE POLICY "Users can update their rooms"
        ON chat_rooms FOR UPDATE
        USING (auth.uid() = user_id);
      
      CREATE POLICY "Admins can delete rooms"
        ON chat_rooms FOR DELETE
        USING (auth.uid() = user_id);
    END IF;
  END IF;
END $$;

-- STEP 4: Handle chat_room_members table
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'chat_room_members') THEN
    -- Drop all policies
    DROP POLICY IF EXISTS "Users can view members of their rooms" ON chat_room_members;
    DROP POLICY IF EXISTS "Admins can add members" ON chat_room_members;
    DROP POLICY IF EXISTS "Users can remove themselves" ON chat_room_members;
    DROP POLICY IF EXISTS "Admins can remove members" ON chat_room_members;
    
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chat_room_members' AND column_name = 'user_id' AND data_type = 'text') THEN
      -- Drop foreign key
      ALTER TABLE chat_room_members DROP CONSTRAINT IF EXISTS chat_room_members_user_id_fkey;
      
      -- Delete non-UUID data
      DELETE FROM chat_room_members WHERE user_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
      
      -- Convert column type
      ALTER TABLE chat_room_members ALTER COLUMN user_id TYPE UUID USING user_id::uuid;
      
      -- Add foreign key
      ALTER TABLE chat_room_members ADD CONSTRAINT chat_room_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
      
      -- Recreate policies
      CREATE POLICY "Users can view members of their rooms"
        ON chat_room_members FOR SELECT
        USING (
          EXISTS (
            SELECT 1 FROM chat_room_members crm
            WHERE crm.room_id = chat_room_members.room_id
              AND crm.user_id = auth.uid()
          )
        );
      
      -- Only create admin policy if chat_rooms.user_id exists
      IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chat_rooms' AND column_name = 'user_id') THEN
        CREATE POLICY "Admins can add members"
          ON chat_room_members FOR INSERT
          WITH CHECK (
            EXISTS (
              SELECT 1 FROM chat_rooms
              WHERE chat_rooms.id = chat_room_members.room_id
                AND chat_rooms.user_id = auth.uid()
            )
          );
      END IF;
    END IF;
  END IF;
END $$;

-- STEP 5: Recreate all 6 chat_messages policies with UUID-compatible logic
CREATE POLICY "Chat members can send messages"
  ON chat_messages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM chat_members
      WHERE chat_members.group_chat_id = chat_messages.group_chat_id
        AND chat_members.user_id = auth.uid()
        AND chat_members.is_active = true
    )
  );

CREATE POLICY "Chat messages viewable by chat members"
  ON chat_messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM chat_members
      WHERE chat_members.group_chat_id = chat_messages.group_chat_id
        AND chat_members.user_id = auth.uid()
        AND chat_members.is_active = true
    )
  );

CREATE POLICY "Users can delete their own messages"
  ON chat_messages FOR DELETE
  USING (auth.uid() = sender_id);

CREATE POLICY "Users can send messages to their rooms"
  ON chat_messages FOR INSERT
  WITH CHECK (
    sender_id = auth.uid() AND
    (
      room_id IN (
        SELECT room_id FROM chat_room_members
        WHERE user_id = auth.uid()
      ) OR
      room_id IS NULL
    )
  );

CREATE POLICY "Users can update their own messages"
  ON chat_messages FOR UPDATE
  USING (auth.uid() = sender_id);

CREATE POLICY "Users can view messages in their rooms"
  ON chat_messages FOR SELECT
  USING (
    room_id IN (
      SELECT room_id FROM chat_room_members
      WHERE user_id = auth.uid()
    ) OR
    room_id IS NULL
  );

-- STEP 5.5: Recreate chat_pinned_messages policies (if table exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'chat_pinned_messages') THEN
    CREATE POLICY "Users can view pinned messages in their rooms"
      ON chat_pinned_messages FOR SELECT
      USING (
        room_id IN (
          SELECT room_id FROM chat_room_members
          WHERE user_id = auth.uid()
        )
      );
    
    -- Only create admin policies if chat_rooms.user_id exists
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'chat_rooms' AND column_name = 'user_id') THEN
      CREATE POLICY "Admins can pin messages"
        ON chat_pinned_messages FOR INSERT
        WITH CHECK (
          EXISTS (
            SELECT 1 FROM chat_rooms
            WHERE chat_rooms.id = chat_pinned_messages.room_id
              AND chat_rooms.user_id = auth.uid()
          )
        );
      
      CREATE POLICY "Admins can unpin messages"
        ON chat_pinned_messages FOR DELETE
        USING (
          EXISTS (
            SELECT 1 FROM chat_rooms
            WHERE chat_rooms.id = chat_pinned_messages.room_id
              AND chat_rooms.user_id = auth.uid()
          )
        );
    END IF;
    
    -- Create moderator policies (checking room membership)
    CREATE POLICY "Moderators can pin messages"
      ON chat_pinned_messages FOR INSERT
      WITH CHECK (
        EXISTS (
          SELECT 1 FROM chat_room_members
          WHERE chat_room_members.room_id = chat_pinned_messages.room_id
            AND chat_room_members.user_id = auth.uid()
            AND chat_room_members.role = 'moderator'
        )
      );
    
    CREATE POLICY "Moderators can unpin messages"
      ON chat_pinned_messages FOR DELETE
      USING (
        EXISTS (
          SELECT 1 FROM chat_room_members
          WHERE chat_room_members.room_id = chat_pinned_messages.room_id
            AND chat_room_members.user_id = auth.uid()
            AND chat_room_members.role = 'moderator'
        )
      );
  END IF;
END $$;

-- STEP 6: Convert friendship_streaks.friend_id
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'friendship_streaks' AND column_name = 'friend_id' AND data_type = 'text') THEN
    -- Drop policies
    DROP POLICY IF EXISTS "Users can view their own friendship streaks" ON friendship_streaks;
    DROP POLICY IF EXISTS "Users can update their own friendship streaks" ON friendship_streaks;
    
    -- Drop foreign keys
    ALTER TABLE friendship_streaks DROP CONSTRAINT IF EXISTS friendship_streaks_friend_id_fkey;
    
    -- Delete non-UUID data
    DELETE FROM friendship_streaks WHERE friend_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
    
    -- Convert column type
    ALTER TABLE friendship_streaks ALTER COLUMN friend_id TYPE UUID USING friend_id::uuid;
    
    -- Add foreign key
    ALTER TABLE friendship_streaks ADD CONSTRAINT friendship_streaks_friend_id_fkey FOREIGN KEY (friend_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    
    -- Recreate policies
    CREATE POLICY "Users can view their own friendship streaks"
      ON friendship_streaks FOR SELECT
      USING (auth.uid() = user_id OR auth.uid() = friend_id);
    
    CREATE POLICY "Users can update their own friendship streaks"
      ON friendship_streaks FOR UPDATE
      USING (auth.uid() = user_id OR auth.uid() = friend_id);
  END IF;
END $$;

-- STEP 7: Convert coaching_subscriptions.user_id
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'coaching_subscriptions' AND column_name = 'user_id' AND data_type = 'text') THEN
    -- Drop policies
    DROP POLICY IF EXISTS "Users can view their own coaching subscriptions" ON coaching_subscriptions;
    DROP POLICY IF EXISTS "Users can manage their own coaching subscriptions" ON coaching_subscriptions;
    
    -- Drop foreign key
    ALTER TABLE coaching_subscriptions DROP CONSTRAINT IF EXISTS coaching_subscriptions_user_id_fkey;
    
    -- Delete non-UUID data
    DELETE FROM coaching_subscriptions WHERE user_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
    
    -- Convert column type
    ALTER TABLE coaching_subscriptions ALTER COLUMN user_id TYPE UUID USING user_id::uuid;
    
    -- Add foreign key
    ALTER TABLE coaching_subscriptions ADD CONSTRAINT coaching_subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    
    -- Recreate policies
    CREATE POLICY "Users can view their own coaching subscriptions"
      ON coaching_subscriptions FOR SELECT
      USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can manage their own coaching subscriptions"
      ON coaching_subscriptions FOR ALL
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- STEP 8: Convert payment_splits.user_id
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'payment_splits' AND column_name = 'user_id' AND data_type = 'text') THEN
    -- Drop policies
    DROP POLICY IF EXISTS "Users can view their own payment splits" ON payment_splits;
    DROP POLICY IF EXISTS "Users can manage their own payment splits" ON payment_splits;
    
    -- Drop foreign key
    ALTER TABLE payment_splits DROP CONSTRAINT IF EXISTS payment_splits_user_id_fkey;
    
    -- Delete non-UUID data
    DELETE FROM payment_splits WHERE user_id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$';
    
    -- Convert column type
    ALTER TABLE payment_splits ALTER COLUMN user_id TYPE UUID USING user_id::uuid;
    
    -- Add foreign key
    ALTER TABLE payment_splits ADD CONSTRAINT payment_splits_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    
    -- Recreate policies
    CREATE POLICY "Users can view their own payment splits"
      ON payment_splits FOR SELECT
      USING (auth.uid() = user_id);
    
    CREATE POLICY "Users can manage their own payment splits"
      ON payment_splits FOR ALL
      USING (auth.uid() = user_id);
  END IF;
END $$;

-- STEP 9: Verify all conversions
SELECT 
  table_name, 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE column_name IN ('user_id', 'friend_id') 
  AND data_type = 'text'
  AND table_schema = 'public'
ORDER BY table_name, column_name;

-- Success message
SELECT '✅ All TEXT user_id/friend_id columns converted to UUID!' AS status;
