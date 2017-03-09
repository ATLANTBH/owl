import React, { PropTypes } from 'react';
import classnames from 'classnames';

function createPageItem(number, activeNumber, isDisabled = false) {
  const isActive = number === (activeNumber + 1);
  const className = (isDisabled ? 'disabled' : '') || (isActive ? 'active' : '');
  // TODO(kklisura): Use react router link instead of a tag.
  return <li className={className}><a >{number}</a></li>
}

class Pagination extends React.Component {
  static propTypes = {
    paginatedResponse: PropTypes.shape({
      totalElements: PropTypes.number,
      totalPages: PropTypes.number,
      size: PropTypes.number,
      number: PropTypes.number,
      first: PropTypes.bool,
      last: PropTypes.bool,
      numberOfElements: PropTypes.number
    })
  };

  render() {
    const numberOfViewPages = 5;

    const paginatedResponse = this.props.paginatedResponse;
    const activePageNumber = paginatedResponse.number;

    // TODO(kklisura): Use react router link instead of a tag.
    const previous = paginatedResponse.first ?
      null:
      <li>
        <a aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>;

    // TODO(kklisura): Use react router link instead of a tag.
    const next = paginatedResponse.last ?
      null:
      <li>
        <a aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>;

    const pages = [];

    let hasLastElement = false;
    let hasSecondToLastElement = false;

    let hasFirstElement = false;
    let hasSecondToFirstElement = false;

    const lowerPage = Math.max(0, activePageNumber - numberOfViewPages);
    const higherPage = Math.min(paginatedResponse.totalPages, activePageNumber + numberOfViewPages);

    for (let i = lowerPage; i < higherPage; i++) {
      const pageNumber = i + 1;
      pages.push(createPageItem(pageNumber, activePageNumber));

      hasFirstElement = hasFirstElement || pageNumber === 1;
      hasSecondToFirstElement = hasSecondToFirstElement || pageNumber <= 2;

      hasSecondToLastElement = pageNumber >= paginatedResponse.totalPages - 1;
      hasLastElement = pageNumber === paginatedResponse.totalPages;
    }

    if (!hasSecondToLastElement) {
      pages.push(createPageItem('...', activePageNumber, true));
    }

    if (!hasLastElement) {
      pages.push(createPageItem(paginatedResponse.totalPages, activePageNumber));
    }

    if (!hasSecondToFirstElement) {
      pages.unshift(createPageItem('...', activePageNumber, true));
    }

    if (!hasFirstElement) {
      pages.unshift(createPageItem(1, activePageNumber));
    }

    return (
      <nav aria-label="Page navigation" className="text-center">
        <ul className="pagination">
          {previous}
          {pages}
          {next}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
