import { expect } from '@playwright/test';
import { test } from './fixtures/app-fixture';

test('Navigate to form page', async ({ app }) => {
  await app.navigationPage.navigateTo('/');
  await app.navigationPage.openFormLayouts();
  await expect(app.page).toHaveScreenshot('form-layouts.png');
});

test('Navigate to form page fail on purpose', async ({ app }) => {
  await app.navigationPage.navigateTo('/');
  await app.navigationPage.openFormLayouts();
  await app.navigationPage.openFormLayouts();
  // Step to fail the test
  await expect(app.page.getByRole('button', { name: 'Open Dialog with component' })).toBeVisible();
});
