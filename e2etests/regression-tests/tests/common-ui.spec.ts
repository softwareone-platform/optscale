import {test} from "../../fixtures/page-object-fixtures";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {IInterceptor} from "../../utils/api-requests/interceptor";
import {
  AllowedActionsRegressionResponse,
  HomeDataSourcesRegressionResponse, OptimizationsRegressionResponse,
  OrganizationCleanExpansesRegressionResponse, OrganizationConstraintsRegressionResponse,
  OrganizationExpensesPoolsRegressionResponse, PoolsRegressionResponse
} from "../mocks/homepage.mocks";

const apiInterceptions: IInterceptor[] = [
  {
    urlPattern: `/v2/organizations/[^/]+/pool_expenses`,
    mock: OrganizationExpensesPoolsRegressionResponse
  },
  {
    graphQlOperationName: 'CleanExpenses',
    mock: OrganizationCleanExpansesRegressionResponse
  },
  {
    graphQlOperationName: 'DataSources',
    mock: HomeDataSourcesRegressionResponse
  },
  {
    urlPattern: `/v2/organizations/[^/]+/optimizations`,
    mock: OptimizationsRegressionResponse
  },
  {
    urlPattern: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly&type=resource_quota&type=recurring_budget&type=expiring_budget&type=tagging_policy`,
    mock: OrganizationConstraintsRegressionResponse
  },
  {urlPattern: `/v2/pools/[^/]+?children=true&details=true`, mock: PoolsRegressionResponse},
  {urlPattern: `/v2/allowed_actions`, mock: AllowedActionsRegressionResponse}
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
