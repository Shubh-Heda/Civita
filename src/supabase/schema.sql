CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  bio TEXT,
  interests TEXT[] DEFAULT '{}',
  location TEXT,
  category TEXT CHECK (category IN ('sports', 'events', 'parties')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS matches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  turf_name TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  sport TEXT NOT NULL,
  status TEXT CHECK (status IN ('upcoming', 'completed')) DEFAULT 'upcoming',
  visibility TEXT NOT NULL,
  payment_option TEXT NOT NULL,
  amount DECIMAL(10, 2),
  location TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  min_players INTEGER,
  max_players INTEGER,
  turf_cost DECIMAL(10, 2),
  category TEXT CHECK (category IN ('sports', 'events', 'parties')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_category ON profiles(category);
CREATE INDEX IF NOT EXISTS idx_matches_user_id ON matches(user_id);
CREATE INDEX IF NOT EXISTS idx_matches_category ON matches(category);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_group_id ON chat_messages(group_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (true);

-- Create policies for matches
CREATE POLICY "Users can view all matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Users can insert their own matches" ON matches FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own matches" ON matches FOR UPDATE USING (true);
CREATE POLICY "Users can delete their own matches" ON matches FOR DELETE USING (true);

-- Create policies for chat messages
CREATE POLICY "Users can view all messages" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "Users can insert messages" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete messages" ON chat_messages FOR DELETE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
