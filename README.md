# owl

## About

Owl is a tool used for test results reporting and presentation.

## Prerequisites

In order to use owl, a database with formatted test results should exist. For assistance on how to create such a database and write test results to it see the [rspec2db](https://github.com/ATLANTBH/rspec) gem, which is used to write RSpec tests to a database. Owl currently supports PostgreSQL databases.

To run the application, Java (JRE) should be installed.


## Building

Maven (>= v3) is required for building owl. Run following command to build:

```
mvn clean package
```

This command creates `target/owl-VERSION.jar` file, which can be started locally or copied to another host to be started on.

## Running

To start the application with the default configuration ([application.properties](src/main/resources/application.properties)) run:

```
java -jar target/owl-VERSION.jar
```

An external configuration ([application.properties](src/main/resources/application.properties)) can be provided when starting the app to configure the project name, database properties, change the port the app is running on or toggle specific features.

The configuration can be saved to a file and passed when starting the app with:
```
java -jar target/owl-VERSION.jar --spring.config.location=<application.properties>
```

If there is already a database with data, flyway baseline migration should be run with the flyway properties specified in the properties file:
```
mvn flyway:baseline -Dflyway.configFile=<application.properties>
```

### Running as daemon service by using systemd
To run owl as a daemon service on the host machine (which is preferred way of running owl on CI environments if you don't use dockerized version), you need to do following:

Create file called owl in /etc/default/ that looks like this:
```
APP_ROOT=<HOME>/owl/target
BINARY=<HOME>/owl/target/owl-<VERSION>.jar
CONFIG=<SPRING_CONFIG_LOCATION>
```
This file contains default variables that will be used in owl.service 

Create file called owl.service in /etc/systemd/system that looks like this:
```
[Unit]
Description=OWL test reporter application
After=syslog.target

[Service]
EnvironmentFile=/etc/default/owl
User=<LINUX_USER>
WorkingDirectory=<DIRECTORY_FROM_WHICH_COMMAND_WILL_BE_EXECUTED>
ExecStart=/usr/bin/java -jar ${BINARY} --spring.config.location=${CONFIG}
StandardOutput=journal
StandardError=journal
SuccessExitStatus=143

[Install]
WantedBy=multi-user.target
```

Execute following commands to register and start owl daemon service:
```
sudo systemctl daemon-reload
sudo systemctl enable owl
sudo systemctl status owl
```

To check realtime stdout logs of owl daemon service use:
```
journalctl -u owl -n 100 -f
```

### Docker
To build and run owl (along with Postgres) using Docker Compose:  
```
docker-compose up
```  
It will be available on the default `8090` port.

Owl can also be started from a docker image. To build the image run:  
```
docker build -t atlantbh/owl .
```  

By default [docker/application.properties](docker/application.properties) will be added to the image.

Start the container:  
```
docker run --name owl -d -p 8090:8090 atlantbh/owl
```  

## API

### Test runs

`GET /api/v1/test-runs`

This API returns all test runs in owl. 

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

This API returns all test suits in owl.

`POST /api/v1/test-suites`

This API creates new test suite.

`PUT /api/v1/test-suites/{testSuiteId}`

This API updates test suite.

`GET /api/v1/test-suites/{testSuiteId}/statistics`

This API returns statistics for given test suite id. Statistics is composed of `build` identifier with appropriate counts such as `totalCasesCount`, `failedCasesCount` etc.

### JUnit Report

`POST /api/v1/test-runs/{TEST_RUN_ID}/test-cases/junit-xml-report`

This API allows for parsing and persisting junit format test results. The API accepts Junit Report XML file as body. 


## Development

- Install node (>= v12.5.0)

- Install yarn (>= v0.24.6)

	```bash
	brew update
	brew install yarn
	yarn --version
	```

- Database named `owl-db` with user `owlusername` and pw `owlpassword` should be created and populated with initial data.
 
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
