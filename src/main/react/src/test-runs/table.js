import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Select from 'react-select';
import Pagination from '../../components/Pagination';
import Spinner from '../../components/Spinner';
import SuccessRate from '../../components/SuccessRate';
import TimeFormat from '../../components/TimeFormat';
import DurationFormat from '../../components/DurationFormat';
import TableHeader from '../../components/TableHeader';
import FeatureToggle, { ifFeatureToggled } from '../../components/FeatureToggle';
import {
  getTestRuns,
  getDisinctBuilds,
  getFilteredTestSuites,
  getTestSuite } from '../api';
import GithubInfo from '../../components/GithubInfo';
import {
  linkToTestRunsByBuild,
  linkToTestRunsBySuite,
  linkToTestCase
} from '../links';
import { updateQueryParams } from '../utils';

const EMPTY_TEST_RUNS = {
  content: []
}

class TestRunsPageTable extends React.Component {
  constructor(){
    super();

    this.onUpdateFilteredTestSuites = this.onUpdateFilteredTestSuites.bind(this);
    this.onUpdateFilteredBuilds     = this.onUpdateFilteredBuilds.bind(this);

    this.onLoadTestSuites           = this.onLoadTestSuites.bind(this);

    this.state = {
      isDataLoading: true,
      errorResponse: null,
      testRuns: EMPTY_TEST_RUNS,
      filteredBuilds: [],
      filteredTestSuites: []
    }
  }

  componentDidMount() {
    this.setState({ isDataLoading: true });

    this.setFilteredBuilds(this.props);
    this.setFilteredTestSuites(this.props);
    this.getPageData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setFilteredBuilds(nextProps);
    this.setFilteredTestSuites(nextProps);
    this.getPageData(nextProps);
  }

  setFilteredBuilds(props) {
    if (props.location.query.build) {
      this.setState({
        filteredBuilds: props.location.query.build.split(',').map(build => {
          return {
            value: build,
            label: build
          }
        })
      });
    } else {
      this.setState({
        filteredBuilds: []
      });
    }
  }

  setFilteredTestSuites(props) {
    if (props.location.query.testSuite) {
      let testSuiteIds = props.location.query.testSuite.split(',');

      function resolveTestSuite(id) {
        return getTestSuite(id)
          .then(testSuite => {
            return {
              value: testSuite.id,
              label: testSuite.suite
            };
          }, () => { null });
      }

      Promise.all(testSuiteIds.map(resolveTestSuite))
        .then(testSuites => {
          this.setState({
            filteredTestSuites: testSuites
          });
        });
    } else {
      this.setState({
        filteredTestSuites: []
      });
    }
  }

  getPageData(props) {
    getTestRuns(props.location.query.build,
                props.location.query.testSuite,
                props.location.query.page,
                props.location.query.size,
                props.location.query.sort)
      .then(testRuns       => this.setState({ isDataLoading: false, testRuns }) )
      .catch(errorResponse => this.setState({ isDataLoading: false, errorResponse }) );
  }

  onUpdateFilteredTestSuites(options) {
    const testSuite = options.map(option => option.value).join();
    updateQueryParams({ testSuite });
  }

  onUpdateFilteredBuilds(options) {
    const build = options.map(option => option.value).join();
    updateQueryParams({ build });
  }

  onLoadDistinctBuilds(input, callback) {
    getDisinctBuilds(input)
      .then(function (data) {
        callback(null, {
          complete: true,
          options: data.map(value => {
            return {
              value,
              label: value
            };
          })
        });
      });
  }

  onLoadTestSuites(input, callback) {
    getFilteredTestSuites(input, 'suite')
      .then(function (testSuites) {
        callback(null, {
          complete: true,
          options: testSuites.content.map(testSuite => {
            return {
              value: testSuite.id,
              label: testSuite.suite
            };
          })
        });
      });
  }

  render() {
    function onRowClick(testRun, ev) {
      if (ev.target.tagName !== 'A' && ev.target.parentNode.tagName !== 'A') {
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

    var availableTestSuites = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' }
    ];

    return (
      <Spinner isShown={this.state.isDataLoading} errorResponse={this.state.errorResponse} text="Fetching test runs">
        <div className="navbar-section">
          <div className="row">
            <div className="col-md-12">
              <ol className="breadcrumb">
                <li><Link to="/">Dashboard</Link></li>
              </ol>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <Select.Async
                name="select-builds"
                multi={true}
                value={this.state.filteredBuilds}
                placeholder='Jenkins Builds'
                loadOptions={this.onLoadDistinctBuilds}
                onChange={this.onUpdateFilteredBuilds}
              />

              <Select.Async
                name="select-test-suites"
                multi={true}
                value={this.state.filteredTestSuites}
                placeholder='Test Suites'
                loadOptions={this.onLoadTestSuites}
                onChange={this.onUpdateFilteredTestSuites}
              />
            </div>
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
                <td><Link to={linkToTestRunsByBuild(testRun.build)}>{testRun.build} <i className="external-page-icon glyphicon glyphicon glyphicon-new-window"/></Link></td>
                <FeatureToggle toggleKey="gitInfoFeatureToggle">
                  <td>
                    <GithubInfo hash={testRun.gitHash} branch={testRun.gitBranch} />
                  </td>
                </FeatureToggle>
                <td><Link to={linkToTestRunsBySuite(testRun.testSuite.id)}>{testRun.testSuite.suite} <i className="external-page-icon glyphicon glyphicon glyphicon-new-window"/></Link></td>
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
