-- ============================================
-- Fix INSERT Policy - Make it specifically FOR INSERT only
-- ============================================
-- The current policy shows command='a' (all) instead of INSERT
-- This script creates a specific INSERT-only policy
-- ============================================

-- Drop all existing policies first
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.quiz_leads;
DROP POLICY IF EXISTS "Allow service role reads" ON public.quiz_leads;

-- Ensure RLS is enabled
ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

-- Create a specific INSERT policy (this should show command='INSERT' not 'a')
CREATE POLICY "Allow anonymous inserts" 
ON public.quiz_leads
FOR INSERT
WITH CHECK (true);

-- Allow service role to read all
CREATE POLICY "Allow service role reads" 
ON public.quiz_leads
FOR SELECT
TO service_role
USING (true);

-- Verify the policies were created correctly
SELECT 
    policyname,
    cmd as command,
    permissive,
    roles,
    qual as using_expression,
    with_check as with_check_expression
FROM pg_policies
WHERE schemaname = 'public' 
    AND tablename = 'quiz_leads'
ORDER BY policyname;

-- Note: If this still shows command='a', we may need to use a different approach
-- The issue might be that Supabase is interpreting FOR INSERT differently
-- In that case, we might need to disable RLS or use service_role key

