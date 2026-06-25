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

/** One of `allowed` (defaulting to `fallback`); throws on an unrecognized value. */
const asEnum = <T extends string>(
  name: string,
  value: string | undefined,
  allowed: readonly T[],
  fallback: T,
): T => {
  const resolved = asString(value, fallback) as T;
  if (allowed.includes(resolved)) return resolved;
  throw new Error(`Unknown ${name} "${resolved}". Expected one of: ${allowed.join(', ')}`);
};

/**
 * Named URL presets, selected with `TEST_ENV`. URLs are public so they live in
 * git; the matching test-account token stays in the gitignored `.env`.
 * Set `BASE_URL_OVERRIDE` / `API_BASE_URL_OVERRIDE` to override a preset (e.g. in CI).
 */
const ENVIRONMENTS = {
  prerelease: { baseUrl: 'https://portal.finops.s1.show', apiBaseUrl: 'https://portal.finops.s1.show', tokenVar: 'PRERELEASE_TEST_ACCOUNT_TOKEN' },
  dev: { baseUrl: 'https://portal.finops.s1.today', apiBaseUrl: 'https://portal.finops.s1.today', tokenVar: 'DEV_TEST_ACCOUNT_TOKEN' },
  local: { baseUrl: 'http://localhost:3000', apiBaseUrl: 'https://portal.finops.s1.today', tokenVar: 'LOCAL_TEST_ACCOUNT_TOKEN' },
} as const;

type TestEnv = keyof typeof ENVIRONMENTS;

const testEnv = asEnum('TEST_ENV', process.env.TEST_ENV, Object.keys(ENVIRONMENTS) as TestEnv[], 'local');
const preset = ENVIRONMENTS[testEnv];

/**
 * Where screenshot snapshots live:
 * - `baseline` → committed `snapshots/baseline/<host>/`, shared across devs (CI).
 * - `local`    → gitignored `snapshots/local/<host>/<platform>/`, per developer.
 */
const SNAPSHOT_MODES = ['baseline', 'local'] as const;

const snapshotMode = asEnum('SNAPSHOT_MODE', process.env.SNAPSHOT_MODE, SNAPSHOT_MODES, 'local');

export const env = {
  // ─── App under test ────────────────────────────────────────────────────
  /** Selected environment preset (`prerelease` | `dev` | `local`). */
  testEnv,

  /** Base URL Playwright points at (`BASE_URL_OVERRIDE` overrides the preset). */
  baseUrl: asString(process.env.BASE_URL_OVERRIDE, preset.baseUrl),

  /** Cluster URL for proxied API requests (`API_BASE_URL_OVERRIDE` overrides the preset). */
  apiBaseUrl: asString(process.env.API_BASE_URL_OVERRIDE, preset.apiBaseUrl),

  /** Test-account bearer (sent as `X-LiveDemo-Token`); preset's `tokenVar`, else plain `TEST_ACCOUNT_TOKEN`. */
  testAccountToken: process.env[preset.tokenVar] ?? process.env.TEST_ACCOUNT_TOKEN ?? '',

  // ─── Run modes ─────────────────────────────────────────────────────────
  /** `true` when running inside CI. */
  isCI: asBool(process.env.CI),

  /** Snapshot folder selector (`baseline` shared/committed | `local` per-dev). */
  snapshotMode,

  /** Accept self-signed / expired certs. */
  ignoreHttpsErrors: asBool(process.env.IGNORE_HTTPS_ERRORS),

  // ─── Debug hooks ───────────────────────────────────────────────────────
  /** Enable `[DEBUG]` messages from `debugLog`. */
  debugLog: asBool(process.env.DEBUG_LOG),

  /** Forward browser `console.error` to the Node test runner. */
  browserErrorLogging: asBool(process.env.BROWSER_ERROR_LOGGING),
} as const;

type Env = typeof env;

/**
 * Maps each `env.*` key to its literal env-var name, so `requireEnv(...)` errors
 * name what the user must set. Explicit because of irregulars (`isCI` → `CI`).
 */
const ENV_VAR_NAMES: Record<keyof Env, string> = {
  testEnv: 'TEST_ENV',
  baseUrl: 'BASE_URL_OVERRIDE',
  apiBaseUrl: 'API_BASE_URL_OVERRIDE',
  testAccountToken: 'TEST_ACCOUNT_TOKEN',
  isCI: 'CI',
  snapshotMode: 'SNAPSHOT_MODE',
  ignoreHttpsErrors: 'IGNORE_HTTPS_ERRORS',
  debugLog: 'DEBUG_LOG',
  browserErrorLogging: 'BROWSER_ERROR_LOGGING',
};

/**
 * Throws if any of the listed env vars is empty. Call from a consumer right
 * before it needs them (fail-fast, with a single clear error message).
 *
 * @example
 *   requireEnv('apiBaseUrl', 'testAccountToken');
 */
export function requireEnv(...keys: Array<keyof Env>): void {
  const missing = keys.filter(key => !env[key]);
  if (missing.length === 0) return;

  const envVarNames = missing.map(key => ENV_VAR_NAMES[key]).join(', ');
  throw new Error(`Missing required env var${missing.length > 1 ? 's' : ''}: ${envVarNames}`);
}

