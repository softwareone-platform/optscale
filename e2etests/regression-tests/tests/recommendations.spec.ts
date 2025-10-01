import { test } from "../../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { InterceptionEntry } from "../../types/interceptor.types";
import {
  GeminisMock,
  OptionsMock,
  OptimisationsMock,
  RIBreakdownMock,
  SPBreakdownMock,
  SummaryExpensesMock
} from "../mocks/recommendations.mocks";


test.describe('FFC: Recommendations @swo_regression', () => {
  const apiInterceptions: InterceptionEntry[] = [
    { url: `/v2/organizations/[^/]+/geminis`, mock: GeminisMock },
    { url: `/v2/organizations/[^/]+/options`, mock: OptionsMock },
    { url: `/v2/organizations/[^/]+/ri_breakdown`, mock: RIBreakdownMock },
    { url: `/v2/organizations/[^/]+/sp_breakdown`, mock: SPBreakdownMock },
    { url: `/v2/organizations/[^/]+/summary_expenses`, mock: SummaryExpensesMock },
    { url: `/v2/organizations/[^/]+/optimizations`, mock: OptimisationsMock }
  ];

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: true } });

  test('Page matches screenshots', async ({ recommendationsPage }) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
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
