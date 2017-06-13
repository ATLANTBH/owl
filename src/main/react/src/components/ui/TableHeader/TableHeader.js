import React, {PropTypes} from 'react';
import classNames from 'classnames';
import style from './style.css';
import {updateQueryParams, getQueryParams} from '../../../utils/location';

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
      const sort = [this.props.sortKey, sortDirection].join(',');

      updateQueryParams({ sort });
    }
  }

  getSortDirection() {
    const sortQuery = getQueryParams().sort;
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
        let indicatorClassName = sortDirection === 'asc' ? 'glyphicon glyphicon-triangle-bottom' :
                                                           'glyphicon glyphicon-triangle-top';

        sortDirectionIndicator = <i className={classNames(style.sortIndicator, indicatorClassName)} />;

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
