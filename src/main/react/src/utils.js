import { browserHistory } from 'react-router';

export function updateQueryParams(params) {
  const location = Object.assign({}, browserHistory.getCurrentLocation());
  Object.assign(location.query, params);
  browserHistory.push(location);
}
