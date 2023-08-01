import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  retries: 0,
  testDir: 'tests/e2e',
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com/',
    testIdAttribute: 'data-test',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
