import React, {PropTypes} from 'react';
import Modal from '../../components/Modal';
import { Link } from 'react-router'
import FeatureToggle, {whenFeatureToggled} from '../../components/ui/FeatureToggle';

class ExecutionResultModalContainer extends React.Component {
  static propTypes = {
    isExecutionResultShown: PropTypes.bool.isRequired,
    onExecutionResultModalClose: PropTypes.func.isRequired,
    currentExecutionResult: PropTypes.any,
    currentExecutionResultImage: PropTypes.any
  };

  render() {
    let screenshotButton = null;
    if (this.props.currentExecutionResultImage) {
      screenshotButton = <a type="button" className="btn btn-primary pull-left" href={this.props.currentExecutionResultImage}>Screenshot</a>;
    }
    return (
      <Modal isShown={this.props.isExecutionResultShown} onClose={this.props.onExecutionResultModalClose}>
        <div className="modal-header">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 className="modal-title text-muted">Failed Execution Result</h4>
        </div>
        <div className="modal-body">
          <p>{this.props.currentExecutionResult}</p>
        </div>
        <div className="modal-footer">
          <FeatureToggle  toggleKey="screenshotUrlFeatureToggle">
            {screenshotButton}
          </FeatureToggle>
          <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </Modal>
    );
  }
}

export default ExecutionResultModalContainer;
