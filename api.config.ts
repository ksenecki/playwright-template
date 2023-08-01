import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  retries: 0,
  testDir: 'tests/api',
  reporter: process.env.CI ? 'github' : 'list',
  fullyParallel: true,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'off',
  },
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
