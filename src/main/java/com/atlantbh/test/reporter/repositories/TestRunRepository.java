package com.atlantbh.test.reporter.repositories;

import com.atlantbh.test.reporter.models.TestRun;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

/**
 * TestRun related database operations are defined here.
 *
 * @author Kenan Klisura
 */
public interface TestRunRepository extends PagingAndSortingRepository<TestRun, Long>,
		JpaSpecificationExecutor<TestRun> {
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
					  @Param("duration ") float duration);
}
