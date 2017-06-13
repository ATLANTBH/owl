import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import SuccessRate from '../ui/SuccessRate';
import DurationFormat from '../ui/DurationFormat';
import TableHeader from '../ui/TableHeader';
import {linkToTestSteps} from '../../links';

class TestCasesTable extends React.Component {
  static propTypes = {
    testRun: PropTypes.object.isRequired,
    testCases: PropTypes.array.isRequired
  };

  render() {
    const testRunId = this.props.testRun.id;

    function onRowClick(testCase, ev) {
      if (ev.target.tagName !== 'A' && ev.target.parentNode.tagName !== 'A') {
        browserHistory.push(linkToTestSteps(testRunId, testCase.group));
      }
    }

    return (
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
        {notEmpty(this.props.testCases,
          this.props.testCases.map((testCase, index) =>
            <tr className="navigateable-row" key={index} onClick={(ev) => onRowClick(testCase, ev)}>
              <td><Link to={linkToTestSteps(testRunId, testCase.group)}>{testCase.group}</Link></td>
              <td>{testCase.stepCount}</td>
              <td>{testCase.stepsPassed}</td>
              <td>{testCase.stepsFailed}</td>
              <td>{testCase.stepsPending}</td>
              <td><SuccessRate total={testCase.stepCount} current={testCase.stepsFailed + testCase.stepsPending} /></td>
              <td><DurationFormat duration={testCase.duration} /></td>
            </tr>
          ),
          <tr>
            <td colSpan="7" className="text-center text-muted">No test cases available for this test run.</td>
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

export default TestCasesTable;
