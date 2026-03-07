-- ============================================
-- Fix Matches Table - Add Missing Columns
-- Run this in your Supabase SQL Editor
-- ============================================

-- This fixes the "Could not find the 'amount' column" error
-- Add any missing columns to the matches table

-- Check if amount column exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'matches' AND column_name = 'amount'
    ) THEN
        ALTER TABLE matches ADD COLUMN amount NUMERIC;
        RAISE NOTICE 'Added amount column to matches table';
    ELSE
        RAISE NOTICE 'amount column already exists';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'matches' AND column_name = 'turf_cost'
    ) THEN
        ALTER TABLE matches ADD COLUMN turf_cost NUMERIC;
        RAISE NOTICE 'Added turf_cost column to matches table';
    ELSE
        RAISE NOTICE 'turf_cost column already exists';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'matches' AND column_name = 'payment_option'
    ) THEN
        ALTER TABLE matches ADD COLUMN payment_option TEXT DEFAULT 'pay_now';
        RAISE NOTICE 'Added payment_option column to matches table';
    ELSE
        RAISE NOTICE 'payment_option column already exists';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'matches' AND column_name = 'min_players'
    ) THEN
        ALTER TABLE matches ADD COLUMN min_players INTEGER;
        RAISE NOTICE 'Added min_players column to matches table';
    ELSE
        RAISE NOTICE 'min_players column already exists';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'matches' AND column_name = 'max_players'
    ) THEN
        ALTER TABLE matches ADD COLUMN max_players INTEGER;
        RAISE NOTICE 'Added max_players column to matches table';
    ELSE
        RAISE NOTICE 'max_players column already exists';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'matches' AND column_name = 'category'
    ) THEN
        ALTER TABLE matches ADD COLUMN category TEXT CHECK (category IN ('sports', 'events', 'parties')) DEFAULT 'sports';
        RAISE NOTICE 'Added category column to matches table';
    ELSE
        RAISE NOTICE 'category column already exists';
    END IF;
END $$;

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'matches'
ORDER BY ordinal_position;
