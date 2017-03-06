package com.atlantbh.test.reporter.models;

import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Date;

/**
 * TestRun model.
 *
 * @author Kenan Klisura
 */
@Table(name = "test_runs")
@Entity
public class TestRun {
	@Id
	@GeneratedValue
	private Long id;

	private Double duration;

	@Column(name = "example_count")
	private Integer exampleCount;

	@Column(name = "failure_count")
	private Integer failureCount;

	@Column(name = "pending_count")
	private Integer pendingCount;

	@Length(max = 255)
	private String build;

	@Column(name = "computer_name")
	private String computerName;

	@Column(name = "created_at")
	private Date createdAt;

	@Column(name = "updated_at")
	private Date updatedAt;

	@ManyToOne
	@JoinColumn(name = "test_suites_id")
	private TestSuite testSuite;

	/**
	 * Instantiates a new Test run.
	 */
	public TestRun() {

	}

	/**
	 * Gets id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Sets id.
	 *
	 * @param id the id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets created at.
	 *
	 * @return the created at
	 */
	public Date getCreatedAt() {
		return createdAt;
	}

	/**
	 * Sets created at.
	 *
	 * @param createdAt the created at
	 */
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	/**
	 * Gets updated at.
	 *
	 * @return the updated at
	 */
	public Date getUpdatedAt() {
		return updatedAt;
	}

	/**
	 * Sets updated at.
	 *
	 * @param updatedAt the updated at
	 */
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	/**
	 * Gets duration.
	 *
	 * @return the duration
	 */
	public Double getDuration() {
		return duration;
	}

	/**
	 * Sets duration.
	 *
	 * @param duration the duration
	 */
	public void setDuration(Double duration) {
		this.duration = duration;
	}

	/**
	 * Gets example count.
	 *
	 * @return the example count
	 */
	public Integer getExampleCount() {
		return exampleCount;
	}

	/**
	 * Sets example count.
	 *
	 * @param exampleCount the example count
	 */
	public void setExampleCount(Integer exampleCount) {
		this.exampleCount = exampleCount;
	}

	/**
	 * Gets failure count.
	 *
	 * @return the failure count
	 */
	public Integer getFailureCount() {
		return failureCount;
	}

	/**
	 * Sets failure count.
	 *
	 * @param failureCount the failure count
	 */
	public void setFailureCount(Integer failureCount) {
		this.failureCount = failureCount;
	}

	/**
	 * Gets pending count.
	 *
	 * @return the pending count
	 */
	public Integer getPendingCount() {
		return pendingCount;
	}

	/**
	 * Sets pending count.
	 *
	 * @param pendingCount the pending count
	 */
	public void setPendingCount(Integer pendingCount) {
		this.pendingCount = pendingCount;
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

	/**
	 * Gets computer name.
	 *
	 * @return the computer name
	 */
	public String getComputerName() {
		return computerName;
	}

	/**
	 * Sets computer name.
	 *
	 * @param computerName the computer name
	 */
	public void setComputerName(String computerName) {
		this.computerName = computerName;
	}

	/**
	 * Gets test suite.
	 *
	 * @return the test suite
	 */
	public TestSuite getTestSuite() {
		return testSuite;
	}

	/**
	 * Sets test suite.
	 *
	 * @param testSuite the test suite
	 */
	public void setTestSuite(TestSuite testSuite) {
		this.testSuite = testSuite;
	}
}
