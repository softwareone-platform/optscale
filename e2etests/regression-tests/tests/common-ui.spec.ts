import {test} from "../../fixtures/page-object-fixtures";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {IInterceptor} from "../../utils/api-requests/interceptor";
import {
  AllowedActionsResponse,
  HomeDataSourcesResponse, OptimizationsResponse,
  OrganizationCleanExpansesResponseGraphQL, OrganizationConstraintsResponse,
  OrganizationExpensesPoolsResponse, PoolsResponse
} from "../../mocks";

const apiInterceptions: IInterceptor[] = [
  {
    urlPattern: `/v2/organizations/[^/]+/pool_expenses`,
    mock: OrganizationExpensesPoolsResponse
  },
  {
    graphQlOperationName: 'CleanExpenses',
    mock: OrganizationCleanExpansesResponseGraphQL
  },
  {
    graphQlOperationName: 'DataSources',
    mock: HomeDataSourcesResponse
  },
  {
    urlPattern: `/v2/organizations/[^/]+/optimizations`,
    mock: OptimizationsResponse
  },
  {
    urlPattern: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly&type=resource_quota&type=recurring_budget&type=expiring_budget&type=tagging_policy`,
    mock: OrganizationConstraintsResponse
  },
  {urlPattern: `/v2/pools/[^/]+?children=true&details=true`, mock: PoolsResponse},
  {urlPattern: `/v2/allowed_actions`, mock: AllowedActionsResponse}
];

test.use({restoreSession: true, interceptAPI: {list: apiInterceptions}});

test.describe('FFC: Common UI @swo_regression', () => {

  test("UI consistency of Header and Main Menu", async ({homePage, header, mainMenu}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await homePage.navigateToURL();
    await homePage.waitForAllCanvases();
    await test.step('Header widget', async () => {
      await homePage.screenshotUpdateDelay();
      await roundElementDimensions(header.header);
      await expect(header.header).toHaveScreenshot('Header-screenshot.png');
    });

    await test.step('Main Menu widget', async () => {
      await homePage.screenshotUpdateDelay();
      await roundElementDimensions(mainMenu.menu);
      await expect(mainMenu.menu).toHaveScreenshot('MainMenu-screenshot.png');
    });
  })
})
