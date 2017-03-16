package com.atlantbh.test.reporter.repositories;

import com.atlantbh.test.reporter.models.TestSuite;
import com.atlantbh.test.reporter.models.suite.TestSuiteStatistics;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * TestSuite related database operations are defined here.
 *
 * @author Kenan Klisura
 */
public interface TestSuiteRepository extends PagingAndSortingRepository<TestSuite, Long> {
	String STATISTICS_PER_BUILD_QUERY = "WITH\n" +
			"    unique_builds AS (SELECT DISTINCT build\n" +
			"      FROM test_runs\n" +
			"      WHERE test_suites_id = :testSuiteId)\n" +
			"SELECT\n" +
			"  ub.build AS \"build\",\n" +
			"  tr.example_count AS \"total_cases_count\",\n" +
			"  tr.failure_count AS \"failed_cases_count\",\n" +
			"  tr.pending_count AS \"pending_cases_count\",\n" +
			"  tr.duration AS \"duration\",\n" +
			"  tr.created_at\n" +
			"FROM unique_builds ub, test_runs tr\n" +
			"WHERE\n" +
			"  ub.build = tr.build AND\n" +
			"  tr.id IN\n" +
			"    (SELECT id\n" +
			"     FROM test_runs\n" +
			"     WHERE build = tr.build AND test_suites_id = :testSuiteId\n" +
			"     ORDER BY created_at DESC\n" +
			"     LIMIT 1)\n" +
			"ORDER BY tr.created_at DESC\n" +
			"LIMIT :statisticsTopCount\n";

	List<TestSuiteStatistics> getStatistics(@Param("testSuiteId") Long testSuiteId,
											@Param("statisticsTopCount") int statisticsTopCount);

	/**
	 * Returns a suite given suite name.
	 * @param suiteName Suite name.
	 * @return Test suite.
	 */
	TestSuite findBySuite(String suiteName);
}
