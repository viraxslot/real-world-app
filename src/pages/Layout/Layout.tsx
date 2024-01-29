import { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ApiClient } from '../../api/api-client';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';
import AuthContext from '../../context/auth-context';
import cookieHelper from '../../helpers/cookie.helper';

export function Layout() {
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const getUserProfile = async () => {
      const token = cookieHelper.get('jwt-token') ?? '';
      if (!token) {
        return;
      }

      try {
        const profileBody = await ApiClient.userProfile(token);
        setAuth({
          isAuthenticated: true,
          username: profileBody?.user?.username,
          token,
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
