import { test } from '../fixtures/page.fixture';
import { anomaliesInterceptions, policiesInterceptions, taggingPoliciesInterceptions } from '../mocks/policies.mocks';
import { captureScreenshot, regressionOptions } from '../utils/test-helpers';

test.describe('FFC: Policy Anomalies page', () => {
  test.use(regressionOptions(anomaliesInterceptions));

  test('Page matches screenshots', async ({ policiesAnomaliesPage, policiesAnomaliesCreatePage }) => {
    await policiesAnomaliesPage.navigateToURL();

    await test.step('List page', async () => {
      await policiesAnomaliesPage.waitForCanvas();
      await captureScreenshot(policiesAnomaliesPage.main, 'Policies-Anomalies-Container.png', policiesAnomaliesPage.heading);
    });

    await test.step('Create form', async () => {
      await policiesAnomaliesPage.clickAddBtn();
      await policiesAnomaliesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await captureScreenshot(policiesAnomaliesCreatePage.main, 'Policies-Anomalies-CreateForm.png', policiesAnomaliesCreatePage.heading);
    });
  });
});

test.describe('FFC: Policies Quota and Budget page', () => {
  test.use(regressionOptions(policiesInterceptions));

  test('Page matches screenshots', async ({ policiesQuotaPage, policiesQuotaCreatePage }) => {
    await policiesQuotaPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(policiesQuotaPage.main, 'Policies-Quota-Container.png', policiesQuotaPage.heading);
    });

    await test.step('Create form', async () => {
      await policiesQuotaPage.clickAddBtn();
      await policiesQuotaPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await captureScreenshot(policiesQuotaCreatePage.main, 'Policies-Quota-CreateForm.png', policiesQuotaCreatePage.heading);
    });
  });
});

test.describe('FFC: Policies Tagging Policies page', () => {
  test.use(regressionOptions(taggingPoliciesInterceptions));

  test('Page matches screenshots', async ({ policiesTaggingPoliciesPage, policiesTaggingPoliciesCreatePage }) => {
    await policiesTaggingPoliciesPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(policiesTaggingPoliciesPage.main, 'Policies-TaggingPolicies--Container.png', policiesTaggingPoliciesPage.heading);
    });

    await test.step('Create form', async () => {
      await policiesTaggingPoliciesPage.clickAddBtn();
      await policiesTaggingPoliciesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await captureScreenshot(policiesTaggingPoliciesCreatePage.main, 'Policies-TaggingPolicies--CreateForm.png', policiesTaggingPoliciesCreatePage.heading);
    });
  });
});
