package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.models.BugReportRequest;
import com.atlantbh.test.reporter.models.TestRun;
import com.atlantbh.test.reporter.models.TestStep;
import com.atlantbh.test.reporter.repositories.TestStepRepository;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

import static com.atlantbh.test.reporter.utils.services.ServicesUtils.CREATED_AT_ASC_SORT;
import static com.atlantbh.test.reporter.utils.services.ServicesUtils.createPageRequest;

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
		final PageRequest pageRequest = createPageRequest(page, CREATED_AT_ASC_SORT);
		return testStepRepository.findByTestRunAndGroup(testRun, testGroup, pageRequest);
	}

	/**
	 * Updates test step
	 *
	 * @param testRunId Test run id.
	 * @param testStepId Test step id.
	 * @param updateTestStep Update test step model.
	 * @return Updated test step.
	 */
	public TestStep updateNotes(Long testRunId, Long testStepId, TestStep updateTestStep) throws ServiceException {
		final TestRun testRun = testRunService.get(testRunId);
		final TestStep testStep = testStepRepository.findByTestRunAndId(testRun, testStepId);
		if (testStep == null) {
			throw new ServiceException("Test step not found.");
		}

		testStep.setNotes(updateTestStep.getNotes());

		return testStepRepository.save(testStep);
	}

	/**
	 * Creates a test steps and saves it to db.
	 *
	 * @param testRun Test run.
	 * @param testStep Test step data.
	 * @return Saved test step.
	 */
	public TestStep create(TestRun testRun, TestStep testStep) {
		testStep.setCreatedAt(new Date());
		testStep.setUpdatedAt(new Date());
		testStep.setTestRun(testRun);
		return testStepRepository.save(testStep);
	}

	/**
	 * Updates bug report on test step.
	 *
	 * @param testRunId Test run id.
	 * @param testStepId Test step id.
	 * @param reportRequest Bug report request.
	 * @return Updated test step.
	 */
	public TestStep updateBugReport(Long testRunId, Long testStepId, BugReportRequest reportRequest)
			throws ServiceException {
		final TestRun testRun = testRunService.get(testRunId);
		final TestStep testStep = testStepRepository.findByTestRunAndId(testRun, testStepId);
		if (testStep == null) {
			throw new ServiceException("Test step not found.");
		}

		testStep.setBugUrl(reportRequest.getBugUrl());
		testStep.setBugTitle(reportRequest.getBugTitle());

		return testStepRepository.save(testStep);
	}
}
