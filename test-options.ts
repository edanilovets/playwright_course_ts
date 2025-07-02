import { test as base } from '@playwright/test';

export type TestOptions = {
  sertifiQABaseUrl?: string;
};

export const test = base.extend<TestOptions>({
  sertifiQABaseUrl: ['', { option: true }],
});
