import { Locator } from 'playwright-core';
import { BasePageOptions } from '../base.page';
import { CommonPage } from '../common.page';
import { REGISTER_PAGE_LOCATORS } from '../../../src/pages/RegisterPage/RegisterPage.locators';
import { User } from '../../shared/types';
import { ErrorsList } from '../common-widgets/errors-list.widget';

export class RegisterPage extends CommonPage {
  readonly title: Locator;
  readonly loginPageLink: Locator;
  readonly errorsList: ErrorsList;

  readonly username: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly signUpButton: Locator;
  readonly userCreatedMessage: Locator;

  constructor(options: BasePageOptions) {
    super(options);
    this.url = '/register';

    this.title = this.getByTestId(REGISTER_PAGE_LOCATORS.title);
    this.loginPageLink = this.getByTestId(REGISTER_PAGE_LOCATORS.loginPageLink);
    this.errorsList = new ErrorsList({ parentPage: this });
    this.username = this.getByTestId(REGISTER_PAGE_LOCATORS.username);
    this.email = this.getByTestId(REGISTER_PAGE_LOCATORS.email);
    this.password = this.getByTestId(REGISTER_PAGE_LOCATORS.password);
    this.signUpButton = this.getByTestId(REGISTER_PAGE_LOCATORS.signUpButton);
    this.userCreatedMessage = this.getByTestId(REGISTER_PAGE_LOCATORS.userCreatedMessage);
  }

  async signUp({ user, click }: { user: User; click?: boolean }) {
    await this.username.fill(user.username);
    await this.email.fill(user.email);
    await this.password.fill(user.password);

    const defaultClick = click ?? true;
    defaultClick ? await this.signUpButton.click() : null;
  }
}
