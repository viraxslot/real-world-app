import { test, expect } from '../../extend-test';
import { TestDataHelper } from '../../helpers/test-data.helper';
import { CLIENT_ERRORS } from '../../shared/client-errors';

test.describe('Register suite', () => {
  const defaultUser = TestDataHelper.getUser();
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.open();
    await expect(registerPage.userCreatedMessage).toBeHidden();
    await expect(registerPage.errorsList.itself).toBeHidden();
  });
  test('should be possible to register new user', async ({ registerPage }) => {
    const user = TestDataHelper.getUser();

    await registerPage.signUp({ user });
    await expect(registerPage.userCreatedMessage).toBeVisible();
    await expect(registerPage.errorsList.itself).toBeHidden();
  });

  test('should show errors if no fields are filled', async ({ registerPage }) => {
    await registerPage.signUpButton.click();
    await expect(registerPage.errorsList.itself).toBeVisible();
    await expect(registerPage.errorsList.item).toHaveCount(3);
    await expect(registerPage.errorsList.item.nth(0)).toHaveText(CLIENT_ERRORS.emptyPassword);
    await expect(registerPage.errorsList.item.nth(1)).toHaveText(CLIENT_ERRORS.emptyEmail);
    await expect(registerPage.errorsList.item.nth(2)).toHaveText(CLIENT_ERRORS.emptyUsername);
  });

  test('should show errors if only username is filled', async ({ registerPage }) => {
    await registerPage.username.fill(defaultUser.username);
    await registerPage.signUpButton.click();
    await expect(registerPage.errorsList.itself).toBeVisible();
    await expect(registerPage.errorsList.item).toHaveCount(2);
    await expect(registerPage.errorsList.item.nth(0)).toHaveText(CLIENT_ERRORS.emptyPassword);
    await expect(registerPage.errorsList.item.nth(1)).toHaveText(CLIENT_ERRORS.emptyEmail);
  });

  test('should show errors if only email is filled', async ({ registerPage }) => {
    await registerPage.email.fill(defaultUser.email);
    await registerPage.signUpButton.click();
    await expect(registerPage.errorsList.itself).toBeVisible();
    await expect(registerPage.errorsList.item).toHaveCount(2);
    await expect(registerPage.errorsList.item.nth(0)).toHaveText(CLIENT_ERRORS.emptyPassword);
    await expect(registerPage.errorsList.item.nth(1)).toHaveText(CLIENT_ERRORS.emptyUsername);
  });

  test('should show errors if only password is filled', async ({ registerPage }) => {
    await registerPage.password.fill(defaultUser.password);
    await registerPage.signUpButton.click();
    await expect(registerPage.errorsList.itself).toBeVisible();
    await expect(registerPage.errorsList.item).toHaveCount(2);
    await expect(registerPage.errorsList.item.nth(0)).toHaveText(CLIENT_ERRORS.emptyEmail);
    await expect(registerPage.errorsList.item.nth(1)).toHaveText(CLIENT_ERRORS.emptyUsername);
  });
});
