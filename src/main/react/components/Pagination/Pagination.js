import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router'

function createPageItem(number, activeNumber, isDisabled = false, index = 0, linkFunction) {
  const isActive = number === activeNumber;
  const className = (isDisabled ? 'disabled' : '') || (isActive ? 'active' : '');
  return <li key={index} className={className}>
    {linkFunction(number, number === '...' ? number : null)}
  </li>;
}

function createLink(to, size) {
  return function (page, customTitle) {
    const title = customTitle ? customTitle : (page + 1);
    return <Link to={{
      pathname: to,
      query: { page, size }
    }}>{title}</Link>;
  }
}

class Pagination extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
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
    const numberOfViewPages = 4;

    const paginatedResponse = this.props.paginatedResponse;
    const activePageNumber = paginatedResponse.number;

    const link = createLink(this.props.to, paginatedResponse.size);

    const previous = paginatedResponse.first ?
      null:
      <li>{link(activePageNumber - 1, <span aria-hidden="true">&laquo;</span>)}</li>;

    const next = paginatedResponse.last ?
      null:
      <li>{link(activePageNumber + 1, <span aria-hidden="true">&raquo;</span>)}</li>;

    const pages = [];

    const lowerPage = Math.max(0, activePageNumber - numberOfViewPages);
    const higherPage = Math.min(paginatedResponse.totalPages, activePageNumber + numberOfViewPages);

    let hasLastElement = lowerPage === higherPage;
    let hasSecondToLastElement = lowerPage === higherPage;

    let hasFirstElement = false;
    let hasSecondToFirstElement = lowerPage === higherPage;

    for (let i = lowerPage; i < higherPage; i++) {
      const pageNumber = i;
      pages.push(createPageItem(pageNumber, activePageNumber, false, i, link));

      hasFirstElement = hasFirstElement || pageNumber === 0;
      hasSecondToFirstElement = hasSecondToFirstElement || pageNumber <= 1;

      hasSecondToLastElement = pageNumber >= paginatedResponse.totalPages - 2;
      hasLastElement = pageNumber === paginatedResponse.totalPages - 1;
    }

    if (!hasSecondToLastElement) {
      pages.push(createPageItem('...', activePageNumber, true, -1, link));
    }

    if (!hasLastElement) {
      pages.push(createPageItem(paginatedResponse.totalPages - 1, activePageNumber, false, -2, link));
    }

    if (!hasSecondToFirstElement) {
      pages.unshift(createPageItem('...', activePageNumber, true, -3, link));
    }

    if (!hasFirstElement) {
      pages.unshift(createPageItem(0, activePageNumber, false, -4, link));
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
