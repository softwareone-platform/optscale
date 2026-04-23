import { test as base } from '@playwright/test';
import * as Pages from '@/pages';
import type { InterceptionEntry } from '@/types';
import { EStorageStatePath } from '@/types';
import { restoreUserSessionInLocalForage } from '@/utils/auth-session-storage/localforage-service';
import { attachBrowserErrorLogging } from '@/utils/debug-logging';
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

  storageState: EStorageStatePath.liveDemoUser,

  page: async ({ page, restoreSession, setFixedTime, interceptAPI }, use) => {
    // Per-test setup (driven by fixture options).
    if (restoreSession) await restoreUserSessionInLocalForage(page, setFixedTime);
    if (interceptAPI?.entries?.length) await apiInterceptors(page, interceptAPI.entries);

    // Debug hooks (driven by env vars; helpers are no-ops when disabled).
    attachBrowserErrorLogging(page);

    await use(page);
  },

  ...fixtures,
});
