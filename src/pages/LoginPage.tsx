import { useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { ApiClient } from '../api/api-client';
import { SignInBody } from '../api/types';
import { ErrorList } from '../components/ErrorList';
import { AuthContext, AuthContextProps, defaultAuth } from '../context/auth-context';
import { PageName, Paths } from '../helpers/paths';
import { ErrorObject } from '../shared/types';
import { BasePage } from './BasePage';
import Cookies from 'js-cookie';
import { CookieNames } from '../shared/constants';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorObject | null>(null);
  const [auth, setAuth] = useState<AuthContextProps>(defaultAuth);

  useEffect(() => {
    console.log('login page: use effect, auth status:', auth.isAuthenticated);
    if (auth.isAuthenticated) {
      redirect(Paths[PageName.Home]);
    }
  }, [auth.isAuthenticated]);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log('login page: sign in');
    event.preventDefault();

    const response = await ApiClient.signIn({
      user: {
        email,
        password,
      },
    });

    const body: SignInBody = await response.json();
    if (body?.errors) {
      setErrors(body.errors);
    }

    if (response.ok && !body.errors) {
      console.log('login page: set state and cookie');
      setErrors(null);
      setAuth({
        isAuthenticated: true,
        username: body?.user?.username,
      });
      Cookies.set(CookieNames.authToken, body?.user?.token, { expires: 1 });
    }
  }

  const loginPage = (
    <AuthContext.Provider value={auth}>
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>

            {auth.isAuthenticated ? (
              <p className="text-xs-center">
                <Link to={Paths[PageName.Home]}>Go to home page</Link>
              </p>
            ) : (
              <p className="text-xs-center">
                <Link to={Paths[PageName.Register]}>Need an account?</Link>
              </p>
            )}

            <ErrorList errors={errors} />

            {auth.isAuthenticated ? (
              <p className="text-xs-center">Successfully logged in!</p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors(null);
                    }}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors(null);
                    }}
                  />
                </fieldset>
                <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );

  return <BasePage pageClass="auth-page" children={loginPage} />;
}
