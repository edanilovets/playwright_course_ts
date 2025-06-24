import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async ({ page }) => {
  await expect(page.getByText('Inline form')).toBeVisible();

  // by tag name
  await page.locator('input').first().click();

  // by ID
  // page.locator('#inputEmail1')

  // by class name
  // page.locator('.form-control')

  // by attribute
  // page.locator('[placeholder="Email"]')

  // by partial text
  // page.locator(':text("Email")')

  // by exact text
  // page.locator(':text-is("Email")')

});

test('User facing locators', async ({ page }) => {
  await expect(page.getByText('Inline form')).toBeVisible();

  // by role
  await page.getByRole('textbox', { name: 'Email' }).first().click();
  await page.getByRole('button', { name: 'Sign in' }).first().click();

  // by label
  await page.getByLabel('Email').first().click();
  await page.getByLabel('Email').first().fill('email1@test.com');

  // by placeholder
  await page.getByPlaceholder('Email').first().click();
  await page.getByPlaceholder('Email').first().fill('email2@test.com');

  // by text
  await page.getByText('Email').first().click();

  // by title
  await page.getByTitle('IoT Dashboard').first().click();

  // by test id (data-testid)
  // await page.getByTestId('email-input').first().click();
});

test('Child elements', async ({ page }) => {
  await expect(page.getByText('Inline form')).toBeVisible();

  // Child element locators
  await page.locator('nb-card nb-radio :text-is("Option 1")').click();

  // Using index to select child elements
  await page.locator('nb-card nb-radio').nth(0).click();
  await page.locator('label').filter({ hasText: 'Option 1' }).locator('span').nth(1).click();
  await page.locator('label').filter({ hasText: 'Option 2' }).locator('span').nth(1).click();
});

test('Locating parent elements', async ({ page }) => {
  await expect(page.getByText('Inline form')).toBeVisible();

  // Parent element locators
  await page.locator('nb-card', { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).fill('usingthegrid@test.com')
  await page.locator('nb-card', { hasText: 'Basic form' }).getByRole('textbox', { name: 'Email' }).fill('basicform@test.com')
});

test('Reusing locators', async ({ page }) => {
  await expect(page.getByText('Inline form')).toBeVisible();

  const basicForm = page.locator('nb-card', { hasText: 'Basic form' });
  const emailInput = basicForm.getByRole('textbox', { name: 'Email' });

  // Parent element locators
  await emailInput.fill('testbasicform@test.com');
  await basicForm.getByRole('textbox', { name: 'Password' }).fill('test123');
  await basicForm.getByRole('button', { name: 'Submit' }).click()

  expect(emailInput).toHaveValue('testbasicform@test.com');
});

test('Generated test 1', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Jane Doe' }).click();
  await page.getByRole('textbox', { name: 'Jane Doe' }).fill('Jane Doe');
  await page.getByRole('textbox', { name: 'Jane Doe' }).press('Tab');
  await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByPlaceholder('Email').fill('jane.doe@gmail.com');
  await page.locator('form').filter({ hasText: 'Remember meSubmit' }).locator('span').first().click();
  await page.locator('form').filter({ hasText: 'Remember meSubmit' }).getByRole('button').click();
});
