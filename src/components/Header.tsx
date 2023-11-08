import { NavLink } from 'react-router-dom';
import { PageName, Paths } from '../helpers/paths';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../store/reducers/loginStatus';
import { ReactNode } from 'react';
import { selectUsername } from '../store/reducers/userProfile';

type HeaderItemProps = {
  link: string;
  children: string | ReactNode;
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
  const isLoggedIn = useSelector(selectLoginStatus);
  const username = useSelector(selectUsername);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <HeaderItem link={Paths[PageName.Home]} children={PageName.Home} />
          {isLoggedIn ? (
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
                link={Paths[PageName.Profile](username as string)}
                children={
                  <>
                    <img src="" className="user-pic" />
                    {username}
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
