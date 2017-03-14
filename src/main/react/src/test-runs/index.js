import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Layout from '../../components/Layout';
import ExecutionResult from '../../components/Execution-Result';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import SuccessRate from '../../components/SuccessRate';

const EMPTY_TEST_RUNS = {
  content: []
}

class TestRunsPage extends React.Component {
  constructor(){
    super();

    this.state = {
      isDataLoading: true,
      testRuns: EMPTY_TEST_RUNS
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

    this.getTestRuns(props.location.query.build,
      props.location.query.page,
      props.location.query.size)
    .then(testRuns => {
      this.setState({ isDataLoading: false, testRuns: testRuns });
    });
  }

  getTestRuns(build = '', page = 0, size = 10) {
    return fetch(`/api/v1/test-runs?build=${build}&page=${page}&size=${size}`)
      .then(response => response.json());
  }

  render() {
    function linkToTestRunsByBuild(build) {
      return `/test-runs?build=${build}`;
    }

    function linkToTestCase(testRunId) {
      return `/test-runs/${testRunId}/test-cases`;
    }

    function linkToTestSteps(testRunId, testGroupName) {
      return `/test-runs/${testRunId}/test-steps/${testGroupName}`;
    }

    return (
      <Layout>
        <Spinner isShown={this.state.isDataLoading}>
          <div className="row">
            <div className="col-md-12">
              <div className="page-header">
                <h1>Dashboard</h1>
              </div>
            </div>
          </div>

          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Build</th>
                <th>Test Suite</th>
                <th>Total Cases</th>
                <th>Failed Cases</th>
                <th>Pending Cases</th>
                <th>Success Rate</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
            {notEmpty(this.state.testRuns.content,
              this.state.testRuns.content.map(testRun =>
                <tr key={testRun.id}>
                  <td><Link to={linkToTestRunsByBuild(testRun.build)}>{testRun.build}</Link></td>
                  <td><Link to={linkToTestCase(testRun.id)}>{testRun.testSuite.suite}</Link></td>
                  <td>{testRun.exampleCount}</td>
                  <td>{testRun.failureCount}</td>
                  <td>{testRun.pendingCount}</td>
                  <td><SuccessRate total={testRun.exampleCount} current={testRun.failureCount + testRun.pendingCount} /></td>
                  <td>{testRun.duration}s</td>
                </tr>
              ),
              <tr>
                <td colSpan="6" className="text-center text-muted">No test runs available for this build.</td>
              </tr>
            )}
            </tbody>
          </table>

          <Pagination to={this.props.location.pathname} paginatedResponse={this.state.testRuns} />
        </Spinner>
      </Layout>
    );
  }
}

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

export default TestRunsPage;
