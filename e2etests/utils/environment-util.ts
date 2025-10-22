/**
 * Determines the environment based on the `BASE_URL` and `API_BASE_URL` environment variables.
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
    return 'test';
  } else if (process.env.BASE_URL === process.env.STAGING) {
    return 'staging';
  } else if (process.env.BASE_URL === process.env.DEV) {
    return 'dev';
  } else if (process.env.BASE_URL.includes('localhost')) {
    if (process.env.API_BASE_URL.includes('show')) return 'test';
    if (process.env.API_BASE_URL.includes('today')) return 'dev';
  } else {
    throw new Error('Unknown environment configuration');
  }
}
