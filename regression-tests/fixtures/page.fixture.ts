import { test as base } from '@playwright/test';
import type { Frame } from '@playwright/test';
import * as Pages from '@/pages';
import type { InterceptionEntry } from '@/types';
import { restoreSession as restoreTestAccountSession } from '@/utils/test-account-session';
import { attachBrowserErrorLogging, errorLog } from '@/utils/debug-logging';
import { apiInterceptors, type InterceptionReport } from '@/utils/interceptor';
import { config } from '@/utils/config';
import { buildFixtures, toFixtureMap, type FixtureInstances } from './build-fixtures';

interface Options {
  restoreSession?: boolean;
  setFixedTime?: boolean;
  /**
   * REST/GraphQL route mocks applied before the spec runs.
   *
   * Wrapped in `{ entries }` because option fixtures spread bare arrays
   * across `test.use({...})` merges (Playwright ≤1.56).
   */
  interceptAPI?: {
    entries: InterceptionEntry[];
  };
}

// Constructors map derived directly from `pages/index.ts`.
const constructors = toFixtureMap(Pages);

const fixtures = buildFixtures(constructors);

function assertEveryInterceptionFired(interceptions: InterceptionReport | undefined, onlyWhenTestPassed: boolean): void {
  const unused = onlyWhenTestPassed ? (interceptions?.neverHit() ?? []) : [];
  if (unused.length === 0) return;

  throw new Error(
    `These interceptions never fired, so the app used live data instead:\n  - ${unused.join('\n  - ')}\n` +
      `The mock no longer matches what the app requests — check the GraphQL operation name or URL.`
  );
}

export const test = base.extend<FixtureInstances<typeof constructors> & Options>({
  restoreSession: [true, { option: true }],
  setFixedTime: [true, { option: true }],
  interceptAPI: [undefined, { option: true }],

  storageState: config.paths.testAccountSessionFile,

  page: async ({ page, restoreSession, setFixedTime, interceptAPI }, use, testInfo) => {
    // Per-test setup (driven by fixture options).
    if (restoreSession) await restoreTestAccountSession(page, setFixedTime);
    const interceptions = interceptAPI?.entries?.length ? await apiInterceptors(page, interceptAPI.entries) : undefined;

    // Debug hooks (env-driven; no-op when disabled).
    attachBrowserErrorLogging(page);

    // Surface session-restore failure (SPA redirect to /login) instead of hanging.
    const onFrameNavigated = (frame: Frame) => {
      if (frame === page.mainFrame() && /\/login(\?|$)/.test(frame.url())) {
        errorLog(`SPA redirected to /login — session restore failed (url=${frame.url()})`);
      }
    };
    if (restoreSession) {
      page.on('framenavigated', onFrameNavigated);
    }

    await use(page);

    if (restoreSession) {
      page.off('framenavigated', onFrameNavigated);
    }

    assertEveryInterceptionFired(interceptions, testInfo.status === 'passed');
  },

  ...fixtures,
});
