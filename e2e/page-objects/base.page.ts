import test, { Page, selectors } from '@playwright/test';
import { dataTestId } from '../shared/constants';

export type BasePageOptions = {
  page: Page;
};

export class BasePage {
  readonly page: Page;
  private _url: string;

  constructor({ page }: BasePageOptions) {
    this.page = page;
    this._url = '/';
  }

  get url() {
    return this._url;
  }

  set url(url: string) {
    this._url = url;
  }

  locator(selector: string) {
    return this.page.locator(selector);
  }

  getByTestId(selector: string) {
    selectors.setTestIdAttribute(dataTestId);
    return this.page.getByTestId(selector);
  }

  getByText(text: string) {
    return this.page.getByText(text);
  }

  getByRole(role: string) {
    return this.page.getByRole(role as any);
  }

  /**
   * This function allow us to add test step description to allure report
   *
   * @param title
   * @param body
   */
  async testStep(title: string, body?: () => Promise<any>): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return test.step(title, body ?? (async () => {}));
  }
}
