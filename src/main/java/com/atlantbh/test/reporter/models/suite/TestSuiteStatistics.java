package com.atlantbh.test.reporter.models.suite;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Statistics per build on test suite.
 *
 * @author Kenan Klisura
 */
@Entity
public class TestSuiteStatistics {
	@Id
	private String build;

	@Column(name = "total_cases_count")
	private Long totalCasesCount;

	@Column(name = "failed_cases_count")
	private Long failedCasesCount;

	@Column(name = "pending_cases_count")
	private Long pendingCasesCount;

	private Float duration ;

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

	/**
	 * Gets passed cases count.
	 *
	 * @return the passed cases count
	 */
	public Long getTotalCasesCount() {
		return totalCasesCount;
	}

	/**
	 * Sets passed cases count.
	 *
	 * @param totalCasesCount the passed cases count
	 */
	public void setTotalCasesCount(Long totalCasesCount) {
		this.totalCasesCount = totalCasesCount;
	}

	/**
	 * Gets failed cases count.
	 *
	 * @return the failed cases count
	 */
	public Long getFailedCasesCount() {
		return failedCasesCount;
	}

	/**
	 * Sets failed cases count.
	 *
	 * @param failedCasesCount the failed cases count
	 */
	public void setFailedCasesCount(Long failedCasesCount) {
		this.failedCasesCount = failedCasesCount;
	}

	/**
	 * Gets pending cases count.
	 *
	 * @return the pending cases count
	 */
	public Long getPendingCasesCount() {
		return pendingCasesCount;
	}

	/**
	 * Sets pending cases count.
	 *
	 * @param pendingCasesCount the pending cases count
	 */
	public void setPendingCasesCount(Long pendingCasesCount) {
		this.pendingCasesCount = pendingCasesCount;
	}

	/**
	 * Gets duration.
	 *
	 * @return the duration
	 */
	public Float getDuration() {
		return duration;
	}

	/**
	 * Sets duration.
	 *
	 * @param duration the duration
	 */
	public void setDuration(Float duration) {
		this.duration = duration;
	}
}
