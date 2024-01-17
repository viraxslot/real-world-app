import Cookies from 'js-cookie';
import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ApiClient } from '../../api/api-client';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import AuthContext from '../../context/auth-context';
import { CookieNames } from '../../shared/constants';

export function Layout() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const getUserProfile = async () => {
      const token = Cookies.get(CookieNames.authToken) ?? '';
      if (!token) {
        return;
      }

      try {
        const profileBody = await ApiClient.userProfile({ token });
        setAuth({
          isAuthenticated: true,
          username: profileBody?.user?.username,
        });
      } catch (err) {
        console.error(err);
      }
    };

    getUserProfile();
  }, [setAuth]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
