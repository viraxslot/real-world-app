import { expect, test } from '../../extend-test';
import { ApiHelper } from '../../helpers/api.helper';
import { TestDataHelper } from '../../helpers/test-data.helper';
import { CLIENT_ERRORS } from '../../shared/client-errors';

test.describe('Login suite', () => {
  const user = TestDataHelper.getUser();

  test.beforeAll(async ({ request }) => {
    const registerResponse = await ApiHelper.registerUser(request, user);
    expect(registerResponse.ok(), { message: await registerResponse.text() }).toBeTruthy();
  });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await expect(loginPage.title).toBeVisible();
    await expect(loginPage.errorsList.itself).toBeHidden();
  });

  test('should be possible to login', async ({ loginPage }) => {
    await expect(loginPage.navbar.logout).toBeHidden();
    await loginPage.signIn({ user });
    await expect(loginPage.navbar.logout).toBeVisible();
  });

  test('should show errors from the backend if no fields are filled', async ({ loginPage }) => {
    await loginPage.signInButton.click();
    await expect(loginPage.errorsList.itself).toBeVisible();
    await expect(loginPage.errorsList.item).toHaveCount(2);
    await expect(loginPage.errorsList.item.nth(0)).toHaveText(CLIENT_ERRORS.emptyPassword);
    await expect(loginPage.errorsList.item.nth(1)).toHaveText(CLIENT_ERRORS.emptyEmail);
    await expect(loginPage.navbar.logout).toBeHidden();
  });

  test('should show error if only email is filled', async ({ loginPage }) => {
    await loginPage.email.fill(user.email);
    await loginPage.signInButton.click();
    await expect(loginPage.errorsList.itself).toBeVisible();
    await expect(loginPage.errorsList.item).toHaveCount(1);
    await expect(loginPage.errorsList.item.nth(0)).toHaveText(CLIENT_ERRORS.emptyPassword);
    await expect(loginPage.navbar.logout).toBeHidden();
  });

  test('should show error if only password is filled', async ({ loginPage }) => {
    await loginPage.password.fill(user.password);
    await loginPage.signInButton.click();
    await expect(loginPage.errorsList.itself).toBeVisible();
    await expect(loginPage.errorsList.item).toHaveCount(1);
    await expect(loginPage.errorsList.item.nth(0)).toHaveText(CLIENT_ERRORS.emptyEmail);
    await expect(loginPage.navbar.logout).toBeHidden();
  });
});
