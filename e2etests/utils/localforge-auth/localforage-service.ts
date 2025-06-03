import {Page} from '@playwright/test';
import {safeReadJsonFile} from "../file";
import {EStorageState} from "../enums";
import path from 'path';

export async function injectLocalforage(page: Page) {
  const scriptPath = path.resolve(__dirname, './script/localforage.min.js');
  await page.addScriptTag({path: scriptPath});
  await page.waitForTimeout(200); // wait for script to fully attach
}

export async function getLocalforageRoot(page: Page) {
  return await page.evaluate(async () => {
    const lf = (window as any).localforage;
    if (!lf) throw new Error("localforage is not loaded");

    const rootValue = await lf.getItem('root');
    if (!rootValue) throw new Error("No auth data found under key 'root'");
    return rootValue;
  });
}

export async function restoreUserSessionInLocalForage(page: Page) {
  const sessionData =  safeReadJsonFile(EStorageState.liveDemoUser);
  await page.goto('/', {waitUntil: 'domcontentloaded'});
  await injectLocalforage(page);
  await page.evaluate((data) => {
    const lf = (window as any).localforage;
    return lf.setItem('root', data.localforageStoredSession.root);
  }, sessionData);

  await page.waitForFunction(
    (expected) => {
      const lf = (window as any).localforage;
      if (!lf) return false;
      return lf.getItem('root').then((stored) => {
        return JSON.stringify(stored) === JSON.stringify(expected);
      });
    },
    sessionData,
    {timeout: 1000}
  );

  await page.clock.setFixedTime(new Date('2025-01-25T12:00:00Z'));
}
