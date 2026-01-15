import { defineConfig } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: './setup/global-setup.ts',
  globalTeardown: './setup/global-teardown.ts',
  testDir: '../e2etests',
  testIgnore: ['**/regression-tests/**'],
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Individual test timeout,test.slow() annotation triples this value for decorated tests*/
  timeout: 45000,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['json', { outputFile: 'results.json' }], ['html', { open: 'never' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    actionTimeout: 10000,
    baseURL: process.env.BASE_URL,
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
    // Setup project
    { name: 'setup', testMatch: /e2etests\/setup\/.*\.setup\.ts/ },
    {
      name: 'chrome',
      use: {
        channel: 'chrome',
      },
      dependencies: ['setup'],
    },
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //   },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     channel: "msedge",
    //   },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: "firefox",
    //   use: {
    //     browserName: "firefox",
    //   },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: "Microsoft Edge",
    //   use: {
    //     channel: "msedge",
    //   },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: "Mobile Safari",
    //   use: {
    //     ...devices["iPad Mini"],
    //     viewport: {width: 744, height: 1024},
    //   },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: "webkit",
    //   use: {
    //     ...devices["Desktop Safari"],
    //   },
    //   dependencies: ["setup"],
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
