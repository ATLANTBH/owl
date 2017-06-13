import React, {PropTypes} from 'react';
import {durationFormat} from '../../../utils/time';

class DurationFormat extends React.Component {
  static propTypes = {
    duration: PropTypes.number
  };

  render() {
    const duration = this.props.duration;
    let durationString = '-';
    if (duration != null) {
      durationString = durationFormat(this.props.duration);
    }

    return (
      <span>{durationString}</span>
    );
  }
}

export default DurationFormat;
