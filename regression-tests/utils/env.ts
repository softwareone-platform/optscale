import dotenv from 'dotenv';
import path from 'path';

import { ENVIRONMENTS, ENVIRONMENT_KEYS, TestEnv, isBareOrigin } from '@/env.config';

// Import `env.*` anywhere you would otherwise reach for `process.env`.
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const asBool = (value: string | undefined, fallback = false): boolean => (value === undefined ? fallback : value === 'true');

const asString = (value: string | undefined, fallback: string): string => (value && value.length > 0 ? value : fallback);

const asPositiveInt = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

const asBareOrigin = (name: string, value: string | undefined, fallback: string): string => {
  const resolved = asString(value, fallback);
  if (isBareOrigin(resolved)) return resolved;
  throw new Error(`${name} must be scheme://host[:port] with no trailing slash — got "${resolved}"`);
};

const asEnum = <T extends string>(name: string, value: string | undefined, allowed: readonly T[], fallback: T): T => {
  const resolved = asString(value, fallback) as T;
  if (allowed.includes(resolved)) return resolved;
  throw new Error(`Unknown ${name} "${resolved}". Expected one of: ${allowed.join(', ')}`);
};

const testEnv = asEnum('TEST_ENV', process.env.TEST_ENV, Object.keys(ENVIRONMENTS) as TestEnv[], 'local');
const preset = ENVIRONMENTS[testEnv];

// Moves only the screenshots: the token and session stay on TEST_ENV, which decides
// which cluster the run can authenticate against at all.
const snapshotEnv = asEnum('SNAPSHOT_ENV', process.env.SNAPSHOT_ENV, ENVIRONMENT_KEYS, preset.key);

export const env = {
  testEnv,

  /** Deployment behind the preset; keys the token var, session cache and screenshots. */
  envKey: preset.key,

  baseUrl: asBareOrigin('BASE_URL_OVERRIDE', process.env.BASE_URL_OVERRIDE, preset.baseUrl),

  apiBaseUrl: asBareOrigin('API_BASE_URL_OVERRIDE', process.env.API_BASE_URL_OVERRIDE, preset.apiBaseUrl),

  testAccountToken: asString(process.env[preset.tokenVar], ''),
  isCI: asBool(process.env.CI),

  ciWorkers: asPositiveInt(process.env.PW_WORKERS, 2),

  snapshotEnv,

  ignoreHttpsErrors: asBool(process.env.IGNORE_HTTPS_ERRORS),

  debugLog: asBool(process.env.DEBUG_LOG),

  browserErrorLogging: asBool(process.env.BROWSER_ERROR_LOGGING),
} as const;

type Env = typeof env;

// Spelled out rather than derived, because of irregulars like `isCI` → `CI`.
const ENV_VAR_NAMES: Record<keyof Env, string> = {
  testEnv: 'TEST_ENV',
  envKey: 'TEST_ENV',
  baseUrl: 'BASE_URL_OVERRIDE',
  apiBaseUrl: 'API_BASE_URL_OVERRIDE',
  testAccountToken: preset.tokenVar,
  isCI: 'CI',
  ciWorkers: 'PW_WORKERS',
  snapshotEnv: 'SNAPSHOT_ENV',
  ignoreHttpsErrors: 'IGNORE_HTTPS_ERRORS',
  debugLog: 'DEBUG_LOG',
  browserErrorLogging: 'BROWSER_ERROR_LOGGING',
};

export function requireEnv(...keys: Array<keyof Env>): void {
  const missing = keys.filter(key => !env[key]);
  if (missing.length === 0) return;

  const envVarNames = missing.map(key => ENV_VAR_NAMES[key]).join(', ');
  throw new Error(`Missing required env var${missing.length > 1 ? 's' : ''}: ${envVarNames}`);
}
