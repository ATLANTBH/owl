package com.atlantbh.test.reporter.filters;

/**
 * TestRunFilter wraps filter query params.
 * <p>
 * Supported filter/query params are:
 * - build - filters test runs by given build name.
 *
 * @author Kenan Klisura
 */
public class TestRunFilter {
	private String build;
	private Long testSuite;

	/**
	 * Gets testSuite.
	 *
	 * @return the testSuite
	 */
	public Long getTestSuite() {
		return testSuite;
	}

	/**
	 * Sets testSuite.
	 *
	 * @param testSuite the testSuite
	 */
	public void setTestSuite(Long testSuite) {
		this.testSuite = testSuite;
	}

	/**
	 * Gets build.
	 *
	 * @return the build
	 */
	public String getBuild() {
		return build;
	}

	/**
	 * Sets build.
	 *
	 * @param build the build
	 */
	public void setBuild(String build) {
		this.build = build;
	}
}
