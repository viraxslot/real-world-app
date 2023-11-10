import { ReactNode, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import { PageName, Paths } from '../helpers/paths';

type HeaderItemProps = {
  link: string;
  children: ReactNode;
};

function HeaderItem({ link, children }: HeaderItemProps) {
  return (
    <li className="nav-item">
      <NavLink
        to={link}
        className={({ isActive, isPending }) =>
          `nav-link ${isPending ? 'pending' : isActive ? 'active' : ''}`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export function Header() {
  const auth = useContext(AuthContext);
  console.log(`Header: ${auth.isAuthenticated}, ${auth.username}`);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <HeaderItem link={Paths[PageName.Home]} children={PageName.Home} />
          {auth.isAuthenticated ? (
            <>
              <HeaderItem
                link={Paths[PageName.Editor]}
                children={
                  <>
                    <i className="ion-compose"></i>
                    &nbsp;{PageName.Editor}
                  </>
                }
              />
              <HeaderItem
                link={Paths[PageName.Settings]}
                children={
                  <>
                    <i className="ion-gear-a"></i>&nbsp;{PageName.Settings}
                  </>
                }
              />
              <HeaderItem
                link={Paths[PageName.Profile](auth.username as string)}
                children={
                  <>
                    <img src="" className="user-pic" />
                    {auth.username}
                  </>
                }
              />
            </>
          ) : (
            <>
              <HeaderItem link={Paths[PageName.Login]} children={PageName.Login} />
              <HeaderItem link={Paths[PageName.Register]} children={PageName.Register} />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
