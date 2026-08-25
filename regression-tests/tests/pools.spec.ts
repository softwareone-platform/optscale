import { test } from '@/fixtures/page.fixture';
import { poolsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';
import { fitViewportToFullPage } from '@/utils/viewport';

test.describe('Pools', () => {
  test.use({ interceptAPI: { entries: poolsInterceptions } });

  test('overview', async ({ poolsPage }) => {
    await poolsPage.navigateToURL();
    await fitViewportToFullPage(poolsPage.page);

    await test.step('Header', async () => {
      await captureScreenshot(poolsPage.header, 'Pools-Header.png', { skipHover: true });
    });

    await test.step('Default view', async () => {
      await captureScreenshot(poolsPage.pageContentWrapper, 'Pools-Container.png', {
        hoverAnchor: poolsPage.heading,
        fitViewport: true,
      });
    });

    await test.step('Requiring attention — expanded', async () => {
      await poolsPage.expandRequiringAttentionBtn.click();
      await captureScreenshot(poolsPage.pageContentWrapper, 'Pools-RequiringAttention--Expanded.png', {
        hoverAnchor: poolsPage.heading,
        fitViewport: true,
      });
    });

    await test.step('Side modal — General tab', async () => {
      await poolsPage.firstSubItem.click();
      await captureScreenshot(poolsPage.sideModal, 'Pools-SideModal--General.png');
    });

    await test.step('Side modal — Assignment tab', async () => {
      await poolsPage.sideModalTabAssignment.click();
      await captureScreenshot(poolsPage.sideModal, 'Pools-SideModal--Assignment.png', { skipHover: true });
    });
  });
});
