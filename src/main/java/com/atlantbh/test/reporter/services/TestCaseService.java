package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.models.TestCase;
import com.atlantbh.test.reporter.models.TestRun;
import com.atlantbh.test.reporter.models.TestStep;
import com.atlantbh.test.reporter.parser.junit.JunitXmlReportParser;
import com.atlantbh.test.reporter.parser.junit.exception.ParseException;
import com.atlantbh.test.reporter.repositories.TestCaseRepository;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Collections;

import static com.atlantbh.test.reporter.models.TestStep.EXECUTION_RESULT_FAILURE;
import static com.atlantbh.test.reporter.models.TestStep.EXECUTION_RESULT_SUCCESS;
import static com.atlantbh.test.reporter.utils.services.ServicesUtils.createPageRequest;

/**
 * TestCase service. All test case domain operations are defined here.
 *
 * @author Kenan Klisura
 */
@Service
public class TestCaseService {
	private static final String TEST_GROUP_SORT_PROPERTY = "test_group";
	private static final String SUCCESS_RATE_SORT_PROPERTY = "success_rate";
	private static final Sort DEFAULT_SORT = new Sort(new Sort.Order(Sort.Direction.ASC, SUCCESS_RATE_SORT_PROPERTY))
			.and(new Sort(new Sort.Order(Sort.Direction.ASC, TEST_GROUP_SORT_PROPERTY)));

	private TestRunService testRunService;
	private TestCaseRepository testCaseRepository;
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
		final PageRequest pageRequest = createPageRequest(page, DEFAULT_SORT, Collections.singletonList(TEST_GROUP_SORT_PROPERTY));
		return testCaseRepository.findByTestRunId(testRun.getId(), pageRequest);
	}

	/**
	 * Creates a test cases and test steps from junit xml test report.
	 *
	 * @param testRunId Test run id.
	 * @param inputStream  Test report input stream.
	 * @throws ServiceException the service exception
	 */
	public void createTestCaseFromJunitXmlReport(Long testRunId, InputStream inputStream) throws ServiceException {
		TestRun testRun = testRunService.get(testRunId);
		try {
			JunitXmlReportParser.TestSuites junitTestSuites = JunitXmlReportParser.parse(inputStream);
			for (JunitXmlReportParser.TestSuite junitTestSuite :junitTestSuites.getTestSuiteList()) {
				if (junitTestSuite != null) {
					junitTestSuite.getTestCaseList()
							.forEach(junitTestCase -> {
								TestStep testStep = createTestStep(junitTestSuite, junitTestCase);
								testStepService.create(testRun, testStep);
							});

					int totalCases = junitTestSuite.getTestCaseList().size();
					int failedCases = (int) junitTestSuite.getTestCaseList()
							.stream()
							.filter(JunitXmlReportParser.TestSuite.TestCase::isFailed)
							.count();

					float duration = junitTestSuite.getTestCaseList()
							.stream()
							.map(JunitXmlReportParser.TestSuite.TestCase::getTime)
							.reduce(0f, (previous, time) -> previous + time);

					testRunService.updateCounts(testRun.getId(), totalCases, failedCases, duration);
				}
			}
		} catch (ParseException e) {
			throw new ServiceException(e.getMessage(), e);
		}
	}

	/**
	 * Create test step test step.
	 *
	 * @param testSuite the test suite
	 * @param testCase  the test case
	 * @return the test step
	 */
	public static TestStep createTestStep(JunitXmlReportParser.TestSuite testSuite,
										  JunitXmlReportParser.TestSuite.TestCase testCase) {
		TestStep result = new TestStep();

		result.setGroup(testSuite.getName());
		result.setContext(testCase.getName());
		result.setExecutionResult(testCase.isFailed() ? EXECUTION_RESULT_FAILURE : EXECUTION_RESULT_SUCCESS);
		result.setException(testCase.getFailureReason());
		result.setDuration((double) testCase.getTime());

		return result;
	}
}
