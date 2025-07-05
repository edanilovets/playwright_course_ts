import { expect } from '@playwright/test';
import { test } from '../test-options';

// Read email and password from environment variables
const baseUrl = process.env.SERTIFI_QA_BASEURL;
const email = process.env.SERTIFI_QAADMIN_EMAIL;
const password = process.env.SERTIFI_QAADMIN_PASSWORD;

test.beforeEach(async ({ page, sertifiQABaseUrl }) => {
  // await page.goto(sertifiQABaseUrl || baseUrl!);
  await page.goto(process.env.SERTIFI_QA_BASEURL!);
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(process.env.SERTIFI_QAADMIN_EMAIL!);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.SERTIFI_QAADMIN_PASSWORD!);
  await page.getByRole('button', { name: 'log in' }).click();
});

test('Send Authorization', async ({ page }) => {
  await page.getByRole('button').filter({ hasText: 'Create New' }).click();
  await page.getByRole('link', { name: 'Send Authorization', exact: true }).click();
  await page.getByRole('textbox', { name: 'Folder Name *' }).click();
  await page.getByRole('textbox', { name: 'Folder Name *' }).fill('auth1');
  await page.locator('.k-input-values').first().click();
  await page.getByText('QA Master').click();
  await page.locator('span').filter({ hasText: 'Select one' }).first().click();
  await page.getByText('Hyatt Regency McCormick Place Credit Card Authorization', { exact: true }).click();
  await page.waitForTimeout(1000);
  await page.getByRole('button', { name: 'Send Now' }).click();
  await page.getByRole('link', { name: 'Back To Dashboard' }).click();
});
