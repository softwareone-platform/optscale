/**
 * playwright.metrics.config.ts
 *
 * Standalone Playwright config for generating tag-based metrics reports.
 * No tests are executed — the MetricsReporter collects tag metadata
 * from the suite and writes HTML + CSV reports to the 'reports/' folder,
 * then exits the process.
 *
 * Usage:
 *   npx playwright test --config=playwright.metrics.config.ts
 */

import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

export default defineConfig({
  // Point at the full test suite so the reporter can see all tags
  testDir: './tests',
  // Gather dev-ops tests too (optional — comment out if not needed)
  // testDir: '.',
  // testMatch: ['tests/**/*.spec.ts', 'dev-ops-tests/**/*.spec.ts'],

  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30000,

  use: {
    headless: true,
    baseURL: process.env.BASE_URL ?? 'http://localhost',
  },

  reporter: [
    // The metrics reporter collects tags on onBegin() and calls process.exit(0),
    // so no tests will actually run.
    ['./reporting/metrics-reporter.ts'],
  ],
});

