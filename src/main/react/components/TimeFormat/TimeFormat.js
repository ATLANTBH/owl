import React, { PropTypes } from 'react';
import dateformat from 'dateformat';

class TimeFormat extends React.Component {
  static propTypes = {
    time: PropTypes.number.isRequired,
    format: PropTypes.string
  };

  render() {
    const format = this.props.format || 'dd/mm/yyyy';
    const dateString = dateformat(new Date(this.props.time), format);

    return (
      <span>{dateString}</span>
    );
  }
}

export default TimeFormat;
