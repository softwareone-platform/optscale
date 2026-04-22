import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { poolsInterceptions } from '../mocks/pools.mocks';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { captureScreenshot, regressionOptions } from '../utils/test-helpers';

test.use(regressionOptions(poolsInterceptions));

test('FFC: Pools — page matches screenshots', async ({ poolsPage }) => {
  await poolsPage.navigateToURL();
  await poolsPage.fitViewportToFullPage();

  await test.step('Default view', async () => {
    await captureScreenshot(poolsPage.main, 'Pools-Container.png', poolsPage.heading);
  });

  await test.step('Requiring attention expanded', async () => {
    await poolsPage.clickExpandRequiringAttentionBtn();
    await poolsPage.fitViewportToFullPage();
    await captureScreenshot(poolsPage.main, 'Pools-RequiringAttention--Expanded.png', poolsPage.heading);
  });

  await test.step('Side modal — General tab', async () => {
    await poolsPage.firstSubItem.click();
    await roundElementDimensions(poolsPage.sideModal);
    await expect(poolsPage.sideModal).toHaveScreenshot('Pools-SideModal--General.png');
  });

  await test.step('Side modal — Assignment tab', async () => {
    await poolsPage.sideModalTabAssignment.click();
    await expect(poolsPage.sideModal).toHaveScreenshot('Pools-SideModal--Assignment.png');
  });
});
