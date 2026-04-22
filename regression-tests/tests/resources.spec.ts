import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { resourcesInterceptions, resourceDetailsInterceptions } from '../mocks/resources.mocks';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { captureScreenshot, regressionOptions } from '../utils/test-helpers';

test.describe('FFC: Resources Dashboard', () => {
  test.use(regressionOptions(resourcesInterceptions));

  test('Page matches screenshots', async ({ resourcesPage }) => {
    await resourcesPage.navigateToURL();
    await resourcesPage.waitForCanvas();
    await resourcesPage.searchInput.waitFor();
    await resourcesPage.fitViewportToFullPage();
    await captureScreenshot(resourcesPage.main, 'Resources-Container--Expenses.png', resourcesPage.heading);
  });
});

test.describe('FFC: Resources Details', () => {
  test.use(regressionOptions(resourceDetailsInterceptions));

  test('Resource details page matches screenshots', async ({ resourcesPage, resourceDetailsPage }) => {
    await test.step('Navigate to Resource details page for sunflower[E2E_RR]', async () => {
      await resourcesPage.navigateToURL('/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true');
      await resourcesPage.firstResourceItemInTable.click();
      await roundElementDimensions(resourceDetailsPage.heading);
      await resourceDetailsPage.waitForTextContent(resourceDetailsPage.heading, 'Details of sunflower[E2E_RR]');
    });

    const tabs: Array<{ label: string; open: () => Promise<void>; snapshot: string; withCharts?: boolean }> = [
      { label: 'Details',          open: () => resourceDetailsPage.clickDetailsTab(),         snapshot: 'ResourceDetails-Container--Details.png' },
      { label: 'Constraints',      open: async () => {
          await resourceDetailsPage.clickConstraintsTab();
          await resourceDetailsPage.constraintsTable.waitFor();
        }, snapshot: 'ResourceDetails-Container--Constraints.png' },
      { label: 'Expenses grouped', open: async () => {
          await resourceDetailsPage.clickExpensesTab();
          await resourceDetailsPage.clickExpensesGroupedButton();
        }, snapshot: 'ResourceDetails-Container--ExpensesGrouped.png', withCharts: true },
      { label: 'Expenses detailed',open: () => resourceDetailsPage.clickExpensesDetailedButton(), snapshot: 'ResourceDetails-Container--ExpensesDetailed.png', withCharts: true },
      { label: 'Recommendations',  open: () => resourceDetailsPage.clickRecommendationsTab(),     snapshot: 'ResourceDetails-Container--Recommendations.png' },
    ];

    for (const { label, open, snapshot, withCharts } of tabs) {
      await test.step(`${label} tab`, async () => {
        await open();
        await resourceDetailsPage.prepareScreenshot(withCharts);
        await expect(resourceDetailsPage.main).toHaveScreenshot(snapshot);
      });
    }
  });
});
