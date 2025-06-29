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

test('Mock first article data', async ({ page }) => {
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
  const dateString = new Date().toISOString();
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
      article: { title: `Title ${dateString}`, description: 'Description 1', body: 'Body text 1', tagList: ['automation'] },
    },
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  const createData = await createResponse.json();

  // Assert article creation
  expect(createResponse.ok()).toBeTruthy();

  await page.getByText('Home').click();
  await page.getByText('Global Feed').click();
  await expect(page.locator('app-article-preview h1').first()).toContainText(`Title ${dateString}`);
  await page.getByText(`Title ${dateString}`).click();
  await page.getByRole('button', { name: 'Delete Article' }).first().click();
  await expect(page.locator('app-article-preview h1').first()).not.toContainText(`Title ${dateString}`);
});

test('Create article', async ({ page, request }) => {
  const dateString = new Date().toISOString();
  await page.getByText('New Article').click();
  await page.getByPlaceholder('Article Title').fill(`Title ${dateString}`);
  await page.getByPlaceholder("What's this article about?").fill('Description 1');
  await page.getByPlaceholder('Write your article (in markdown)').fill('Body text 1');
  await page.getByPlaceholder('Enter tags').fill('automation');
  await page.getByRole('button', { name: 'Publish Article' }).click();
  const response1 = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/');
  const data = await response1.json();
  const slugId = data.article.slug;

  await expect(page.locator('.article-page h1')).toContainText(`Title ${dateString}`);
  await page.getByText('Home').click();
  await page.getByText('Global Feed').click();
  await expect(page.locator('app-article-preview h1').first()).toContainText(`Title ${dateString}`);

  // Delte article using API
  const response2 = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data: {
      user: { email: 'eugene@test.com', password: '12345678' },
    },
  });
  const loginData = await response2.json();
  const token = loginData.user.token;
  const response3 = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  expect(response3.status()).toEqual(204);
});
