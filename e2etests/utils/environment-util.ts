import { debugLog } from './debug-logging';
import { EEnvironment, EOpsDefaultAccountID, EOpsDefaultOrgId } from '../types/enums';

/**
 * Sets the application environment based on the `ENVIRONMENT` or `BASE_URL` environment variables.
 *
 * This function first checks if the `ENVIRONMENT` variable is already set to one of the predefined
 * environments ('TEST', 'STAGING', or 'DEV'). If so, it logs the current environment and returns it.
 *
 * If the `ENVIRONMENT` variable is not set, the function determines the environment based on the `BASE_URL`
 * variable. It supports the following cases:
 * - If `BASE_URL` matches the `TEST`, `STAGING`, or `DEV` environment variables, it sets the environment accordingly.
 * - If `BASE_URL` includes 'localhost', additional checks are performed on the `API_BASE_URL` variable to determine
 *   if the environment is 'TEST', 'DEV', or 'STAGING'.
 *
 * If none of the conditions are met, the function throws an error indicating an unknown environment configuration.
 *
 * @returns {string} The name of the environment ('TEST', 'STAGING', 'DEV', or corresponding `EEnvironment` values).
 * @throws {Error} If the environment configuration is unknown or `BASE_URL` does not match any predefined values.
 */
export function setEnvironment(): string {
  // Check if the environment is already set to 'TEST', 'STAGING', or 'DEV'
  if (process.env.ENVIRONMENT) {
    const env = process.env.ENVIRONMENT.toUpperCase();
    if (env === EEnvironment.TEST || env === EEnvironment.STAGING || env === EEnvironment.DEV) {
      debugLog(`Environment already set to ${env}`);
      return env;
    }
  }

  // Determine the environment based on the BASE_URL variable
  if (process.env.BASE_URL === process.env.TEST) {
    debugLog('Environment set to TEST');
    return EEnvironment.TEST;
  } else if (process.env.BASE_URL === process.env.STAGING) {
    debugLog('Environment set to STAGING');
    return EEnvironment.STAGING;
  } else if (process.env.BASE_URL === process.env.DEV) {
    debugLog('Environment set to DEV');
    return EEnvironment.DEV;
  } else if (process.env.BASE_URL.includes('localhost')) {
    // Additional checks for localhost environments
    if (process.env.API_BASE_URL.includes('show')) return EEnvironment.TEST;
    if (process.env.API_BASE_URL.includes('today')) return EEnvironment.DEV;
    if (process.env.API_BASE_URL.includes('live')) return EEnvironment.STAGING;
  } else {
    // Throw an error if the environment configuration is unknown
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
  return process.env.ENVIRONMENT === EEnvironment.STAGING ? 'Marketplace Platform Team' : 'SoftwareOne (Test Environment)';
}

/**
 * Retrieves the organization ID for the current environment.
 *
 * This function determines the organization ID based on the `ENVIRONMENT` environment variable.
 * It matches the environment to predefined values in the `EEnvironment` enum and returns the corresponding
 * organization ID from the `EOpsDefaultOrgId` enum. If the environment is not recognized, an error is thrown.
 *
 * @returns {string} The organization ID for the current environment.
 * @throws {Error} If the `ENVIRONMENT` variable does not match any known environment.
 */
export function getEnvironmentOpsOrgId(): string {
  const env = process.env.ENVIRONMENT;

  switch (env) {
    case EEnvironment.TEST:
      return EOpsDefaultOrgId.TEST;
    case EEnvironment.STAGING:
      return EOpsDefaultOrgId.STAGING;
    case EEnvironment.DEV:
      return EOpsDefaultOrgId.DEV;
    default:
      throw new Error('Unknown environment for OPS_ORG_ID retrieval.');
  }
}

/**
 * Retrieves the account ID for the current environment.
 *
 * This function determines the account ID based on the `ENVIRONMENT` environment variable.
 * It matches the environment to predefined values in the `EEnvironment` enum and returns the corresponding
 * account ID from the `EOpsDefaultAccountID` enum. If the environment is not recognized, an error is thrown.
 *
 * @returns {string} The account ID for the current environment.
 * @throws {Error} If the `ENVIRONMENT` variable does not match any known environment.
 */
export function getEnvironmentOpsAccountId(): string {
  const env = process.env.ENVIRONMENT;

  switch (env) {
    case EEnvironment.TEST:
      return EOpsDefaultAccountID.TEST;
    case EEnvironment.STAGING:
      return EOpsDefaultAccountID.STAGING;
    case EEnvironment.DEV:
      return EOpsDefaultAccountID.DEV;
    default:
      throw new Error('Unknown environment for OPS_ACCOUNT_ID retrieval.');
  }
}
