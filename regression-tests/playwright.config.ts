import os from 'os';
import { defineConfig } from '@playwright/test';
import { config } from './utils/config';

const TEST_TIMEOUT = 40_000;
const ACTION_TIMEOUT = 30_000;
const EXPECT_TIMEOUT = 15_000;
const VIEWPORT = { width: 1920, height: 1080 };
const DEVICE_SCALE_FACTOR = 1;

const retries = config.isCI ? 1 : 0;
// The limit locally is the dev server, not the machine: measured on 12 cores, 6 workers failed
// 6 of 22 tests in 1.9 min while 3 passed all of them in 1.4 min.
const MAX_LOCAL_WORKERS = 3;
const workers = config.isCI ? config.ciWorkers : Math.max(1, Math.min(MAX_LOCAL_WORKERS, Math.floor(os.availableParallelism() / 2)));

const TEST_ID_ATTRIBUTE = 'data-test-id';
const SPEC_MATCH = /tests\/.*\.spec\.ts$/;
const SETUP_MATCH = /setup\/auth\.setup\.ts/;
const SNAPSHOT_IGNORE = ['**/snapshots/**'];

const OUTPUT_DIR = './results/test-results';
const JSON_REPORT_FILE = './results/results.json';
const HTML_REPORT_DIR = './results/html';
const PRE_SCREENSHOT_STYLE_PATH = './styles/pre-screenshot-styles.css';

const CONTEXT_OPTIONS = {
  reducedMotion: 'reduce',
  deviceScaleFactor: DEVICE_SCALE_FACTOR,
} as const;

const CHROMIUM_LAUNCH_ARGS = [
  '--disable-gpu',
  '--disable-font-subpixel-positioning',
  '--disable-lcd-text',
  '--font-render-hinting=none',
  '--disable-accelerated-2d-canvas',
];

export default defineConfig({
  testDir: './',
  testMatch: SPEC_MATCH,
  testIgnore: SNAPSHOT_IGNORE,
  snapshotPathTemplate: config.paths.snapshotTemplate,

  fullyParallel: true,
  forbidOnly: config.isCI,
  retries,
  workers,
  timeout: TEST_TIMEOUT,

  outputDir: OUTPUT_DIR,

  reporter: [
    ['list', { printSteps: true }],
    ['json', { outputFile: JSON_REPORT_FILE }],
    ['html', { outputFolder: HTML_REPORT_DIR, open: 'never' }],
  ],

  expect: {
    timeout: EXPECT_TIMEOUT,
    toHaveScreenshot: {
      animations: 'disabled',
      stylePath: PRE_SCREENSHOT_STYLE_PATH,
    },
  },

  use: {
    baseURL: config.baseUrl,
    actionTimeout: ACTION_TIMEOUT,
    testIdAttribute: TEST_ID_ATTRIBUTE,
    headless: true,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
    viewport: VIEWPORT,
    contextOptions: {
      ...CONTEXT_OPTIONS,
      ignoreHTTPSErrors: config.ignoreHttpsErrors,
    },
  },

  projects: [
    {
      name: 'FFC',
      dependencies: ['setup'],
      use: {
        channel: 'chromium',
        viewport: VIEWPORT,
        launchOptions: { args: CHROMIUM_LAUNCH_ARGS },
        contextOptions: {
          ...CONTEXT_OPTIONS,
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: 'setup',
      testMatch: SETUP_MATCH,
    },
  ],
});
