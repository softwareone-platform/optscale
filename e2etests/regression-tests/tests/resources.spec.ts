import {test} from "../../fixtures/page.fixture";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {InterceptionEntry} from "../../utils/api-requests/interceptor";

import {
  BreakdownExpensesMock,
  BreakdownTagsMock,
  CleanExpensesMock,
  ResourceAvailableFiltersMock,
  ResourcesCountMock,
  SummaryMock
} from "../mocks/resources.mocks";
import {
  AllowedActionsSunflowerEUMock,
  LimitHitsMock, RawExpensesMock,
  ResourceDetailsMock,
} from "../mocks/resource.mocks";

const apiInterceptionsDashboard: InterceptionEntry[] = [
  {url: `/v2/organizations/[^/]+/summary_expenses`, mock: SummaryMock},
  {url: `/v2/organizations/[^/]+/breakdown_expenses`, mock: BreakdownExpensesMock},
  {url: `/v2/organizations/[^/]+/clean_expenses`, mock: CleanExpensesMock},
  {url: `/v2/organizations/[^/]+/available_filters`, mock: ResourceAvailableFiltersMock},
  {url: `/v2/organizations/[^/]+/resources_count`, mock: ResourcesCountMock},
  {url: `/v2/organizations/[^/]+/breakdown_tags`, mock: BreakdownTagsMock},
];

const apiInterceptionsDetails: InterceptionEntry[] = [
  {url: `v2/cloud_resources/[^/]+?details=true`, mock: ResourceDetailsMock},
  {url: `v2/cloud_resources/[^/]+/limit_hits`, mock: LimitHitsMock},
  {url: `v2/allowed_actions\\?cloud_resource=.+`, mock: AllowedActionsSunflowerEUMock},
  {url: `v2/resources/[^/]+/raw_expenses`, mock: RawExpensesMock},
];

test.use({restoreSession: true, interceptAPI: {entries: [...apiInterceptionsDashboard, ...apiInterceptionsDetails]}});

test.describe('FFC: Resources @swo_regression', () => {
  test('Resources dashboard page matches screenshots', async ({resourcesPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await resourcesPage.navigateToURL();
    });

    await test.step('View type - Default', async () => {
      await resourcesPage.waitForCanvas();
      await resourcesPage.searchInput.waitFor();
      await resourcesPage.heading.hover();
      await resourcesPage.screenshotUpdateDelay();
      await roundElementDimensions(resourcesPage.main);
      await expect(resourcesPage.main).toHaveScreenshot('Resources-landing-screenshot.png');
    });

    await test.step('View type - breakdown by expenses', async () => {
      await resourcesPage.clickExpensesTab();
      await resourcesPage.heading.hover();
      await resourcesPage.expensesBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await resourcesPage.screenshotUpdateDelay();
      await roundElementDimensions(resourcesPage.expensesBreakdownChart);
      await expect(resourcesPage.expensesBreakdownChart).toHaveScreenshot('Resources-expenses-chart-screenshot.png');
    });

    await test.step('View type - breakdown by tags', async () => {
      await resourcesPage.tabTagsBtn.click();
      await resourcesPage.heading.hover();
      await resourcesPage.tagsBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await resourcesPage.screenshotUpdateDelay();
      await roundElementDimensions(resourcesPage.tagsBreakdownChart);
      await expect(resourcesPage.tagsBreakdownChart).toHaveScreenshot('Resources-tags-chart-screenshot.png');
    });

    await test.step('View type - breakdown by resource count', async () => {
      await resourcesPage.tabResourceCountBtn.click();
      await resourcesPage.heading.hover();
      await resourcesPage.resourceCountBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await resourcesPage.screenshotUpdateDelay();
      await roundElementDimensions(resourcesPage.resourceCountBreakdownChart);
      await expect(resourcesPage.resourceCountBreakdownChart).toHaveScreenshot('Resources-resource-count-chart-screenshot.png');
    });
  })

  test('Resource details page matches screenshots',
    async ({
             resourcesPage, resourceDetailsPage
           }) => {

      if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
      await test.step('Navigate to Resource details page for Sunflower EU Fra', async () => {
        await resourcesPage.navigateToURL('/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true');
        await resourcesPage.waitForCanvas();

        // Click on the resource name link in the first row to ensure it exists in the live database before navigating
        await resourcesPage.firstResourceItemInTable.click();
        await roundElementDimensions(resourceDetailsPage.heading);
        await resourceDetailsPage.waitForTextContent(resourceDetailsPage.heading, 'Details of sunflower-eu-fra');
      });

      await test.step('View type - Details tab', async () => {
        if (!await resourceDetailsPage.isTabSelected(resourceDetailsPage.detailsTab)) await resourceDetailsPage.clickDetailsTab();
        await resourceDetailsPage.heading.hover();
        await resourceDetailsPage.screenshotUpdateDelay();
        await roundElementDimensions(resourceDetailsPage.main);
        await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-details-tab-screenshot.png');
      });

      await test.step('View type - Constraints tab', async () => {
        await resourceDetailsPage.clickConstraintsTab();
        await resourceDetailsPage.heading.hover();
        await resourceDetailsPage.constraintsTable.waitFor();
        await resourceDetailsPage.screenshotUpdateDelay();
        await roundElementDimensions(resourceDetailsPage.main);
        await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-constraints-tab-screenshot.png');
      });

      await test.step('View type - Expenses tab', async () => {
        await resourceDetailsPage.clickExpensesTab();
        await resourceDetailsPage.clickExpensesGroupedButtonIfNotActive();
        await resourceDetailsPage.heading.hover();
        await resourceDetailsPage.waitForCanvas();
        await resourceDetailsPage.screenshotUpdateDelay();
        await roundElementDimensions(resourceDetailsPage.main);
        await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-grouped-screenshot.png');
        await resourceDetailsPage.clickExpensesDetailedButton();
        await resourceDetailsPage.heading.hover();
        await resourceDetailsPage.waitForCanvas();
        await resourceDetailsPage.screenshotUpdateDelay();
        await roundElementDimensions(resourceDetailsPage.main);
        await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-detailed-screenshot.png');
      });

      await test.step('View type - Recommendations tab', async () => {
        await resourceDetailsPage.clickRecommendationsTab();
        await resourceDetailsPage.heading.hover();
        await resourceDetailsPage.screenshotUpdateDelay();
        await roundElementDimensions(resourceDetailsPage.main);
        await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-recommendations-tab-screenshot.png');
      });
    })
})
