import {test} from "../../fixtures/page-object-fixtures";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {InterceptionEntry} from "../../utils/api-requests/interceptor";
import {PolicyMock, TaggingPolicyMock} from "../mocks/policies.mocks";

const apiInterceptions: InterceptionEntry[] = [
  {
    url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_quota&type=recurring_budget&type=expiring_budget`,
    mock: PolicyMock
  },
  {
    url: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=tagging_policy`,
    mock: TaggingPolicyMock
  },
];

test.use({restoreSession: true, interceptAPI: {list: apiInterceptions}});

test.describe('FFC: Policies @swo_regression', () => {
  test('Policies page matches screenshots', async ({policiesPage, policiesCreatePage}) => {
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

  test('Tagging Policies page matches screenshots', async ({
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
