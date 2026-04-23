import dotenv from 'dotenv';
import path from 'path';

/**
 * Single source of truth for every env var this project reads.
 * Import `env.*` anywhere you would otherwise reach for `process.env`.
 */

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

/** `"true"` → `true`, anything else → `fallback`. */
const asBool = (value: string | undefined, fallback = false): boolean =>
  value === undefined ? fallback : value === 'true';

/** Non-empty string or `fallback`. */
const asString = (value: string | undefined, fallback: string): string =>
  value && value.length > 0 ? value : fallback;

export const env = {
  // ─── App under test ────────────────────────────────────────────────────
  /** Base URL Playwright points at (the portal the tests exercise). */
  baseUrl: asString(process.env.BASE_URL, 'http://0.0.0.0:3000'),

  /** Cluster URL to proxy API requests to — mirrors `VITE_PROXY` in `ngui/ui/.env.sample`. */
  hostUrl: process.env.HOST_URL ?? '',

  /** Bearer token the demo-account endpoint expects in `X-LiveDemo-Token`. */
  hostAccountApiToken: process.env.HOST_ACCOUNT_API_TOKEN ?? '',

  // ─── Run modes ─────────────────────────────────────────────────────────
  /** `true` when running inside CI. */
  isCI: asBool(process.env.CI),

  /** `true` when comparing against the regression baseline. */
  isRegressionRun: asBool(process.env.IS_REGRESSION_RUN),

  /** Accept self-signed / expired certs. */
  ignoreHttpsErrors: asBool(process.env.IGNORE_HTTPS_ERRORS),

  // ─── Debug hooks ───────────────────────────────────────────────────────
  /** Enable `[DEBUG]` messages from `debugLog`. */
  debugLog: asBool(process.env.DEBUG_LOG),

  /** Forward browser `console.error` to the Node test runner. */
  browserErrorLogging: asBool(process.env.BROWSER_ERROR_LOGGING),
} as const;

export type Env = typeof env;

/**
 * Maps each `env.*` key back to the literal env-var name users set in `.env`.
 * Kept as an explicit table so error messages from `requireEnv(...)` reference
 * the name the user actually has to search for.
 */
const ENV_VAR_NAMES: Record<keyof Env, string> = {
  baseUrl: 'BASE_URL',
  hostUrl: 'HOST_URL',
  hostAccountApiToken: 'HOST_ACCOUNT_API_TOKEN',
  isCI: 'CI',
  isRegressionRun: 'IS_REGRESSION_RUN',
  ignoreHttpsErrors: 'IGNORE_HTTPS_ERRORS',
  debugLog: 'DEBUG_LOG',
  browserErrorLogging: 'BROWSER_ERROR_LOGGING',
};

/**
 * Throws if any of the listed env vars is empty. Call from a consumer right
 * before it needs them (fail-fast, with a single clear error message).
 *
 * @example
 *   requireEnv('hostUrl', 'hostAccountApiToken');
 */
export function requireEnv(...keys: Array<keyof Env>): void {
  const missing = keys.filter(key => !env[key]);
  if (missing.length === 0) return;

  const envVarNames = missing.map(key => ENV_VAR_NAMES[key]).join(', ');
  throw new Error(`Missing required env var${missing.length > 1 ? 's' : ''}: ${envVarNames}`);
}
