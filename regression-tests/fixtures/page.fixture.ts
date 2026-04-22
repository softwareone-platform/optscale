import { test as base, type Page } from '@playwright/test';
import * as Pages from '../pages';
import { restoreUserSessionInLocalForage } from '../utils/auth-session-storage/localforage-service';
import { apiInterceptors, InterceptionEntry } from '../utils/interceptor';
import { EStorageStatePath } from '../types';

interface Options {
  restoreSession?: boolean;
  setFixedTime?: boolean;
  /**
   * When `true`, injects an init script that hides `.MuiSnackbar-anchorOriginTopRight`
   * (e.g. the "pending invitation" info banner) so it doesn't flicker into screenshots.
   */
  hideTopRightSnackbar?: boolean;
  interceptAPI?: {
    // Known Playwright issue: when an option fixture's value is a bare array,
    // `test.use()` unwraps it and only the first element reaches the fixture
    // (Playwright interprets arrays as `[value, options]` tuples internally).
    // Wrapping the array in an object (`{ entries: [...] }`) avoids the unwrap.
    // See: https://github.com/microsoft/playwright/issues/22068
    entries: InterceptionEntry[];
  };
}

// Generic "new (page) => instance" type for Page Objects
type PageObjectCtor<T = unknown> = new (page: Page) => T;

// Build a single fixture from a Page Object constructor
const createFixture =
  <T>(Ctor: PageObjectCtor<T>) =>
  async ({ page }: { page: Page }, use: (po: T) => Promise<void>) => {
    await use(new Ctor(page));
  };

// Declare all POs in one place with strong typing
const constructors = {
  policiesAnomaliesPage: Pages.AnomaliesPage,
  policiesAnomaliesCreatePage: Pages.AnomaliesCreatePage,
  cloudAccountsPage: Pages.CloudAccountsPage,
  cloudAccountsConnectPage: Pages.CloudAccountsConnectPage,
  eventsPage: Pages.EventsPage,
  expensesPage: Pages.ExpensesPage,
  expensesMapPage: Pages.ExpensesMapPage,
  header: Pages.Header,
  homePage: Pages.HomePage,
  mainMenu: Pages.MainMenu,
  policiesQuotaPage: Pages.PoliciesPage,
  policiesQuotaCreatePage: Pages.PoliciesCreatePage,
  poolsPage: Pages.PoolsPage,
  recommendationsPage: Pages.RecommendationsPage,
  resourcesPage: Pages.ResourcesPage,
  resourceDetailsPage: Pages.ResourceDetailsPage,
  settingsPage: Pages.SettingsPage,
  policiesTaggingPoliciesPage: Pages.TaggingPoliciesPage,
  policiesTaggingPoliciesCreatePage: Pages.TaggingPoliciesCreatePage,
  usersPage: Pages.UsersPage,
  usersInvitePage: Pages.UsersInvitePage,
} satisfies Record<string, PageObjectCtor>;

type Constructors = typeof constructors;
type Fixtures = { [K in keyof Constructors]: InstanceType<Constructors[K]> };

function buildFixtures<C extends Record<string, PageObjectCtor>>(ctors: C) {
  const result = {} as {
    [K in keyof C]: (args: { page: Page }, use: (po: InstanceType<C[K]>) => Promise<void>) => Promise<void>;
  };

  for (const key in ctors) {
    const Ctor = ctors[key];
    result[key] = createFixture(Ctor) as (typeof result)[typeof key];
  }

  return result;
}

const fixtures = buildFixtures(constructors);

export const test = base.extend<Fixtures & Options>({
  restoreSession: [true, { option: true }],
  setFixedTime: [true, { option: true }],
  hideTopRightSnackbar: [false, { option: true }],
  interceptAPI: [undefined, { option: true }],

  page: async ({ page, restoreSession, setFixedTime, hideTopRightSnackbar, interceptAPI }, use) => {
    if (restoreSession) {
      await restoreUserSessionInLocalForage(page, setFixedTime);
    }
    if (hideTopRightSnackbar) {
      await page.addInitScript(() => {
        const style = document.createElement('style');
        style.textContent = `.MuiSnackbar-anchorOriginTopRight { display: none !important; }`;
        document.documentElement.appendChild(style);
      });
    }
    if (interceptAPI?.entries?.length > 0) {
      await apiInterceptors(page, interceptAPI.entries);
    }
    if (process.env.BROWSER_ERROR_LOGGING === 'true') {
      page.on('console', msg => {
        if (msg.type() === 'error') {
          console.error(`[Browser Console Error] ${msg.text()}`);
        }
      });
    }
    await use(page);
  },

  storageState: async ({}, use) => {
    await use(EStorageStatePath.liveDemoUser);
  },
  ...fixtures,
});
