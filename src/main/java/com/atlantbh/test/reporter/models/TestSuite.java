package com.atlantbh.test.reporter.models;

import com.atlantbh.test.reporter.models.suite.TestSuiteStatistics;
import com.atlantbh.test.reporter.repositories.TestSuiteRepository;
import org.hibernate.annotations.NamedNativeQueries;
import org.hibernate.annotations.NamedNativeQuery;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.SqlResultSetMappings;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * TestSuite model.
 *
 * @author Kenan Klisura
 */
@SqlResultSetMappings(
		@SqlResultSetMapping(name="testSuiteStatistics",
				entities = {
					@EntityResult(entityClass = TestSuiteStatistics.class)
				}
		)
)
@NamedNativeQueries({
		@NamedNativeQuery(name = "TestSuite.getStatistics",
				query = TestSuiteRepository.STATISTICS_PER_BUILD_QUERY,
				resultSetMapping = "testSuiteStatistics")
})
@Table(name = "test_suites")
@Entity
public class TestSuite {
	@Id
	@GeneratedValue
	private Long id;

	@Length(max = 255)
	@NotNull
	private String suite;

	@Column(name = "created_at")
	private Date createdAt;

	@Column(name = "updated_at")
	private Date updatedAt;

	/**
	 * Instantiates a new Test suite.
	 */
	public TestSuite() {

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
	 * Gets suite.
	 *
	 * @return the suite
	 */
	public String getSuite() {
		return suite;
	}

	/**
	 * Sets suite.
	 *
	 * @param suite the suite
	 */
	public void setSuite(String suite) {
		this.suite = suite;
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
}
