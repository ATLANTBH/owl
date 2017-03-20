package com.atlantbh.test.reporter.controllers;

import com.atlantbh.test.reporter.models.TestSuite;
import com.atlantbh.test.reporter.models.suite.TestSuiteStatistics;
import com.atlantbh.test.reporter.services.TestSuiteService;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

/**
 * Test Case controller. All test suite related APIs entries are here.
 *
 * @author Kenan Klisura
 */
@RestController
@RequestMapping(value = "/api/v1/test-suites")
public class TestSuiteController {
	private TestSuiteService testSuiteService;

	/**
	 * Sets test suite service.
	 *
	 * @param testSuiteService the test suite service
	 */
	@Autowired
	public void setTestSuiteService(TestSuiteService testSuiteService) {
		this.testSuiteService = testSuiteService;
	}

	/**
	 * API: GET /api/v1/test-suites
	 * <p>
	 * Returns paginated list of all test suites.
	 */
	@RequestMapping(method = RequestMethod.GET)
	public Page<TestSuite> getTestSuites(Pageable page) {
		return testSuiteService.getTestSuites(page);
	}

	/**
	 * API: GET /api/v1/test-suites/statistics?suite={TEST_SUITE_NAME}
	 * <p>
	 * Returns paginated result of all test cases for given test run. Pagination is controlled via size and page query
	 * parameters.
	 *
	 */
	@RequestMapping(value = "/{testSuiteId}/statistics", method = RequestMethod.GET)
	public Collection<TestSuiteStatistics> getStatistics(@PathVariable("testSuiteId") Long testSuiteId, Pageable page)
			throws ServiceException {
		return testSuiteService.getStatistics(testSuiteId);
	}

	/**
	 * API: POST /api/v1/test-suites
	 *
	 * Creates test suite
	 *
	 * @param testSuite Test suite.
	 * @return Created test suite.
	 */
	@RequestMapping(method = RequestMethod.POST)
	public TestSuite createTestSuite(@RequestBody TestSuite testSuite) {
		return testSuiteService.create(testSuite);
	}

	/**
	 * API: GET /api/v1/test-suites/:testSuiteName
	 *
	 * Gets test suite
	 *
	 * @return Get test suite.
	 * @throws ServiceException If test suite is not found.
	 */
	@RequestMapping(value = "/{testSuiteName}", method = RequestMethod.POST)
	public TestSuite getTestSuite(@PathVariable("testSuiteName") String value) throws ServiceException {
		return testSuiteService.getByName(value);
	}
}
