import { test, expect, request } from '@playwright/test';
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

test('Delete article', async ({ page, request }) => {
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: { email: 'eugene@test.com', password: '12345678' },
    },
  });
  const loginData = await response.json();
  const token = loginData.user.token;

  // Create a new article
  const createResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {
      article: { title: 'Title 1', description: 'Description 1', body: 'Body text 1', tagList: ['automation'] },
    },
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const createData = await createResponse.json();

  // Assert article creation
  expect(createResponse.ok()).toBeTruthy();

  // TODO: Add steps to login and delete the article
});
