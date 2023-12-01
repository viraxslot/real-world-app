import { Locator } from '@playwright/test';
import { BaseWidget, BaseWidgetOptions } from '../base.widget';
import { ERROR_LIST_LOCATORS } from '../../../src/components/ErrorList/ErrorList.locators';

export class ErrorsList extends BaseWidget {
  readonly itself: Locator;
  readonly item: Locator;

  constructor({ parentPage }: BaseWidgetOptions) {
    super({ parentPage });
    this.itself = this.parentPage.getByTestId(ERROR_LIST_LOCATORS.itself);
    this.item = this.itself.getByTestId(ERROR_LIST_LOCATORS.errorItem);
  }
}
