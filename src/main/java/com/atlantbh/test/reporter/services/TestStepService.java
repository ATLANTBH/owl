package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.models.TestRun;
import com.atlantbh.test.reporter.models.TestStep;
import com.atlantbh.test.reporter.repositories.TestStepRepository;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * TestStep service. All test step related domain operations are defined here.
 *
 * @author Kenan Klisura
 */
@Service
public class TestStepService {
	private TestRunService testRunService;
	private TestStepRepository testStepRepository;

	/**
	 * Sets test step repository.
	 *
	 * @param testStepRepository the test step repository
	 */
	@Autowired
	public void setTestStepRepository(TestStepRepository testStepRepository) {
		this.testStepRepository = testStepRepository;
	}

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
	 * Returns paginated list of test steps for given test run id and test group name.
	 *
	 * @param testRunId Id of test run.
	 * @param testGroup Test group name.
	 * @param page      Spring pageable object.
	 * @return Paginated list of test steps.
	 * @throws ServiceException If test run is not found.
	 */
	public Page<TestStep> getTestSteps(Long testRunId, String testGroup, Pageable page) throws ServiceException {
		final TestRun testRun = testRunService.get(testRunId);
		return testStepRepository.findByTestRunAndGroup(testRun, testGroup, page);
	}
}
