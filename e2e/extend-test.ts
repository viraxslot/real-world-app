import { test as base } from '@playwright/test';
import { RegisterPage } from './page-objects/register-page/register.page';

export type CustomFixtures = {
  registerPage: RegisterPage;
};

const test = base.extend<CustomFixtures>({
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage({ page });
    await use(registerPage);
  },
});

export { expect } from '@playwright/test';
export { test };
