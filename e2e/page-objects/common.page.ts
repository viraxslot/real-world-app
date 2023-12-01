import { BasePage } from './base.page';

export class CommonPage extends BasePage {
  async open() {
    await this.page.goto(this.url);
  }
}
