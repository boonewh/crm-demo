import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  workers: 1,
  timeout: 90000,
  reporter: 'list',
  use: {
    baseURL: process.env.SITE_CHECK_BASE_URL || 'http://127.0.0.1:4173',
    headless: true,
  },
  webServer: process.env.SITE_CHECK_BASE_URL ? undefined : {
    command: process.env.CHECK_SAFETY === '1' ? 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort --outDir dist-safety' : 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    port: 4173,
    timeout: 120 * 1000,
    reuseExistingServer: false,
  },
});
