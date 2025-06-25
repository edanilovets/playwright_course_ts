import { Page, Locator } from '@playwright/test';
import { NavigationPage } from '../page-objects/navigation.page';

export class PageManager {
  readonly page: Page;

  private readonly navigationPage: NavigationPage;

  constructor(page: Page) {
    this.page = page;
    // Initialize the NavigationPage
    this.navigationPage = new NavigationPage(page);
  }

  getNavigationPage(): NavigationPage {
    return this.navigationPage;
  }
}
