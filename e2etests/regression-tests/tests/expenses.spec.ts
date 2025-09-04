import {test} from "../../fixtures/page-object-fixtures";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {IInterceptor} from "../../utils/api-requests/interceptor";
import {
  PoolsExpensesOwnerResponse,
  PoolsExpensesPoolResponse,
  PoolsExpensesResponse,
  PoolsExpensesSourceResponse, RegionExpensesResp
} from "../../mocks";

const apiInterceptions: IInterceptor[] = [
  {
    urlPattern: `/v2/pools_expenses/[^/]+filter_by=cloud`,
    mock: PoolsExpensesSourceResponse
  },
  {urlPattern: `/v2/pools_expenses/[^/]+filter_by=pool`, mock: PoolsExpensesPoolResponse},
  {
    urlPattern: `/v2/pools_expenses/[^/]+filter_by=employee`,
    mock: PoolsExpensesOwnerResponse
  },
  {
    urlPattern: `/v2/pools_expenses/[^/]+?end_date=[0-9]+&start_date=[0-9]+(?!.*filter)`,
    mock: PoolsExpensesResponse
  },
  { urlPattern: `/v2/organizations/[^/]+/region_expenses?.*$`, mock: RegionExpensesResp}
];

test.use({restoreSession: true, interceptAPI: {list: apiInterceptions}});

test.describe('FFC: Expenses @swo_regression', () => {
  test('Expenses dashboard page matches screenshots', async ({expensesPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();

    await test.step('Navigate to Expenses page', async () => {
      await expensesPage.navigateToURL();
    });

    await test.step('View type - daily selected', async () => {
      await expensesPage.clickDailyBtnIfNotSelected();
      await expensesPage.heading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-daily-screenshot.png');
    });

    await test.step('View type - weekly selected', async () => {
      await expensesPage.clickWeeklyBtn();
      await expensesPage.heading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-weekly-screenshot.png');
    });

    await test.step('View type - monthly selected', async () => {
      await expensesPage.clickMonthlyBtn();
      await expensesPage.heading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-monthly-screenshot.png');
    });
  });

  test("Expenses Map page matches screenshots", async ({expensesMapPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await expensesMapPage.navigateToURL();
    await expensesMapPage.heading.hover();
    await expect(expensesMapPage.main).toHaveScreenshot('ExpansesMapPage-screenshot.png');
  })

  test('Expenses breakdowns page matches screenshots', async ({expensesPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();

    await test.step('Navigate to Expenses page', async () => {
      await expensesPage.navigateToURL();
    });

    await test.step('View type - breakdown by source', async () => {
      await expensesPage.clickSourceBtn();

      await expensesPage.dataSourceHeading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-source-screenshot.png', {threshold: 0.9});

    });

    await test.step('View type- breakdown by pool', async () => {
      await expensesPage.clickCostExploreBreadcrumb();
      await expensesPage.clickPoolBtn();
      await expensesPage.poolHeading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-pool-screenshot.png');
    });

    await test.step('View type - breakdown by owner', async () => {
      await expensesPage.clickCostExploreBreadcrumb();
      await expensesPage.clickOwnerBtn();
      await expensesPage.ownerHeading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-owner-screenshot.png');
    });
  });
})
