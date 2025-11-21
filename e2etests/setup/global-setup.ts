import { FullConfig } from '@playwright/test';
import dotenv from 'dotenv';
import { setEnvironment } from '../utils/environment-util';

/**
 * Global setup function for Playwright tests.
 *
 * This function is executed before the test suite begins and is used to configure
 * environment variables and log important test configuration details.
 *
 * @param {FullConfig} config - The full configuration object provided by Playwright.
 */
async function globalSetup(config: FullConfig) {
  if (!config) console.error('No config found');

  dotenv.config({
    path: '.env.local',
    override: true,
  });

  process.env.ENVIRONMENT = setEnvironment();

  const localHostURL = 'http://localhost:3000';

  // Log key environment variables for debugging purposes
  console.log(`Tests running on ${process.env.BASE_URL}`);
  console.log(`Ignoring HTTPS errors: ${process.env.IGNORE_HTTPS_ERRORS}`);
  console.log(`SCREENSHOT_UPDATE_DELAY: ${process.env.SCREENSHOT_UPDATE_DELAY}`);
  console.log(`USE_LIVE_DEMO: ${process.env.USE_LIVE_DEMO}`);
  console.log(`BROWSER_ERROR_LOGGING: ${process.env.BROWSER_ERROR_LOGGING}`);
  console.log(`DEBUG_LOG: ${process.env.DEBUG_LOG}`);
  if (process.env.BASE_URL === undefined) console.error('***BASE_URL is not set. This is required for the tests to run.');
  if (process.env.DEV === undefined || process.env.TEST === undefined || process.env.STAGING === undefined ) console.error('***DEV, TEST, or STAGING is not set. One of these is required for the tests to run.');
  if (process.env.DEFAULT_USER_EMAIL === undefined || process.env.DEFAULT_USER_PASSWORD === undefined)
    console.warn('***DEFAULT_USER_EMAIL or DEFAULT_USER_PASSWORD is not set. This will block login for tests not using live demo.');
  if (process.env.DEFAULT_AUTH_USER_ID === undefined)
    console.warn(`***DEFAULT_AUTH_USER_ID is not set. This may cause issues with some API tests`);
  if (process.env.DEFAULT_USER_ID === undefined) console.warn(`***DEFAULT_USER_ID is not set. This may cause issues with some API tests`);
  if (process.env.USE_LIVE_DEMO === `true`) {
    if (process.env.LIVE_DEMO_API === undefined) {
      console.error(`***LIVE_DEMO_API is required when USE_LIVE_DEMO is set to true`);
    }
    if (process.env.BASE_URL !== localHostURL) {
      if (process.env.LIVE_DEMO_API !== process.env.BASE_URL) {
        console.warn(
          `***LIVE_DEMO_API is set to ${process.env.LIVE_DEMO_API} but BASE_URL is ${process.env.BASE_URL}. This may cause issues if they are not the same.`
        );
      }
    }
    if (process.env.LIVE_DEMO_TOKEN === undefined)
      console.error(`***LIVE_DEMO_TOKEN is not set. It is required when USE_LIVE_DEMO is true.`);
  }
  if (process.env.CLUSTER_SECRET === undefined) console.error(`***CLUSTER_SECRET is not set`);
  if (process.env.BASE_URL === localHostURL && process.env.API_BASE_URL === undefined)
    console.error(
      `***API_BASE_URL is required when BASE_URL is set to localhost. It should match VITE_PROXY argument used to start the app.`
    );
}

// Export the global setup function as a module
module.exports = globalSetup;
