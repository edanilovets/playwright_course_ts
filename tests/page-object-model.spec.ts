import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/pagemanager';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
});

test('Navigate to form page', async ({ page }) => {
  const pm = new PageManager(page);
  await pm.getNavigationPage().openFormLayouts();
});
