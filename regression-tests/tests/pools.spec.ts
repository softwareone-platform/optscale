import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { poolsInterceptions } from "../mocks/pools.mocks";

test.describe('FFC: Pools', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: poolsInterceptions, failOnInterceptionMissing: true } });

  test('Page matches screenshots', async ({ poolsPage }) => {

    await test.step('Navigate to Pools page', async () => {
      await poolsPage.navigateToURL();
      await poolsPage.fitViewportToFullPage();
    });

    await test.step('View type - Default', async () => {
      await poolsPage.heading.hover();
      await roundElementDimensions(poolsPage.main);
      await poolsPage.fitViewportToFullPage();
      await expect(poolsPage.main).toHaveScreenshot('Pools-landing-screenshot.png');
    });

    await test.step('View type - with expanded requiring attention', async () => {
      await poolsPage.clickExpandRequiringAttentionBtn();
      await poolsPage.heading.hover();
      await roundElementDimensions(poolsPage.main);
      await poolsPage.fitViewportToFullPage();
      await expect(poolsPage.main).toHaveScreenshot('Pools-requiring-attention-expanded-screenshot.png');
    });

    await test.step('Side modal - General tab check', async () => {
      await poolsPage.firstSubItem.click();
      await roundElementDimensions(poolsPage.sideModal);
      await expect(poolsPage.sideModal).toHaveScreenshot('Pools-side-modal--General.png');
    });

    await test.step('Side modal - Assignment tabs check', async () => {
      await poolsPage.sideModalTabAssignment.click();
      await expect(poolsPage.sideModal).toHaveScreenshot('Pools-side-modal--Assignment.png');
    });
  });
})
