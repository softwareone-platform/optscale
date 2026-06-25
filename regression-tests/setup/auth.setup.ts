import { expect, test as setup } from '@playwright/test';
import { injectLocalforage } from '@/utils/test-account-session';
import { safeReadJsonFile, safeWriteJsonFile } from '@/utils/file';
import { TestAccountService } from './test-account-service';
import { config } from '@/utils/config';
import { type StoredTestAccountSession } from '@/types';
import type { Page } from '@playwright/test';

const TEST_ACCOUNT_EMAIL = 'example@mail.com';
const LOGIN_TIMEOUT = 20_000;

/** Reads the `root` key from localforage. Throws if the script isn't loaded or the key is missing. */
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
  setup.skip(
    TestAccountService.hasCachedTestAccountCredentials(),
    'Valid test-account credentials are cached — nothing to do.',
  );

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

  await setup.step('Save session state to disk', async () => {
    const [authValue, storageState] = await Promise.all([
      getLocalforageRoot(page),
      page.context().storageState(),
    ]);

    const session: StoredTestAccountSession = {
      ...storageState,
      localforageStoredSession: { root: authValue },
      testAccountCredentials,
    };
    safeWriteJsonFile(config.paths.testAccountSessionFile, session);

    const written = safeReadJsonFile<StoredTestAccountSession>(config.paths.testAccountSessionFile);
    expect(written?.testAccountCredentials.email).toBe(email);
  });
});
