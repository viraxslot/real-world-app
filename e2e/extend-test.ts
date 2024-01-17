import { test as base } from '@playwright/test';
import { RegisterPage } from './page-objects/register-page/register.page';
import { LoginPage } from './page-objects/login-page/login.page';

export type CustomFixtures = {
  registerPage: RegisterPage;
  loginPage: LoginPage;
};

const test = base.extend<CustomFixtures>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage({ page });
    await use(registerPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage({ page });
    await use(loginPage);
  },
});

export { expect } from '@playwright/test';
export { test };
