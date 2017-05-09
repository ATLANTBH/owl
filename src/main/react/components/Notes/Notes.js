import React, { PropTypes } from 'react';
// import classnames from 'classnames';
import Layout from '../../components/Layout';
import Modal from '../../components/Modal';


class Notes extends React.Component {
    constructor(props){
    super(props);
    
    this.onNoteClose = this.onNoteClose.bind(this);
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
    var date = new Date();

    this.setState({
      showNotes: false
    });
    if (this.state.value !== ""){
     this.setState({
       timestamp: date.toLocaleDateString() + ' \n' + date.toLocaleTimeString()
      });
    }
  }


 render() {
    const notes = this.props.note;

    return (
      <div>
        <button onClick={() => this.onNoteOpen(notes)}>Notes</button>
        <div>{this.state.timestamp}</div>

          <Modal isShown={this.state.showNotes} onClose={this.onNoteClose} >
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title text-muted">Notes</h4>
            </div>
            <div className="modal-body">
              <textarea cols="80" rows="10" value={this.state.value} onChange={this.handleChange}></textarea>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={ () => this.props.onClick(this.state.value)}>Save </button>
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </Modal>
      </div>
    );
  }
}

export default Notes;
