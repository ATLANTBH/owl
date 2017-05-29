package com.atlantbh.test.reporter.controllers;

import com.atlantbh.test.reporter.filters.TestRunFilter;
import com.atlantbh.test.reporter.models.TestRun;
import com.atlantbh.test.reporter.services.TestRunService;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.Collection;

/**
 * Test Run controller. All test run related APIs entries are here.
 *
 * @author Kenan Klisura
 */
@RestController
@RequestMapping(value = "/api/v1/test-runs")
public class TestRunsController {
	private TestRunService testRunService;

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
	 * API: GET /api/v1/test-runs
	 *
	 * Returns paginated result of all test runs. Pagination is controlled via size and page query params.
	 *
	 * @param page    Spring page object.
	 * @param filter Filter object passed by query params.
	 * @return Paginated result of all test runs.
	 */
	@RequestMapping(method = RequestMethod.GET)
	public Page<TestRun> getAllTestRuns(Pageable page, TestRunFilter filter) {
		return testRunService.getAllTestRuns(filter, page);
	}

	/**
	 * API: GET /api/v1/test-runs/:testRunId
	 *
	 * Returns a test run for specified testRunId.
	 *
	 * @param id Id of test run to get.
	 * @return Test run.
	 * @throws ServiceException If test run not found.
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public TestRun getTestRun(@PathVariable("id") Long id) throws ServiceException {
		return testRunService.get(id);
	}

	/**
	 * API: POST /api/v1/test-runs
	 *
	 * Create a test run.
	 *
	 * @return Test run.
	 */
	@RequestMapping(method = RequestMethod.POST)
	public TestRun createTestRun(@RequestBody TestRun testRun) throws ServiceException {
		return testRunService.create(testRun);
	}

	/**
	 * API: GET /api/v1/test-runs/distinct-builds
	 *
	 * Gets a list of distinct builds.
	 *
	 * @return Test run.
	 */
	@RequestMapping(method = RequestMethod.GET, value = "/distinct-builds")
	public Collection<String> getDistinctBuilds(@PathParam("query") String query) throws ServiceException {
		return testRunService.getDistinctBuilds(query);
	}
}
