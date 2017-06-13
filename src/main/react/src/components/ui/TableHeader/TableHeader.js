import React, {PropTypes} from 'react';
import classNames from 'classnames';
import style from './style.css';
import {updateQueryParams, getQueryParams, removeQueryParam} from '../../../utils/location';

const NONE_SORT = 'none';
const ASC_SORT  = 'asc';
const DESC_SORT = 'desc';

const SORT_STATE_MAP = {
  'none': ASC_SORT,
  'asc':  DESC_SORT,
  'desc': NONE_SORT
};

const SORT_DIRECTION_INDICATOR = {
  'none': '',
  'asc':  'glyphicon glyphicon-triangle-bottom',
  'desc': 'glyphicon glyphicon-triangle-top'
};

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
      const sortDirection = this.getNextSortDirection();
      let sort = [this.props.sortKey, sortDirection].join(',');
      if (sortDirection === NONE_SORT) {
        removeQueryParam('sort');
      } else {
        updateQueryParams({ sort });
      }
    }
  }

  getNextSortDirection() {
    return SORT_STATE_MAP[this.getSortDirection()] || NONE_SORT;
  }

  getSortDirection() {
    const sortQuery = getQueryParams().sort;
    if (sortQuery) {
      const [sortKey, sortDirection] = sortQuery.split(',');

      if (sortKey && sortDirection && sortKey === this.props.sortKey) {
        return sortDirection;
      }
    }

    return NONE_SORT;
  }

  render() {
    if (this.props.sortKey) {
      const sortDirection = this.getSortDirection();
      let sortDirectionIndicator = null;

      let indicatorClassName = SORT_DIRECTION_INDICATOR[sortDirection];
      if (indicatorClassName) {
        sortDirectionIndicator = <i className={classNames(style.sortIndicator, indicatorClassName)} />;
      }

      return (
        <th className={style.sortableTableHeader} onClick={this.onSort}>
          {sortDirectionIndicator}
          <span className={style.tableHeaderName}>{this.props.children}</span>
        </th>
      );
    }

    return (
      <th>{this.props.children}</th>
    );
  }
}

export default TableHeader;
