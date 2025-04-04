import { Page } from '@playwright/test';
import {safeReadJsonFile} from "./file";
import {EStorageState} from "./enums";

export async function injectLocalforage(page: Page) {
  await page.addScriptTag({
    url: 'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js',
  });

  const isLoaded = await page.evaluate(() => {
    const lf = (window as any).localforage;
    return typeof lf !== 'undefined' && typeof lf.setItem === 'function';
  });

  if (!isLoaded) {
    throw new Error('❌ localforage was not loaded properly. Aborting.');
  }
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
  await injectLocalforage(page);
  await page.evaluate((data) => {
    const lf = (window as any).localforage;
    return lf.setItem('root', data.localforageStoredSession.root);
  }, authData);
  await page.clock.setFixedTime(new Date('2025-01-25T12:00:00Z'));
}
