import {expect, Page} from '@playwright/test';
import {safeReadJsonFile} from "../file";
import {EStorageState} from "../enums";
import path from 'path';

export async function injectLocalforage(page: Page, retries = 3) {
  const isAlreadyLoaded = await page.evaluate(() => {
    return typeof (window as any).localforage !== 'undefined';
  });

  if (isAlreadyLoaded) return;

  const scriptPath = path.resolve(__dirname, './script/localforage.min.js'); // Adjust path

  for (let attempt = 0; attempt < retries; attempt++) {

    await page.addScriptTag({ path: scriptPath });

    const isLoaded = await page.evaluate(() => {
      const lf = (window as any).localforage;
      return typeof lf !== 'undefined' && typeof lf.setItem === 'function';
    });

    if (isLoaded) {
      expect(isLoaded).toBeTruthy();
      return;
    }

    await page.waitForTimeout(500);
  }

  expect(false).toBeTruthy(); // Force failure if all retries fail
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

export async function setLocalforageRoot(page: Page) {
  const authData = safeReadJsonFile(EStorageState.liveDemoUser);
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded'); // ensure scripts can be injected

  await injectLocalforage(page);
  await page.evaluate((data) => {
    const lf = (window as any).localforage;
    return lf.setItem('root', data.localforageStoredSession.root);
  }, authData);
  await page.clock.setFixedTime(new Date('2025-01-25T12:00:00Z'));
}
