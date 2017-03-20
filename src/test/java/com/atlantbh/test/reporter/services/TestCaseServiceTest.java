package com.atlantbh.test.reporter.services;

import com.atlantbh.test.reporter.models.TestRun;
import com.atlantbh.test.reporter.repositories.TestCaseRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.File;
import java.net.URL;

import static org.mockito.Mockito.when;

public class TestCaseServiceTest {

	private TestCaseService testCaseService;

	@Mock
	private TestCaseRepository testCaseRepository;

	@Mock
	private TestRunService testRunService;

	@Before
	public void beforeEach() {
		MockitoAnnotations.initMocks(this);

		testCaseService = new TestCaseService();
		testCaseService.setTestCaseRepository(testCaseRepository);
		testCaseService.setTestRunService(testRunService);
	}

	@Test
	public void testCreateTestCaseFromJunitXmlReport() throws Exception {
		final Long testRunId = 1l;
		final TestRun testRun = new TestRun();

		final URL resource = this.getClass().getClassLoader().getResource("fixtures/junit-xml-report.xml");
		final File reportFile = new File(resource.getPath());

		when(testRunService.get(testRunId)).thenReturn(testRun);
	}
}