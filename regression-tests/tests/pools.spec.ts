import { test } from '@/fixtures/page.fixture';
import { expect } from '@playwright/test';
import { poolsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.use({ interceptAPI: { entries: poolsInterceptions } });

test('FFC: Pools', async ({ poolsPage }) => {
  await poolsPage.navigateToURL();
  await poolsPage.fitViewportToFullPage();

  await test.step('Default view', async () => {
    await captureScreenshot(poolsPage.main, 'Pools-Container.png', {
      hoverAnchor: poolsPage.heading,
      fitViewport: poolsPage,
    });
  });

  await test.step('Requiring attention — expanded', async () => {
    await poolsPage.clickExpandRequiringAttentionBtn();
    await captureScreenshot(poolsPage.main, 'Pools-RequiringAttention--Expanded.png', {
      hoverAnchor: poolsPage.heading,
      fitViewport: poolsPage,
    });
  });

  await test.step('Side modal — General tab', async () => {
    await poolsPage.firstSubItem.click();
    await captureScreenshot(poolsPage.sideModal, 'Pools-SideModal--General.png');
  });

  await test.step('Side modal — Assignment tab', async () => {
    await poolsPage.sideModalTabAssignment.click();
    await expect(poolsPage.sideModal).toHaveScreenshot('Pools-SideModal--Assignment.png');
  });
});
