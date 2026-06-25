import { defineConfig } from '@playwright/test';
import { config } from './utils/config';

const TEST_TIMEOUT = 40_000;
const ACTION_TIMEOUT = 30_000;
const VIEWPORT = { width: 1920, height: 1080 };

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
  snapshotPathTemplate: config.paths.snapshotTemplate,

  fullyParallel: true,
  forbidOnly: config.isCI,
  retries: config.isCI ? 1 : 0,
  workers: config.isCI ? 2 : 3,
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
    baseURL: config.baseUrl,
    actionTimeout: ACTION_TIMEOUT,
    testIdAttribute: 'data-test-id',
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: VIEWPORT,
    contextOptions: {
      reducedMotion: 'reduce',
      ignoreHTTPSErrors: config.ignoreHttpsErrors,
      deviceScaleFactor: 1,
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
