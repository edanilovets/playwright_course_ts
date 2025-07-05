import { test as base } from '@playwright/test';
import { App } from '../../page-objects/app';

type Fixtures = {
  app: App;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    const pm = new App(page);
    await use(pm);
  },
});
