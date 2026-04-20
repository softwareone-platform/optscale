import { EStorageStatePath } from '../types';
import { test as setup } from '@playwright/test';
import { getLocalforageRoot, injectLocalforage } from '../utils/auth-session-storage/localforage-service';
import { safeWriteJsonFile } from '../utils/file';
import { LiveDemoService } from '../utils/auth-session-storage/auth-helpers';

setup.describe('Auth Setup', () => {
  setup.skip(
    LiveDemoService.hasCachedDemoCredentials(),
    'Skip if valid live demo credentials are cached'
  );
  setup.describe.configure({ retries: 1 });

  setup(
    `Login as live demo using  generated demo account credentials`,
    async ({ page }) => {
      const storageStatePath =  EStorageStatePath.liveDemoUser;

      let email: string;
      let password: string;
      let demoAuthCredentials = null;

      await setup.step(`Get credentials and navigate to /login`, async () => {
          demoAuthCredentials = await LiveDemoService.getDemoLoginCredentials('example@mail.com', false);
          ({ email, password } = demoAuthCredentials);

        await page.goto('/login', { waitUntil: 'load', timeout: 20000 });
      });

      await setup.step('Fill User Email and Proceed', async () => {
        await injectLocalforage(page);
        await page.getByTestId('input_email').fill(email);
        await page.getByTestId('input_pass').fill(password);
        await page.getByTestId('btn_login').click();
        const initializingMessage = page.getByTestId('p_initializing')
        await initializingMessage.waitFor({ timeout: 20000 });
        await initializingMessage.waitFor({ state: 'detached', timeout: 20000 });
        const loadingImage = page.getByRole('img', { name: 'Loading page' });
        await loadingImage.waitFor();
        await loadingImage.waitFor({ state: 'detached', timeout: 20000 });

        const authValue = await getLocalforageRoot(page);
        const storageState = await page.context().storageState();

        safeWriteJsonFile(storageStatePath, {
          ...storageState,
          localforageStoredSession: { root: authValue },
          demoAuthCredentials,
        });
      });
    }
  );
});
