package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.models.TestSuite;
import com.atlantbh.test.reporter.models.suite.TestSuiteStatistics;
import com.atlantbh.test.reporter.repositories.TestSuiteRepository;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;

import static com.atlantbh.test.reporter.utils.services.ServicesUtils.CREATED_AT_DESC_SORT;
import static com.atlantbh.test.reporter.utils.services.ServicesUtils.createPageRequest;

/**
 * TestSuite service. All test suite related domain operations are defined here.
 *
 * @author Kenan Klisura
 */
@Service
public class TestSuiteService {
	/**
	 * Number of top items in statistics.
	 */
	private static final int STATISTICS_TOP_COUNT = 10;

	private TestSuiteRepository testSuiteRepository;

	/**
	 * Returns a suite given name.
	 * @param suiteName Suite name.
	 * @return Test suite.
	 */
	public TestSuite getByName(String suiteName) {
		return testSuiteRepository.findBySuite(suiteName);
	}

	/**
	 * Sets test suite repository.
	 *
	 * @param testSuiteRepository the test suite repository
	 */
	@Autowired
	public void setTestSuiteRepository(TestSuiteRepository testSuiteRepository) {
		this.testSuiteRepository = testSuiteRepository;
	}

	/**
	 * Returns test suite given its id.
	 * @param id Test suite id.
	 * @return Test suite
	 * @throws ServiceException If test suite is not found.
	 */
	private TestSuite get(Long id) throws ServiceException {
		TestSuite testSuite = testSuiteRepository.findOne(id);
		if (testSuite != null) {
			return testSuite;
		}

		throw new ServiceException("Failed getting test suite.");
	}

	/**
	 * Returns paginated list of test suites.
	 *
	 * @param page Spring pageable object.
	 * @return Paginated list of test suites.
	 */
	public Page<TestSuite> getTestSuites(Pageable page) {
		final PageRequest pageRequest = createPageRequest(page, CREATED_AT_DESC_SORT);
		return testSuiteRepository.findAll(pageRequest);
	}

	/**
	 * Returns statistics per build for specified test suite.
	 *
	 * @param testSuiteId Test suite.
	 * @return Statistics list for test suite.
	 * @throws ServiceException If test suite is not found.
	 */
	public Collection<TestSuiteStatistics> getStatistics(Long testSuiteId) throws ServiceException {
		final TestSuite testSuite = get(testSuiteId);
		List<TestSuiteStatistics> statistics = testSuiteRepository.getStatistics(testSuite.getId(), STATISTICS_TOP_COUNT);
		Collections.reverse(statistics);
		return statistics;
	}

	/**
	 * Creates a test suite.
	 *
	 * @param testSuite Test suite data.
	 * @return Created test suite.
	 */
	public TestSuite create(TestSuite testSuite) {
		testSuite.setCreatedAt(new Date());
		testSuite.setUpdatedAt(new Date());
		return testSuiteRepository.save(testSuite);
	}

	/**
	 * Updates a test suite.
	 *
	 * @param testSuiteId  Test suite id.
	 * @param updateTestSuite Test suite data.
	 * @return Updated test suite.
	 */
	public TestSuite update(Long testSuiteId, TestSuite updateTestSuite) throws ServiceException {
		TestSuite testSuite = get(testSuiteId);

		testSuite.setSuite(updateTestSuite.getSuite());
		testSuite.setUpdatedAt(new Date());

		return testSuiteRepository.save(testSuite);
	}
}
