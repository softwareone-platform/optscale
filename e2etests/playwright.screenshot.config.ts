import {defineConfig} from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path: path.resolve(__dirname, '.env.local')});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './/',
  testMatch: /swo-screenshot-tests\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  timeout: 30000,
  reporter: [
    ["list"],
    ["json", {outputFile: "results.json"}],
    ["html", {open: "never"}],
  ],
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      stylePath: './tests/screenshots/styles/pre-screenshot-styles.css'
    },
  },
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
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
      viewport: {width: 1920, height: 1080},
    },
  },

  projects: [
    {
      name: "setup",
      testMatch: /auth-live-demo\.setup\.ts/
    },
    {
      name: "chromium",
      use: {
        channel: "chromium",
        viewport: {width: 1920, height: 1080},
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
      dependencies: ["setup"],
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
