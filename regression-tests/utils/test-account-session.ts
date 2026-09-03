import { Page } from '@playwright/test';
import path from 'path';
import { type StoredTestAccountSession } from '@/types';
import { safeReadJsonFile } from '@/utils/file';
import { config } from '@/utils/config';

const LOCALFORAGE_SCRIPT = path.resolve(__dirname, '../vendor/localforage.min.js');
const FIXED_TIME = new Date('2025-01-25T12:00:00Z');

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
 * Restores the cached test-account session into localforage on a fresh `/` load.
 * `setFixedTime=true` pins the clock — only enable for time-independent tests.
 */
export async function restoreSession(page: Page, setFixedTime = false): Promise<void> {
  const session = safeReadJsonFile<StoredTestAccountSession>(config.paths.testAccountSessionFile);
  if (!session) throw new Error(`No cached test-account session at ${config.paths.testAccountSessionFile}`);

  // Pin the clock before the first navigation so all app timestamps see it.
  if (setFixedTime) await page.clock.setFixedTime(FIXED_TIME);

  await page.goto('/', { waitUntil: 'load' });
  await injectLocalforage(page);

  // Write the cached session and verify it committed.
  await page.evaluate(async (data: StoredTestAccountSession) => {
    const lf = (window as LocalForageWindow).localforage!;
    await lf.setItem('root', data.localforageStoredSession.root);
    const written = await lf.getItem('root');
    if (!written) throw new Error('localforage write did not commit');
  }, session);
}
