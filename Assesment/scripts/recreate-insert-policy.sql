-- ============================================
-- Recreate INSERT Policy with explicit configuration
-- ============================================
-- This will drop and recreate the insert policy with explicit settings
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop the existing policy
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.quiz_leads;

-- Create a new, explicit INSERT policy
-- This explicitly allows INSERT operations for the anon role
CREATE POLICY "Allow anonymous inserts" 
ON public.quiz_leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Verify the policy was created
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

-- ============================================
-- If the above still doesn't work, try this alternative:
-- ============================================
-- First drop the policy again, then:
--
-- CREATE POLICY "Allow anonymous inserts" 
-- ON public.quiz_leads
-- AS PERMISSIVE
-- FOR INSERT
-- TO public
-- WITH CHECK (true);
-- ============================================

