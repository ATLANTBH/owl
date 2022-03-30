import React, {PropTypes} from 'react';
import {Link, browserHistory} from 'react-router';
import classNames from 'classnames';
import SuccessRate from '../ui/SuccessRate';
import DurationFormat from '../ui/DurationFormat';
import LabelSelection from '../ui/LabelSelection';
import TableHeader from '../ui/TableHeader';
import {linkToTestSteps} from '../../links';

const LOCAL_STORAGE_KEY = 'owl-test-case-labels';

const LABELS = [{
  id: 'DEFAULT',
  title: 'Default',
  className: 'label-default'
}, {
  id: 'PRIMARY',
  title: 'Primary',
  className: 'label-primary'
}, {
  id: 'SUCCESS',
  title: 'Success',
  className: 'label-success'
}, {
  id: 'INFO',
  title: 'Info',
  className: 'label-info'
}, {
  id: 'WARNING',
  title: 'Warning',
  className: 'label-warning'
}, {
  id: 'DANGER',
  title: 'Danger',
  className: 'label-danger'
}];

class TestCasesTable extends React.Component {
  static propTypes = {
    testRun: PropTypes.object.isRequired,
    testCases: PropTypes.array.isRequired
  };

  onLabelSelected(testCase, label) {
    const testRunId = this.props.testRun.id;
    const labels = getLabels(testRunId);

    labels[testCase.group] = label;

    persistLabels(testRunId, labels);

    this.forceUpdate();
  }

  render() {
    const testRunId = this.props.testRun.id;

    function onRowClick(testCase, ev) {
      if (ev.target.tagName !== 'A' && ev.target.parentNode.tagName !== 'A') {
        browserHistory.push(linkToTestSteps(testRunId, testCase.group));
      }
    }

    const labels = getLabels(testRunId);

    function getLabelClass(testCase) {
      const label = labels[testCase.group] || {};
      return label.className;
    }

    function getLabelId(testCase) {
      const label = labels[testCase.group] || {};
      return label.id;
    }

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <TableHeader sortKey="test_group">Description</TableHeader>
            <TableHeader sortKey="test_step_count">Test Steps</TableHeader>
            <TableHeader sortKey="steps_passed">Passed Steps</TableHeader>
            <TableHeader sortKey="steps_failed">Failed Steps</TableHeader>
            <TableHeader sortKey="steps_pending">Pending Steps</TableHeader>
            <TableHeader sortKey="success_rate">Success Rate</TableHeader>
            <TableHeader sortKey="duration">Duration</TableHeader>
            <TableHeader>Label</TableHeader>
          </tr>
        </thead>
        <tbody>
        {notEmpty(this.props.testCases,
          this.props.testCases.map((testCase, index) =>
            <tr className={classNames('navigateable-row', getLabelClass(testCase))} key={index} onClick={(ev) => onRowClick(testCase, ev)}>
              <td><Link to={linkToTestSteps(testRunId, testCase.group)}>{testCase.group}</Link></td>
              <td>{testCase.stepCount}</td>
              <td>{testCase.stepsPassed}</td>
              <td>{testCase.stepsFailed}</td>
              <td>{testCase.stepsPending}</td>
              <td><SuccessRate total={testCase.stepCount} current={testCase.stepsFailed + testCase.stepsPending} /></td>
              <td><DurationFormat duration={testCase.duration} /></td>
              <td><LabelSelection labels={LABELS} onLabelSelected={this.onLabelSelected.bind(this, testCase)} selectedLabel={getLabelId(testCase)}/></td>
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

function persistLabels(id, labels) {
  localStorage.setItem(LOCAL_STORAGE_KEY + '-' + id, JSON.stringify(labels));
}

function getLabels(id) {
  const labels = localStorage.getItem(LOCAL_STORAGE_KEY + '-' + id) || '{}';
  try {
    return JSON.parse(labels);
  } catch (ex) {
    console.error('Failed getting labels for test case', id);
    return {};
  }
}

export default TestCasesTable;
