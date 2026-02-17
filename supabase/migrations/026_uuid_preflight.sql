-- ============================================
-- MIGRATION 026: UUID preflight + safe backfill
-- Purpose: Add *_uuid columns for any TEXT/VARCHAR *_id fields and backfill safely.
-- This keeps existing data and avoids hard failures on invalid UUIDs.
-- ============================================

-- Safe UUID cast: returns NULL when input is not a valid UUID string
CREATE OR REPLACE FUNCTION public.safe_uuid(p_text TEXT)
RETURNS UUID AS $$
BEGIN
  IF p_text IS NULL THEN
    RETURN NULL;
  END IF;

  IF p_text ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    RETURN p_text::UUID;
  END IF;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Track invalid UUIDs for review
CREATE TABLE IF NOT EXISTS public.uuid_migration_audit (
  table_name TEXT NOT NULL,
  column_name TEXT NOT NULL,
  invalid_count BIGINT NOT NULL DEFAULT 0,
  total_count BIGINT NOT NULL DEFAULT 0,
  last_checked TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (table_name, column_name)
);

DO $$
DECLARE
  r RECORD;
  col_uuid TEXT;
  sql_text TEXT;
BEGIN
  FOR r IN
    SELECT table_schema, table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND data_type IN ('text', 'character varying')
      AND column_name LIKE '%\_id' ESCAPE '\'
  LOOP
    col_uuid := r.column_name || '_uuid';

    -- Add *_uuid column
    sql_text := format(
      'ALTER TABLE %I.%I ADD COLUMN IF NOT EXISTS %I UUID',
      r.table_schema, r.table_name, col_uuid
    );
    EXECUTE sql_text;

    -- Backfill *_uuid column safely
    sql_text := format(
      'UPDATE %I.%I SET %I = public.safe_uuid(%I) WHERE %I IS NULL AND %I IS NOT NULL',
      r.table_schema, r.table_name, col_uuid, r.column_name, col_uuid, r.column_name
    );
    EXECUTE sql_text;

    -- Update audit counts
    sql_text := format(
      'INSERT INTO public.uuid_migration_audit (table_name, column_name, invalid_count, total_count, last_checked) '
      || 'SELECT %L, %L, '
      || 'COUNT(*) FILTER (WHERE %I IS NOT NULL AND public.safe_uuid(%I) IS NULL), '
      || 'COUNT(*) FILTER (WHERE %I IS NOT NULL), NOW() '
      || 'FROM %I.%I '
      || 'ON CONFLICT (table_name, column_name) DO UPDATE '
      || 'SET invalid_count = EXCLUDED.invalid_count, total_count = EXCLUDED.total_count, last_checked = EXCLUDED.last_checked',
      r.table_name, r.column_name, r.column_name, r.column_name, r.column_name, r.table_schema, r.table_name
    );
    EXECUTE sql_text;
  END LOOP;
END $$;

-- Review invalid UUIDs before swapping columns
SELECT *
FROM public.uuid_migration_audit
WHERE invalid_count > 0
ORDER BY invalid_count DESC, table_name, column_name;

-- ============================================
-- Next step: review invalid_count = 0 rows and run 027_uuid_swap.sql
-- ============================================
