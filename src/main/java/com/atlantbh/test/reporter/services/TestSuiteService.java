package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.models.TestSuite;
import com.atlantbh.test.reporter.models.suite.TestSuiteStatistics;
import com.atlantbh.test.reporter.repositories.TestSuiteRepository;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

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
	 * @param pageable Spring pageable object.
	 * @return Paginated list of test suites.
	 */
	public Page<TestSuite> getTestSuites(Pageable pageable) {
		return testSuiteRepository.findAll(pageable);
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
}
