import { expect, test as setup } from '@playwright/test';
import { injectLocalforage, restoreSession } from '@/utils/test-account-session';
import { safeReadJsonFile, safeWriteJsonFile } from '@/utils/file';
import { TestAccountService } from './test-account-service';
import { config } from '@/utils/config';
import { type StoredTestAccountSession } from '@/types';
import type { Page } from '@playwright/test';

const TEST_ACCOUNT_EMAIL = 'example@mail.com';
const LOGIN_TIMEOUT = 20_000;
const SESSION_CHECK_TIMEOUT = 15_000;

// The splash and loading indicators can't answer this: both are absent when a login fails, so
// waiting for them to detach succeeds trivially.
async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    await page.locator('main').waitFor({ state: 'visible', timeout: SESSION_CHECK_TIMEOUT });
    return !/\/login(\?|$)/.test(page.url());
  } catch {
    return false;
  }
}

// Freshness alone is not enough: the account can be gone server-side, or the app can now be
// served against a different cluster. Checking costs one page load.
async function canReuseCachedSession(page: Page): Promise<boolean> {
  if (!TestAccountService.hasCachedTestAccountCredentials()) return false;

  try {
    await restoreSession(page);
    await page.goto('/', { waitUntil: 'load', timeout: SESSION_CHECK_TIMEOUT });
    if (await isAuthenticated(page)) return true;
  } catch {
    // Fall through: any failure to prove the session works means minting a new one.
  }

  console.warn('Cached test-account session no longer authenticates — minting a fresh one.');
  return false;
}

async function getLocalforageRoot(page: Page): Promise<unknown> {
  return page.evaluate(async () => {
    type LF = { getItem: (k: string) => Promise<unknown> };
    const lf = (window as Window & { localforage?: LF }).localforage;
    if (!lf) throw new Error('localforage is not loaded');

    const root = await lf.getItem('root');
    if (!root) throw new Error("No auth data found under key 'root'");
    return root;
  });
}

setup.describe.configure({ retries: 1 });

setup('Login as test account using generated credentials', async ({ page }) => {
  // eslint-disable-next-line playwright/no-skipped-test
  setup.skip(await canReuseCachedSession(page), 'Cached test-account session still authenticates — nothing to do.');

  const testAccountCredentials = await TestAccountService.getTestAccountCredentials(TEST_ACCOUNT_EMAIL);
  const { email, password } = testAccountCredentials;

  await setup.step('Navigate to /login', async () => {
    await page.goto('/login', { timeout: LOGIN_TIMEOUT });
  });

  await setup.step('Fill credentials and wait for app to load', async () => {
    await injectLocalforage(page);
    await page.getByTestId('input_email').fill(email);
    await page.getByTestId('input_pass').fill(password);
    await page.getByTestId('btn_login').click();

    // The "Initializing…" splash always renders but may detach before our
    // first waitFor latches — swallow the attach-timeout, only assert detach.
    const initializingMessage = page.getByTestId('p_initializing');
    await initializingMessage.waitFor({ timeout: LOGIN_TIMEOUT }).catch(() => undefined);
    await initializingMessage.waitFor({ state: 'detached', timeout: LOGIN_TIMEOUT });

    // Loading image is optional — only renders on slower cold-starts.
    const loadingImage = page.getByRole('img', { name: 'Loading page' });
    await loadingImage.waitFor({ timeout: config.timeouts.probe }).catch(() => undefined);
    await loadingImage.waitFor({ state: 'detached', timeout: LOGIN_TIMEOUT });
  });

  await setup.step('Confirm the login was accepted', async () => {
    expect(
      await isAuthenticated(page),
      `Signed in at ${config.baseUrl} using credentials minted on ${config.apiBaseUrl}, but the app is still ` +
        `on /login. The app must talk to the same cluster the credentials came from — check what the UI at ` +
        `${config.baseUrl} proxies to, or pick the TEST_ENV that matches it.`
    ).toBe(true);
  });

  await setup.step('Save session state to disk', async () => {
    const [authValue, storageState] = await Promise.all([getLocalforageRoot(page), page.context().storageState()]);

    const session: StoredTestAccountSession = {
      ...storageState,
      localforageStoredSession: { root: authValue },
      testAccountCredentials,
      apiBaseUrl: config.apiBaseUrl,
    };
    safeWriteJsonFile(config.paths.testAccountSessionFile, session);

    const written = safeReadJsonFile<StoredTestAccountSession>(config.paths.testAccountSessionFile);
    expect(written?.testAccountCredentials.email).toBe(email);
  });
});
