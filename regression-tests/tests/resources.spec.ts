import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { resourcesInterceptions, resourceDetailsInterceptions } from "../mocks/resources.mocks";

test.describe('FFC: Resources Dashboard', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: resourcesInterceptions } });

  test('Page matches screenshots', async ({ resourcesPage }) => {
    await test.step('Set up test data', async () => {
      await resourcesPage.navigateToURL();
    });

    await test.step('View type - Default', async () => {
      await resourcesPage.waitForCanvas();
      await resourcesPage.searchInput.waitFor();
      await resourcesPage.heading.hover();
      await roundElementDimensions(resourcesPage.main);
      await resourcesPage.fitViewportToFullPage();
      await expect(resourcesPage.main).toHaveScreenshot('Resources-Container--Expenses.png');
    });
  });
});

test.describe('FFC: Resources Details', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: resourceDetailsInterceptions } });

  test('Resource details page matches screenshots', async ({ resourcesPage, resourceDetailsPage }) => {
    await test.step('Navigate to Resource details page for Sunflower[E2E_RR]', async () => {
      await resourcesPage.navigateToURL('/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true');
      await resourcesPage.firstResourceItemInTable.click();
      await roundElementDimensions(resourceDetailsPage.heading);
      await resourceDetailsPage.waitForTextContent(resourceDetailsPage.heading, 'Details of sunflower[E2E_RR]');
    });

    await test.step('View type - Details tab', async () => {
      await resourceDetailsPage.clickDetailsTab();
      await resourceDetailsPage.prepareScreenshot();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-Container--Details.png');
    });

    await test.step('View type - Constraints tab', async () => {
      await resourceDetailsPage.clickConstraintsTab();
      await resourceDetailsPage.constraintsTable.waitFor();
      await resourceDetailsPage.prepareScreenshot();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-Container--Constraints.png');
    });

    await test.step('View type - Expenses tab grouped', async () => {
      await resourceDetailsPage.clickExpensesTab();
      await resourceDetailsPage.clickExpensesGroupedButton();
      await resourceDetailsPage.prepareScreenshot(true);
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-Container--Expenses--Grouped.png');
    });

    await test.step('View type - Expenses tab detailed', async () => {
      await resourceDetailsPage.clickExpensesDetailedButton();
      await resourceDetailsPage.prepareScreenshot(true);
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-Container--Expenses--Detailed.png');
    });

    await test.step('View type - Recommendations tab', async () => {
      await resourceDetailsPage.clickRecommendationsTab();
      await resourceDetailsPage.prepareScreenshot();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-Container--Recommendations.png');
    });
  });
});
