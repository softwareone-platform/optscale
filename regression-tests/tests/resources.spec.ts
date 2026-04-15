import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { resourcesInterceptions, resourceDetailsInterceptions } from "../mocks/resources-interceptions.mocks";

test.describe('FFC: Resources Dashboard', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: resourcesInterceptions, failOnInterceptionMissing: true } });

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
      await expect(resourcesPage.main).toHaveScreenshot('Resources-landing-screenshot.png');
    });

    await test.step('View type - breakdown by expenses', async () => {
      await resourcesPage.clickExpensesTab();
      await resourcesPage.heading.hover();
      await resourcesPage.expensesBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await roundElementDimensions(resourcesPage.expensesBreakdownChart);
      await resourcesPage.fitViewportToFullPage();
      await expect(resourcesPage.expensesBreakdownChart).toHaveScreenshot('Resources-expenses-chart-screenshot.png');
    });

    await test.step('View type - breakdown by tags', async () => {
      await resourcesPage.clickTagsTab();
      await resourcesPage.heading.hover();
      await resourcesPage.tagsBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await roundElementDimensions(resourcesPage.tagsBreakdownChart);
      await resourcesPage.fitViewportToFullPage();
      await expect(resourcesPage.tagsBreakdownChart).toHaveScreenshot('Resources-tags-chart-screenshot.png');
    });

    await test.step('View type - breakdown by resource count', async () => {
      await resourcesPage.clickResourceCountTab();
      await resourcesPage.heading.hover();
      await resourcesPage.resourceCountBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await roundElementDimensions(resourcesPage.resourceCountBreakdownChart);
      await resourcesPage.fitViewportToFullPage();
      await expect(resourcesPage.resourceCountBreakdownChart).toHaveScreenshot('Resources-resource-count-chart-screenshot.png');
    });
  });
});

test.describe('FFC: Resources Details', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: resourceDetailsInterceptions } });

  test('Resource details page matches screenshots', async ({ resourcesPage, resourceDetailsPage }) => {
    await test.step('Navigate to Resource details page for Sunflower EU Fra', async () => {
      await resourcesPage.navigateToURL('/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true');
      await resourcesPage.firstResourceItemInTable.click();
      await roundElementDimensions(resourceDetailsPage.heading);
      await resourceDetailsPage.waitForTextContent(resourceDetailsPage.heading, 'Details of sunflower-eu-fra');
    });

    await test.step('View type - Details tab', async () => {
      await resourceDetailsPage.clickDetailsTab();
      await resourceDetailsPage.prepareScreenshot();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-details-tab-screenshot.png');
    });

    await test.step('View type - Constraints tab', async () => {
      await resourceDetailsPage.clickConstraintsTab();
      await resourceDetailsPage.constraintsTable.waitFor();
      await resourceDetailsPage.prepareScreenshot();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-constraints-tab-screenshot.png');
    });

    await test.step('View type - Expenses tab grouped', async () => {
      await resourceDetailsPage.clickExpensesTab();
      await resourceDetailsPage.clickExpensesGroupedButton();
      await resourceDetailsPage.prepareScreenshot(true);
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-grouped-screenshot.png');
    });

    await test.step('View type - Expenses tab detailed', async () => {
      await resourceDetailsPage.clickExpensesDetailedButton();
      await resourceDetailsPage.prepareScreenshot(true);
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-detailed-screenshot.png');
    });

    await test.step('View type - Recommendations tab', async () => {
      await resourceDetailsPage.clickRecommendationsTab();
      await resourceDetailsPage.prepareScreenshot();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-recommendations-tab-screenshot.png');
    });
  });
});
