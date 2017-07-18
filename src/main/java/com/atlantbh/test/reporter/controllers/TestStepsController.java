package com.atlantbh.test.reporter.controllers;

import com.atlantbh.test.reporter.models.BugReportRequest;
import com.atlantbh.test.reporter.models.TestStep;
import com.atlantbh.test.reporter.services.TestStepService;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Test Steps controller. All test steps related APIs entries are here.
 *
 * @author Kenan Klisura
 */
@RestController
@RequestMapping(value = "/api/v1/test-runs/{testRunId}/test-steps")
public class TestStepsController {
	private TestStepService testStepService;

	/**
	 * Sets test step service.
	 *
	 * @param testStepService the test step service
	 */
	@Autowired
	public void setTestStepService(TestStepService testStepService) {
		this.testStepService = testStepService;
	}

	/**
	 * API: GET /api/v1/test-runs/{TEST_RUN_ID}/test-steps?group={TEST_GROUP_NAME}
	 *
	 * Returns paginated result of all test steps for given test run and test group name. Pagination is controlled
	 * via size and page object.
	 *
	 * @param testRunId The test run id.
	 * @param group     Group name.
	 * @param page      Spring page object.
	 * @return Paginated result of all test steps for given test run and test group name.
	 * @throws ServiceException If test run is not found.
	 */
	@RequestMapping(method = RequestMethod.GET)
	public Page<TestStep> getTestSteps(@PathVariable("testRunId") Long testRunId, @RequestParam("group") String group,
									   Pageable page)
			throws ServiceException {
		return testStepService.getTestSteps(testRunId, group, page);
	}

	/**
	 * API: PUT /api/v1/test-runs/{TEST_RUN_ID}/test-steps/{TEST_STEP_ID}/notes
	 *
	 * Updates test step notes.
	 *
	 * @param testRunId Test run id.
	 * @param testStepId Test step id.
	 * @param testStep Test step data.
	 * @return Updated test step.
	 * @throws ServiceException If updating fails.
	 */
	@RequestMapping(value = "/{testStepId}/notes", method = RequestMethod.PUT)
	public TestStep updateTestStepNotes(@PathVariable("testRunId") Long testRunId,
										@PathVariable("testStepId") Long testStepId, @RequestBody TestStep testStep)
			throws ServiceException {
		return testStepService.updateNotes(testRunId, testStepId, testStep);
	}

	/**
	 * API: PUT /api/v1/test-runs/{TEST_RUN_ID}/test-steps/{TEST_STEP_ID}/bug-report
	 *
	 * Updates test step.
	 *
	 * @param testRunId Test run id.
	 * @param testStepId Test step id.
	 * @param reportRequest Bug report request.
	 * @return Updated test step.
	 * @throws ServiceException If updating fails.
	 */
	@RequestMapping(value = "/{testStepId}/bug-report", method = RequestMethod.PUT)
	public TestStep updateBugReport(@PathVariable("testRunId") Long testRunId,
									@PathVariable("testStepId") Long testStepId,
									@RequestBody BugReportRequest reportRequest)
			throws ServiceException {
		return testStepService.updateBugReport(testRunId, testStepId, reportRequest);
	}
}
