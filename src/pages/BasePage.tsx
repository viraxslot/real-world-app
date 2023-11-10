import Cookies from 'js-cookie';
import { ReactNode, useContext, useEffect } from 'react';
import { ApiClient } from '../api/api-client';
import { UserProfileBody } from '../api/types';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import AuthContext from '../context/auth-context';
import { CookieNames } from '../shared/constants';

export type BasePageProps = {
  pageClass: string;
  children: ReactNode;
};

export function BasePage({ pageClass, children }: BasePageProps) {
  const { setAuth } = useContext(AuthContext);

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

          setAuth({
            isAuthenticated: true,
            username: body?.user?.username,
          });
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUserProfile();
  });

  return (
    <div className={pageClass}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
