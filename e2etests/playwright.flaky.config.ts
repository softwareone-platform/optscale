/**
 * playwright.flaky.config.ts
 *
 * Playwright config for detecting flaky and consistently-failing tests across
 * the optscale e2e suite.
 *
 * Key settings:
 *   - retries: 2  — each test gets up to 2 retries, giving the reporter enough
 *                   runs per test to identify flakiness (pass on retry = flaky,
 *                   fail on all retries = consistently failing).
 *   - The FlakyTestReporter writes a per-shard JSON report to
 *     reports/flaky/flaky-test-shard-<N>.json
 *
 * Shard usage (CI):
 *   npx playwright test --config=playwright.flaky.config.ts --shard=1/4
 *   npx playwright test --config=playwright.flaky.config.ts --shard=2/4
 *   ... etc.
 *
 * Local usage (all tests, single shard):
 *   npm run playwright:flaky
 *   npm run playwright:flaky -- --grep @p1          # only p1 tests
 *   npm run playwright:flaky -- --grep @expenses     # only expenses module
 */

import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

export default defineConfig({
  globalSetup: './setup/global-setup.ts',
  globalTeardown: './setup/global-teardown.ts',
  testDir: './tests',
  testIgnore: ['**/regression-tests/**'],

  fullyParallel: false,
  forbidOnly: !!process.env.CI,

  /**
   * retries: 2 is essential — a test must have at least one pass AND one failure
   * within the same run for the reporter to classify it as flaky.
   */
  retries: 2,

  workers: process.env.CI ? 1 : 1,
  timeout: 45000,

  reporter: [
    ['list'],
    ['json', { outputFile: 'results.json' }],
    ['./reporting/flaky-test-reporter.ts'],
  ],

  use: {
    actionTimeout: 10000,
    baseURL: process.env.BASE_URL,
    testIdAttribute: 'data-test-id',
    timezoneId: 'UTC',
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: {
      mode: 'only-on-failure',
      fullPage: true,
    },
    contextOptions: {
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
      viewport: { width: 1900, height: 1050 },
    },
  },

  projects: [
    { name: 'setup', testMatch: /e2etests\/setup\/.*\.setup\.ts/ },
    {
      name: 'chrome',
      use: { channel: 'chrome' },
      dependencies: ['setup'],
    },
  ],
});

