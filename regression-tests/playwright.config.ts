import { defineConfig } from '@playwright/test';
import os from 'os';
import { env, hostSlug } from './utils/env';

const VIEWPORT = { width: 1920, height: 1080 };

/** Default test timeout (ms). */
const TEST_TIMEOUT = 40000;

/** Default action timeout (ms) — for clicks, fills, etc. */
const ACTION_TIMEOUT = 30000;

/** Extended timeout (ms) for data-heavy operations (reports, exports, large lists). */
export const LARGE_DATA_TIMEOUT = 60000;

/**
 * Resolves the snapshot sub-folder.
 *
 * - Local runs → `local/<host>/<platform>/` to keep OS snapshots separated.
 * - Regression runs (`IS_REGRESSION_RUN=true`, CI) → `baseline/<host>/`
 *   (CI is always Linux, so the platform segment is noise).
 *
 * `host` comes from `API_BASE_URL` via `hostSlug`, keeping this path and the
 * demo-account cache filename in lockstep.
 */
const getSnapshotPath = (): string => {
  const host = hostSlug(env.apiBaseUrl, 'baseline');
  return env.isRegressionRun ? `baseline/${host}` : `local/${host}/${os.platform()}`;
};

/** Chromium flags that disable GPU/font hinting for pixel-stable screenshots. */
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
  forbidOnly: env.isCI,
  retries: env.isCI ? 1 : 0,
  workers: env.isCI ? 2 : 3,
  timeout: TEST_TIMEOUT,

  outputDir: './results/test-results',

  reporter: [
    ['list', { printSteps: true }],
    ['json', { outputFile: './results/results.json' }],
    ['html', { outputFolder: './results/html', open: 'never' }],
  ],

  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      stylePath: './styles/pre-screenshot-styles.css',
    },
  },

  use: {
    baseURL: env.baseUrl,
    actionTimeout: ACTION_TIMEOUT,
    testIdAttribute: 'data-test-id',
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    contextOptions: {
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: env.ignoreHttpsErrors,
      viewport: VIEWPORT,
    },
  },

  projects: [
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
    {
      name: 'setup',
      testMatch: /setup\/auth\.setup\.ts/,
    },
  ],
});
