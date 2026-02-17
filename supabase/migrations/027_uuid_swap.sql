-- ============================================
-- MIGRATION 027: UUID column swap (manual, safe)
-- Purpose: Generate statements to swap *_uuid columns into place
-- Only run AFTER 026_uuid_preflight.sql shows invalid_count = 0
-- ============================================

-- This script does NOT modify columns automatically.
-- It generates the ALTER TABLE statements so you can review and run them.

-- 1) Generate swap statements for columns that are clean
SELECT format(
  'ALTER TABLE %I.%I DROP COLUMN %I; ALTER TABLE %I.%I RENAME COLUMN %I TO %I;',
  c.table_schema,
  c.table_name,
  c.column_name,
  c.table_schema,
  c.table_name,
  c.column_name || '_uuid',
  c.column_name
) AS swap_statement
FROM information_schema.columns c
JOIN public.uuid_migration_audit a
  ON a.table_name = c.table_name
  AND a.column_name = c.column_name
WHERE c.table_schema = 'public'
  AND c.data_type IN ('text', 'character varying')
  AND c.column_name LIKE '%\_id' ESCAPE '\'
  AND a.invalid_count = 0
ORDER BY c.table_name, c.column_name;

-- 2) (Optional) Generate constraint/index rebuilds if needed
-- Add your FK/index statements here after the swap, if any were dropped.

-- ============================================
-- After swapping, update any app code/RLS to use UUID columns directly.
-- ============================================
