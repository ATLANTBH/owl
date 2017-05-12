package com.atlantbh.test.reporter.parser.junit.exception;

/**
 * Junit xml report parse exception.
 *
 * @author Kenan Klisura
 */
public class ParseException extends Exception {
	/**
	 * Instantiates a new Parse exception.
	 *
	 * @param message the message
	 * @param cause   the cause
	 */
	public ParseException(String message, Throwable cause) {
		super(message, cause);
	}
}
