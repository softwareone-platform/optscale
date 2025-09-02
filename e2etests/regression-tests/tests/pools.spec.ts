import {test} from "../../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";

test.use({restoreSession: true});

test.describe('FFC: Pools @swo_regression', () => {

  test('Pools page matches screenshots', async ({poolsPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await poolsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Pools page', async () => {
      await poolsPage.navigateToURL();
    });

    await test.step('View type - Default', async () => {
      await poolsPage.heading.hover();
      await poolsPage.screenshotUpdateDelay();
      await roundElementDimensions(poolsPage.main);
      await expect(poolsPage.main).toHaveScreenshot('Pools-landing-screenshot.png');
    });

    await test.step('View type - with expanded requiring attention', async () => {
      await poolsPage.clickExpandRequiringAttentionBtn();
      await poolsPage.heading.hover();
      await poolsPage.screenshotUpdateDelay();
      await roundElementDimensions(poolsPage.main);
      await expect(poolsPage.main).toHaveScreenshot('Pools-requiring-attention-expanded-screenshot.png');
    });
  });
})
