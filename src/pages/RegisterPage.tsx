import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiClient } from '../api/api-client';
import { SignUpBody } from '../api/types';
import { ErrorList } from '../components/ErrorList/ErrorList';
import { PageName, Paths } from '../helpers/paths';

export function RegisterPage() {
  const [errors, setErrors] = useState<string[] | null>(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userCreated, setUserCreated] = useState(false);

  useEffect(() => {
    setErrors(null);
  }, [username, email, password]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await ApiClient.signUp({
      user: {
        username,
        email,
        password,
      },
    });

    let body: SignUpBody = {} as SignUpBody;
    try {
      body = await response.json();
    } catch (err) {
      console.error(err);
    }

    if (body?.errors) {
      setErrors(body.errors);
    }

    if (response.ok && !body?.errors) {
      setErrors(null);
      setUserCreated(true);
    }
  }

  return (
    <div className="auth-page">
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
  );
}
