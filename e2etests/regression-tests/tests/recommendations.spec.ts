import {test} from "../../fixtures/page-object-fixtures";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {IInterceptor} from "../../utils/api-requests/interceptor";
import {
  GeminisRegressionResponse,
  OptionsRegressionResponse,
  OptimisationsRegressionResponse,
  RIBreakdownRegressionResponse,
  SPBreakdownRegressionResponse,
  SummaryExpensesRegressionResponse
} from "../mocks/recommendations.mocks";

const apiInterceptions: IInterceptor[] = [
  {urlPattern: `/v2/organizations/[^/]+/geminis`, mock: GeminisRegressionResponse},
  {urlPattern: `/v2/organizations/[^/]+/options`, mock: OptionsRegressionResponse},
  {urlPattern: `/v2/organizations/[^/]+/ri_breakdown`, mock: RIBreakdownRegressionResponse},
  {urlPattern: `/v2/organizations/[^/]+/sp_breakdown`, mock: SPBreakdownRegressionResponse},
  {
    urlPattern: `/v2/organizations/[^/]+/summary_expenses`,
    mock: SummaryExpensesRegressionResponse
  },
  {urlPattern: `/v2/organizations/[^/]+/optimizations`, mock: OptimisationsRegressionResponse}
];

test.use({restoreSession: true, interceptAPI: {list: apiInterceptions}});

test.describe('FFC: Recommendations @swo_regression', () => {
  test('Recommendations page matches screenshots', async ({recommendationsPage}) => {
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
