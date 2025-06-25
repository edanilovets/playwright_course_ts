import { Page, Locator } from '@playwright/test';

export class NavigationPage {
  readonly page: Page;
  // Locators
  readonly formsMenuItem: Locator;
  readonly formLayoutsMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    // Initialize locators
    this.formsMenuItem = page.getByText('Forms');
    this.formLayoutsMenuItem = page.getByText('Form Layouts');
  }

  async openFormLayouts() {
    await this.formsMenuItem.click();
    await this.formLayoutsMenuItem.click();
  }
}
