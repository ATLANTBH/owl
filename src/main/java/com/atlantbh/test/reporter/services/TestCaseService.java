package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.models.TestCase;
import com.atlantbh.test.reporter.models.TestRun;
import com.atlantbh.test.reporter.repositories.TestCaseRepository;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * TestCase service. All test case domain operations are defined here.
 *
 * @author Kenan Klisura
 */
@Service
public class TestCaseService {
	private TestRunService testRunService;
	private TestCaseRepository testCaseRepository;

	/**
	 * Sets test run service.
	 *
	 * @param testRunService the test run service
	 */
	@Autowired
	public void setTestRunService(TestRunService testRunService) {
		this.testRunService = testRunService;
	}

	/**
	 * Sets test case repository.
	 *
	 * @param testCaseRepository the test case repository
	 */
	@Autowired
	public void setTestCaseRepository(TestCaseRepository testCaseRepository) {
		this.testCaseRepository = testCaseRepository;
	}

	/**
	 * Returns all paginated list of test cases for given test run id and pageable object.
	 *
	 * @param testRunId Test run id.
	 * @param page      Spring pageable object.
	 * @return Paginated result of test cases.
	 * @throws ServiceException If test run is not found.
	 */
	public Page<TestCase> getTestCases(Long testRunId, Pageable page) throws ServiceException {
		final TestRun testRun = testRunService.get(testRunId);
		return testCaseRepository.findByTestRunId(testRun.getId(), page);
	}
}
