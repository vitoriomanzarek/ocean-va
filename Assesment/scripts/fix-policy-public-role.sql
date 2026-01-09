-- ============================================
-- Fix Policy with TO public (Alternative approach)
-- ============================================
-- Sometimes Supabase needs 'public' role instead of 'anon'
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.quiz_leads;

-- Create policy with TO public (this should work with anon key)
CREATE POLICY "Allow anonymous inserts" 
ON public.quiz_leads
AS PERMISSIVE
FOR INSERT
TO public
WITH CHECK (true);

-- Verify it was created correctly
SELECT 
    schemaname,
    tablename,
    policyname,
    cmd as command,
    roles,
    with_check
FROM pg_policies
WHERE schemaname = 'public' 
    AND tablename = 'quiz_leads'
    AND policyname = 'Allow anonymous inserts';

