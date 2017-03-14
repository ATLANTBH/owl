import React, { PropTypes } from 'react';
import dateformat from 'dateformat';

class DurationFormat extends React.Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
  };

  render() {
    const duration = this.props.duration;

    let durationString = round(duration) + 's';

    if (duration < 1) {
      durationString = Math.floor(duration * 1000) + 'ms';
    } else {
      if (duration > 60) {
        let minutes = duration / 60;
        if (minutes > 60) {
          let hours = minutes / 60;
          durationString = Math.floor(hours) + 'h ' + Math.floor(minutes % 60) + 'm ' + Math.floor(duration % 60);
        } else {
          durationString = Math.floor(minutes) + 'm ' + Math.floor(duration % 60) + 's';
        }
      }
    }

    return (
      <span>{durationString}</span>
    );
  }
}

function round(value) {
  return Math.floor(value * 100) / 100;
}

export default DurationFormat;
