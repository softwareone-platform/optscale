import {EStorageStatePath} from "../types/enums";
import {test as setup} from "@playwright/test";
import {getLocalforageRoot, injectLocalforage} from "../utils/auth-session-storage/localforage-service";
import {safeWriteJsonFile} from "../utils/file";
import {LiveDemoService} from "../utils/auth-session-storage/auth-helpers";

const useLiveDemoCredentials = LiveDemoService.shouldUseLiveDemo();

setup.describe('Auth Setup', () => {
  setup.skip(
    LiveDemoService.hasCachedDemoCredentials() && LiveDemoService.shouldUseLiveDemo(),
    'Skip if valid live demo credentials are cached'
  );

  setup(`Login as live demo using ${useLiveDemoCredentials ? 'demo account credentials' : '.env DEFAULT_USER_EMAIL/DEFAULT_USER_PASSWORD'} to Live Demo `, async ({page}) => {
    const storageStatePath = useLiveDemoCredentials
      ? EStorageStatePath.liveDemoUser
      : EStorageStatePath.defaultUser;

    let email: string;
    let password: string;
    let demoAuthCredentials = null;

    await setup.step(
      `Get credentials and navigate to /login`,
      async () => {
        if (useLiveDemoCredentials) {
          demoAuthCredentials = await LiveDemoService.getDemoLoginCredentials('example@mail.com', false);
          ({email, password} = demoAuthCredentials);
        } else {
          email = process.env.DEFAULT_USER_EMAIL!;
          password = process.env.DEFAULT_USER_PASSWORD!;
        }

        await page.goto('/login', {waitUntil: 'load', timeout: 20000});
      }
    );

    await setup.step('Fill User Email and Proceed', async () => {
      await injectLocalforage(page);
      await page.getByTestId('input_email').fill(email);
      await page.getByTestId('input_pass').fill(password);
      await page.getByTestId('btn_login').click();
      await page.waitForLoadState('networkidle');

      const authValue = await getLocalforageRoot(page);
      const storageState = await page.context().storageState();

      safeWriteJsonFile(storageStatePath, {
        ...storageState,
        localforageStoredSession: {root: authValue},
        demoAuthCredentials,
      });
    });
  });
});
