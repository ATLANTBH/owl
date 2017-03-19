package com.atlantbh.test.reporter.controllers;

import com.atlantbh.test.reporter.models.TestSuite;
import com.atlantbh.test.reporter.services.TestSuiteService;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Singleton;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * Bootstrap controller. Used to initialize frontend app.
 *
 * @author Kenan Klisura
 */
@RestController
@RequestMapping(value = "/api/v1/bootstrap")
public class BootstrapController {
	private static final Logger LOGGER = Logger.getLogger(BootstrapController.class);

	@Autowired
	private Bootstrap bootstrap;

	/**
	 * Sets bootstrap.
	 *
	 * @param bootstrap the bootstrap
	 */
	public void setBootstrap(Bootstrap bootstrap) {
		this.bootstrap = bootstrap;
	}

	/**
	 * Resolved bootstrap bootstrap.
	 *
	 * @param bootstrap        the bootstrap
	 * @param testSuiteService the test suite service
	 * @return the bootstrap
	 */
	@Bean
	public Bootstrap createBootstrapBean(Bootstrap bootstrap, TestSuiteService testSuiteService) {
		// Resolve test suite names
		List<Bootstrap.TestSuite> testSuites = Arrays.stream(bootstrap.getSuiteNameStatistics())
			.map(name -> {
				TestSuite testSuite = testSuiteService.getByName(name.trim());
				if (testSuite == null) {
					LOGGER.error("Failed to find test suite with name " + name.trim());
				}
				return testSuite;
			})
			.filter(Objects::nonNull)
			.map(Bootstrap::createTestSuite)
			.collect(Collectors.toList());

		bootstrap.setSuiteStatistics(testSuites);

		return bootstrap;
	}

	/**
	 * Gets bootstrap.
	 *
	 * @return the bootstrap
	 */
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<Bootstrap> getBootstrap() {
		return ResponseEntity.ok()
				.cacheControl(CacheControl.maxAge(2, TimeUnit.HOURS))
				.body(bootstrap);
	}

	/**
	 * The type Bootstrap.
	 */
	@Component
	@Singleton
	public static class Bootstrap {
		@Value("${project.name}")
		private String projectName;

		@Value("${project.features.git.info}")
		private boolean gitInfoFeatureToggle;

		@Value("${git.github.repo}")
		private String githubRepoLink;

		@JsonIgnore
		@Value("${suite.statistics}")
		private String[] suiteNameStatistics;

		private List<TestSuite> suiteStatistics;

		/**
		 * The type Test suite.
		 */
		public static class TestSuite {
			private Long id;
			private String suite;

			/**
			 * Instantiates a new Test suite.
			 *
			 * @param id    the id
			 * @param suite the suite
			 */
			public TestSuite(Long id, String suite) {
				this.id = id;
				this.suite = suite;
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
			 * Gets id.
			 *
			 * @return the id
			 */
			public Long getId() {
				return id;
			}
		}

		/**
		 * Gets project name.
		 *
		 * @return the project name
		 */
		public String getProjectName() {
			return projectName;
		}

		/**
		 * Sets project name.
		 *
		 * @param projectName the project name
		 */
		public void setProjectName(String projectName) {
			this.projectName = projectName;
		}

		/**
		 * Get suite name statistics string [ ].
		 *
		 * @return the string [ ]
		 */
		public String[] getSuiteNameStatistics() {
			return suiteNameStatistics;
		}

		/**
		 * Sets suite name statistics.
		 *
		 * @param suiteNameStatistics the suite name statistics
		 */
		public void setSuiteNameStatistics(String[] suiteNameStatistics) {
			this.suiteNameStatistics = suiteNameStatistics;
		}

		/**
		 * Gets suite statistics.
		 *
		 * @return the suite statistics
		 */
		public List<TestSuite> getSuiteStatistics() {
			return suiteStatistics;
		}

		/**
		 * Sets suite statistics.
		 *
		 * @param suiteStatistics the suite statistics
		 */
		public void setSuiteStatistics(List<TestSuite> suiteStatistics) {
			this.suiteStatistics = suiteStatistics;
		}

		/**
		 * Is git info feature toggle boolean.
		 *
		 * @return the boolean
		 */
		public boolean isGitInfoFeatureToggle() {
			return gitInfoFeatureToggle;
		}

		/**
		 * Gets github repo link.
		 *
		 * @return the github repo link
		 */
		public String getGithubRepoLink() {
			return githubRepoLink;
		}

		/**
		 * Create test suite test suite.
		 *
		 * @param testSuite the test suite
		 * @return the test suite
		 */
		public static TestSuite createTestSuite(com.atlantbh.test.reporter.models.TestSuite testSuite) {
			return new TestSuite(testSuite.getId(), testSuite.getSuite());
		}
	}
}
