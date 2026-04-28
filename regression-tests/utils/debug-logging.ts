import type { Page } from '@playwright/test';
import { env } from './env';

/** Node-side debug log. Enabled only when `DEBUG_LOG=true`. */
export function debugLog(message: string): void {
  if (env.debugLog) console.debug(`[DEBUG] ${message}`);
}

/** Node-side error log. Always enabled. */
export function errorLog(message: string): void {
  console.error(`[ERROR] ${message}`);
}

/**
 * Forwards browser `console.error` to the Node test runner.
 * No-op unless `BROWSER_ERROR_LOGGING=true`.
 */

export function attachBrowserErrorLogging(page: Page): void {
  if (!env.browserErrorLogging) return;

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(`[Browser Console Error] ${msg.text()}`);
    }
  });
}


