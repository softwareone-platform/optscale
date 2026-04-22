import { expect, test as setup } from '@playwright/test';
import { getLocalforageRoot, injectLocalforage } from '@/utils/auth-session-storage/localforage-service';
import { safeReadJsonFile, safeWriteJsonFile } from '@/utils/file';
import { LiveDemoService } from '@/utils/auth-session-storage/auth-helpers';
import { EStorageStatePath } from '@/types';

const DEMO_EMAIL = 'example@mail.com';
const LOGIN_TIMEOUT = 20_000;
const LOADING_IMAGE_APPEAR_TIMEOUT = 2_000;

setup.describe.configure({ retries: 1 });

setup('Login as live demo using generated demo account credentials', async ({ page }) => {
  // eslint-disable-next-line playwright/no-skipped-test
  setup.skip(
    LiveDemoService.hasCachedDemoCredentials(),
    'Valid live demo credentials are cached — nothing to do.',
  );

  const demoAuthCredentials = await LiveDemoService.getDemoLoginCredentials(DEMO_EMAIL);
  const { email, password } = demoAuthCredentials;

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

    safeWriteJsonFile(EStorageStatePath.liveDemoUser, {
      ...storageState,
      localforageStoredSession: { root: authValue },
      demoAuthCredentials,
    });

    const written = safeReadJsonFile(EStorageStatePath.liveDemoUser);
    expect(written?.demoAuthCredentials?.email).toBe(email);
  });
});
