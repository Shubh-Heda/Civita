# UUID Standardization Guide

## Problem
Your database has inconsistent user ID types:
- **Some tables use UUID** (correct, matches auth.users)
- **Other tables use TEXT** (causes casting errors)

This creates type mismatch errors like:
```
ERROR: operator does not exist: text = uuid
```

## Solution: Two-Phase Approach

### Phase 1: Safe Addition (Non-Breaking) ✅ COMPLETED
**File**: `025_standardize_user_ids_to_uuid.sql`

This migration:
1. ✅ Adds new `*_uuid` columns alongside existing TEXT columns
2. ✅ Migrates all data from TEXT → UUID
3. ✅ Creates indexes for performance
4. ✅ Does NOT break existing code

**Affected tables**:
- `chat_room_members` (user_id → user_id_uuid)
- `chat_rooms` (created_by → created_by_uuid)
- `chat_messages` (sender_id → sender_id_uuid)
- `message_reactions` (user_id → user_id_uuid)
- `message_read_receipts` (user_id → user_id_uuid)
- `profiles` (user_id → user_id_uuid)
- `community_posts` (author_id → author_id_uuid)
- `post_comments` (author_id → author_id_uuid)
- `post_likes` (user_id → user_id_uuid)
- `post_media` (user_id → user_id_uuid)
- `post_shares` (user_id → user_id_uuid)
- `post_invites` (inviter_id → inviter_id_uuid)
- `post_bookmarks` (user_id → user_id_uuid)
- `user_follows` (follower_id → follower_id_uuid, following_id → following_id_uuid)

### Phase 2: Cleanup (After Code Update) 🔒 COMMENTED OUT

Once your application code is updated to use the new `*_uuid` columns:

1. **Update RLS Policies** - all `auth.uid()` comparisons will work without casting
2. **Drop old TEXT columns** - removes the old columns
3. **Rename new columns** - `user_id_uuid` → `user_id`

## Current State

After running migration 025:
- ✅ New UUID columns exist with all data migrated
- ✅ Old TEXT columns still exist (backward compatible)
- ✅ Indexes created for query performance
- ⚠️ RLS Policies still use TEXT columns (need update)

## Next Steps

### For Application Code:
1. Update all queries to use the new `*_uuid` columns
2. Ensure no casting is needed (`auth.uid()::text` → just `auth.uid()`)
3. Test thoroughly

### For Database (After app is updated):
1. Uncomment Phase 2 in migration 025
2. Drop the old TEXT columns
3. Rename `*_uuid` to original names
4. Update all RLS policies

## Benefits After Completion

✅ **No more type casting errors**
```sql
-- Before (errors):
USING (auth.uid()::text = user_id)  -- Type mismatch!

-- After (clean):
USING (auth.uid() = user_id)  -- Perfect match!
```

✅ **Better performance** - UUID comparisons faster than text
✅ **Cleaner code** - No casting needed anywhere
✅ **Type safety** - Database enforces correct types

## Migration Order

Run migrations in order:
1. `001_backend_personalization.sql`
2. `002_community_posts.sql`
3. `002_wallet_system.sql`
4. `003_locations.sql`
5. `004_chat_backend.sql`
6. `005_trust_scores.sql`
7. ... (all remaining migrations)
8. **`025_standardize_user_ids_to_uuid.sql`** ← NEW (safe addition phase)

After code updates:
9. Uncomment Phase 2 of migration 025 (cleanup phase)

## Testing

After running migration 025:

```sql
-- Verify new columns exist and have data
SELECT COUNT(*) FROM chat_room_members WHERE user_id_uuid IS NOT NULL;
SELECT COUNT(*) FROM chat_messages WHERE sender_id_uuid IS NOT NULL;

-- Verify data consistency (same count from old and new columns)
SELECT 
  (SELECT COUNT(*) FROM chat_room_members WHERE user_id IS NOT NULL) as old_count,
  (SELECT COUNT(*) FROM chat_room_members WHERE user_id_uuid IS NOT NULL) as new_count;

-- Verify indexes exist
SELECT * FROM pg_indexes WHERE tablename = 'chat_room_members';
```

## Rollback (if needed)

If anything goes wrong, the old TEXT columns still exist, so:
1. Revert application code changes
2. Delete migration 025 file
3. Re-run migrations - everything still works with old columns

No data loss, fully reversible!
