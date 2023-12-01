import Cookies from 'js-cookie';
import { ReactNode, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { defaultAuth } from '../../context/auth-data';
import { PageName, Paths } from '../../helpers/paths';
import { CookieNames } from '../../shared/constants';
import { HEADER_LOCATORS } from './Header.locators';
import clsx from 'clsx';

type HeaderItemProps = {
  link: string;
  children: ReactNode;
  dataTestId: string;
};

function HeaderItem({ link, children, dataTestId }: HeaderItemProps) {
  return (
    <li className="nav-item">
      <NavLink
        to={link}
        className={({ isActive, isPending }) =>
          clsx('nav-link', isPending && 'pending', isActive && 'active')
        }
        data-testid={dataTestId}
      >
        {children}
      </NavLink>
    </li>
  );
}

export function Header() {
  const { isAuthenticated, username, setAuth } = useContext(AuthContext);

  function handleLogout() {
    setAuth({ ...defaultAuth });
    Cookies.remove(CookieNames.authToken);
  }

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink
          className="navbar-brand"
          to={Paths[PageName.Home]}
          data-testid={HEADER_LOCATORS.siteLink}
        >
          conduit
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <HeaderItem
            link={Paths[PageName.Home]}
            children={PageName.Home}
            dataTestId={HEADER_LOCATORS.homePage}
          />
          {isAuthenticated ? (
            <>
              <HeaderItem
                link={Paths[PageName.Editor]}
                children={
                  <>
                    <i className="ion-compose"></i>
                    &nbsp;{PageName.Editor}
                  </>
                }
                dataTestId={HEADER_LOCATORS.editorPage}
              />
              <HeaderItem
                link={Paths[PageName.Settings]}
                children={
                  <>
                    <i className="ion-gear-a"></i>&nbsp;{PageName.Settings}
                  </>
                }
                dataTestId={HEADER_LOCATORS.settingsPage}
              />
              <HeaderItem
                link={Paths[PageName.Profile](username as string)}
                children={
                  <>
                    <img src="" className="user-pic" />
                    {username}
                  </>
                }
                dataTestId={HEADER_LOCATORS.profilePage}
              />
            </>
          ) : (
            <>
              <HeaderItem
                link={Paths[PageName.Login]}
                children={PageName.Login}
                dataTestId={HEADER_LOCATORS.loginPage}
              />
              <HeaderItem
                link={Paths[PageName.Register]}
                children={PageName.Register}
                dataTestId={HEADER_LOCATORS.registerPage}
              />
            </>
          )}
          {isAuthenticated && (
            <button
              className="nav-item btn"
              onClick={handleLogout}
              data-testid={HEADER_LOCATORS.logoutButon}
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
}
