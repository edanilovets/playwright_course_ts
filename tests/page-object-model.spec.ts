import { expect } from '@playwright/test';
import { test } from './fixtures/pm-fixture';

test('Navigate to form page', async ({ pm }) => {
  await pm.getNavigationPage().navigateTo('/');
  await pm.getNavigationPage().openFormLayouts();
});
