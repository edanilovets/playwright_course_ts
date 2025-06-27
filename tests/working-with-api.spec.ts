import { test, expect } from '@playwright/test';
import tags from '../data/mocks/tags.json';

test.beforeEach(async ({ page }) => {
  // Mocking the tags API response
  await page.route('**/api/tags', async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  await page.goto('https://conduit.bondaracademy.com/');
});

test('Has brand', async ({ page }) => {
  // Mocking the articles API response
  await page.route('**/api/articles*', async (route) => {
    const response = await route.fetch();
    const data = await response.json();
    data.articles[0].title = 'Mocked Article Title';
    data.articles[0].description = 'Mocked Article Description';

    await route.fulfill({
      body: JSON.stringify(data),
    });
  });

  await page.getByText('Global Feed').click();
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
  await expect(page.locator('app-article-list h1').first()).toHaveText('Mocked Article Title');
  await expect(page.locator('app-article-list p').first()).toHaveText('Mocked Article Description');
});
