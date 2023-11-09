import Cookies from 'js-cookie';
import { ReactNode, useEffect, useState } from 'react';
import { ApiClient } from '../api/api-client';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { CookieNames } from '../shared/constants';
import { AuthContext, AuthContextProps, defaultAuth } from '../context/auth-context';
import { UserProfileBody } from '../api/types';

export type BasePageProps = {
  pageClass: string;
  children: ReactNode;
};

export function BasePage({ pageClass, children }: BasePageProps) {
  const [auth, setAuth] = useState<AuthContextProps>(defaultAuth);

  useEffect(() => {
    console.log('base page: use effect');
    const getUserProfile = async () => {
      const token = Cookies.get(CookieNames.authToken) ?? '';
      if (!token) {
        return;
      }

      try {
        const response = await ApiClient.userProfile({ token });
        if (response.ok) {
          const body: UserProfileBody = await response.json();
          console.log('current user', body.user.username);

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
  }, []);

  return (
    <AuthContext.Provider value={auth}>
      <div className={pageClass}>
        <Header />
        {children}
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}
