# Test Reporter

## Building

Maven (>= v3) is required for building Test-reporter. Run following command to build:

```
mvn clean package
```

## Running

```
java -jar target/test-reporter-VERSION.jar
```

If there is external configuration, it should be passed as:
```$xslt
java -jar target/test-reporter-VERSION.jar --spring.config.location=PATH_TO_CONFIGURATION
```

There should be database with populated data and flyway baseline migrations run with:
```$xslt
mvn flyway:baseline
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

`GET /api/v1/test-suites/{testSuiteId}/statistics`

This API returns statistics for given test suite id. Statistics is composed of `build` identifier with appropriate counts such as `passedCasesCount`, `failedCasesCount` etc.

## Development

- Install node (>= v6.0.0)

- Install yarn (>= v0.21.3)

	```bash
	brew update
	brew install yarn
	yarn --version
	```

- Database named `test-repoter` with user `testreporter' and pw `testreporter` should be created and populated with initial data.
 
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