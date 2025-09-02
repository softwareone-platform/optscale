import {test} from "../../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {restoreUserSessionInLocalForage} from "../../utils/auth-session-storage/localforage-service";
import {roundElementDimensions} from "../utils/roundElementDimensions";

test.use({restoreSession: true});

test.describe('FFC: Recommendations @swo_regression', () => {
  test('Recommendations page matches screenshots', async ({recommendationsPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await recommendationsPage.setupApiInterceptions();
      await recommendationsPage.navigateToURL();
    });

    await test.step('Page view cards', async () => {
      await recommendationsPage.clickCardsButtonIfNotActive();
      await recommendationsPage.screenshotUpdateDelay();
      await roundElementDimensions(recommendationsPage.main);
      await roundElementDimensions(recommendationsPage.possibleMonthlySavingsDiv);
      await roundElementDimensions(recommendationsPage.firstCard);
      await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-cards-screenshot.png');
    });

    await test.step('Page view table', async () => {
      await recommendationsPage.clickTableButton();
      await recommendationsPage.screenshotUpdateDelay();
      await roundElementDimensions(recommendationsPage.main);
      await roundElementDimensions(recommendationsPage.possibleMonthlySavingsDiv);
      await roundElementDimensions(recommendationsPage.table);
      await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-table-selected-screenshot.png');
      await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-cards-savings-screenshot.png');
      await expect(recommendationsPage.table).toHaveScreenshot('Recommendations-table--screenshot.png');
    });
  })
})
