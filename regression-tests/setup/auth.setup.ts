import { expect, test as setup } from '@playwright/test';
import { DEMO_ACCOUNT_SESSION_PATH, injectLocalforage } from '@/utils/demo-account-session';
import { safeReadJsonFile, safeWriteJsonFile } from '@/utils/file';
import { DemoAccountService } from './demo-account-service';
import { type StoredDemoSession } from '@/types';
import type { Page } from '@playwright/test';

const DEMO_EMAIL = 'example@mail.com';
const LOGIN_TIMEOUT = 20_000;
const LOADING_IMAGE_APPEAR_TIMEOUT = 2_000;

/**
 * Reads the `root` key from localforage. Throws if the script isn't loaded
 * or the key is missing. Used once, at the end of the login flow, to capture
 * what the app wrote before we snapshot it to disk.
 */
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

setup('Login as demo account using generated credentials', async ({ page }) => {
  // eslint-disable-next-line playwright/no-skipped-test
  setup.skip(
    DemoAccountService.hasCachedDemoCredentials(),
    'Valid demo-account credentials are cached — nothing to do.',
  );

  const demoAccountCredentials = await DemoAccountService.getDemoLoginCredentials(DEMO_EMAIL);
  const { email, password } = demoAccountCredentials;

  await setup.step('Navigate to /login', async () => {
    await page.goto('/login', { timeout: LOGIN_TIMEOUT });
  });

  await setup.step('Fill credentials and wait for app to load', async () => {
    await injectLocalforage(page);
    await page.getByTestId('input_email').fill(email);
    await page.getByTestId('input_pass').fill(password);
    await page.getByTestId('btn_login').click();

    // The "Initializing…" splash always renders, but may disappear before our
    // first waitFor latches — swallow the attach-timeout and only assert on
    // the detach side.
    const initializingMessage = page.getByTestId('p_initializing');
    await initializingMessage.waitFor({ timeout: LOGIN_TIMEOUT }).catch(() => undefined);
    await initializingMessage.waitFor({ state: 'detached', timeout: LOGIN_TIMEOUT });

    // The loading image is optional — it only renders on slower cold-starts.
    const loadingImage = page.getByRole('img', { name: 'Loading page' });
    await loadingImage.waitFor({ timeout: LOADING_IMAGE_APPEAR_TIMEOUT }).catch(() => undefined);
    await loadingImage.waitFor({ state: 'detached', timeout: LOGIN_TIMEOUT });
  });

  await setup.step('Save session state to disk', async () => {
    const [authValue, storageState] = await Promise.all([
      getLocalforageRoot(page),
      page.context().storageState(),
    ]);

    const session: StoredDemoSession = {
      ...storageState,
      localforageStoredSession: { root: authValue },
      demoAccountCredentials,
    };
    safeWriteJsonFile(DEMO_ACCOUNT_SESSION_PATH, session);

    const written = safeReadJsonFile<StoredDemoSession>(DEMO_ACCOUNT_SESSION_PATH);
    expect(written?.demoAccountCredentials.email).toBe(email);
  });
});
