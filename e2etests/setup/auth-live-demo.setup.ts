import { EStorageState } from "../utils/enums";
import { test as setup } from "../fixtures/api-fixture";
import {getLocalforageRoot, injectLocalforage} from "../utils/localforge-auth/localforage-service";
import {safeWriteJsonFile} from "../utils/file";

setup('Login as live demo user', async ({ page }) => {
  await setup.step('Navigate to Live Demo', async () => {
    await page.goto('/live-demo', { waitUntil: 'networkidle' });
  });

  await setup.step('Fill User Email and Proceed', async () => {
    const email = process.env.DEFAULT_USER_EMAIL || 'FinOpsTest1@outlook.com';

    await injectLocalforage(page);

    await page.getByTestId('input_email').fill(email);
    await page.getByTestId('btn_proceed_to_live_demo').click();
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForLoadState('networkidle');

    const authValue = await getLocalforageRoot(page);
    const storageStatePath = EStorageState.liveDemoUser;
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
