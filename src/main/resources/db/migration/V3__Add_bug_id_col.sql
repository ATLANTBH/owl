
-- Add bug_id column
SELECT f_add_col('public.test_cases', 'bug_url', 'VARCHAR(255)');
SELECT f_add_col('public.test_cases', 'bug_title', 'VARCHAR(255)');
