import { Link } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { PageName, Paths } from '../helpers/paths';
import { useState } from 'react';
import { ApiClient } from '../api/api-client';
import { ErrorObject, SignUpBody } from '../api/types';

export default function SignUpPage() {
  const [errors, setErrors] = useState<ErrorObject>({});
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreated, setUserCreated] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
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
      setUserCreated(true);
    }
  }

  return (
    <div id="sign-up-page">
      <Header />
      <div className="auth-page">
        <div className="container page">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>

            <p className="text-xs-center">
              <Link to={Paths[PageName.Login]}>
                {userCreated ? 'Go to login page' : 'Have an account?'}
              </Link>
            </p>

            {Object.keys(errors).length > 0 ? (
              <ul className="error-messages">
                {Object.keys(errors).map((key) => (
                  <li>
                    {key} {errors[key][0]}
                  </li>
                ))}
              </ul>
            ) : null}

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
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </fieldset>
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
                <button className="btn btn-lg btn-primary pull-xs-right">Sign up</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
