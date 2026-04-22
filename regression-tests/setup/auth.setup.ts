import { expect, test as setup } from '@playwright/test';
import { getLocalforageRoot, injectLocalforage } from '../utils/auth-session-storage/localforage-service';
import { safeReadJsonFile, safeWriteJsonFile } from '../utils/file';
import { LiveDemoService } from '../utils/auth-session-storage/auth-helpers';
import { EStorageStatePath } from '../types';

const DEMO_EMAIL = 'example@mail.com';
const LOGIN_TIMEOUT = 20000;

setup.describe('Auth Setup', () => {
  // eslint-disable-next-line playwright/no-skipped-test
  setup.skip(LiveDemoService.hasCachedDemoCredentials(), 'Skip if valid live demo credentials are cached');
  setup.describe.configure({ retries: 1 });

  setup('Login as live demo using generated demo account credentials', async ({ page }) => {
    let email: string;
    let password: string;
    let demoAuthCredentials = null;

    await setup.step('Get credentials and navigate to /login', async () => {
      demoAuthCredentials = await LiveDemoService.getDemoLoginCredentials(DEMO_EMAIL);
      ({ email, password } = demoAuthCredentials);
      await page.goto('/login', { waitUntil: 'load', timeout: LOGIN_TIMEOUT });
    });

    await setup.step('Fill credentials and wait for app to load', async () => {
      await injectLocalforage(page);
      await page.getByTestId('input_email').fill(email);
      await page.getByTestId('input_pass').fill(password);
      await page.getByTestId('btn_login').click();

      const initializingMessage = page.getByTestId('p_initializing');
      await initializingMessage.waitFor({ timeout: LOGIN_TIMEOUT });
      await initializingMessage.waitFor({ state: 'detached', timeout: LOGIN_TIMEOUT });

      const loadingImage = page.getByRole('img', { name: 'Loading page' });
      await loadingImage.waitFor();
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

      expect(safeReadJsonFile(EStorageStatePath.liveDemoUser)).not.toBeNull();
    });
  });
});
