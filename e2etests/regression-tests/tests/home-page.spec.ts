import {test} from "../../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {restoreUserSessionInLocalForage} from "../../utils/auth-session-storage/localforage-service";
import {roundElementDimensions} from "../utils/roundElementDimensions";

test.use({restoreSession: true});

test.describe('FFC: Home @swo_regression', () => {

  test('Homepage blocks against baseline screenshots', async ({homePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await homePage.setupApiInterceptions();
      await homePage.navigateToURL();
      await homePage.waitForAllCanvases();
      await homePage.screenshotUpdateDelay();
    });
    await test.step('Organization Expenses Block', async () => {
      await roundElementDimensions(homePage.organizationExpensesBlock);
      await expect(homePage.organizationExpensesBlock).toHaveScreenshot('OrganizationExpensesBlock-screenshot.png');
    });
    await test.step('TopResources Block', async () => {
      await roundElementDimensions(homePage.topResourcesBlock);
      await expect(homePage.topResourcesBlock).toHaveScreenshot('TopResourcesBlock-screenshot.png');
    });

    await test.step('Recommendations Block', async () => {
      await roundElementDimensions(homePage.recommendationsBlock);
      await expect(homePage.recommendationsBlock).toHaveScreenshot('RecommendationsBlock-screenshot.png');
    });

    await test.step('PolicyViolations Block', async () => {
      await roundElementDimensions(homePage.policyViolationsBlock);
      await expect(homePage.policyViolationsBlock).toHaveScreenshot('PolicyViolationsBlock-screenshot.png');
    });

    await test.step('Pools Requiring Attention Block', async () => {
      await roundElementDimensions(homePage.poolsRequiringAttentionBlock);
      await expect(homePage.poolsRequiringAttentionBlock).toHaveScreenshot('PoolsRequiringAttentionBlock-screenshot.png');
    });
  });
})
