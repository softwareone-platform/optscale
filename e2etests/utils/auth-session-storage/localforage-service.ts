import { Page } from '@playwright/test';
import { safeReadJsonFile } from '../file';
import path from 'path';
import { LiveDemoService } from './auth-helpers';

export async function injectLocalforage(page: Page) {
  const scriptPath = path.resolve(__dirname, './script/localforage.min.js');
  await page.addScriptTag({ path: scriptPath });
  await new Promise(resolve => setTimeout(resolve, 200));
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
  const sessionData = safeReadJsonFile(LiveDemoService.getDefaultUserStorageState());
  await page.goto('/', { waitUntil: 'load' });
  await injectLocalforage(page);
  await page.evaluate(data => {
    const lf = (window as any).localforage;
    return lf.setItem('root', data.localforageStoredSession.root);
  }, sessionData);

  await page.waitForFunction(
    expected => {
      const lf = (window as any).localforage;
      if (!lf) return false;
      return lf.getItem('root').then(stored => {
        return JSON.stringify(stored) === JSON.stringify(expected);
      });
    },
    sessionData,
    { timeout: 1000 }
  );
  //Setting fixed time breaks UI tests that use real time, or different dates
  if (setTime) await page.clock.setFixedTime(new Date('2025-01-25T12:00:00Z'));
}
