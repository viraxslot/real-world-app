import { Locator } from '@playwright/test';
import { BaseWidget, BaseWidgetOptions } from '../base.widget';
import { HEADER_LOCATORS } from '../../../src/components/Header/Header.locators';

export class NavBar extends BaseWidget {
  readonly logout: Locator;

  constructor({ parentPage }: BaseWidgetOptions) {
    super({ parentPage });

    this.logout = this.parentPage.getByTestId(HEADER_LOCATORS.logoutButon);
  }
}
