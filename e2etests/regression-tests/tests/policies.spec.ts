import {test} from "../../fixtures/page.fixture";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {InterceptionEntry} from "../../types/interceptor.types";
import {PolicyMock, TaggingPolicyMock, AnomaliesConstraintsMock} from "../mocks/policies.mocks";

test.describe('FFC: Anomalies page @swo_regression', () => {

  const interceptorList: InterceptionEntry[] = [
    {
      url: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly`,
      mock: AnomaliesConstraintsMock,
    },
  ];

  test.use({restoreSession: true, interceptAPI: {entries: interceptorList}});

  test('Page matches screenshots', async ({anomaliesPage, anomaliesCreatePage}) => {
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


test.describe('FFC: Policies page @swo_regression', () => {
  const apiInterceptions: InterceptionEntry[] = [
    {
      url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_quota&type=recurring_budget&type=expiring_budget`,
      mock: PolicyMock
    },
  ];

  test.use({restoreSession: true, interceptAPI: {entries: apiInterceptions}});

  test('Page matches screenshots', async ({policiesPage, policiesCreatePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();

    await test.step('Navigate to Policies page', async () => {
      await policiesPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await policiesPage.heading.hover();
      await policiesPage.screenshotUpdateDelay();
      await roundElementDimensions(policiesPage.main);
      await expect(policiesPage.main).toHaveScreenshot('Policies-screenshot.png');
    });

    await test.step('Create policy page', async () => {
      await policiesPage.clickAddBtn();
      await policiesCreatePage.heading.hover();
      await policiesCreatePage.page.waitForSelector('[data-testid="btn_suggestion_filter"]', {
        state: 'visible',
        timeout: 20000
      });
      await policiesPage.screenshotUpdateDelay();
      await roundElementDimensions(policiesCreatePage.main);
      await expect(policiesCreatePage.main).toHaveScreenshot('Policies-create-screenshot.png');
    });
  })


})

test.describe('FFC: Tagging Policies page @swo_regression', () => {
  const apiInterceptions: InterceptionEntry[] = [
    {
      url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=tagging_policy`,
      mock: TaggingPolicyMock
    },
  ];

  test.use({restoreSession: true, interceptAPI: {entries: apiInterceptions}});

  test('Page matches screenshots', async ({
                                            taggingPoliciesPage,
                                            taggingPoliciesCreatePage
                                          }) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();

    await test.step('Navigate to Tagging Policies page', async () => {
      await taggingPoliciesPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await taggingPoliciesPage.heading.hover();
      await taggingPoliciesPage.screenshotUpdateDelay();
      await roundElementDimensions(taggingPoliciesPage.main);
      await expect(taggingPoliciesPage.main).toHaveScreenshot('TaggingPolicies-screenshot.png');
    });

    await test.step('Create tagging policy page', async () => {
      await taggingPoliciesPage.clickAddBtn();
      await taggingPoliciesCreatePage.page.waitForSelector('[data-testid="btn_suggestion_filter"]', {
        state: 'visible',
        timeout: 20000
      });
      await taggingPoliciesCreatePage.heading.hover();
      await taggingPoliciesPage.screenshotUpdateDelay();
      await roundElementDimensions(taggingPoliciesCreatePage.main);
      await expect(taggingPoliciesCreatePage.main).toHaveScreenshot('TaggingPolicies-create-screenshot.png');
    });
  })
})

