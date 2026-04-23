import type { BrowserContext } from '@playwright/test';
import type { DemoAccountCredentials } from './api-response.types';

/** Playwright's own storage-state shape (cookies + origins), inferred from its API. */
type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>;

/**
 * Shape of the JSON document written by `setup/auth.setup.ts` and read by the
 * fixture + service layer (see `utils/demo-account-session.ts` for the path).
 *
 * Extends Playwright's own `StorageState` (cookies + origins) with the two
 * app-specific fields we also need to replay a session: the localforage
 * `root` blob and the demo-account credentials the app was logged in as.
 */
export interface StoredDemoSession extends StorageState {
  localforageStoredSession: { root: unknown };
  demoAccountCredentials: DemoAccountCredentials;
}
