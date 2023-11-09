import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiClient } from '../api/api-client';
import { SignUpBody } from '../api/types';
import { ErrorList } from '../components/ErrorList';
import { PageName, Paths } from '../helpers/paths';
import { ErrorObject } from '../shared/types';
import { BasePage } from './BasePage';

export function RegisterPage() {
  const [errors, setErrors] = useState<ErrorObject | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreated, setUserCreated] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await ApiClient.signUp({
      user: {
        username,
        email,
        password,
      },
    });

    const body: SignUpBody = await response.json();
    if (body?.errors) {
      setErrors(body.errors);
    }

    if (response.status == 200 && !body?.errors) {
      setErrors(null);
      setUserCreated(true);
    }
  }

  const registerPage = (
    <div className="container page">
      <div className="col-md-6 offset-md-3 col-xs-12">
        <h1 className="text-xs-center">Sign up</h1>

        <p className="text-xs-center">
          <Link to={Paths[PageName.Login]}>
            {userCreated ? 'Go to login page' : 'Have an account?'}
          </Link>
        </p>

        <ErrorList errors={errors} />

        {userCreated ? (
          <p className="text-xs-center">User successfully created!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <fieldset className="form-group">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setErrors(null);
                }}
              />
            </fieldset>
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
            <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        )}
      </div>
    </div>
  );

  return <BasePage pageClass="auth-page" children={registerPage} />;
}
