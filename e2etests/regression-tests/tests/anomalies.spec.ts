import {test} from "../../fixtures/page.fixture";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {
  AnomaliesAvailableFiltersMock,
  AnomaliesConstraintsMock
} from "../mocks/anomalies.mocks";
import {InterceptionEntry} from "../../utils/api-requests/interceptor";

const interceptorList: InterceptionEntry[] = [
  {url: `v2/organizations/[^/]+available_filters`, mock: AnomaliesAvailableFiltersMock},
  {
    url: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly`,
    mock: AnomaliesConstraintsMock,
  },
];

test.use({restoreSession: true, interceptAPI: {entries: interceptorList}});

test.describe('FFC: Anomalies @swo_regression', () => {
  test('Anomalies page matches screenshots', async ({anomaliesPage, anomaliesCreatePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();

    await test.step('Navigate to Anomalies page', async () => {
      await anomaliesPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await anomaliesPage.heading.hover();
      await anomaliesPage.waitForCanvas();
      await anomaliesPage.screenshotUpdateDelay();
      await roundElementDimensions(anomaliesPage.main);
      await expect(anomaliesPage.main).toHaveScreenshot('Anomalies-screenshot.png');
    });

    await test.step('Create anomaly page', async () => {
      await anomaliesPage.clickAddBtn();
      await anomaliesPage.page.waitForSelector('[data-testid="btn_suggestion_filter"]', {
        state: 'visible',
        timeout: 20000
      });
      await anomaliesPage.screenshotUpdateDelay();
      await roundElementDimensions(anomaliesCreatePage.main);
      await expect(anomaliesCreatePage.main).toHaveScreenshot('Anomalies-create-screenshot.png');
    });
  })
})
