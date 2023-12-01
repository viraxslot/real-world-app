import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ERROR_LIST_LOCATORS } from '../../components/ErrorList/ErrorList.locators';
import { RegisterPage } from './RegisterPage';
import { REGISTER_PAGE_LOCATORS } from './RegisterPage.locators';
import { mockFetchOnce } from '../../helpers/test.helper';

const mount = () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>,
  );
};

describe('Register page', () => {
  const user = userEvent.setup();
  it('renders default elements', () => {
    mount();
    expect(screen.getByTestId(REGISTER_PAGE_LOCATORS.title)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_PAGE_LOCATORS.loginPageLink)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_PAGE_LOCATORS.username)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_PAGE_LOCATORS.email)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_PAGE_LOCATORS.password)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_PAGE_LOCATORS.signUpButton)).toBeInTheDocument();

    expect(screen.queryByTestId(REGISTER_PAGE_LOCATORS.userCreatedMessage)).not.toBeInTheDocument();
    expect(screen.queryByTestId(ERROR_LIST_LOCATORS.itself)).not.toBeInTheDocument();
  });

  it('shows errors from the backend', async () => {
    const errorMessage = 'error message';
    global.fetch = mockFetchOnce({
      ok: false,
      data: {
        errors: [errorMessage],
      },
    });
    mount();
    expect(screen.queryByTestId(ERROR_LIST_LOCATORS.itself)).not.toBeInTheDocument();
    await user.click(screen.getByTestId(REGISTER_PAGE_LOCATORS.signUpButton));

    expect(screen.getByTestId(ERROR_LIST_LOCATORS.itself)).toBeInTheDocument();
    const errorItems = screen.getAllByTestId(ERROR_LIST_LOCATORS.errorItem);
    expect(errorItems).toHaveLength(1);
    expect(errorItems[0]).toHaveTextContent(errorMessage);
  });

  it('shows success message if user created', async () => {
    global.fetch = mockFetchOnce({
      ok: true,
      data: {
        user: {
          username: 'test user',
        },
      },
    });

    mount();
    expect(screen.queryByTestId(ERROR_LIST_LOCATORS.itself)).not.toBeInTheDocument();
    expect(screen.queryByTestId(REGISTER_PAGE_LOCATORS.userCreatedMessage)).not.toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_PAGE_LOCATORS.loginPageLink)).toHaveTextContent(
      'Have an account?',
    );
    await user.click(screen.getByTestId(REGISTER_PAGE_LOCATORS.signUpButton));

    expect(screen.getByTestId(REGISTER_PAGE_LOCATORS.userCreatedMessage)).toBeInTheDocument();
    expect(screen.getByTestId(REGISTER_PAGE_LOCATORS.loginPageLink)).toHaveTextContent(
      'Go to login page',
    );
  });

  const elements = [
    {
      title: 'username',
      locator: REGISTER_PAGE_LOCATORS.username,
    },
    {
      title: 'email',
      locator: REGISTER_PAGE_LOCATORS.email,
    },
    {
      title: 'password',
      locator: REGISTER_PAGE_LOCATORS.password,
    },
  ];
  elements.forEach((element) => {
    it(`clears error messages on user input to ${element.title} field`, async () => {
      global.fetch = mockFetchOnce({
        ok: false,
        data: {
          errors: ['test error'],
        },
      });

      mount();
      await user.click(screen.getByTestId(REGISTER_PAGE_LOCATORS.signUpButton));
      expect(screen.getByTestId(ERROR_LIST_LOCATORS.itself)).toBeInTheDocument();

      await user.type(screen.getByTestId(element.locator), 'test');
      expect(screen.queryByTestId(ERROR_LIST_LOCATORS.itself)).not.toBeInTheDocument();
    });
  });
});
