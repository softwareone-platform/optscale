import { test } from '@/fixtures/page.fixture';
import { E2E_RRD } from '@/mocks/e2e-markers';
import { expect } from '@playwright/test';
import { resourcesInterceptions, resourceDetailsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe(() => {
  test.use({ interceptAPI: { entries: resourcesInterceptions } });

  test('FFC: Resources Dashboard', async ({ resourcesPage }) => {
    await resourcesPage.navigateToURL();
    await resourcesPage.waitForCanvas();
    await resourcesPage.searchInput.waitFor();
    await captureScreenshot(resourcesPage.main, 'Resources-Container--Expenses.png', {
      hoverAnchor: resourcesPage.heading,
      fitViewport: resourcesPage,
    });
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: resourceDetailsInterceptions } });

  test('FFC: Resources Details', async ({ resourcesPage, resourceDetailsPage }) => {
    await test.step('Open details page', async () => {
      await resourcesPage.navigateToURL('/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true');
      await resourcesPage.firstResourceItemInTable.click();
      await resourceDetailsPage.waitForTextContent(resourceDetailsPage.heading, `Details of sunflower${E2E_RRD}`);
    });

    const tabs: Array<{ label: string; open: () => Promise<void>; snapshot: string; withCharts?: boolean }> = [
      { label: 'Details tab', open: () => resourceDetailsPage.clickTab(resourceDetailsPage.detailsTab), snapshot: 'ResourceDetails-Container--Details.png' },
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
          await resourceDetailsPage.clickExpensesGroupedButton();
        },
        snapshot: 'ResourceDetails-Container--ExpensesGrouped.png',
        withCharts: true,
      },
      {
        label: 'Expenses tab — Detailed',
        open: () => resourceDetailsPage.clickExpensesDetailedButton(),
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
        await expect(resourceDetailsPage.main).toHaveScreenshot(snapshot);
      });
    }
  });
});
