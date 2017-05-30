import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';
import style from './style.css'
import editNotesBtn from './edit-notes-btn.png';
import $ from 'jquery';

class Notes extends React.Component {
  constructor(props){
    super(props);
    
    this.onNoteClose = this.onNoteClose.bind(this);
    this.onSaveNote = this.onSaveNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    this.state = {
      showNotes: false,
      currentNote: null,
      value: '',
      timestamp: null,
    }
  }

   handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  onNoteOpen(note){
    if (note === null) note = ""
    this.setState({
      showNotes: true,
      value: note
    });
  }

  onNoteClose(){
    this.setState({
      showNotes: false
    });
  }

  onSaveNote() {
    const promiseResult = this.props.onClick(this.state.value);
    if (promiseResult) {
      promiseResult.then(() => {
        this.onNoteClose()
        $(".modal-backdrop").remove()
      });
    }
  }

 render() {
    const notes = this.props.note;

    return (
      <div className={style.notesWrapper}>
        <img src={editNotesBtn} alt="Edit notes" className={style.button} onClick={() => this.onNoteOpen(notes)} />
        <Modal isShown={this.state.showNotes} onClose={this.onNoteClose} >
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title text-muted">Notes</h4>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-12">
                <textarea className="form-control" cols="80" rows="10" value={this.state.value} onChange={this.handleChange}></textarea>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-default" onClick={this.onSaveNote}>Save </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Notes;
