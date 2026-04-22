import { Page } from '@playwright/test';
import { safeReadJsonFile } from '@/utils/file';
import path from 'path';
import { EStorageStatePath } from '@/types';

const LOCALFORAGE_SCRIPT = path.resolve(__dirname, '../../vendor/localforage.min.js');

export async function injectLocalforage(page: Page) {
  await page.addScriptTag({ path: LOCALFORAGE_SCRIPT });
  await page.waitForFunction(() => !!(window as any).localforage);
}

export async function getLocalforageRoot(page: Page) {
  return await page.evaluate(async () => {
    const lf = (window as any).localforage;
    if (!lf) throw new Error('localforage is not loaded');

    const rootValue = await lf.getItem('root');
    if (!rootValue) throw new Error("No auth data found under key 'root'");
    return rootValue;
  });
}

export async function restoreUserSessionInLocalForage(page: Page, setTime = false) {
  const sessionData = safeReadJsonFile(EStorageStatePath.liveDemoUser);
  await page.goto('/', { waitUntil: 'load' });
  await injectLocalforage(page);
  await page.evaluate(data => {
    const lf = (window as any).localforage;
    return lf.setItem('root', data.localforageStoredSession.root);
  }, sessionData);

  //Setting fixed time breaks UI tests that use real time, or different dates
  if (setTime) await page.clock.setFixedTime(new Date('2025-01-25T12:00:00Z'));
}
