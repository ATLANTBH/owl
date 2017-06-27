import React, {PropTypes} from 'react';
import DurationFormat from '../../ui/DurationFormat';
import TableHeader from '../../ui/TableHeader';
import ExecutionResult from '../../ui/ExecutionResult';
import style from './style.css';
import editNotesBtn from './edit-notes-btn.png';
import FeatureToggle from '../../ui/FeatureToggle';
import TooltipSpan from '../../ui/TooltipSpan';

class TestStepsTable extends React.Component {
  static propTypes = {
    testSteps: PropTypes.array.isRequired,
    onShowExecutionResultModal: PropTypes.func.isRequired,
    onShowEditNotesModal: PropTypes.func.isRequired,
    onShowAddBugReportLinkModal: PropTypes.func.isRequired
  };

  render() {
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <TableHeader>Description</TableHeader>
            <TableHeader>Expected Result</TableHeader>
            <TableHeader sortKey="executionResult">Execution Result</TableHeader>
            <TableHeader sortKey="duration">Duration</TableHeader>
            <FeatureToggle toggleKey="bugTrackingFeatureToggle">
              <TableHeader className={style.bugTrackingColumn}>Bug Tracking</TableHeader>
            </FeatureToggle>
            <TableHeader>Notes</TableHeader>
          </tr>
        </thead>
        <tbody>
        {notEmpty(this.props.testSteps,
          this.props.testSteps.map((testStep, index) =>
            <tr key={testStep.id}>
              {testStepContext(testStep, index, this.props.testSteps)}
              <td>{testStep.description}</td>
              <td><ExecutionResult executionResult={testStep.executionResult} onClick={() => this.props.onShowExecutionResultModal(testStep)} /></td>
              <td><DurationFormat duration={testStep.duration} /></td>
              <FeatureToggle toggleKey="bugTrackingFeatureToggle">
                <td>
                  {createLink(testStep)}
                  <img src={editNotesBtn} alt="Click to add bug report link." title="Click to add bug report link." className={style.editNotesBtn}
                       onClick={() => this.props.onShowAddBugReportLinkModal(testStep)} />
                </td>
              </FeatureToggle>
              <td>
                {notes(testStep)}

                <img src={editNotesBtn} alt="Edit Notes" className={style.editNotesBtn}
                     onClick={() => this.props.onShowEditNotesModal(testStep)} />
              </td>
            </tr>
          ),
          <tr>
            <td colSpan="4" className="text-center text-muted">No test steps available for this test case.</td>
          </tr>
        )}
        </tbody>
      </table>
    );
  }
}

function createLink(testStep) {
  if (testStep.bugUrl) {
    let url = testStep.bugUrl;
    const startsWithProtocol = /^http(s):\/\//.test(url || '');
    url = startsWithProtocol ? url : ('http://' + url);
    return <a href={url} target="_blank">{testStep.bugTitle || 'Link'}</a>
  }
  return null;
}

function testStepContext(testStep, index, testSteps) {
  const context = testStep.context;
  if (index) {
    const previousTestStep = testSteps[index - 1];
    if (context === previousTestStep.context) {
      return <td className="focused-cell-empty" />;
    }
  }

  return <td className="focused-cell">{context}</td>;
}

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

function notes(testStep) {
  return <TooltipSpan className={style.noteText} text={testStep.notes} title={testStep.notes} placement="bottom" />
}

export default TestStepsTable;
