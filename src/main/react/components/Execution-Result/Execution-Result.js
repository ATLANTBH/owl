import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './style.css';

class ExecutionResult extends React.Component {
  static propTypes = {
    executionResult: PropTypes.string
  };

  render() {
    const iconExecutionFailed = <i className="glyphicon glyphicon-remove-sign" />;
    const iconExecutionSucceeded = <i className="glyphicon glyphicon-ok-sign" />;

    const isExecutionSucceeded = this.props.executionResult === 'passed';

    const iconResult = isExecutionSucceeded ? iconExecutionSucceeded : iconExecutionFailed;
    const textResult = isExecutionSucceeded ? 'Passed' : 'Failed';

    const labelClassName = isExecutionSucceeded ? "label-success" : "label-danger";

    const executionResultClassName = isExecutionSucceeded ? style.executionResultSuccess : style.executionResultFailed;

    return (
      <span onClick={this.props.onClick} className={classnames("label", labelClassName, executionResultClassName)}>{iconResult} {textResult}</span>
    );
  }
}

export default ExecutionResult;
