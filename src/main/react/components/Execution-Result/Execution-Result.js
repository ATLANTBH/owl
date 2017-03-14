import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './style.css';

class ExecutionResult extends React.Component {
  static propTypes = {
    executionResult: PropTypes.string
  };

  render() {
    let textResult = null;
    let iconResult = null;
    let executionResultClassName = null;
    let labelClassName = null;

    const executionResult = this.props.executionResult;
    switch (executionResult) {
      case 'passed':
        textResult = 'Passed';
        iconResult = <i className="glyphicon glyphicon-ok-sign" />;
        labelClassName = 'label-success';
        executionResultClassName = style.executionResultNoEvents;
        break;
      case 'failure':
        textResult = 'Failed';
        iconResult = <i className="glyphicon glyphicon-remove-sign" />;
        labelClassName = 'label-danger';
        executionResultClassName = style.executionResultFailed;
        break;
      case 'pending':
        textResult = 'Pending';
        iconResult = <i className="glyphicon glyphicon-time" />;
        labelClassName = 'label-warning';
        executionResultClassName = style.executionResultNoEvents;
        break;
    }

    return (
      <span onClick={this.props.onClick} className={classnames("label", labelClassName, executionResultClassName)}>{iconResult} {textResult}</span>
    );
  }
}

export default ExecutionResult;
