import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { recommendationsInterceptions } from "../mocks/recommendations.mocks";


test.describe('FFC: Recommendations', () => {
  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: recommendationsInterceptions, failOnInterceptionMissing: true } });

  test('Page matches screenshots', async ({ recommendationsPage }) => {
    await test.step('Set up test data', async () => {
      await recommendationsPage.navigateToURL();
    });

    await test.step('Page view cards', async () => {
      await recommendationsPage.clickCardsButtonIfNotActive();
      await roundElementDimensions([recommendationsPage.main, recommendationsPage.possibleMonthlySavingsDiv, recommendationsPage.firstCard]);
      await recommendationsPage.fitViewportToFullPage();
      await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-cards-screenshot.png');
    });

    await test.step('Page view table', async () => {
      await recommendationsPage.clickTableButton();
      await roundElementDimensions([recommendationsPage.main, recommendationsPage.possibleMonthlySavingsDiv, recommendationsPage.table]);
      await recommendationsPage.fitViewportToFullPage();
      await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-table-selected-screenshot.png');
      await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-cards-savings-screenshot.png');
      await expect(recommendationsPage.table).toHaveScreenshot('Recommendations-table-screenshot.png');
    });
  })
})
