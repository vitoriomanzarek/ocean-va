-- ============================================
-- Supabase Table Setup Script
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- Dashboard → SQL Editor → New Query → Paste this → Run
-- ============================================

-- Create quiz_leads table
CREATE TABLE IF NOT EXISTS quiz_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Info
  name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  industry TEXT,
  
  -- Scores
  operational_score NUMERIC(5,2) DEFAULT 0,
  intent_score NUMERIC(5,2) DEFAULT 0,
  urgency_score NUMERIC(5,2) DEFAULT 0,
  
  -- Profile
  profile TEXT DEFAULT 'D',
  profile_name TEXT,
  priority INTEGER DEFAULT 4,
  action TEXT,
  
  -- Savings
  current_cost NUMERIC(10,2) DEFAULT 0,
  va_cost NUMERIC(10,2) DEFAULT 0,
  monthly_savings NUMERIC(10,2) DEFAULT 0,
  annual_savings NUMERIC(10,2) DEFAULT 0,
  
  -- Answers (JSON)
  answers JSONB,
  
  -- Timestamp
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_quiz_leads_email ON quiz_leads(email);
CREATE INDEX IF NOT EXISTS idx_quiz_leads_profile ON quiz_leads(profile);
CREATE INDEX IF NOT EXISTS idx_quiz_leads_created_at ON quiz_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_leads_submitted_at ON quiz_leads(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_leads_priority ON quiz_leads(priority);

-- Enable Row Level Security (RLS)
ALTER TABLE quiz_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous inserts (for API)
CREATE POLICY "Allow anonymous inserts" ON quiz_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow service role to read all (for dashboard/admin)
CREATE POLICY "Allow service role reads" ON quiz_leads
  FOR SELECT
  TO service_role
  USING (true);

-- Policy: Allow authenticated users to read their own data (optional)
-- Uncomment if you want users to see their own quiz results
-- CREATE POLICY "Users can read own data" ON quiz_leads
--   FOR SELECT
--   TO authenticated
--   USING (auth.uid()::text = email);

-- ============================================
-- Verification Query
-- ============================================
-- Run this to verify the table was created:
-- SELECT table_name, column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'quiz_leads'
-- ORDER BY ordinal_position;
-- ============================================

