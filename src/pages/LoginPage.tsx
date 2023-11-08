import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { PageName, Paths } from '../helpers/paths';
import { useState } from 'react';
import { ApiClient } from '../api/api-client';
import { SignInBody } from '../api/types';
import { ErrorObject } from '../shared/types';
import { ErrorList } from '../components/ErrorList';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ErrorObject | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    if (response.status === 200 && !body.errors) {
      setErrors(null);
      setIsLoggedIn(true);
    }
  }

  return (
    <div className="auth-page">
      <Header />
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>

            {isLoggedIn ? (
              <p className="text-xs-center">
                <Link to={Paths[PageName.Home]}>Go to home page</Link>
              </p>
            ) : (
              <p className="text-xs-center">
                <Link to={Paths[PageName.Register]}>Need an account?</Link>
              </p>
            )}

            <ErrorList errors={errors} />

            {isLoggedIn ? (
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
      <Footer />
    </div>
  );
}
