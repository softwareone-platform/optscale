import { defineConfig } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  globalSetup: "./setup/global-setup.ts",
  globalTeardown: "./setup/global-teardown.ts",
  testDir: '../e2etests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
      reporter: [
        ["list"],
        ["json", {outputFile: "results.json"}],
        ["html", {open: "never"}],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
      use: {
        actionTimeout: 10000,
        baseURL: process.env.BASE_URL,
        testIdAttribute: 'data-test-id',
        headless: true,
        trace: "retain-on-failure",
        video: "retain-on-failure",
        screenshot: "only-on-failure",
        contextOptions: {
          ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
          viewport: {width: 1920, height: 1080},
        },
      },

  projects: [
    {name: "setup", testMatch: /.*\.setup\.ts/},
    {
      name: "chrome",
      use: {
        channel: "chrome",
        viewport: { width: 1920, height: 1080 }
      },
      dependencies: ["setup"],
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     browserName: "firefox",
    //   },
    //   dependencies: ["setup"],
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
