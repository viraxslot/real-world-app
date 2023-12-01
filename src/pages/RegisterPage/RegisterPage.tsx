import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ApiClient } from '../../api/api-client';
import { ErrorList } from '../../components/ErrorList/ErrorList';
import { PageName, Paths } from '../../helpers/paths';
import { REGISTER_PAGE_LOCATORS } from './RegisterPage.locators';

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
    try {
      await ApiClient.signUp({
        user: {
          username,
          email,
          password,
        },
      });

      setErrors(null);
      setUserCreated(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setErrors(err?.message.split('\n'));
    }
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center" data-testid={REGISTER_PAGE_LOCATORS.title}>
            Sign up
          </h1>

          <p className="text-xs-center">
            <Link to={Paths[PageName.Login]} data-testid={REGISTER_PAGE_LOCATORS.loginPageLink}>
              {userCreated ? 'Go to login page' : 'Have an account?'}
            </Link>
          </p>

          <ErrorList errors={errors} />

          {userCreated ? (
            <p className="text-xs-center" data-testid={REGISTER_PAGE_LOCATORS.userCreatedMessage}>
              User successfully created!
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  data-testid={REGISTER_PAGE_LOCATORS.username}
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  data-testid={REGISTER_PAGE_LOCATORS.email}
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  data-testid={REGISTER_PAGE_LOCATORS.password}
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                data-testid={REGISTER_PAGE_LOCATORS.signUpButton}
              >
                Sign up
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
