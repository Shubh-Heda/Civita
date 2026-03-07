-- ============================================
-- CLEANUP MOCK / DEMO CHAT DATA
-- Run in Supabase SQL Editor if old demo chats still appear
-- ============================================

BEGIN;

-- 1) Remove known demo conversations by name (safe + explicit)
DELETE FROM conversations
WHERE lower(name) IN (
  'playyy',
  'funnn',
  'friday night football',
  'weekend cricket match',
  'basketball evening',
  'badminton doubles'
);

-- 2) Remove conversations that only include demo UUID users
-- Adjust demo IDs if needed.
WITH demo_conversations AS (
  SELECT cm.conversation_id
  FROM conversation_members cm
  GROUP BY cm.conversation_id
  HAVING bool_and(cm.user_id IN (
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    'demo-user',
    'user_001'
  ))
)
DELETE FROM conversations c
USING demo_conversations d
WHERE c.id = d.conversation_id;

COMMIT;

-- Verify remaining conversations
SELECT id, type, name, created_at
FROM conversations
ORDER BY created_at DESC
LIMIT 50;
