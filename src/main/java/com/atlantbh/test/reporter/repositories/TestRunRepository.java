package com.atlantbh.test.reporter.repositories;

import com.atlantbh.test.reporter.models.TestRun;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.List;

/**
 * TestRun related database operations are defined here.
 *
 * @author Kenan Klisura
 */
public interface TestRunRepository extends PagingAndSortingRepository<TestRun, Long>, JpaSpecificationExecutor<TestRun>
{
	String DISTINCT_GIT_BRANCH_QUERY = "SELECT tbl.col \n" +
			"FROM\n" +
			"  ((SELECT DISTINCT git_hash AS col \n" +
			"    FROM test_runs \n" +
			"    WHERE git_hash IS NOT NULL AND LOWER(git_hash) LIKE %:filterQuery% LIMIT 5)\n" +
			"  UNION (SELECT DISTINCT git_branch AS col \n" +
			"         FROM test_runs \n" +
			"         WHERE git_branch IS NOT NULL AND LOWER(git_branch) LIKE %:filterQuery% LIMIT 5)) AS tbl\n" +
			"ORDER BY LOWER(tbl.col) ASC";

	/**
	 * Updates counts of test run.
	 * @param id Test run id.
	 * @param totalCases Total test case count.
	 * @param failedCases Total failed test cases count.
	 */
	@Modifying
	@Transactional
	@Query("UPDATE TestRun tr SET tr.exampleCount = COALESCE(tr.exampleCount, 0) + :totalCases, " +
			"tr.failureCount = COALESCE(tr.failureCount, 0) + :failedCases, " +
			"tr.duration = COALESCE(tr.duration, 0) + :duration " +
			"WHERE tr.id = :id")
	void updateCounts(@Param("id")  Long id, @Param("totalCases") int totalCases, @Param("failedCases") int failedCases,
					  @Param("duration") double duration);

	/**
	 * Returns list of distinct builds from test runs.
	 * @param filterQuery Filter build string.
	 * @return List of distinct build strings.
	 */
	@Query("SELECT DISTINCT build FROM TestRun WHERE build LIKE %:filterQuery%")
	Slice<String> getDistinctBuilds(@Param("filterQuery") String filterQuery, Pageable pageable);

	/**
	 * Returns list of distinct builds from test runs.
	 * @param filterQuery Filter build string.
	 * @return List of distinct build strings.
	 */
	@Query(value = DISTINCT_GIT_BRANCH_QUERY, nativeQuery = true)
	List<String> getDistinctGitBranch(@Param("filterQuery") String filterQuery);
}
