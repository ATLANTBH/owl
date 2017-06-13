import React, {PropTypes} from 'react';
import classNames from 'classnames';
import style from './style.css';
import {capitalize} from '../../../utils/string';

const EXECUTION_RESULT_MAPPING = {
  passed: {
    iconResult: <i className="glyphicon glyphicon-ok-sign" />,
    labelClassName: 'label-success',
    executionResultClassName: style.executionResultNoEvents
  },
  failed:{
    iconResult: <i className="glyphicon glyphicon-remove-sign" />,
    labelClassName: 'label-danger',
    executionResultClassName: style.executionResultFailed
  },
  pending: {
    iconResult: <i className="glyphicon glyphicon-time" />,
    labelClassName: 'label-warning',
    executionResultClassName: style.executionResultNoEvents
  }
};

class ExecutionResult extends React.Component {
  static propTypes = {
    executionResult: PropTypes.string
  };

  render() {
    const executionResult = this.props.executionResult;
    const executionResultMap = EXECUTION_RESULT_MAPPING[executionResult];
    if (!executionResultMap) {
      console.error('Uknown execution result', executionResult);
      return null;
    }

    const textResult = capitalize(executionResult);

    const iconResult = executionResultMap.iconResult;
    const labelClassName = executionResultMap.labelClassName;
    const executionResultClassName = executionResultMap.executionResultClassName;

    return (
      <span onClick={this.props.onClick}
            className={classNames('label', labelClassName, executionResultClassName)}>
        {iconResult} {textResult}
      </span>
    );
  }
}

export default ExecutionResult;
