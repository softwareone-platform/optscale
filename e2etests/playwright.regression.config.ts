import {defineConfig} from '@playwright/test';
import os from 'os';
import dotenv from 'dotenv';
import path from 'path';

// Load .env.local
dotenv.config({ path: path.resolve(__dirname, '.env.local') });

// Detect if running in Docker
const isDocker = process.env.DOCKER_ENV === 'true';

// Determine baseURL
const getBaseURL = (): string => {
  const originalURL = process.env.BASE_URL || 'http://localhost:3000';

  if (isDocker && originalURL.startsWith('http://localhost')) {
    return originalURL.replace('localhost', 'host.docker.internal');
  }

  return originalURL;
};

export default defineConfig({
  testDir: './',
  testMatch: /regression-tests\/tests\/swo-regression-tests\.spec\.ts/,
  snapshotPathTemplate: `./snapshots/{projectName}/${os.platform()}-{arg}{ext}`,
  testIgnore: ['**/snapshots/**'],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : 3,
  timeout: 30000,
  reporter: [
    ["list"],
    ["json", {outputFile: "results.json"}],
    ["html", {open: "never"}],
  ],
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      stylePath: './regression-tests/utils/disable-antialiasing/pre-screenshot-styles.css'
    },
  },

  use: {
    baseURL: getBaseURL(),
    actionTimeout: 10000,
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
      testMatch: /setup\/auth-live-demo\.setup\.ts/
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
});
