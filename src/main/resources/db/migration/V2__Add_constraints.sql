-- Add missing constraints

-- Clear test runs which do not have test suites
DELETE FROM test_runs
  WHERE test_suites_id IS NULL OR NOT EXISTS(SELECT * FROM test_suites WHERE id = test_suites_id);

-- Drop previous constraints
ALTER TABLE test_runs
  DROP CONSTRAINT IF EXISTS test_runs_test_suites_fk;

ALTER TABLE test_runs
  ADD CONSTRAINT test_runs_test_suites_fk
FOREIGN KEY (test_suites_id)
REFERENCES test_suites(id);

DROP INDEX IF EXISTS test_runs_test_suites_fk;
CREATE INDEX test_runs_test_suites_fk ON test_runs(test_suites_id);

-- Clear test cases which do not have test runs
DELETE FROM test_cases
  WHERE test_runs_id IS NULL OR NOT EXISTS(SELECT * FROM test_runs WHERE id = test_runs_id);

-- Drop previous constraints
ALTER TABLE test_cases
  DROP CONSTRAINT IF EXISTS test_cases_test_runs_fk;

ALTER TABLE test_cases
  ADD CONSTRAINT test_cases_test_runs_fk
FOREIGN KEY (test_runs_id)
REFERENCES test_runs(id);

DROP INDEX IF EXISTS test_cases_test_runs_idx;
CREATE INDEX test_cases_test_runs_idx ON test_cases(test_runs_id);

-- Create index on build number column in test runs
DROP INDEX IF EXISTS test_runs_build_number_idx;
CREATE INDEX test_runs_build_number_idx ON test_runs(build);

-- Create index on build number column in test runs
DROP INDEX IF EXISTS test_cases_test_group_idx;
CREATE INDEX test_cases_test_group_idx ON test_cases(test_group);

-- Add helper function
CREATE OR REPLACE function f_add_col(_tbl regclass, _col  text, _type regtype)
  RETURNS bool AS
$func$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_attribute
  WHERE  attrelid = _tbl
         AND    attname = _col
         AND    NOT attisdropped) THEN
    RETURN FALSE;
  ELSE
    EXECUTE format('ALTER TABLE %s ADD COLUMN %I %s', _tbl, _col, _type);
    RETURN TRUE;
  END IF;
END
$func$  LANGUAGE plpgsql;

-- Add git info columns
SELECT f_add_col('public.test_runs', 'git_hash', 'VARCHAR(255)');
SELECT f_add_col('public.test_runs', 'git_branch', 'VARCHAR(255)');

SELECT f_add_col('public.test_cases', 'notes', 'TEXT');

ALTER TABLE test_suites DROP CONSTRAINT IF EXISTS test_suites_suite_uq;
ALTER TABLE test_suites ADD CONSTRAINT test_suites_suite_uq UNIQUE (suite);
