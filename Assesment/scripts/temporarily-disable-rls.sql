-- ============================================
-- Temporarily disable RLS to test if that's the issue
-- ============================================
-- CAUTION: This disables RLS for testing purposes only
-- Re-enable it after confirming the issue
-- ============================================

-- Disable RLS temporarily
ALTER TABLE public.quiz_leads DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' 
    AND tablename = 'quiz_leads';

-- If you need to re-enable it later, run:
-- ALTER TABLE public.quiz_leads ENABLE ROW LEVEL SECURITY;

