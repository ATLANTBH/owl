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
	private static final int RETRY_ATTEMPTS = 12;
	private static final long RETRY_DELAY = 5000;

	private DataSource delegate;

	public RetriableDataSource(DataSource delegate) {
		this.delegate = delegate;
	}

	@Override
	@Retryable(maxAttempts = RETRY_ATTEMPTS, backoff = @Backoff(value = RETRY_DELAY))
	public Connection getConnection() throws SQLException {
		return delegate.getConnection();
	}

	@Override
	@Retryable(maxAttempts = RETRY_ATTEMPTS, backoff = @Backoff(value = RETRY_DELAY))
	public Connection getConnection(String username, String password)
			throws SQLException {
		return delegate.getConnection(username, password);
	}
}

