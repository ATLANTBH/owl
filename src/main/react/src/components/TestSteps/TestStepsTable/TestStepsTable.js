import React, {PropTypes} from 'react';
import DurationFormat from '../../ui/DurationFormat';
import TableHeader from '../../ui/TableHeader';
import ExecutionResult from '../../ui/ExecutionResult';
import style from './style.css';
import editNotesBtn from './edit-notes-btn.png';

class TestStepsTable extends React.Component {
  static propTypes = {
    testSteps: PropTypes.array.isRequired,
    onShowExecutionResultModal: PropTypes.func.isRequired,
    onShowEditNotesModal: PropTypes.func.isRequired
  };

  render() {
    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <TableHeader sortKey="context">Description</TableHeader>
            <TableHeader sortKey="description">Expected Result</TableHeader>
            <TableHeader sortKey="executionResult">Execution Result</TableHeader>
            <TableHeader sortKey="duration">Duration</TableHeader>
            <TableHeader>Notes</TableHeader>
          </tr>
        </thead>
        <tbody>
        {notEmpty(this.props.testSteps,
          this.props.testSteps.map(testStep =>
            <tr key={testStep.id}>
              <td className="focused-cell">{testStep.context}</td>
              <td>{testStep.description}</td>
              <td><ExecutionResult executionResult={testStep.executionResult} onClick={() => this.props.onShowExecutionResultModal(testStep)} /></td>
              <td><DurationFormat duration={testStep.duration} /></td>
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

function notEmpty(input, value, valueIfEmpty) {
  return input.length ? value : valueIfEmpty;
}

function notes(testStep) {
  return <span className={style.noteText} title={testStep.notes}>{testStep.notes}</span>;
}

export default TestStepsTable;
