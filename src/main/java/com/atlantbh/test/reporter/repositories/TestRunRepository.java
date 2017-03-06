package com.atlantbh.test.reporter.repositories;

import com.atlantbh.test.reporter.models.TestRun;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * TestRun related database operations are defined here.
 *
 * @author Kenan Klisura
 */
public interface TestRunRepository extends PagingAndSortingRepository<TestRun, Long>,
		JpaSpecificationExecutor<TestRun> {
}
