import {test} from "../../fixtures/page-object-fixtures";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {IInterceptor} from "../../utils/api-requests/interceptor";
import {
  GeminisResponse, OptimisationsResponse,
  OptionsResponse,
  RIBreakdownResponse,
  SPBreakdownResponse,
  SummaryExpensesResponse
} from "../../mocks";

const apiInterceptions: IInterceptor[] = [
  {urlPattern: `/v2/organizations/[^/]+/geminis`, mock: GeminisResponse},
  {urlPattern: `/v2/organizations/[^/]+/options`, mock: OptionsResponse},
  {urlPattern: `/v2/organizations/[^/]+/ri_breakdown`, mock: RIBreakdownResponse},
  {urlPattern: `/v2/organizations/[^/]+/sp_breakdown`, mock: SPBreakdownResponse},
  {
    urlPattern: `/v2/organizations/[^/]+/summary_expenses`,
    mock: SummaryExpensesResponse
  },
  {urlPattern: `/v2/organizations/[^/]+/optimizations`, mock: OptimisationsResponse}
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
