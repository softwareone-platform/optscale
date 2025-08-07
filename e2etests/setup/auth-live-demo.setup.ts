import { EStorageStatePath } from "../utils/enums";
import { test as setup } from "../fixtures/api-fixture";
import {getLocalforageRoot, injectLocalforage} from "../utils/localforge-auth/localforage-service";
import {safeWriteJsonFile} from "../utils/file";
import {LiveDemoService} from "../utils/auth-helpers";

setup('Login as live demo user', async ({ page }) => {
  let email: string;
  let password: string;
  let storageStatePath = EStorageStatePath.defaultUser;

  await setup.step('Navigate to Live Demo', async () => {
    if( LiveDemoService.shouldUseLiveDemo()) {
      const demoAuth = await LiveDemoService.getDemoLoginCredentails('example@mail.com', false);
      email = demoAuth.email;
      password = demoAuth.password;
      storageStatePath = EStorageStatePath.liveDemoUser;
    } else {
      email = process.env.DEFAULT_USER_EMAIL
      password = process.env.DEFAULT_USER_PASSWORD;
      storageStatePath = EStorageStatePath.defaultUser;
    }

    await page.goto('/login', { waitUntil: 'load', timeout: 20000 });
  });

  await setup.step('Fill User Email and Proceed', async () => {
    await injectLocalforage(page);
    await page.getByTestId('input_email').fill(email);
    await page.getByTestId('input_pass').fill(password);
    await page.getByTestId('btn_login').click();
    await page.waitForLoadState('networkidle');

    const authValue = await getLocalforageRoot(page);
    const storageState = await page.context().storageState();

    const modifiedState = {
      ...storageState,
      localforageStoredSession: {
        root: authValue,
      },
    };

    safeWriteJsonFile(storageStatePath, modifiedState);
  });
});
