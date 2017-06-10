# Test Reporter

## Prerequisites

This tool is used for reporting and representation of automated test runs. In order to use this tool, a database with formatted test results should exist. For assistance on how to create such a database and write test results to it see the [rspec2db](https://github.com/ATLANTBH/rspec) gem, which is used to write RSpec tests to a database. The tool currently supports PostgreSQL databases.

To run the application, Java (JRE) should be installed.


## Building

Maven (>= v3) is required for building Test-reporter. Run following command to build:

```
mvn clean package
```

This command creates `target/test-reporter-VERSION.jar` file, which can be started locally or copied to another host to be started on.

## Running

To start the application with the default configuration ([application.properties](src/main/resources/application.properties)) run:

```
java -jar target/test-reporter-VERSION.jar
```

An external configuration can be provided when starting the app to configure the project name, database properties, change the port the app is running on or toggle specific features.

```
# Sets the project name to be visible on frontend
project.name=Test Report App

# Comma separated list of suite names that will be shown on dashboard (can be left empty)
suite.statistics=smoke test,regression test

# Feature toogles
# Show git information on dashboard - branch and commit hash of the tested code
project.features.git.info=false

# Github repo link used to generate links to specific commits
git.github.repo=

# Database Properties
spring.datasource.url=jdbc:postgresql://<database_host>:5432/<database_name>
spring.datasource.username=<database_username>
spring.datasource.password=<database_password>

# Logging Properties
logging.level.org.hibernate.SQL=debug

# Set port - 0 means the default port will be used
server.port=0

# Properties for flyway baseline migrations
flyway.url=jdbc:postgresql://<database_host>:5432/<database_name>
flyway.user=<database_username>
flyway.password=<database_password>
```

The configuration can be saved to a file and passed when starting the app with:
```
java -jar target/test-reporter-VERSION.jar --spring.config.location=<application.properties>
```

If there is already a database with data, flyway baseline migration should be run with the flyway properties specified in the properties file:
```
mvn flyway:baseline -Dflyway.configFile=<application.properties>
```

## API

### Test runs

`GET /api/v1/test-runs`

This API returns all test runs in Test-reporter. 

Test runs are suite of tests cases that are run on specific `build` with specific `test-suite`

To fetch test runs for specific build, one can use:

`GET /api/v1/test-runs?build={BUILD_NUMBER}`

### Test cases

`GET /api/v1/test-runs/{TEST_RUN_ID}/test-cases`

This API returns all tests cases for given test run id.

Test cases are collection of tests that belong to specific suite.

### Test steps

`GET /api/v1/test-runs/{TEST_RUN_ID}/test-steps?group={TEST_GROUP_NAME}`

This API returns all test steps for given test case, identified by `group` name.

Test steps are lowest level tests, that contain asserts and execution results.

### Test suites

`GET /api/v1/test-suites`

This API returns all test suits in Test-reporter.

`POST /api/v1/test-suites`

This API creates new test suite.

`PUT /api/v1/test-suites/{testSuiteId}`

This API updates test suite.

`GET /api/v1/test-suites/{testSuiteId}/statistics`

This API returns statistics for given test suite id. Statistics is composed of `build` identifier with appropriate counts such as `totalCasesCount`, `failedCasesCount` etc.

## Development

- Install node (>= v6.0.0)

- Install yarn (>= v0.21.3)

	```bash
	brew update
	brew install yarn
	yarn --version
	```

- Database named `test-repoter` with user `testreporter` and pw `testreporter` should be created and populated with initial data.
 
- Baseline migrations should be applied by running

	```$xslt
	mvn flyway:baseline
	```

- Start spring application in debug mode

- Start react application development mode (React application is located in `src/main/react` dir)

	```bash
	cd src/main/react
	yarn start
	```

- Open `http://localhost:3000` in browser
