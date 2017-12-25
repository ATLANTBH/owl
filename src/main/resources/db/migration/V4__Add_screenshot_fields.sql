
-- Add bug_id column
SELECT f_add_col('public.test_cases', 'screenshot_path', 'VARCHAR(255)');
SELECT f_add_col('public.test_cases', 'screenshot_url', 'VARCHAR(255)');