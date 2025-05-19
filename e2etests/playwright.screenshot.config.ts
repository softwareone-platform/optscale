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
  testMatch: /swo-screenshot-tests\.spec\.ts/,
  snapshotPathTemplate: `./tests/screenshots/snapshots/${os.platform()}/{arg}{ext}`,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 1,
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
      stylePath: './tests/screenshots/styles/pre-screenshot-styles.css'
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
});
