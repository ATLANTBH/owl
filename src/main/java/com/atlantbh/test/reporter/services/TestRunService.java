package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.filters.TestRunFilter;
import com.atlantbh.test.reporter.filters.specifications.TestRunFilterSpecification;
import com.atlantbh.test.reporter.models.TestRun;
import com.atlantbh.test.reporter.repositories.TestRunRepository;
import com.atlantbh.test.reporter.services.exceptions.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;

import static com.atlantbh.test.reporter.utils.services.ServicesUtils.CREATED_AT_DESC_SORT;
import static com.atlantbh.test.reporter.utils.services.ServicesUtils.createPageRequest;

/**
 * TestRun service. All test run related domain operations are defined here.
 *
 * @author Kenan Klisura
 */
@Service
public class TestRunService {
	private TestRunRepository testRunRepository;

	/**
	 * Sets test run repository.
	 *
	 * @param testRunRepository the test run repository
	 */
	@Autowired
	public void setTestRunRepository(TestRunRepository testRunRepository) {
		this.testRunRepository = testRunRepository;
	}

	/**
	 * Returns paginated list of all test runs for given filter and pageable object.
	 *
	 * @param filter TestRunFilter filter.
	 * @param page 	Spring pageable object.
	 * @return Paginated list of all test runs.
	 */
	public Page<TestRun> getAllTestRuns(TestRunFilter filter, Pageable page) {
		final PageRequest pageRequest = createPageRequest(page, CREATED_AT_DESC_SORT);
		return testRunRepository.findAll(new TestRunFilterSpecification(filter), pageRequest);
	}

	/**
	 * Returns single test run.
	 *
	 * @param id Id of test run
	 * @return Test run.
	 * @throws ServiceException If test run is not found.
	 */
	public TestRun get(Long id) throws ServiceException {
		TestRun testRun = testRunRepository.findOne(id);
		if (testRun != null) {
			return testRun;
		}

		throw new ServiceException("Test run not found.");
	}

	/**
	 * Creates a test run.
	 *
	 * @return Test run.
	 */
	public TestRun create(TestRun testRun) {
		testRun.setExampleCount(Optional.ofNullable(testRun.getExampleCount()).orElse(0));
		testRun.setPendingCount(Optional.ofNullable(testRun.getPendingCount()).orElse(0));
		testRun.setFailureCount(Optional.ofNullable(testRun.getFailureCount()).orElse(0));
		testRun.setDuration(Optional.ofNullable(testRun.getDuration()).orElse(0D));

		testRun.setCreatedAt(new Date());
		testRun.setUpdatedAt(new Date());
		return testRunRepository.save(testRun);
	}

	/**
	 * Updates count some test run.
	 * @param id Test run id.
	 * @param totalCases Count of total cases.
	 * @param failedCases Count of failed cases.
	 * @param duration Duration.
	 */
	public void updateCounts(Long id, int totalCases, int failedCases, float duration) {
		testRunRepository.updateCounts(id, totalCases, failedCases, (double) duration);
	}

	/**
	 * Returns list of distinct build strings.
	 *
	 * @param filterQuery Filter query.
	 * @return List of distinct build strings.
	 */
	public Collection<String> getDistinctBuilds(String filterQuery) {
		Sort.Order buildOrder = new Sort.Order(Sort.Direction.ASC, "build");
		return testRunRepository.getDistinctBuilds(filterQuery,
				new PageRequest(0, 10, new Sort(buildOrder))).getContent();
	}

	/**
	 * Returns list of distinct git branch information.
	 *
	 * @param filterQuery Filter query.
	 * @return List of distinct branches/hashes.
	 */
	public Collection<String> getDistinctGitBranch(String filterQuery) {
		return testRunRepository.getDistinctGitBranch(Optional.ofNullable(filterQuery).orElse("").toLowerCase());
	}
}
