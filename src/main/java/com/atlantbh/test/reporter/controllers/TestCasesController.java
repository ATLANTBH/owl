package com.atlantbh.test.reporter.controllers;

import com.atlantbh.test.reporter.models.TestCase;
import com.atlantbh.test.reporter.services.TestCaseService;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Test Case controller. All test case related APIs entries are here.
 *
 * @author Kenan Klisura
 */
@RestController
@RequestMapping(value = "/api/v1/test-runs/{testRunId}/test-cases")
public class TestCasesController {
	private TestCaseService testCaseService;

	/**
	 * Sets test case service.
	 *
	 * @param testCaseService the test case service
	 */
	@Autowired
	public void setTestCaseService(TestCaseService testCaseService) {
		this.testCaseService = testCaseService;
	}

	/**
	 * API: GET /api/v1/test-runs/{TEST_RUN_ID}/test-cases
	 *
	 * Returns paginated result of all test cases for given test run. Pagination is controlled via size and page query
	 * parameters.
	 *
	 * @param testRunId Test run id.
	 * @param page      Spring page object.
	 * @return Paginated result of test cases for given test run.
	 * @throws ServiceException If test run is not found.
	 */
	@RequestMapping(method = RequestMethod.GET)
	public Page<TestCase> getTestCases(@PathVariable("testRunId") Long testRunId, Pageable page)
			throws ServiceException {
		return testCaseService.getTestCases(testRunId, page);
	}
}
