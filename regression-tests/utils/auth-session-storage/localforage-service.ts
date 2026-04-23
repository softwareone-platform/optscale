import { Page } from '@playwright/test';
import path from 'path';
import { EStorageStatePath } from '@/types';
import { safeReadJsonFile } from '@/utils/file';

const LOCALFORAGE_SCRIPT = path.resolve(__dirname, '../../vendor/localforage.min.js');
const FIXED_TIME = new Date('2025-01-25T12:00:00Z');

/** Narrow typing for the global injected by the vendored localforage script. */
type LocalForageWindow = Window & { localforage?: { getItem: (k: string) => Promise<unknown>; setItem: (k: string, v: unknown) => Promise<unknown> } };

/** Injects the vendored localforage bundle and waits until it's available on `window`. */
export async function injectLocalforage(page: Page): Promise<void> {
  await page.addScriptTag({ path: LOCALFORAGE_SCRIPT });
  await page.waitForFunction(() => !!(window as LocalForageWindow).localforage);
}

/** Reads the `root` key from localforage. Throws if the script isn't loaded or the key is missing. */
export async function getLocalforageRoot(page: Page): Promise<unknown> {
  return page.evaluate(async () => {
    const lf = (window as LocalForageWindow).localforage;
    if (!lf) throw new Error('localforage is not loaded');

    const root = await lf.getItem('root');
    if (!root) throw new Error("No auth data found under key 'root'");
    return root;
  });
}

/**
 * Restores the cached live-demo session into localforage on a fresh `/` load.
 * `setFixedTime=true` pins the clock to a known date — enable only for tests
 * that don't rely on real time.
 */
export async function restoreUserSessionInLocalForage(page: Page, setFixedTime = false): Promise<void> {
  const session = safeReadJsonFile<{ localforageStoredSession: { root: unknown } }>(EStorageStatePath.liveDemoUser);
  if (!session) throw new Error(`No cached live-demo session at ${EStorageStatePath.liveDemoUser}`);

  await page.goto('/', { waitUntil: 'load' });
  await injectLocalforage(page);

  await page.evaluate((data: { localforageStoredSession: { root: unknown } }) => {
    const lf = (window as LocalForageWindow).localforage!;
    return lf.setItem('root', data.localforageStoredSession.root);
  }, session);

  if (setFixedTime) await page.clock.setFixedTime(FIXED_TIME);
}
