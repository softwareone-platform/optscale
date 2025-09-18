import {test as base, type Page} from '@playwright/test';
import * as Pages from '../pages';
import {LiveDemoService} from '../utils/auth-session-storage/auth-helpers';
import {restoreUserSessionInLocalForage} from "../utils/auth-session-storage/localforage-service";
import {BaseRequest} from "../utils/api-requests/base-request";
import {apiInterceptors} from "../utils/api-requests/interceptor";
import {InterceptionEntry} from "../types/interceptor.types";

interface Options {
  baseRequest: BaseRequest;
  restoreSession?: boolean;
  interceptAPI?: { //List array must be wrapped as object first otherwise it will pass only first array item
    entries: InterceptionEntry[];
  }
}

// Generic "new (page) => instance" type for Page Objects
type PageObjectCtor<T = unknown> = new (page: Page) => T;

// Build a single fixture from a Page Object constructor
const createFixture =
  <T>(Ctor: PageObjectCtor<T>) =>
    async ({page}: { page: Page }, use: (po: T) => Promise<void>) => {
      await use(new Ctor(page));
    };

// Declare all POs in one place with strong typing
const constructors = {
  anomaliesPage: Pages.AnomaliesPage,
  anomaliesCreatePage: Pages.AnomaliesCreatePage,
  cloudAccountsPage: Pages.CloudAccountsPage,
  cloudAccountsConnectPage: Pages.CloudAccountsConnectPage,
  datePicker: Pages.DatePickerPage,
  emailVerificationPage: Pages.EmailVerificationPage,
  eventsPage: Pages.EventsPage,
  expensesPage: Pages.ExpensesPage,
  expensesMapPage: Pages.ExpensesMapPage,
  header: Pages.Header,
  homePage: Pages.HomePage,
  loginPage: Pages.LoginPage,
  mainMenu: Pages.MainMenu,
  pendingInvitationsPage: Pages.PendingInvitationsPage,
  perspectivesPage: Pages.PerspectivesPage,
  policiesPage: Pages.PoliciesPage,
  policiesCreatePage: Pages.PoliciesCreatePage,
  poolsPage: Pages.PoolsPage,
  recommendationsPage: Pages.RecommendationsPage,
  registerPage: Pages.RegisterPage,
  resourcesPage: Pages.ResourcesPage,
  resourceDetailsPage: Pages.ResourceDetailsPage,
  riSpCoveragePage: Pages.RiSpCoveragePage,
  s3DuplicateFinder: Pages.S3DuplicateFinderPage,
  settingsPage: Pages.SettingsPage,
  taggingPoliciesPage: Pages.TaggingPoliciesPage,
  taggingPoliciesCreatePage: Pages.TaggingPoliciesCreatePage,
  usersPage: Pages.UsersPage,
  usersInvitePage: Pages.UsersInvitePage,
} satisfies Record<string, PageObjectCtor>;

type Constructors = typeof constructors;
type Fixtures = { [K in keyof Constructors]: InstanceType<Constructors[K]> };

// Build all fixtures from the constructors map with solid types
function buildFixtures<C extends Record<string, PageObjectCtor>>(ctors: C) {
  const result = {} as {
    [K in keyof C]: (
      args: { page: Page },
      use: (po: InstanceType<C[K]>) => Promise<void>
    ) => Promise<void>;
  };

  for (const key in ctors) {
    const Ctor = ctors[key];
    // The cast is localized and safe: runtime key->ctor mapping is preserved.
    result[key] = createFixture(Ctor) as typeof result[typeof key];
  }

  return result;
}

const fixtures = buildFixtures(constructors);

export const test = base.extend<Fixtures & Options>({
  restoreSession: [false, {option: true}],
  interceptAPI: {entries: []}, // default empty list, can be overridden per test

  page: async ({page, restoreSession, interceptAPI}, use) => {
    let verifyInterceptions: (() => void) | undefined;
    if (restoreSession) {
      await restoreUserSessionInLocalForage(page, true);
    }
    if (interceptAPI.entries.length > 0) {
      verifyInterceptions = await apiInterceptors(page, interceptAPI.entries);
    }

    await use(page);

    if (verifyInterceptions) {
      verifyInterceptions();
    }
  },

  baseRequest: async ({request}, use) => {
    await use(new BaseRequest(request));
  },

  storageState: async ({}, use) => {
    await use(LiveDemoService.getDefaultUserStorageState());
  },
  ...fixtures,
});
