import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import classnames from 'classnames';
import style from './style.css';

class TableHeader extends React.Component {
  static propTypes = {
    sortKey: PropTypes.string
  };

  constructor() {
    super();
    this.onSort = this.onSort.bind(this);
  }

  onSort() {
    if (this.props.sortKey) {
      const sortDirection = this.getSortDirection() === 'asc' ? 'desc' : 'asc';
      const currentLocation = browserHistory.getCurrentLocation();

      browserHistory.push({
        pathname: currentLocation.pathname,
        query: {
          ...currentLocation.query,
          sort: [this.props.sortKey, sortDirection].join(',')
        }
      });
    }
  }

  getSortDirection() {
    const sortQuery = browserHistory.getCurrentLocation().query.sort;
    if (sortQuery) {
      const [sortKey, sortDirection] = sortQuery.split(',');
      if (sortKey && sortDirection && sortKey === this.props.sortKey) {
        return sortDirection;
      }
    }

    return null;
  }

  render() {
    if (this.props.sortKey) {
      const sortDirection = this.getSortDirection();
      let sortDirectionIndicator = null;

      if (sortDirection) {
        let indicatorClassName = sortDirection === 'asc' ?
          'glyphicon glyphicon-chevron-down' :
          'glyphicon glyphicon-chevron-up';

        sortDirectionIndicator = <i className={classnames(style.sortIndicator, indicatorClassName)}></i>

        return (
          <th className={style.sortableTableHeader} onClick={this.onSort}>
            {sortDirectionIndicator}
            <span className={style.tableHeaderName}>{this.props.children}</span>
          </th>
        );
      }

      return (
        <th className={style.sortableTableHeader} onClick={this.onSort}>{this.props.children}</th>
      );
    }

    return (
      <th>{this.props.children}</th>
    );
  }
}

export default TableHeader;
