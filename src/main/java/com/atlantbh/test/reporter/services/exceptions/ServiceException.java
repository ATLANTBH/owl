package com.atlantbh.test.reporter.services.exceptions;

/**
 * Service exception class. Base exception class for all services.
 *
 * @author Kenan Klisura
 */
public class ServiceException extends Exception {
	/**
	 * Instantiates a new Service exception.
	 */
	public ServiceException() {
		super();
	}

	/**
	 * Instantiates a new Service exception.
	 *
	 * @param message the message
	 */
	public ServiceException(String message) {
		super(message);
	}

	/**
	 * Instantiates a new Service exception.
	 *
	 * @param message the message
	 * @param cause   the cause
	 */
	public ServiceException(String message, Throwable cause) {
		super(message, cause);
	}
}
