import {test} from "../../fixtures/page.fixture";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {InterceptionEntry} from "../../utils/api-requests/interceptor";
import {
  AllowedActionsMock,
  HomeDataSourcesMock, OptimizationsMock,
  OrganizationCleanExpansesMock, OrganizationConstraintsMock,
  OrganizationExpensesPoolsMock, PoolsMock
} from "../mocks/homepage.mocks";

const apiInterceptions: InterceptionEntry[] = [
  {gql: 'CleanExpenses', mock: OrganizationCleanExpansesMock},
  {gql: 'DataSources', mock: HomeDataSourcesMock},
  {url: `/v2/organizations/[^/]+/pool_expenses`, mock: OrganizationExpensesPoolsMock},
  {url: `/v2/organizations/[^/]+/optimizations`, mock: OptimizationsMock},
  {url: `/v2/allowed_actions`, mock: AllowedActionsMock},
  {url: `/v2/pools/[^/]+?children=true&details=true`, mock: PoolsMock},
  {
    url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly&type=resource_quota&type=recurring_budget&type=expiring_budget&type=tagging_policy`,
    mock: OrganizationConstraintsMock
  }
];

test.use({restoreSession: true, interceptAPI: {entries: apiInterceptions}});

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
