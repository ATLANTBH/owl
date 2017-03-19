import React, { PropTypes } from 'react';
import dateformat from 'dateformat';

class DurationFormat extends React.Component {
  static propTypes = {
    duration: PropTypes.number,
  };

  render() {
    const durationString = durationFormat(this.props.duration);
    return (
      <span>{durationString}</span>
    );
  }
}

function round(value) {
  return Math.floor(value * 100) / 100;
}

export function durationFormat(duration) {
  if (duration === null) {
    return '-';
  }

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

  return durationString;
}

export default DurationFormat;
