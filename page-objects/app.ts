import { Page, Locator } from '@playwright/test';
import { NavigationPage } from './navigation.page';
import { faker } from '@faker-js/faker';

export class App {
  readonly page: Page;

  readonly navigationPage: NavigationPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(page);
  }
}
