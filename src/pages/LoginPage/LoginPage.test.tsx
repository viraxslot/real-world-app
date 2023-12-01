import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from './LoginPage';
import { LOGIN_PAGE_LOCATORS } from './LoginPage.locators';
import { ERROR_LIST_LOCATORS } from '../../components/ErrorList/ErrorList.locators';
import { mockFetchOnce } from '../../helpers/test.helper';
import userEvent from '@testing-library/user-event';

const mount = () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>,
  );
};

describe('Login page', () => {
  const user = userEvent.setup();
  it('renders default items', () => {
    mount();
    expect(screen.getByTestId(LOGIN_PAGE_LOCATORS.title)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_PAGE_LOCATORS.email)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_PAGE_LOCATORS.password)).toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_PAGE_LOCATORS.signIn)).toBeInTheDocument();

    expect(screen.queryByTestId(ERROR_LIST_LOCATORS.itself)).not.toBeInTheDocument();
  });

  it('shows errors from the backend', async () => {
    const errorMessage = 'login error';
    global.fetch = mockFetchOnce({
      ok: false,
      data: {
        errors: [errorMessage],
      },
    });

    mount();
    expect(screen.queryByTestId(ERROR_LIST_LOCATORS.itself)).not.toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_PAGE_LOCATORS.signIn)).toBeInTheDocument();
    await user.click(screen.getByTestId(LOGIN_PAGE_LOCATORS.signIn));

    expect(screen.getByTestId(ERROR_LIST_LOCATORS.itself)).toBeInTheDocument();
    const errorMessages = screen.getAllByTestId(ERROR_LIST_LOCATORS.errorItem);
    expect(errorMessages).toHaveLength(1);
    expect(errorMessages[0]).toHaveTextContent(errorMessage);
  });

  it('shows default error if unable to parse backend errors', async () => {
    global.fetch = mockFetchOnce({
      ok: false,
      data: {
        someErrors: ['test error'],
      },
    });

    mount();
    expect(screen.queryByTestId(ERROR_LIST_LOCATORS.itself)).not.toBeInTheDocument();
    expect(screen.getByTestId(LOGIN_PAGE_LOCATORS.signIn)).toBeInTheDocument();
    await user.click(screen.getByTestId(LOGIN_PAGE_LOCATORS.signIn));

    const errorMessages = screen.getAllByTestId(ERROR_LIST_LOCATORS.errorItem);
    expect(errorMessages).toHaveLength(1);
    expect(errorMessages[0]).toHaveTextContent('unexpected error, unable to login');
  });
});
