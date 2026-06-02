-- ============================================
-- DEBUG: Check conversation_members insert issue
-- ============================================

-- 1. Check if conversation_members table exists and its structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'conversation_members'
ORDER BY ordinal_position;

-- 2. Check all foreign key constraints
SELECT 
  tc.constraint_name, 
  tc.table_name, 
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'conversation_members';

-- 3. Try a test insert (replace with actual test UUID from auth.users)
-- First, get a real user ID from auth.users
SELECT id, email FROM auth.users LIMIT 1;
