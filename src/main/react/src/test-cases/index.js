import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Layout from '../../components/Layout';
import ExecutionResult from '../../components/Execution-Result';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';

const EMPTY_TEST_RUN = {
  build: null,
  testSuite: {
    name: null
  }
}

const EMPTY_TEST_CASES = {
  content: []
}

class TestStepsPage extends React.Component {
  constructor(){
    super();

    this.state = {
      isDataLoading: true,
      testRun: EMPTY_TEST_RUN,
      testCases: EMPTY_TEST_CASES
    }
  }

  componentDidMount() {
    this.getPageData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getPageData(nextProps);
  }

  getPageData(props) {
    this.setState({ isDataLoading: true });

    const promises = [
      this.getTestRun(props.params.testRunId),
      this.getTestCases(props.params.testRunId,
                      props.location.query.page,
                      props.location.query.size)
    ];

    Promise.all(promises)
      .then(([testRun, testCases]) => {
        this.setState({ isDataLoading: false, testRun, testCases: testCases });
      })
  }

  getTestCases(testRunId, page = 0, size = 10) {
    return fetch(`/api/v1/test-runs/${testRunId}/test-cases?page=${page}&size=${size}`)
      .then(response => response.json());
  }

  getTestRun(testRunId) {
    if (this.state.testRun !== EMPTY_TEST_RUN) {
      return this.state.testRun;
    }

    return fetch(`/api/v1/test-runs/${testRunId}`)
      .then(response => response.json());
  }

  render() {
    function linkToTestCase(testRunId, testGroupName) {
      return `/test-runs/${testRunId}/test-steps/${testGroupName}`;
    }

    function linkToTestRunsByBuild(build) {
      return `/test-runs?build=${build}`;
    }

    return (
      <Layout>
        <Spinner isShown={this.state.isDataLoading}>
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to={linkToTestRunsByBuild(this.state.testRun.build)}>{this.state.testRun.build}</Link></li>
                <li className="active">{this.state.testRun.testSuite.suite}</li>
              </ol>
            </div>
          </div>

          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Description</th>
                <th>Test Steps</th>
                <th>Steps Passed</th>
                <th>Steps Failed</th>
                <th>Steps Pending</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {notEmpty(this.state.testCases.content,
              this.state.testCases.content.map((testCase, index) =>
                <tr key={index}>
                  <td><Link to={linkToTestCase(this.state.testRun.id, testCase.group)}>{testCase.group}</Link></td>
                  <td>{testCase.stepCount}</td>
                  <td>{testCase.stepsPassed}</td>
                  <td>{testCase.stepsFailed}</td>
                  <td>{testCase.stepsPending}</td>
                  <td>{testCase.duration}s</td>
                </tr>
              ),
              <tr>
                <td colSpan="6" className="text-center text-muted">No test cases available for this test run.</td>
              </tr>
            )}
            </tbody>
          </table>

          <Pagination to={this.props.location.pathname} paginatedResponse={this.state.testCases} />
        </Spinner>
      </Layout>
    );
  }
}

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

export default TestStepsPage;
