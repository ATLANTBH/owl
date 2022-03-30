-- Add environment column to test_runs
SELECT f_add_col('public.test_runs', 'environment', 'VARCHAR(255)');
