import { test } from "../../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { InterceptionEntry } from "../../types/interceptor.types";
import {
  AllowedActionsMock,
  HomeDataSourcesMock, OptimizationsMock,
  OrganizationCleanExpansesMock, OrganizationConstraintsMock,
  OrganizationExpensesPoolsMock, PoolsMock
} from "../mocks/homepage.mocks";

test.describe('FFC: Home @swo_regression', () => {

  const apiInterceptions: InterceptionEntry[] = [
    { gql: 'DataSources', mock: HomeDataSourcesMock },
    { gql: 'CleanExpenses', mock: OrganizationCleanExpansesMock },
    { url: `/v2/organizations/[^/]+/pool_expenses`, mock: OrganizationExpensesPoolsMock },
    { url: `/v2/organizations/[^/]+/optimizations`, mock: OptimizationsMock },
    { url: `/v2/allowed_actions`, mock: AllowedActionsMock },
    { url: `/v2/pools/[^/]+?children=true&details=true`, mock: PoolsMock },
    {
      url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly&type=resource_quota&type=recurring_budget&type=expiring_budget&type=tagging_policy`,
      mock: OrganizationConstraintsMock
    }
  ];

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: true } });

  test('Blocks matches screenshots', async ({ homePage }) => {
    await test.step('Set up test data', async () => {
      await homePage.navigateToURL();
      await homePage.waitForAllBoxesToLoad();
      await homePage.fitViewportToFullPage();
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
