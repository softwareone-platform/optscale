import { Page } from '@playwright/test';
import path from 'path';
import { DEMO_ACCOUNT_SESSION_PATH, type StoredDemoSession } from '@/types';
import { safeReadJsonFile } from '@/utils/file';

const LOCALFORAGE_SCRIPT = path.resolve(__dirname, '../vendor/localforage.min.js');
const FIXED_TIME = new Date('2025-01-25T12:00:00Z');

/** Narrow typing for the global injected by the vendored localforage script. */
type LocalForageWindow = Window & { localforage?: { setItem: (k: string, v: unknown) => Promise<unknown> } };

/** Injects the vendored localforage bundle and waits until it's available on `window`. */
export async function injectLocalforage(page: Page): Promise<void> {
  await page.addScriptTag({ path: LOCALFORAGE_SCRIPT });
  await page.waitForFunction(() => !!(window as LocalForageWindow).localforage);
}

/**
 * Restores the cached demo-account session into localforage on a fresh `/` load.
 * `setFixedTime=true` pins the clock to a known date — enable only for tests
 * that don't rely on real time.
 */
export async function restoreUserSessionInLocalForage(page: Page, setFixedTime = false): Promise<void> {
  const session = safeReadJsonFile<StoredDemoSession>(DEMO_ACCOUNT_SESSION_PATH);
  if (!session) throw new Error(`No cached demo-account session at ${DEMO_ACCOUNT_SESSION_PATH}`);

  await page.goto('/', { waitUntil: 'load' });
  await injectLocalforage(page);

  await page.evaluate((data: StoredDemoSession) => {
    const lf = (window as LocalForageWindow).localforage!;
    return lf.setItem('root', data.localforageStoredSession.root);
  }, session);

  if (setFixedTime) await page.clock.setFixedTime(FIXED_TIME);
}
