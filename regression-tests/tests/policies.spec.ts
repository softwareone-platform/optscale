import { test } from '@/fixtures/page.fixture';
import { anomaliesInterceptions, policiesInterceptions, taggingPoliciesInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe(() => {
  test.use({ interceptAPI: { entries: anomaliesInterceptions } });

  test('FFC: Policy Anomalies', async ({ anomaliesPage, anomaliesCreatePage }) => {
    await anomaliesPage.navigateToURL();

    await test.step('List page', async () => {
      await anomaliesPage.waitForCanvas();
      await captureScreenshot(anomaliesPage.main, 'Policies-Anomalies--Container.png', {
        hoverAnchor: anomaliesPage.heading,
      });
    });

    await test.step('Create form', async () => {
      await anomaliesPage.clickAddBtn();
      await anomaliesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await captureScreenshot(anomaliesCreatePage.main, 'Policies-Anomalies--CreateForm.png', {
        hoverAnchor: anomaliesCreatePage.heading,
      });
    });
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: policiesInterceptions } });

  test('FFC: Quota and Budget Policies', async ({ policiesPage, policiesCreatePage }) => {
    await policiesPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(policiesPage.main, 'Policies-Quota--Container.png', {
        hoverAnchor: policiesPage.heading,
      });
    });

    await test.step('Create form', async () => {
      await policiesPage.clickAddBtn();
      await policiesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await captureScreenshot(policiesCreatePage.main, 'Policies-Quota--CreateForm.png', {
        hoverAnchor: policiesCreatePage.heading,
      });
    });
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: taggingPoliciesInterceptions } });

  test('FFC: Tagging Policies', async ({ taggingPoliciesPage, taggingPoliciesCreatePage }) => {
    await taggingPoliciesPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(taggingPoliciesPage.main, 'Policies-TaggingPolicies--Container.png', {
        hoverAnchor: taggingPoliciesPage.heading,
      });
    });

    await test.step('Create form', async () => {
      await taggingPoliciesPage.clickAddBtn();
      await taggingPoliciesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await captureScreenshot(taggingPoliciesCreatePage.main, 'Policies-TaggingPolicies--CreateForm.png', {
        hoverAnchor: taggingPoliciesCreatePage.heading,
      });
    });
  });
});
