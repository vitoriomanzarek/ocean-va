-- ============================================
-- Setup RLS Policies for quiz_leads table
-- ============================================
-- Run this if the table already exists but RLS policies are missing
-- Dashboard → SQL Editor → New Query → Paste this → Run
-- ============================================

-- Enable Row Level Security (RLS) if not already enabled
ALTER TABLE quiz_leads ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous inserts" ON quiz_leads;
DROP POLICY IF EXISTS "Allow service role reads" ON quiz_leads;
DROP POLICY IF EXISTS "Users can read own data" ON quiz_leads;

-- Policy: Allow anonymous inserts (for API)
-- This allows the API to insert quiz results using the anon key
CREATE POLICY "Allow anonymous inserts" ON quiz_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow service role to read all (for dashboard/admin)
-- This allows you to see all data in Supabase Dashboard
CREATE POLICY "Allow service role reads" ON quiz_leads
  FOR SELECT
  TO service_role
  USING (true);

-- Optional: Allow authenticated users to read their own data
-- Uncomment if you want users to see their own quiz results
-- CREATE POLICY "Users can read own data" ON quiz_leads
--   FOR SELECT
--   TO authenticated
--   USING (auth.uid()::text = email);

-- ============================================
-- Verification
-- ============================================
-- After running this, you can verify with:
-- SELECT * FROM pg_policies WHERE tablename = 'quiz_leads';
-- ============================================

