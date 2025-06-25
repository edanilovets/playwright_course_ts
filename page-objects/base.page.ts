import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForNumberOfSeconds(seconds: number): Promise<void> {
    await this.page.waitForTimeout(seconds * 1000);
  }
}
