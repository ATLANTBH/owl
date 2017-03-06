package com.atlantbh.test.reporter.controllers;

import com.atlantbh.test.reporter.models.TestStep;
import com.atlantbh.test.reporter.services.TestStepService;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
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
}
