package com.atlantbh.test.reporter.services.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Service exception class. Base exception class for all services.
 *
 * @author Kenan Klisura
 */
@ResponseStatus(value = HttpStatus.BAD_REQUEST)
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
