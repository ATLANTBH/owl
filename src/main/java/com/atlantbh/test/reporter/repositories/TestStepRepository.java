package com.atlantbh.test.reporter.repositories;

import com.atlantbh.test.reporter.models.TestRun;
import com.atlantbh.test.reporter.models.TestStep;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * TestStep related database operations are defined here.
 *
 * @author Kenan Klisura
 */
public interface TestStepRepository extends PagingAndSortingRepository<TestStep, Long>, JpaSpecificationExecutor {
	/**
	 * Finds test steps on specific test run and test group name.
	 *
	 * @param testRun  Test run.
	 * @param group    Test group name.
	 * @param pageable Spring pageable object.
	 * @return Paginated result of test steps.
	 */
	Page<TestStep> findByTestRunAndGroup(TestRun testRun, String group, Pageable pageable);
}
