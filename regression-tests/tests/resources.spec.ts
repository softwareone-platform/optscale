import { test } from '@/fixtures/page.fixture';
import { e2e } from '@/mocks/constants';
import { resourcesInterceptions, resourceDetailsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe('Resources', () => {
  test.use({ interceptAPI: { entries: resourcesInterceptions } });

  test('dashboard', async ({ resourcesPage }) => {
    await resourcesPage.navigateToURL();
    await resourcesPage.waitForCanvas();
    await resourcesPage.searchInput.waitFor();
    await captureScreenshot(resourcesPage.header, 'Resources-Header.png', { skipHover: true });
    await captureScreenshot(resourcesPage.pageContentWrapper, 'Resources-Container--Expenses.png', {
      hoverAnchor: resourcesPage.heading,
      fitViewport: true,
    });
  });
});

test.describe('Resources', () => {
  test.use({ interceptAPI: { entries: resourceDetailsInterceptions } });

  test('details', async ({ resourcesPage, resourceDetailsPage }) => {
    await test.step('Open details page', async () => {
      await resourcesPage.navigateToURL('/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true');
      await resourcesPage.firstResourceItemInTable.click();
      await resourceDetailsPage.waitForTextContent(resourceDetailsPage.heading, `Details of ${e2e('sunflower')}`);
    });

    await test.step('Header', async () => {
      await captureScreenshot(resourceDetailsPage.header, 'ResourceDetails-Header.png', { skipHover: true });
    });

    const tabs: Array<{ label: string; open: () => Promise<void>; snapshot: string; withCharts?: boolean }> = [
      {
        label: 'Details tab',
        open: () => resourceDetailsPage.clickTab(resourceDetailsPage.detailsTab),
        snapshot: 'ResourceDetails-Container--Details.png',
      },
      {
        label: 'Constraints tab',
        open: async () => {
          await resourceDetailsPage.clickTab(resourceDetailsPage.constraintsTab);
          await resourceDetailsPage.constraintsTable.waitFor();
        },
        snapshot: 'ResourceDetails-Container--Constraints.png',
      },
      {
        label: 'Expenses tab — Grouped',
        open: async () => {
          await resourceDetailsPage.clickTab(resourceDetailsPage.expensesTab);
          await resourceDetailsPage.expensesGroupedButton.click();
        },
        snapshot: 'ResourceDetails-Container--ExpensesGrouped.png',
        withCharts: true,
      },
      {
        label: 'Expenses tab — Detailed',
        open: () => resourceDetailsPage.expensesDetailedButton.click(),
        snapshot: 'ResourceDetails-Container--ExpensesDetailed.png',
        withCharts: true,
      },
      {
        label: 'Recommendations tab',
        open: () => resourceDetailsPage.clickTab(resourceDetailsPage.recommendationsTab),
        snapshot: 'ResourceDetails-Container--Recommendations.png',
      },
    ];

    for (const { label, open, snapshot, withCharts } of tabs) {
      await test.step(label, async () => {
        await open();
        await resourceDetailsPage.prepareScreenshot(withCharts);
        await captureScreenshot(resourceDetailsPage.pageContentWrapper, snapshot, { skipHover: true });
      });
    }
  });
});
