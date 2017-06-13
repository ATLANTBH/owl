
/**
 * Returns duration string given duration in seconds as float number.
 *
 * @param duration {Number} Duration in seconds.
 * @returns Duration string, ie 100ms, 4s, 4m 4s, 1h 70m
 */
export function durationFormat(duration) {
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

function round(value) {
  return Math.floor(value * 100) / 100;
}
