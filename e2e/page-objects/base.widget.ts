import { selectors } from '@playwright/test';
import { BasePage } from './base.page';
import { dataTestId } from '../shared/constants';

export type BaseWidgetOptions = {
  parentPage: BasePage;
};

export class BaseWidget {
  protected parentPage: BasePage;

  constructor({ parentPage }: BaseWidgetOptions) {
    this.parentPage = parentPage;
    selectors.setTestIdAttribute(dataTestId);
  }
}
