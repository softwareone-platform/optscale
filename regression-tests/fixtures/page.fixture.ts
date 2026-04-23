import { test as base } from '@playwright/test';
import * as Pages from '@/pages';
import type { InterceptionEntry } from '@/types';
import { DEMO_ACCOUNT_SESSION_PATH, restoreUserSessionInLocalForage } from '@/utils/demo-account-session';
import { attachBrowserErrorLogging, errorLog } from '@/utils/debug-logging';
import { apiInterceptors } from '@/utils/interceptor';
import { buildFixtures, toFixtureMap, type FixtureInstances } from './build-fixtures';

interface Options {
  restoreSession?: boolean;
  setFixedTime?: boolean;
  interceptAPI?: {
    entries: InterceptionEntry[];
  };
}

// The constructors map is derived directly from `pages/index.ts`.
const constructors = toFixtureMap(Pages);

const fixtures = buildFixtures(constructors);

export const test = base.extend<FixtureInstances<typeof constructors> & Options>({
  restoreSession: [true, { option: true }],
  setFixedTime: [true, { option: true }],
  interceptAPI: [undefined, { option: true }],

  storageState: DEMO_ACCOUNT_SESSION_PATH,

  page: async ({ page, restoreSession, setFixedTime, interceptAPI }, use) => {
    // Per-test setup (driven by fixture options).
    if (restoreSession) await restoreUserSessionInLocalForage(page, setFixedTime);
    if (interceptAPI?.entries?.length) await apiInterceptors(page, interceptAPI.entries);

    // Debug hooks (driven by env vars; helpers are no-ops when disabled).
    attachBrowserErrorLogging(page);

    // If the SPA ever redirects to /login during a test, the session restore
    // didn't stick. Surface it loudly — without this, the test would just hang
    // waiting for page-specific locators (canvas, tables, …) that never exist
    // on the login page, producing a misleading timeout stack trace.
    if (restoreSession) {
      page.on('framenavigated', frame => {
        if (frame === page.mainFrame() && /\/login(\?|$)/.test(frame.url())) {
          errorLog(`SPA redirected to /login — session restore failed (url=${frame.url()})`);
        }
      });
    }

    await use(page);
  },

  ...fixtures,
});
