import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { AuthContextProps } from '../../context/types';
import { Header } from './Header';
import { HEADER_LOCATORS } from './Header.locators';

const mount = ({ isAuthenticated, username, setAuth }: AuthContextProps) => {
  render(
    <AuthContext.Provider value={{ isAuthenticated, username, setAuth }}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </AuthContext.Provider>,
  );
};

describe('Header', () => {
  const defaultNavLinks = [
    {
      name: 'site link',
      locator: HEADER_LOCATORS.siteLink,
      text: 'conduit',
      link: '/',
    },
    {
      name: 'home page',
      locator: HEADER_LOCATORS.homePage,
      text: 'Home',
      link: '/',
    },
    {
      name: 'login page',
      locator: HEADER_LOCATORS.loginPage,
      text: 'Sign in',
      link: '/login',
    },
    {
      name: 'register page',
      locator: HEADER_LOCATORS.registerPage,
      text: 'Sign up',
      link: '/register',
    },
  ];

  defaultNavLinks.forEach((element) => {
    it(`renders item ${element.name} when not authenticated`, () => {
      mount({ isAuthenticated: false, username: 'test', setAuth: () => {} });

      const el = screen.getByTestId(element.locator);
      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent(element.text);
      expect(el).toHaveAttribute('href', element.link);

      expect(screen.queryByTestId(HEADER_LOCATORS.editorPage)).not.toBeInTheDocument();
      expect(screen.queryByTestId(HEADER_LOCATORS.settingsPage)).not.toBeInTheDocument();
      expect(screen.queryByTestId(HEADER_LOCATORS.profilePage)).not.toBeInTheDocument();
      expect(screen.queryByTestId(HEADER_LOCATORS.logoutButon)).not.toBeInTheDocument();
    });
  });

  const authUserNavLinks = [
    {
      name: 'home page',
      locator: HEADER_LOCATORS.homePage,
      text: 'Home',
      link: '/',
    },
    {
      name: 'editor page',
      locator: HEADER_LOCATORS.editorPage,
      text: 'New Article',
      link: '/editor',
    },
    {
      name: 'settings page',
      locator: HEADER_LOCATORS.settingsPage,
      text: 'Settings',
      link: '/settings',
    },
    {
      name: 'profile page',
      locator: HEADER_LOCATORS.profilePage,
      link: '/profile/test user',
    },
    {
      name: 'logout button',
      locator: HEADER_LOCATORS.logoutButon,
      text: 'Logout',
      link: null,
    },
  ];

  authUserNavLinks.forEach((element) => {
    it(`renders item ${element.name} when authenticated`, () => {
      const username = 'test user';
      mount({ isAuthenticated: true, username, setAuth: () => {} });

      const el = screen.getByTestId(element.locator);
      expect(el).toBeInTheDocument();
      expect(el).toHaveTextContent(element.text ?? username);
      element.link ? expect(el).toHaveAttribute('href', element.link) : null;

      expect(screen.queryByTestId(HEADER_LOCATORS.loginPage)).not.toBeInTheDocument();
      expect(screen.queryByTestId(HEADER_LOCATORS.registerPage)).not.toBeInTheDocument();
    });
  });

  it('changes state on logout button', async () => {
    const setAuth = vi.fn();
    mount({ isAuthenticated: true, username: 'test', setAuth });
    const user = userEvent.setup();

    expect(screen.getByTestId(HEADER_LOCATORS.logoutButon)).toBeInTheDocument();
    await user.click(screen.getByTestId(HEADER_LOCATORS.logoutButon));
    expect(setAuth).toHaveBeenCalledTimes(1);
  });
});
