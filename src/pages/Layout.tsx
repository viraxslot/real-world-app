import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ApiClient } from '../api/api-client';
import { UserProfileBody } from '../api/types';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import AuthContext from '../context/auth-context';
import { CookieNames } from '../shared/constants';

export function Layout() {
  const { isAuthenticated, setAuth } = useContext(AuthContext);

  useEffect(() => {
    const getUserProfile = async () => {
      const token = Cookies.get(CookieNames.authToken) ?? '';
      if (!token) {
        return;
      }

      try {
        const response = await ApiClient.userProfile({ token });
        if (response.ok) {
          const body: UserProfileBody = await response.json();

          setAuth(() => {
            return {
              isAuthenticated: true,
              username: body?.user?.username,
            };
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUserProfile();
  }, [isAuthenticated, setAuth]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
