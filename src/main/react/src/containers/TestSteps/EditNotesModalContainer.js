import React, {PropTypes} from 'react';
import Modal from '../../components/Modal';

class EditNotesModalContainer extends React.Component {
  static propTypes = {
    isEditNotesModalShown: PropTypes.bool.isRequired,
    onEditNotesModalClose: PropTypes.func.isRequired,
    onSaveNote: PropTypes.func.isRequired,
    testStep: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.onNoteValueChange = this.onNoteValueChange.bind(this);
    this.onSaveNote        = this.onSaveNote.bind(this);

    this.state = this.createStateObject(props);
  }

  createStateObject(props) {
    return {
      value: props.testStep ? (props.testStep.notes || '') : '',
      isEditNotesModalShown: props.isEditNotesModalShown
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.createStateObject(nextProps));
  }

  onNoteValueChange(event) {
    this.setState({ value: event.target.value });
  }

  onSaveNote() {
    this.props.onSaveNote(this.props.testStep, this.state.value)
      .then(() => this.setState({ isEditNotesModalShown: false }));
    // TODO(kklisura): Error handling.
  }

  render() {
    return (
      <Modal isShown={this.state.isEditNotesModalShown} onClose={this.props.onEditNotesModalClose} >
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title text-muted">Notes</h4>
        </div>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-12">
              <textarea className="form-control" cols="80" rows="10" value={this.state.value} onChange={this.onNoteValueChange} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-default" onClick={this.onSaveNote}>Save </button>
        </div>
      </Modal>
    );
  }
}

export default EditNotesModalContainer;
