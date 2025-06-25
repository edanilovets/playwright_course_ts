import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class NavigationPage extends BasePage {
  // Locators
  readonly formsMenuItem: Locator;
  readonly formLayoutsMenuItem: Locator;

  constructor(page: Page) {
    super(page);
    // Initialize locators
    this.formsMenuItem = page.getByText('Forms');
    this.formLayoutsMenuItem = page.getByText('Form Layouts');
  }

  async openFormLayouts() {
    await this.formsMenuItem.click();
    await this.formLayoutsMenuItem.click();
  }
}
