import { Page } from '@playwright/test';
import path from 'path';
import { type StoredDemoSession } from '@/types';
import { safeReadJsonFile } from '@/utils/file';
import { env, hostSlug } from '@/utils/env';

const LOCALFORAGE_SCRIPT = path.resolve(__dirname, '../vendor/localforage.min.js');
const FIXED_TIME = new Date('2025-01-25T12:00:00Z');

/** Cached demo-account session file path (one per host), relative to repo root. */
export const DEMO_ACCOUNT_SESSION_PATH = `.cache/${hostSlug(env.apiBaseUrl, 'demo-account')}-session.json`;

/** Window with the localforage global injected by the vendored script. */
type LocalForageWindow = Window & {
  localforage?: {
    setItem: (k: string, v: unknown) => Promise<unknown>;
    getItem: (k: string) => Promise<unknown>;
  };
};

/** Injects the vendored localforage bundle and waits for it on `window`. */
export async function injectLocalforage(page: Page): Promise<void> {
  await page.addScriptTag({ path: LOCALFORAGE_SCRIPT });
  await page.waitForFunction(() => !!(window as LocalForageWindow).localforage);
}

/**
 * Restores the cached demo-account session into localforage on a fresh `/` load.
 * `setFixedTime=true` pins the clock — only enable for time-independent tests.
 */
export async function restoreUserSessionInLocalForage(page: Page, setFixedTime = false): Promise<void> {
  const session = safeReadJsonFile<StoredDemoSession>(DEMO_ACCOUNT_SESSION_PATH);
  if (!session) throw new Error(`No cached demo-account session at ${DEMO_ACCOUNT_SESSION_PATH}`);

  // Pin the clock before the first navigation so all app timestamps see it.
  if (setFixedTime) await page.clock.setFixedTime(FIXED_TIME);

  await page.goto('/', { waitUntil: 'load' });
  await injectLocalforage(page);

  // Write the cached session and verify it committed.
  await page.evaluate(async (data: StoredDemoSession) => {
    const lf = (window as LocalForageWindow).localforage!;
    await lf.setItem('root', data.localforageStoredSession.root);
    const written = await lf.getItem('root');
    if (!written) throw new Error('localforage write did not commit');
  }, session);
}
