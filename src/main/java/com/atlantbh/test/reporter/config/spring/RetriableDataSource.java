package com.atlantbh.test.reporter.config.spring;

import org.springframework.jdbc.datasource.AbstractDataSource;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

/**
 * Retriable data source.
 *
 * @author Kenan Klisura
 */
public class RetriableDataSource extends AbstractDataSource {
	private DataSource delegate;

	public RetriableDataSource(DataSource delegate) {
		this.delegate = delegate;
	}

	@Override
	@Retryable(maxAttempts = 10, backoff = @Backoff(multiplier = 2.3, maxDelay = 30000))
	public Connection getConnection() throws SQLException {
		return delegate.getConnection();
	}

	@Override
	@Retryable(maxAttempts = 10, backoff = @Backoff(multiplier = 2.3, maxDelay = 30000))
	public Connection getConnection(String username, String password)
			throws SQLException {
		return delegate.getConnection(username, password);
	}
}

