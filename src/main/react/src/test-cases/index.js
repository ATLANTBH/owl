import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import SuccessRate from '../../components/SuccessRate';
import DurationFormat from '../../components/DurationFormat';
import TableHeader from '../../components/TableHeader';
import { getTestRun, getTestCases } from '../api';

const EMPTY_TEST_RUN = {
  build: null,
  testSuite: {
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
      errorResponse: null,
      testRun: EMPTY_TEST_RUN,
      testCases: EMPTY_TEST_CASES
    }
  }

  componentDidMount() {
    this.setState({ isDataLoading: true });
    this.getPageData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.getPageData(nextProps);
  }

  getPageData(props) {
    const promises = [
      this.getTestRun(props.params.testRunId),
      getTestCases(props.params.testRunId,
                   props.location.query.page,
                   props.location.query.size,
                   props.location.query.sort)
    ];

    Promise.all(promises)
      .then(([testRun, testCases]) => this.setState({ isDataLoading: false, testRun, testCases: testCases }) )
      .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }) )
  }

  getTestRun(testRunId) {
    // Cache the test run in this component
    if (this.state.testRun !== EMPTY_TEST_RUN) {
      return this.state.testRun;
    }

    return getTestRun(testRunId);
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
        <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test cases">
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
                <TableHeader sortKey="test_group">Description</TableHeader>
                <TableHeader sortKey="test_step_count">Test Steps</TableHeader>
                <TableHeader sortKey="steps_passed">Steps Passed</TableHeader>
                <TableHeader sortKey="steps_failed">Steps Failed</TableHeader>
                <TableHeader sortKey="steps_pending">Steps Pending</TableHeader>
                <TableHeader>Success Rate</TableHeader>
                <TableHeader sortKey="duration">Duration</TableHeader>
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
                  <td><SuccessRate total={testCase.stepCount} current={testCase.stepsFailed + testCase.stepsPending} /></td>
                  <td><DurationFormat duration={testCase.duration} /></td>
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
