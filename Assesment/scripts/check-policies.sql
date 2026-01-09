-- ============================================
-- Check RLS Policies for quiz_leads table
-- ============================================
-- Run this in Supabase SQL Editor to see what policies exist
-- ============================================

-- Check if RLS is enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' 
    AND tablename = 'quiz_leads';

-- List all policies on quiz_leads table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd as command,
    qual as using_expression,
    with_check
FROM pg_policies
WHERE schemaname = 'public' 
    AND tablename = 'quiz_leads'
ORDER BY policyname;

-- If no policies show up, try this alternative query
SELECT 
    pol.polname as policy_name,
    pol.polcmd as command,
    pol.polpermissive as permissive,
    pg_catalog.pg_get_expr(pol.polqual, pol.polrelid) as using_expression,
    pg_catalog.pg_get_expr(pol.polwithcheck, pol.polrelid) as with_check_expression
FROM pg_catalog.pg_policy pol
JOIN pg_catalog.pg_class cls ON pol.polrelid = cls.oid
WHERE cls.relname = 'quiz_leads'
    AND pol.polrelid IN (
        SELECT oid FROM pg_catalog.pg_class 
        WHERE relname = 'quiz_leads'
    );

