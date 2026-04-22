import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { homepageInterceptions } from "../mocks/homepage.mocks";

test.describe('FFC: Home', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: homepageInterceptions, failOnInterceptionMissing: true } });

  test('Blocks matches screenshots', async ({ homePage }) => {
    await test.step('Set up test data', async () => {
      await homePage.navigateToURL();
      await homePage.waitForAllBoxesToLoad();
      await homePage.fitViewportToFullPage();
    });

    await test.step('Organization Expenses Block', async () => {
      await roundElementDimensions(homePage.organizationExpensesBlock);

      await expect(homePage.organizationExpensesBlock).toHaveScreenshot('Home-OrganizationExpanses.png');
    });

    await test.step('TopResources Block', async () => {
      await roundElementDimensions(homePage.topResourcesBlock);
      await expect(homePage.topResourcesBlock).toHaveScreenshot('Home-TopResources.png');
    });

    await test.step('Recommendations Block', async () => {
      await roundElementDimensions(homePage.recommendationsBlock);
      await expect(homePage.recommendationsBlock).toHaveScreenshot('Home-Recommendations.png');
    });

    await test.step('PolicyViolations Block', async () => {
      await roundElementDimensions(homePage.policyViolationsBlock);
      await expect(homePage.policyViolationsBlock).toHaveScreenshot('Home-PolicyViolations.png');
    });

    await test.step('Pools Requiring Attention Block', async () => {
      await roundElementDimensions(homePage.poolsRequiringAttentionBlock);
      await expect(homePage.poolsRequiringAttentionBlock).toHaveScreenshot('Home-PoolsRequiringAttention.png');
    });
  });
})
