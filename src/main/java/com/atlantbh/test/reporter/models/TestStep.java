package com.atlantbh.test.reporter.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
 * TestStep model.
 *
 * @author Kenan Klisura
 */
@Table(name = "test_cases")
@Entity
public class TestStep {
	@Id
	@GeneratedValue
	private Long id;

	@Column(name = "test_group")
	@Length(max = 255)
	private String group;

	@Length(max = 255)
	private String context;

	@Length(max = 255)
	private String description;

	@Column(name = "execution_result")
	@Length(max = 255)
	private String executionResult;

	private String exception;

	@Column(name = "pending_message")
	@Length(max = 255)
	private String pendingMessage;

	private Double duration;

	private String backtrace;

	private String metadata;

	@Column(name = "created_at")
	private Date createdAt;

	@Column(name = "updated_at")
	private Date updatedAt;

	@ManyToOne
	@JoinColumn(name = "test_runs_id")
	@JsonIgnore
	private TestRun testRun;

	@Column(name = "notes")
	private String notes;

	/**
	 * Instantiates a new Test case.
	 */
	public TestStep() {

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
	 * Gets test group.
	 *
	 * @return the test group
	 */
	public String getGroup() {
		return group;
	}

	/**
	 * Sets test group.
	 *
	 * @param group the test group
	 */
	public void setGroup(String group) {
		this.group = group;
	}

	/**
	 * Gets context.
	 *
	 * @return the context
	 */
	public String getContext() {
		return context;
	}

	/**
	 * Sets context.
	 *
	 * @param context the context
	 */
	public void setContext(String context) {
		this.context = context;
	}

	/**
	 * Gets description.
	 *
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * Sets description.
	 *
	 * @param description the description
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * Gets execution result.
	 *
	 * @return the execution result
	 */
	public String getExecutionResult() {
		return executionResult;
	}

	/**
	 * Sets execution result.
	 *
	 * @param executionResult the execution result
	 */
	public void setExecutionResult(String executionResult) {
		this.executionResult = executionResult;
	}

	/**
	 * Gets exception.
	 *
	 * @return the exception
	 */
	public String getException() {
		return exception;
	}

	/**
	 * Sets exception.
	 *
	 * @param exception the exception
	 */
	public void setException(String exception) {
		this.exception = exception;
	}

	/**
	 * Gets pending message.
	 *
	 * @return the pending message
	 */
	public String getPendingMessage() {
		return pendingMessage;
	}

	/**
	 * Sets pending message.
	 *
	 * @param pendingMessage the pending message
	 */
	public void setPendingMessage(String pendingMessage) {
		this.pendingMessage = pendingMessage;
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
	 * Gets backtrace.
	 *
	 * @return the backtrace
	 */
	public String getBacktrace() {
		return backtrace;
	}

	/**
	 * Sets backtrace.
	 *
	 * @param backtrace the backtrace
	 */
	public void setBacktrace(String backtrace) {
		this.backtrace = backtrace;
	}

	/**
	 * Gets metadata.
	 *
	 * @return the metadata
	 */
	public String getMetadata() {
		return metadata;
	}

	/**
	 * Sets metadata.
	 *
	 * @param metadata the metadata
	 */
	public void setMetadata(String metadata) {
		this.metadata = metadata;
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

	/**
	 * Gets notes.
	 *
	 * @return the notes
	 */
	public String getNotes() {
		return notes;
	}

	/**
	 * Sets notes.
	 *
	 * @param notes the notes
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}
}
