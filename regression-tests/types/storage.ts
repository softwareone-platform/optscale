import type { BrowserContext } from '@playwright/test';
import type { TestAccountCredentials } from './api-response.types';

/** Playwright's storage-state shape (cookies + origins), inferred from its API. */
type StorageState = Awaited<ReturnType<BrowserContext['storageState']>>;

/**
 * JSON shape written by `setup/auth.setup.ts` and read by the fixture/service
 * layer (path: see `utils/test-account-session.ts`).
 *
 * Extends Playwright's `StorageState` with the two app-specific fields needed
 * to replay a session: the localforage `root` blob and the test-account credentials.
 */
export interface StoredTestAccountSession extends StorageState {
  localforageStoredSession: { root: unknown };
  testAccountCredentials: TestAccountCredentials;
}
