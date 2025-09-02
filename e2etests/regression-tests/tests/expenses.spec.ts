import {test} from "../../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {restoreUserSessionInLocalForage} from "../../utils/auth-session-storage/localforage-service";
import {roundElementDimensions} from "../utils/roundElementDimensions";

test.use({restoreSession: true});

test.describe('FFC: Expenses @swo_regression', () => {
  test('Expenses dashboard page matches screenshots', async ({expensesPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await expensesPage.setupApiInterceptions();
    });

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
    await expensesMapPage.setupApiInterceptions();
    await expensesMapPage.navigateToURL();
    await expensesMapPage.heading.hover();
    await expect(expensesMapPage.main).toHaveScreenshot('ExpansesMapPage-screenshot.png');
  })

  test('Expenses breakdowns page matches screenshots', async ({expensesPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await expensesPage.setupApiInterceptions();
    });

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
