import { test as base } from '@playwright/test';
import { PageManager } from '../../page-objects/pagemanager';

type Fixtures = {
  pm: PageManager;
};

export const test = base.extend<Fixtures>({
  pm: async ({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  },
});
