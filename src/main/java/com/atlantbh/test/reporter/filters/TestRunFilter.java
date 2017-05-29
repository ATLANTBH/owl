package com.atlantbh.test.reporter.filters;

import com.atlantbh.test.reporter.utils.DataUtils;
import org.apache.commons.lang3.StringUtils;

import java.util.Arrays;
import java.util.List;

/**
 * TestRunFilter wraps filter query params.
 * <p>
 * Supported filter/query params are:
 * - build - filters test runs by given build name.
 *
 * @author Kenan Klisura
 */
public class TestRunFilter {
	private List<String> builds;
	private List<Long> testSuites;

	/**
	 * Gets testSuite.
	 *
	 * @return the testSuite
	 */
	public List<Long> getTestSuites() {
		return testSuites;
	}

	/**
	 * Sets testSuite.
	 *
	 * @param testSuite the testSuite
	 */
	public void setTestSuite(String testSuite) {
		this.testSuites = DataUtils.splitToLongList(testSuite);
	}

	/**
	 * Gets build.
	 *
	 * @return the build
	 */
	public List<String> getBuilds() {
		return builds;
	}

	/**
	 * Sets build.
	 *
	 * @param build the build
	 */
	public void setBuild(String build) {
		this.builds = Arrays.asList(StringUtils.split(build, ','));
	}
}
