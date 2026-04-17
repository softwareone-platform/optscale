import { defineConfig } from '@playwright/test';
import os from 'os';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const baseURL = process.env.BASE_URL || 'http://0.0.0.0:3000';

/**
 * Extended timeout (ms) for operations that load large amounts of data,
 * such as reports, exports, or pages with many resources.
 */
export const LARGE_DATA_TIMEOUT = 30000;

export default defineConfig({
  testDir: './',
  testMatch: /tests\/.*\.spec\.ts$/,
  snapshotPathTemplate: `./snapshots/${process.env.IS_REGRESSION_RUN ? 'reference' : os.platform()}/{arg}{ext}`,
  testIgnore: ['**/snapshots/**'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 3,
  timeout: 30000,
  reporter: [
    ['list'],
    ['json', { outputFile: 'results.json' }],
    ['html', { open: 'never' }],
  ],
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      stylePath: './utils/disable-antialiasing/pre-screenshot-styles.css',
    },
  },
  use: {
    baseURL: baseURL,
    actionTimeout: 20000,
    testIdAttribute: 'data-test-id',
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    contextOptions: {
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
      viewport: { width: 1920, height: 1080 },
    },
  },

  projects: [
    {
      name: 'setup',
      testMatch: /setup\/auth\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        channel: 'chromium',
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: [
            '--disable-gpu',
            '--disable-font-subpixel-positioning',
            '--disable-lcd-text',
            '--font-render-hinting=none',
            '--disable-accelerated-2d-canvas',
          ],
        },
        contextOptions: {
          deviceScaleFactor: 1,
          reducedMotion: 'reduce',
          ignoreHTTPSErrors: true,
        },
      },
      dependencies: ['setup'],
    },
  ],
});
