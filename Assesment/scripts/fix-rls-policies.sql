-- ============================================
-- Fix RLS Policies for quiz_leads table
-- ============================================
-- This version explicitly sets permissions for the anon role
-- Run this in Supabase SQL Editor
-- ============================================

-- First, let's drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.quiz_leads;
DROP POLICY IF EXISTS "Allow service role reads" ON public.quiz_leads;
DROP POLICY IF EXISTS "Users can read own data" ON public.quiz_leads;

-- Ensure RLS is enabled
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous inserts - EXPLICIT version
-- This allows anyone using the anon key to insert data
CREATE POLICY "Allow anonymous inserts" 
ON public.quiz_leads
FOR INSERT
TO public, anon
WITH CHECK (true);

-- Alternative: If the above doesn't work, try this more permissive version
-- (Uncomment if needed, but comment out the policy above first)
-- CREATE POLICY "Allow anonymous inserts" 
-- ON public.quiz_leads
-- FOR INSERT
-- WITH CHECK (true);

-- Allow service role to read all (for dashboard)
CREATE POLICY "Allow service role reads" 
ON public.quiz_leads
FOR SELECT
TO service_role
USING (true);

-- Also allow anon to select (in case you want to read back what was inserted)
-- CREATE POLICY "Allow anonymous reads" 
-- ON public.quiz_leads
-- FOR SELECT
-- TO public, anon
-- USING (true);

-- ============================================
-- Verification Query
-- ============================================
-- After running this, verify with:
-- SELECT * FROM pg_policies WHERE tablename = 'quiz_leads';
-- ============================================

