import { NavLink } from 'react-router-dom';
import { PageName, Paths } from '../helpers/paths';
import { clsx } from 'clsx';

const pages = [PageName.Home, PageName.Login, PageName.Register];

export function Header() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          {pages.map((page: PageName, idx: number) => {
            return (
              <li className="nav-item" key={idx}>
                <NavLink
                  to={Paths[page]}
                  className={({ isActive, isPending }) =>
                    clsx('nav-link', isPending && 'pending', isActive && 'active')
                  }
                >
                  {page}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
