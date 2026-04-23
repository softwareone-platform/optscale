import type { BrowserContext } from '@playwright/test';
import type { DemoAccountCredentials } from './api-response.types';

/** Playwright's own storage-state shape (cookies + origins), inferred from its API. */
type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>;

/** Path (relative to the repo root) of the cached demo-account session file. */
export const DEMO_ACCOUNT_SESSION_PATH = '.cache/demo-account-session.json';

/**
 * Shape of the JSON document written to `DEMO_ACCOUNT_SESSION_PATH` by
 * `setup/auth.setup.ts` and read by the fixture + service layer.
 *
 * Extends Playwright's own `StorageState` (cookies + origins) with the two
 * app-specific fields we also need to replay a session: the localforage
 * `root` blob and the demo-account credentials the app was logged in as.
 */
export interface StoredDemoSession extends StorageState {
  localforageStoredSession: { root: unknown };
  demoAccountCredentials: DemoAccountCredentials;
}
