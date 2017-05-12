import React, { PropTypes } from 'react';
import classnames from 'classnames';
import style from './style.css';

class SuccessRate extends React.Component {
  static propTypes = {
    total: PropTypes.number,
    current: PropTypes.number
  };

  render() {
    if (this.props.current === null || this.props.total === null) {
      return null;
    }

    let percentage = 0;
    if (this.props.total) {
      percentage = Math.floor(((1 - (this.props.current/this.props.total)) * 100) * 100) / 100;
    }

    const labelClassName = (percentage === 100) ? "label-success" : "label-danger";

    return (
      <span className={classnames(style.successRate, labelClassName)}>{percentage}%</span>
    );
  }
}

export default SuccessRate;
