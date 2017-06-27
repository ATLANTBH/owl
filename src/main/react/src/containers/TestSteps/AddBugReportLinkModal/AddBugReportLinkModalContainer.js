import React, {PropTypes} from 'react';
import Modal from '../../../components/Modal';
import classNames from 'classnames';

class AddBugReportLinkModalContainer extends React.Component {
  static propTypes = {
    isAddBugReportLinkModalShown: PropTypes.bool.isRequired,
    onAddBugReportLinkModalClose: PropTypes.func.isRequired,
    onAddBugReportLink: PropTypes.func.isRequired,
    testStep: PropTypes.any
  };

  constructor(props) {
    super(props);

    this.onAddBugReportLink   = this.onAddBugReportLink.bind(this);

    this.state = createStateObject(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(createStateObject(nextProps));
  }

  onAddBugReportLink() {
    this.props.onAddBugReportLink(this.props.testStep, this.state.bugTitle, this.state.bugUrl)
      .then(() => this.setState({ isAddBugReportLinkModalShown: false }));
  }

  render() {
    return (
      <Modal isShown={this.state.isAddBugReportLinkModalShown} onClose={this.props.onAddBugReportLinkModalClose} >
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title text-muted">Add Bug Report Link</h4>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Report Title</label>
            <input className="form-control"
                   placeholder="Report Title"
                   value={this.state.bugTitle}
                   onChange={onInputPropertyChanged(this, 'bugTitle')}/>
          </div>

          <div className="form-group">
            <label>Report URL</label>
            <input className="form-control"
                   placeholder="Report URL"
                   value={this.state.bugUrl}
                   onChange={onInputPropertyChanged(this, 'bugUrl')}/>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-default" onClick={this.onAddBugReportLink}>Save </button>
        </div>
      </Modal>
    );
  }
}

function createStateObject(props) {
  return {
    bugTitle: props.testStep ? (props.testStep.bugTitle || '') : '',
    bugUrl: props.testStep ? (props.testStep.bugUrl || '') : '',
    isAddBugReportLinkModalShown: props.isAddBugReportLinkModalShown
  }
}

function onInputPropertyChanged(ctx, propertyName) {
  return function (event) {
    const state = {};
    state[propertyName] = event.target.value;
    ctx.setState(state);
  }
}

export default AddBugReportLinkModalContainer;
