package com.atlantbh.test.reporter.repositories;

import com.atlantbh.test.reporter.models.TestCase;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * TestCase related database operations are defined here.
 *
 * @author Kenan Klisura
 */
public interface TestCaseRepository extends PagingAndSortingRepository<TestCase, Long>, JpaSpecificationExecutor {
	/**
	 * Groups test_cases entries by test group.
	 */
	String GROUP_TEST_CASES_QUERY = "SELECT test_group,\n" +
		"  COUNT(execution_result) AS \"test_step_count\",\n" +
		"  SUM((execution_result = 'passed')\\:\\:INTEGER) AS \"steps_passed\",\n" +
		"  SUM((execution_result = 'failed')\\:\\:INTEGER) AS \"steps_failed\",\n" +
		"  SUM((execution_result = 'pending')\\:\\:INTEGER) AS \"steps_pending\",\n" +
		"  SUM(duration) AS \"duration\",\n" +
		"  :testRunId AS \"test_runs_id\"\n" +
		"FROM test_cases\n" +
		"WHERE test_runs_id = :testRunId\n" +
		"GROUP BY test_group\n" +
		"OFFSET ?#{ #pageable.offset * #pageable.pageSize }\n";

	/**
	 * Count query for grouping test_cases entries.
	 */
	String COUNT_GROUP_TEST_CASES_QUERY = "SELECT COUNT(*)\n" +
			"FROM test_cases\n" +
			"WHERE test_runs_id = :testRunId\n" +
			"GROUP BY test_group\n";

	/**
	 * Finds all test cases on specific test run.
	 *
	 * @param testRunId The test run id
	 * @param pageable  Spring pageable object.
	 * @return Paginated response of all test cases for specific test run.
	 */
	@Query(value = GROUP_TEST_CASES_QUERY, countQuery = COUNT_GROUP_TEST_CASES_QUERY, nativeQuery = true)
	Page<TestCase> findByTestRunId(@Param("testRunId") Long testRunId, Pageable pageable);
}
