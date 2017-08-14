package com.atlantbh.test.reporter.parser.junit;

import com.atlantbh.test.reporter.parser.junit.exception.ParseException;
import org.apache.commons.lang3.StringUtils;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;

import javax.annotation.Nullable;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

/**
 * Parses junit xml report files.
 *
 * @author Kenan Klisura
 */
public class JunitXmlReportParser {

	private JunitXmlReportParser() {
		// Empty ctor.
	}

	/**
	 * Parse junit xml test report files.
	 *
	 * @param inputStream input stream
	 * @return the test suite
	 * @throws ParseException the parse exception
	 */
	@Nullable
	public static TestSuite parse(InputStream inputStream) throws ParseException {
		SAXParserFactory factory = SAXParserFactory.newInstance();
		SAXParser saxParser = null;
		try {
			saxParser = factory.newSAXParser();
		} catch (ParserConfigurationException | SAXException e) {
			throw new ParseException("Failed creating parser.", e);
		}

		try {
			JunitXmlReportHandler handler = new JunitXmlReportHandler();
			saxParser.parse(inputStream, handler);
			return handler.getTestSuite();
		} catch (SAXException e) {
			throw new ParseException(e.getMessage(), e);
		} catch (IOException e) {
			throw new ParseException("Failed parsing junit xml report.", e);
		}
	}

	private static class JunitXmlReportHandler extends DefaultHandler {
		private static final String TEST_SUITE_TAG = "testsuite";
		private static final String TEST_CASE_TAG = "testcase";
		private static final String TEST_CASE_FAILURE_TAG = "failure";
		private static final String SKIPPED_TAG = "skipped";

		private static final String NAME_ATTRIBUTE = "name";
		private static final String TESTS_ATTRIBUTE = "tests";
		private static final String ERRORS_ATTRIBUTE = "errors";
		private static final String FAILURES_ATTRIBUTE = "failures";
		private static final String TIME_ATTRIBUTE = "time";

		private static final String CLASS_NAME_ATTRIBUTE = "classname";

		private TestSuite testSuite;
		private TestSuite.TestCase currentTestCase;
		private boolean inFailureBlock = false;

		@Override
		public void characters(char[] ch, int start, int length) throws SAXException {
			if (inFailureBlock) {
				currentTestCase.failureReason = new String(ch, start, length);
			}
		}

		@Override
		public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {
			if (SKIPPED_TAG.equals(qName)) {
				if (currentTestCase != null) {
					testSuite.getTestCaseList().remove(currentTestCase);
					currentTestCase = null;
				}
			} else {
				if (TEST_SUITE_TAG.equals(qName)) {
					if (testSuite != null) {
						throw new SAXException("Failed reading junit xml report. Test suite is already defined.");
					}
					testSuite = new TestSuite(attributes.getValue(NAME_ATTRIBUTE),
							getInt(attributes, TESTS_ATTRIBUTE, 0),
							getInt(attributes, ERRORS_ATTRIBUTE, 0),
							getInt(attributes, FAILURES_ATTRIBUTE, 0),
							getFloat(attributes, TIME_ATTRIBUTE, 0f));
				} else {
					if (TEST_CASE_TAG.equals(qName)) {
						if (testSuite == null) {
							throw new SAXException("Failed reading junit xml report. Test suite is not defined.");
						}
						if (currentTestCase != null) {
							throw new SAXException("Failed reading junit xml report. Test case is already defined.");
						}

						currentTestCase = new TestSuite.TestCase(attributes.getValue(CLASS_NAME_ATTRIBUTE),
								attributes.getValue(NAME_ATTRIBUTE),
								getFloat(attributes, TIME_ATTRIBUTE, 0f));
						testSuite.getTestCaseList().add(currentTestCase);
					} else {
						if (TEST_CASE_FAILURE_TAG.equals(qName)) {
							if (testSuite == null) {
								throw new SAXException("Failed reading junit xml report. Test suite is not defined.");
							}
							if (currentTestCase == null) {
								throw new SAXException("Failed reading junit xml report. Test case is not defined.");
							}
							if (inFailureBlock) {
								throw new SAXException("Failed reading junit xml report. Test case failure is already defined.");
							}

							currentTestCase.failed = true;
							inFailureBlock = true;
						}
					}
				}
			}
		}

