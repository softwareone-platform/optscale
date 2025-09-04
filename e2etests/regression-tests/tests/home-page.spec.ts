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

test.describe('FFC: Home @swo_regression', () => {

  test('Homepage blocks against baseline screenshots', async ({homePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await homePage.navigateToURL();
      await homePage.waitForAllCanvases();
      await homePage.screenshotUpdateDelay();
    });
    await test.step('Organization Expenses Block', async () => {
      await roundElementDimensions(homePage.organizationExpensesBlock);
      await expect(homePage.organizationExpensesBlock).toHaveScreenshot('OrganizationExpensesBlock-screenshot.png');
    });
    await test.step('TopResources Block', async () => {
      await roundElementDimensions(homePage.topResourcesBlock);
      await expect(homePage.topResourcesBlock).toHaveScreenshot('TopResourcesBlock-screenshot.png');
    });

    await test.step('Recommendations Block', async () => {
      await roundElementDimensions(homePage.recommendationsBlock);
      await expect(homePage.recommendationsBlock).toHaveScreenshot('RecommendationsBlock-screenshot.png');
    });

    await test.step('PolicyViolations Block', async () => {
      await roundElementDimensions(homePage.policyViolationsBlock);
      await expect(homePage.policyViolationsBlock).toHaveScreenshot('PolicyViolationsBlock-screenshot.png');
    });

    await test.step('Pools Requiring Attention Block', async () => {
      await roundElementDimensions(homePage.poolsRequiringAttentionBlock);
      await expect(homePage.poolsRequiringAttentionBlock).toHaveScreenshot('PoolsRequiringAttentionBlock-screenshot.png');
    });
  });
})
