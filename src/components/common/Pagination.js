import React from "react";
import _ from "lodash";

const Pagination = props => {
  const pagesCount = Math.ceil(props.articlesCount / props.pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1); // retuen an array [1, ....]
  return (
    <nav>
      <ul className="pagination" style={{ display: "inline-block" }}>
        {pages.map(page => (
          <li
            key={page}
            className={
              page === props.currentPage ? "page-item active" : "page-item"
            }
          >
            <a className="page-link" onClick={() => props.onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
