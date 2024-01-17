import { Locator } from '@playwright/test';
import { BasePageOptions } from '../base.page';
import { CommonPage } from '../common.page';
import { LOGIN_PAGE_LOCATORS } from '../../../src/pages/LoginPage/LoginPage.locators';
import { User } from '../../shared/types';
import { ErrorsList } from '../common-widgets/errors-list.widget';
import { NavBar } from '../common-widgets/navigation-bar.widget';

export class LoginPage extends CommonPage {
  readonly navbar: NavBar;
  readonly title: Locator;
  readonly registerLink: Locator;
  readonly email: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;
  readonly errorsList: ErrorsList;

  constructor(options: BasePageOptions) {
    super(options);
    this.url = '/login';

    this.navbar = new NavBar({ parentPage: this });
    this.title = this.getByTestId(LOGIN_PAGE_LOCATORS.title);
    this.registerLink = this.getByTestId(LOGIN_PAGE_LOCATORS.registerLink);
    this.email = this.getByTestId(LOGIN_PAGE_LOCATORS.email);
    this.password = this.getByTestId(LOGIN_PAGE_LOCATORS.password);
    this.signInButton = this.getByTestId(LOGIN_PAGE_LOCATORS.signIn);
    this.errorsList = new ErrorsList({ parentPage: this });
  }

  async signIn({ user, click }: { user: User; click?: boolean }) {
    await this.email.fill(user.email);
    await this.password.fill(user.password);

    const defaultClick = click ?? true;
    defaultClick ? await this.signInButton.click() : null;
  }
}
