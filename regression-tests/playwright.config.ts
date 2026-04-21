import { defineConfig } from '@playwright/test';
import os from 'os';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const BASE_URL = process.env.BASE_URL || 'http://0.0.0.0:3000';
const IS_CI = !!process.env.CI;
const VIEWPORT = { width: 1920, height: 1080 };

/** Default test timeout (ms) — time allowed for a single test to complete. */
const TEST_TIMEOUT = 30000;

/** Default action timeout (ms) — time allowed for a single action (click, fill, etc.) to complete. */
const ACTION_TIMEOUT = 20000;

/**
 * Extended timeout (ms) for operations that load large amounts of data,
 * such as reports, exports, or pages with many resources.
 */
export const LARGE_DATA_TIMEOUT = 60000;

const getSnapshotPath = (): string => {
  if (!process.env.IS_REGRESSION_RUN) return `local/${os.platform()}`;
  const host = (process.env.LIVE_DEMO_API || 'baseline')
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0];
  return `baseline/${host}`;
};

/**
 * Chromium launch flags that disable GPU rendering, font hinting and
 * anti-aliasing so that screenshots are pixel-identical across machines and CI runs.
 */
const CHROMIUM_LAUNCH_ARGS = [
  '--disable-gpu',
  '--disable-font-subpixel-positioning',
  '--disable-lcd-text',
  '--font-render-hinting=none',
  '--disable-accelerated-2d-canvas',
];

export default defineConfig({
  testDir: './',
  testMatch: /tests\/.*\.spec\.ts$/,
  testIgnore: ['**/snapshots/**'],
  snapshotPathTemplate: `./snapshots/${getSnapshotPath()}/{arg}{ext}`,

  fullyParallel: true,
  forbidOnly: IS_CI,
  retries: IS_CI ? 1 : 0,
  workers: IS_CI ? 2 : 3,
  timeout: TEST_TIMEOUT,

  outputDir: './results/test-results',

  reporter: [
    ['list'],
    ['json', { outputFile: './results/results.json' }],
    ['html', { outputFolder: './results/html', open: IS_CI ? 'never' : 'on-failure' }],
  ],

  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      stylePath: './utils/disable-antialiasing/pre-screenshot-styles.css',
    },
  },

  use: {
    baseURL: BASE_URL,
    actionTimeout: ACTION_TIMEOUT,
    testIdAttribute: 'data-test-id',
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    contextOptions: {
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
      viewport: VIEWPORT,
    },
  },

  projects: [
    {
      name: 'setup',
      testMatch: /setup\/auth\.setup\.ts/,
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        channel: 'chromium',
        viewport: VIEWPORT,
        launchOptions: { args: CHROMIUM_LAUNCH_ARGS },
        contextOptions: {
          deviceScaleFactor: 1,
          reducedMotion: 'reduce',
          ignoreHTTPSErrors: true,
        },
      },
    },
  ],
});
