import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Pagination from '../../components/Pagination';
import Modal from '../../components/Modal';
import Spinner from '../../components/Spinner';
import SuccessRate from '../../components/SuccessRate';
import TimeFormat from '../../components/TimeFormat';
import DurationFormat from '../../components/DurationFormat';
import TableHeader from '../../components/TableHeader';
import FeatureToggle, { ifFeatureToggled } from '../../components/FeatureToggle';
import { getTestRuns } from '../api';
import GithubInfo from '../../components/GithubInfo';
import {
  linkToTestRunsByBuild,
  linkToTestRunsBySuite,
  linkToTestCase,
  linkToTestSteps
} from '../links';

const EMPTY_TEST_RUNS = {
  content: []
}

class TestRunsPageTable extends React.Component {
  constructor(){
    super();

    this.state = {
      isDataLoading: true,
      errorResponse: null,
      testRuns: EMPTY_TEST_RUNS
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
    getTestRuns(props.location.query.build,
      props.location.query.testSuite,
      props.location.query.page,
      props.location.query.size,
      props.location.query.sort)
    .then(testRuns => this.setState({ isDataLoading: false, testRuns: testRuns }) )
    .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }) );
  }

  render() {
    function onRowClick(testRun, ev) {
      if (ev.target.tagName !== 'A') {
        if (testRun.testSuite) {
          browserHistory.push('/test-runs/'+testRun.id+'/test-cases');
        }
      }
    }

    function testCaseLink(testRun) {
      if (testRun.testSuite) {
        return (<Link to={linkToTestCase(testRun.id)}>{testRun.testSuite.suite}</Link>);
      }

      return null;
    }

    let activeBuildQuery = null;
    if (this.props.location.query.build) {
      activeBuildQuery = <li className="active">{this.props.location.query.build}</li>;
    }

    return (
      <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test runs">
        <div className="row">
          <div className="col-md-12">
            <ol className="breadcrumb">
              <li><Link to="/">Dashboard</Link></li>
              {activeBuildQuery}
            </ol>
          </div>
        </div>

        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <TableHeader sortKey="build">Jenkins Build</TableHeader>
              <FeatureToggle toggleKey="gitInfoFeatureToggle">
                <TableHeader sortKey="gitBranch">Git Branch</TableHeader>
              </FeatureToggle>
              <TableHeader sortKey="testSuite.suite">Test Suite</TableHeader>
              <TableHeader sortKey="updatedAt">Execution Finished</TableHeader>
              <TableHeader sortKey="exampleCount">Total Cases</TableHeader>
              <TableHeader sortKey="failureCount">Failed Cases</TableHeader>
              <TableHeader sortKey="pendingCount">Pending Cases</TableHeader>
              <TableHeader>Success Rate</TableHeader>
              <TableHeader sortKey="duration">Duration</TableHeader>
            </tr>
          </thead>
          <tbody>
          {notEmpty(this.state.testRuns.content,
            this.state.testRuns.content.map(testRun =>
              <tr className="navigateable-row" key={testRun.id} onClick={(ev) => onRowClick(testRun, ev)} >
                <td><Link to={linkToTestRunsByBuild(testRun.build)}>{testRun.build}</Link></td>
                <FeatureToggle toggleKey="gitInfoFeatureToggle">
                  <td>
                    <GithubInfo hash={testRun.gitHash} branch={testRun.gitBranch} />
                  </td>
                </FeatureToggle>
                <td><Link to={linkToTestRunsBySuite(testRun.testSuite.id)}>{testRun.testSuite.suite}</Link></td>
                <td><TimeFormat time={testRun.updatedAt} format='dd/mm/yyyy HH:MM' /></td>
                <td>{testRun.exampleCount}</td>
                <td>{testRun.failureCount}</td>
                <td>{testRun.pendingCount}</td>
                <td><SuccessRate total={testRun.exampleCount} current={testRun.failureCount + testRun.pendingCount} /></td>
                <td><DurationFormat duration={testRun.duration}/></td>
              </tr>
            ),
            <tr>
              <td colSpan={ifFeatureToggled("gitInfoFeatureToggle", "9", "8")} className="text-center text-muted">No test runs available for this build.</td>
            </tr>
          )}
          </tbody>
        </table>

        <Pagination to={this.props.location.pathname} paginatedResponse={this.state.testRuns} />
      </Spinner>
    );
  }
}

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

export default TestRunsPageTable;
