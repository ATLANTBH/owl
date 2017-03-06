package com.atlantbh.test.reporter.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * TestCase model.
 *
 * @author Kenan Klisura
 */
@Entity
public class TestCase {
	@Id
	@Column(name = "test_group")
	private String group;

	@Column(name = "test_step_count")
	private Long stepCount;

	@Column(name = "steps_passed")
	private Long stepsPassed;

	@Column(name = "steps_failed")
	private Long stepsFailed;

	@Column(name = "steps_pending")
	private Long stepsPending;

	private Float duration;

	@ManyToOne
	@JoinColumn(name = "test_runs_id")
	@JsonIgnore
	private TestRun testRun;

	/**
	 * Gets group.
	 *
	 * @return the group
	 */
	public String getGroup() {
		return group;
	}

	/**
	 * Sets group.
	 *
	 * @param group the group
	 */
	public void setGroup(String group) {
		this.group = group;
	}

	/**
	 * Gets step count.
	 *
	 * @return the step count
	 */
	public Long getStepCount() {
		return stepCount;
	}

	/**
	 * Sets step count.
	 *
	 * @param stepCount the step count
	 */
	public void setStepCount(Long stepCount) {
		this.stepCount = stepCount;
	}

	/**
	 * Gets steps passed.
	 *
	 * @return the steps passed
	 */
	public Long getStepsPassed() {
		return stepsPassed;
	}

	/**
	 * Sets steps passed.
	 *
	 * @param stepsPassed the steps passed
	 */
	public void setStepsPassed(Long stepsPassed) {
		this.stepsPassed = stepsPassed;
	}

	/**
	 * Gets steps failed.
	 *
	 * @return the steps failed
	 */
	public Long getStepsFailed() {
		return stepsFailed;
	}

	/**
	 * Sets steps failed.
	 *
	 * @param stepsFailed the steps failed
	 */
	public void setStepsFailed(Long stepsFailed) {
		this.stepsFailed = stepsFailed;
	}

	/**
	 * Gets steps pending.
	 *
	 * @return the steps pending
	 */
	public Long getStepsPending() {
		return stepsPending;
	}

	/**
	 * Sets steps pending.
	 *
	 * @param stepsPending the steps pending
	 */
	public void setStepsPending(Long stepsPending) {
		this.stepsPending = stepsPending;
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

	/**
	 * Gets test run.
	 *
	 * @return the test run
	 */
	public TestRun getTestRun() {
		return testRun;
	}

	/**
	 * Sets test run.
	 *
	 * @param testRun the test run
	 */
	public void setTestRun(TestRun testRun) {
		this.testRun = testRun;
	}
}
