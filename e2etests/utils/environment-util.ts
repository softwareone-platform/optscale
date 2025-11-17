import { debugLog } from './debug-logging';

/**
 * Determines the environment based on the `BASE_URL` and `API_BASE_URL` environment variables. This is required
 * to use the correct test data for the different organization configurations on each environment.
 *
 * This function evaluates the `BASE_URL` against predefined environment variables (`TEST`, `STAGING`, `DEV`)
 * to determine the current environment. If `BASE_URL` contains 'localhost', it further checks the `API_BASE_URL`
 * for specific substrings ('show' or 'today') to decide between 'test' and 'dev' environments.
 *
 * @throws {Error} Throws an error if the environment configuration is unknown.
 * @returns {string} The determined environment ('test', 'staging', or 'dev').
 */
export function setEnvironment(): string {
  if (process.env.BASE_URL === process.env.TEST) {
    debugLog('Environment set to TEST');
    return 'test';
  } else if (process.env.BASE_URL === process.env.STAGING) {
    debugLog('Environment set to STAGING');
    return 'staging';
  } else if (process.env.BASE_URL === process.env.DEV) {
    debugLog('Environment set to DEV');
    return 'dev';
  } else if (process.env.BASE_URL.includes('localhost')) {
    if (process.env.API_BASE_URL.includes('show')) return 'test';
    if (process.env.API_BASE_URL.includes('today')) return 'dev';
  } else {
    throw new Error('Unknown environment configuration, or BASE_URL does not match TEST, STAGING, or DEV.');
  }
}

/**
 * Determines the name of the test organization based on the current environment.
 *
 * This function checks if the `ENVIRONMENT` environment variable matches the
 * `STAGING` environment variable. If they are equal, it returns the name
 * 'Marketplace Platform Team'. Otherwise, it returns 'SoftwareOne (Test Environment)'.
 *
 * @returns {string} The name of the test organization.
 */
export function getEnvironmentTestOrgName(): string {
  return process.env.ENVIRONMENT === 'staging' ? 'Marketplace Platform Team' : 'SoftwareOne (Test Environment)';
}
