import type { Page } from '@playwright/test';
import { config } from './config';

/** Tab-indented `[LABEL] message` line for aligned terminal output. */
const formattedOutput = (label: string, message: string): string => `\t[${label}] ${message}`;

/** Node-side debug log. Enabled only when `DEBUG_LOG=true`. */
export const debugLog = (message: string): void => {
  if (config.debugLog) console.debug(formattedOutput('DEBUG', message));
};

/** Node-side warning log. Always enabled. */
export const warnLog = (message: string): void => console.warn(formattedOutput('WARN', message));

/** Node-side error log. Always enabled. */
export const errorLog = (message: string): void => console.error(formattedOutput('ERROR', message));

/**
 * Forwards browser `console.error` to the Node test runner.
 * No-op unless `BROWSER_ERROR_LOGGING=true`.
 */
export const attachBrowserErrorLogging = (page: Page): void => {
  if (!config.browserErrorLogging) return;

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error(formattedOutput('Browser Console Error', msg.text()));
    }
  });
};
