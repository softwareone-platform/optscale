import os from 'os';
import { env } from './env';

/**
 * Cross-cutting configuration: runtime env (spread from `./env`) plus the few
 * knobs more than one module needs — shared timeouts and the per-host paths.
 * Constants used by a single module live in that module (e.g. Playwright-only
 * settings in `playwright.config.ts`, screenshot tuning in `screenshots.ts`).
 */

/** Turn a host URL into a filesystem-safe slug, shared by the snapshot and session-cache paths. */
const hostSlug = (url: string, fallback = 'host'): string =>
  (url || fallback)
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '') || fallback;

/** Snapshot sub-folder (see `snapshotMode` in env); host keeps it aligned with the session cache. */
const snapshotSubdir =
  env.snapshotMode === 'baseline'
    ? `baseline/${hostSlug(env.apiBaseUrl, 'baseline')}`
    : `local/${hostSlug(env.apiBaseUrl, 'baseline')}/${os.platform()}`;

export const config = {
  ...env,

  /** Timeouts in milliseconds. */
  timeouts: {
    probe: 2_000,
    click: 10_000,
    viewportStable: 10_000,
  },

  /** Per-host paths: snapshot template + session cache, both keyed by `hostSlug`. */
  paths: {
    snapshotTemplate: `./snapshots/${snapshotSubdir}/{arg}{ext}`,
    testAccountSessionFile: `.cache/${hostSlug(env.apiBaseUrl, 'test-account')}-session.json`,
  },
} as const;

export { requireEnv } from './env';
