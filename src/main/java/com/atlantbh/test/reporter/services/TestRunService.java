package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.filters.TestRunFilter;
import com.atlantbh.test.reporter.filters.specifications.TestRunFilterSpecification;
import com.atlantbh.test.reporter.models.TestRun;
import com.atlantbh.test.reporter.repositories.TestRunRepository;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * TestRun service. All test run related domain operations are defined here.
 *
 * @author Kenan Klisura
 */
@Service
public class TestRunService {
	private TestRunRepository testRunRepository;

	/**
	 * Sets test run repository.
	 *
	 * @param testRunRepository the test run repository
	 */
	@Autowired
	public void setTestRunRepository(TestRunRepository testRunRepository) {
		this.testRunRepository = testRunRepository;
	}

	/**
	 * Returns paginated list of all test runs for given filter and pageable object.
	 *
	 * @param filter TestRunFilter filter.
	 * @param page 	Spring pageable object.
	 * @return Paginated list of all test runs.
	 */
	public Page<TestRun> getAllTestRuns(TestRunFilter filter, Pageable page) {
		return testRunRepository.findAll(new TestRunFilterSpecification(filter), page);
	}

	/**
	 * Returns single test run.
	 *
	 * @param id Id of test run
	 * @return Test run.
	 * @throws ServiceException If test run is not found.
	 */
	public TestRun get(Long id) throws ServiceException {
		TestRun testRun = testRunRepository.findOne(id);
		if (testRun != null) {
			return testRun;
		}

		throw new ServiceException("Test run not found.");
	}
}
