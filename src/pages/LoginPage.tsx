import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiClient } from '../api/api-client';
import { SignInBody } from '../api/types';
import { ErrorList } from '../components/ErrorList/ErrorList';
import AuthContext from '../context/auth-context';
import { PageName, Paths } from '../helpers/paths';
import { ClientErrors } from '../shared/client-errors';
import { CookieNames } from '../shared/constants';
import { BasePage } from './BasePage';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[] | null>(null);
  const { isAuthenticated, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setErrors(null);
  }, [email, password]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(Paths[PageName.Home], { replace: true });
    }
    setEmail('');
    setPassword('');
  }, [isAuthenticated, navigate]);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await ApiClient.signIn({
      user: {
        email,
        password,
      },
    });

    let body: SignInBody = {} as SignInBody;
    try {
      body = await response.json();
    } catch (err) {
      console.error(err);
    }

    if (!response.ok) {
      if (body?.errors) {
        setErrors(body.errors);
      }
      setErrors([ClientErrors.invalidCredentials]);
    } else {
      setErrors(null);
      setAuth(() => {
        return {
          isAuthenticated: true,
          username: body?.user?.username,
        };
      });
      Cookies.set(CookieNames.authToken, body?.user?.token, {
        expires: 1,
        secure: true,
        sameSite: 'strict',
      });
    }
  }

  const loginPage = (
    <div className="container page">
      <div className="row">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">Sign in</h1>

          <p className="text-xs-center">
            <Link to={Paths[PageName.Register]}>Need an account?</Link>
          </p>

          <ErrorList errors={errors} />

          <form onSubmit={handleFormSubmit}>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );

  return <BasePage pageClass="auth-page" children={loginPage} />;
}
