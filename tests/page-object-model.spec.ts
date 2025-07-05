import { expect } from '@playwright/test';
import { test } from './fixtures/app-fixture';

test('Navigate to form page', async ({ app }) => {
  await app.navigationPage.navigateTo('/');
  await app.navigationPage.openFormLayouts();
  await expect(app.page).toHaveScreenshot('form-layouts.png');
});
