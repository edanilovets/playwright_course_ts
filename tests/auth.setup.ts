import { test as setup, expect } from '@playwright/test';

const authFile = '../.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://conduit.bondaracademy.com/');
  await page.getByText('Sign in').click();
  await page.getByPlaceholder('Email').fill('eugene@test.com');
  await page.getByPlaceholder('Password').fill('12345678');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForResponse('https://conduit-api.bondaracademy.com/api/users/login')

  await page.context().storageState({ path: authFile });
});
