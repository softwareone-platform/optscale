import { test } from "../../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { InterceptionEntry } from "../../types/interceptor.types";
import {
  PoolsExpensesOwnerRegressionResponse,
  PoolsExpensesPoolRegressionResponse, PoolsExpensesRegressionResponse,
  PoolsExpensesSourceRegressionResponse, RegionExpensesRegressionResponse
} from "../mocks/expenses.mocks";

test.describe('FFC: Expenses Dashboard page @swo_regression', () => {

  const apiInterceptions: InterceptionEntry[] = [
    {
      url: `/v2/pools_expenses/[^/]+?end_date=[0-9]+&start_date=[0-9]+(?!.*filter)`,
      mock: PoolsExpensesRegressionResponse
    }
  ];

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: apiInterceptions } });

  test('Page matches screenshots', async ({ expensesPage }) => {
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
})

test.describe('FFC: Expenses Map page @swo_regression', () => {
  const apiInterceptions: InterceptionEntry[] = [
    { url: `/v2/organizations/[^/]+/region_expenses?.*$`, mock: RegionExpensesRegressionResponse },
  ];

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: true } });

  test("Page matches screenshots", async ({ expensesMapPage }) => {
    await expensesMapPage.navigateToURL();
    await expensesMapPage.heading.hover();
    await expensesMapPage.fitViewportToFullPage();
    await expect(expensesMapPage.mapLegend).toBeVisible();
    await expect(expensesMapPage.main).toHaveScreenshot('ExpansesMapPage-screenshot.png', {
      mask: [expensesMapPage.page.locator('[data-testid="google-map-wrapper"]')],
    });
  })
})

test.describe('FFC: Expenses Breakdowns page @swo_regression', () => {
  const apiInterceptions: InterceptionEntry[] = [
    { url: `/v2/pools_expenses/[^/]+filter_by=cloud`, mock: PoolsExpensesSourceRegressionResponse },
    { url: `/v2/pools_expenses/[^/]+filter_by=pool`, mock: PoolsExpensesPoolRegressionResponse },
    { url: `/v2/pools_expenses/[^/]+filter_by=employee`, mock: PoolsExpensesOwnerRegressionResponse },
    {
      url: `/v2/pools_expenses/[^/]+?end_date=[0-9]+&start_date=[0-9]+(?!.*filter)`,
      mock: PoolsExpensesRegressionResponse
    }
  ];

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: apiInterceptions} });

  test('Page matches screenshots', async ({ expensesPage }) => {
    await test.step('Navigate to Expenses page', async () => {
      await expensesPage.navigateToURL();
    });

    await test.step('View type - breakdown by source', async () => {
      await expensesPage.clickSourceBtn();

      await expensesPage.dataSourceHeading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await expensesPage.fitViewportToFullPage();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-source-screenshot.png');

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
