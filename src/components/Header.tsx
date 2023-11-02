import { PageName, Paths } from '../helpers/paths';

export type HeaderOptions = {
  currentPage: PageName;
  pages: PageName[];
  setCurrentPage: (page: PageName) => void;
};

export function Header({ pages, currentPage, setCurrentPage }: HeaderOptions) {
  console.log(`current page ${currentPage}`);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          {pages.map((page: PageName, idx: number) => {
            console.log(`page ${page}`);
            return (
              <li className="nav-item" key={idx} onClick={() => setCurrentPage(page)}>
                <a
                  className={page === currentPage ? 'nav-link active' : 'nav-link'}
                  href={Paths[page]()}
                >
                  {page}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
