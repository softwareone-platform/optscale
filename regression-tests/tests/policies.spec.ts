import { test } from '@/fixtures/page.fixture';
import { anomaliesInterceptions, policiesInterceptions, taggingPoliciesInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe(() => {
  test.use({ interceptAPI: { entries: anomaliesInterceptions } });

  test('FFC: Policy Anomalies', async ({ policiesAnomaliesPage, policiesAnomaliesCreatePage }) => {
    await policiesAnomaliesPage.navigateToURL();

    await test.step('List page', async () => {
      await policiesAnomaliesPage.waitForCanvas();
      await captureScreenshot(policiesAnomaliesPage.main, 'Policies-Anomalies--Container.png', {
        hoverAnchor: policiesAnomaliesPage.heading,
      });
    });

    await test.step('Create form', async () => {
      await policiesAnomaliesPage.clickAddBtn();
      await policiesAnomaliesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await captureScreenshot(policiesAnomaliesCreatePage.main, 'Policies-Anomalies--CreateForm.png', {
        hoverAnchor: policiesAnomaliesCreatePage.heading,
      });
    });
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: policiesInterceptions } });

  test('FFC: Quota and Budget Policies', async ({ policiesQuotaPage, policiesQuotaCreatePage }) => {
    await policiesQuotaPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(policiesQuotaPage.main, 'Policies-Quota--Container.png', {
        hoverAnchor: policiesQuotaPage.heading,
      });
    });

    await test.step('Create form', async () => {
      await policiesQuotaPage.clickAddBtn();
      await policiesQuotaPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await captureScreenshot(policiesQuotaCreatePage.main, 'Policies-Quota--CreateForm.png', {
        hoverAnchor: policiesQuotaCreatePage.heading,
      });
    });
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: taggingPoliciesInterceptions } });

  test('FFC: Tagging Policies', async ({ policiesTaggingPoliciesPage, policiesTaggingPoliciesCreatePage }) => {
    await policiesTaggingPoliciesPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(policiesTaggingPoliciesPage.main, 'Policies-TaggingPolicies--Container.png', {
        hoverAnchor: policiesTaggingPoliciesPage.heading,
      });
    });

    await test.step('Create form', async () => {
      await policiesTaggingPoliciesPage.clickAddBtn();
      await policiesTaggingPoliciesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await captureScreenshot(policiesTaggingPoliciesCreatePage.main, 'Policies-TaggingPolicies--CreateForm.png', {
        hoverAnchor: policiesTaggingPoliciesCreatePage.heading,
      });
    });
  });
});
