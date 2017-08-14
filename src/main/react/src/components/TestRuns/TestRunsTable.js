import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import SuccessRate from '../ui/SuccessRate';
import TimeFormat from '../ui/TimeFormat';
import DurationFormat from '../ui/DurationFormat';
import TableHeader from '../ui/TableHeader';
import FeatureToggle, {whenFeatureToggled} from '../ui/FeatureToggle';
import GithubInfo from '../ui/GithubInfo';
import {linkToTestRunsBySuite} from '../../links';

class TestRunsTable extends React.Component {
  static propTypes = {
    testRuns: PropTypes.array.isRequired
  };

  render() {
    function onRowClick(testRun, ev) {
      if (ev.target.tagName !== 'A' && ev.target.parentNode.tagName !== 'A') {
        if (testRun.testSuite) {
          browserHistory.push('/test-runs/'+testRun.id+'/test-cases');
        }
      }
    }

    function testSuiteLink(testRun) {
      if (testRun.testSuite) {
        return (
          <div className="test-suite-title">
            {testRun.testSuite.suite}
            <Link to={linkToTestRunsBySuite(testRun.testSuite.id)}><i className="external-page-icon glyphicon glyphicon-filter"/>
            </Link>
          </div>
        );
      }

      return null;
    }

    return (
      <table className="table table-bordered table-hover">
        <thead>
        <tr>
          <TableHeader sortKey="build">Jenkins Build</TableHeader>
          <FeatureToggle toggleKey="gitInfoFeatureToggle">
            <TableHeader sortKey="gitBranch">Git Branch</TableHeader>
          </FeatureToggle>
          <TableHeader sortKey="testSuite.suite">Test Suite</TableHeader>
          <TableHeader sortKey="updatedAt">Execution Finished</TableHeader>
          <TableHeader sortKey="exampleCount">Total Steps</TableHeader>
          <TableHeader sortKey="failureCount">Failed Steps</TableHeader>
          <TableHeader sortKey="pendingCount">Pending Steps</TableHeader>
          <TableHeader>Success Rate</TableHeader>
          <TableHeader sortKey="duration">Duration</TableHeader>
        </tr>
        </thead>
        <tbody>
        {notEmpty(this.props.testRuns,
          this.props.testRuns.map(testRun =>
            <tr className="navigateable-row" key={testRun.id} onClick={(ev) => onRowClick(testRun, ev)} >
              <td className="focused-cell">{testRun.build}</td>
              <FeatureToggle toggleKey="gitInfoFeatureToggle">
                <td>
                  <GithubInfo hash={testRun.gitHash} branch={testRun.gitBranch} />
                </td>
              </FeatureToggle>
              <td>{testSuiteLink(testRun)}</td>
              <td><TimeFormat time={testRun.updatedAt} format='dd/mm/yyyy HH:MM' /></td>
              <td>{testRun.exampleCount}</td>
              <td>{testRun.failureCount}</td>
              <td>{testRun.pendingCount}</td>
              <td><SuccessRate total={testRun.exampleCount} current={testRun.failureCount + testRun.pendingCount} /></td>
              <td><DurationFormat duration={testRun.duration}/></td>
            </tr>
          ),
          <tr>
            <td colSpan={whenFeatureToggled('gitInfoFeatureToggle', '9', '8')} className="text-center text-muted">No test runs available for this build.</td>
          </tr>
        )}
        </tbody>
      </table>
    );
  }
}

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

export default TestRunsTable;
