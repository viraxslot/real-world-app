import clsx from 'clsx';
import { range } from 'lodash';

export type PaginationProps = {
  currentPage: number;
  pagesCount: number;
  setCurrentPage: (page: number) => void;
};

export function Pagination({ currentPage, pagesCount, setCurrentPage }: PaginationProps) {
  return (
    <ul className="pagination">
      {range(1, pagesCount + 1).map((pageNum) => {
        return (
          <li
            key={pageNum}
            className={clsx('page-item', pageNum === currentPage && 'active')}
            onClick={() => setCurrentPage(pageNum)}
          >
            <a className="page-link" href="" onClick={(e) => e.preventDefault()}>
              {pageNum}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