		@Override
		public void endElement(String uri, String localName, String qName) throws SAXException {
			if (TEST_CASE_TAG.equals(qName)) {
				currentTestCase = null;
			} else {
				if (TEST_CASE_FAILURE_TAG.equals(qName)) {
					inFailureBlock = false;
				}
			}
		}

		/**
		 * Gets test suite.
		 *
		 * @return the test suite
		 */
		public TestSuite getTestSuite() {
			return testSuite;
		}
	}

	private static Integer getInt(Attributes attributes, String name, Integer defaultValue) {
		String value = attributes.getValue(name);
		if (StringUtils.isNotEmpty(value)) {
			try {
				return Integer.parseInt(value);
			} catch (NumberFormatException e) {
				// Ignore this exception
			}
		}

		return defaultValue;
	}

	private static Float getFloat(Attributes attributes, String name, Float defaultValue) {
		String value = attributes.getValue(name);
		if (StringUtils.isNotEmpty(value)) {
			try {
				return Float.parseFloat(value);
			} catch (NumberFormatException e) {
				// Ignore this exception
			}
		}

		return defaultValue;
	}

	/**
	 * Test suite junit xml report definition.
	 *
	 * @author Kenan Klisura
	 */
	public static class TestSuite {
		private String name;

		private int tests = 0;

		private int errors = 0;

		private int failures = 0;

		private float time = 0;

		private List<TestCase> testCaseList;

		/**
		 * Instantiates a new Test suite.
		 *
		 * @param name     the name
		 * @param tests    the tests
		 * @param errors   the errors
		 * @param failures the failures
		 * @param time     the time
		 */
		private TestSuite(String name, int tests, int errors, int failures, float time) {
			this.name = name;
			this.tests = tests;
			this.errors = errors;
			this.failures = failures;
			this.time = time;
		}

		/**
		 * Gets name.
		 *
		 * @return the name
		 */
		public String getName() {
			return name;
		}

		/**
		 * Gets tests.
		 *
		 * @return the tests
		 */
		public int getTests() {
			return tests;
		}

		/**
		 * Gets errors.
		 *
		 * @return the errors
		 */
		public int getErrors() {
			return errors;
		}

		/**
		 * Gets failures.
		 *
		 * @return the failures
		 */
		public int getFailures() {
			return failures;
		}

		/**
		 * Gets time.
		 *
		 * @return the time
		 */
		public float getTime() {
			return time;
		}

		/**
		 * Gets test step list.
		 *
		 * @return the test step list
		 */
		public List<TestCase> getTestCaseList() {
			if (testCaseList == null) {
				testCaseList = new ArrayList<>();
			}
			return testCaseList;
		}

		/**
		 * Test step junit xml report definition.
		 *
		 * @author Kenan Klisura
		 */
		public static class TestCase {
			private String className;

			private String name;

			private float time = 0;

			private boolean failed = false;

			private String failureReason;

			/**
			 * Instantiates a new Test case.
			 *
			 * @param className the class name
			 * @param name      the name
			 * @param time      the time
			 */
			private TestCase(String className, String name, float time) {
				this.className = className;
				this.name = name;
				this.time = time;
			}

			/**
			 * Gets class name.
			 *
			 * @return the class name
			 */
			public String getClassName() {
				return className;
			}

			/**
			 * Gets name.
			 *
			 * @return the name
			 */
			public String getName() {
				return name;
			}

			/**
			 * Gets time.
			 *
			 * @return the time
			 */
			public float getTime() {
				return time;
			}

			/**
			 * Is failed boolean.
			 *
			 * @return the boolean
			 */
			public boolean isFailed() {
				return failed;
			}

			/**
			 * Gets failure reason.
			 *
			 * @return the failure reason
			 */
			public String getFailureReason() {
				return failureReason;
			}
		}
	}
}
