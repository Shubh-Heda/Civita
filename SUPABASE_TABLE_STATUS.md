# 🔍 Supabase Table Status Check

Your `conversations` table already exists! Here's how to check what else is set up:

## Quick Diagnostic

### In Supabase Dashboard:
1. Go to your Supabase project
2. Click **Table Editor** (left sidebar)
3. Look for these tables:

- ✅ `conversations` - **EXISTS** (confirmed by error)
- ❓ `conversation_members` - Check if present
- ❓ `messages` - Check if present  
- ❓ `message_reactions` - Check if present
- ❓ `message_reads` - Check if present

## Next Step - Run Safe SQL

Since `conversations` table exists, use this **safe SQL** that won't error on existing tables:

**Copy-paste this in Supabase → SQL Editor:**

```sql
-- These won't error if tables already exist
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT CHECK (type IN ('direct', 'group')),
  name TEXT NOT NULL,
  description TEXT,
  avatar TEXT,
  is_archived BOOLEAN DEFAULT false,
  is_muted BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS conversation_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK (role IN ('member', 'admin')),
  joined_at TIMESTAMP DEFAULT NOW(),
  is_online BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  sender_name TEXT NOT NULL,
  sender_avatar TEXT,
  content TEXT NOT NULL,
  message_type TEXT CHECK (message_type IN ('text', 'image', 'file', 'location', 'system')),
  is_sent BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS message_reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id UUID REFERENCES messages(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  emoji TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS message_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  read_at TIMESTAMP DEFAULT NOW()
);
```

Then run it - it will:
- ✅ Skip creating `conversations` (already exists)
- ✅ Create any missing tables
- ✅ No errors!

## After Running SQL

### Enable Row Level Security (RLS)
```sql
-- These enable security rules
ALTER TABLE IF EXISTS conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS message_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS message_reads ENABLE ROW LEVEL SECURITY;
```

### Verify in Your App
1. Open your app in browser
2. Try sending a message
3. Open Supabase → Table Editor → `messages` table
4. ✓ Should see your message appear there (if Supabase is properly connected)

## If Tables Still Have Issues

Check the table structure by running this query:
```sql
-- See what columns exist in conversations table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'conversations';
```

---

## Summary

✅ Your Supabase already has chat tables partially set up  
✅ Use "IF NOT EXISTS" SQL to add missing ones safely  
✅ Enable RLS for security  
✅ Your app will automatically use real data once tables exist  

When tables are ready, the app automatically switches from mock data to real Supabase data - **no code changes needed!**

