import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { anomaliesInterceptions, policiesInterceptions, taggingPoliciesInterceptions } from "../mocks/policies.mocks";

test.describe('FFC: Policy Anomalies page', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: anomaliesInterceptions } });

  test('Page matches screenshots', async ({ policiesAnomaliesPage, policiesAnomaliesCreatePage }) => {
    await test.step('Navigate to Policy Anomalies page', async () => {
      await policiesAnomaliesPage.navigateToURL();
    });

    await test.step('Policy Anomalies list page', async () => {
      await policiesAnomaliesPage.heading.hover();
      await policiesAnomaliesPage.waitForCanvas();
      await roundElementDimensions(policiesAnomaliesPage.main);
      await expect(policiesAnomaliesPage.main).toHaveScreenshot('Policies-Anomalies-Container.png');
    });

    await test.step('Policy Anomaly Create form', async () => {
      await policiesAnomaliesPage.clickAddBtn();
      await policiesAnomaliesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await policiesAnomaliesCreatePage.heading.hover();
      await roundElementDimensions(policiesAnomaliesCreatePage.main);
      await expect(policiesAnomaliesCreatePage.main).toHaveScreenshot('Policies-Anomalies-CreateForm.png');
    });
  });
});


test.describe('FFC: Policies Quota and Budget page', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: policiesInterceptions } });

  test('Page matches screenshots', async ({ policiesQuotaPage, policiesQuotaCreatePage }) => {
    await test.step('Navigate to Policies page', async () => {
      await policiesQuotaPage.navigateToURL();
    });

    await test.step('Policies Quota and  budget list page', async () => {
      await policiesQuotaPage.heading.hover();
      await roundElementDimensions(policiesQuotaPage.main);
      await expect(policiesQuotaPage.main).toHaveScreenshot('Policies-Quota-Container.png');
    });

    await test.step('Policies Quota and  budget Create policy form', async () => {
      await policiesQuotaPage.clickAddBtn();
      await policiesQuotaPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await policiesQuotaCreatePage.heading.hover();
      await roundElementDimensions(policiesQuotaCreatePage.main);
      await expect(policiesQuotaCreatePage.main).toHaveScreenshot('Policies-Quota-CreateForm.png');
    });
  });
});

test.describe('FFC: Policies Tagging Policies  page', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: taggingPoliciesInterceptions } });

  test('Page matches screenshots', async ({ policiesTaggingPoliciesPage, policiesTaggingPoliciesCreatePage }) => {
    await test.step('Navigate to Tagging Policies page', async () => {
      await policiesTaggingPoliciesPage.navigateToURL();
    });

    await test.step('Tagging policies list page', async () => {
      await policiesTaggingPoliciesPage.heading.hover();
      await roundElementDimensions(policiesTaggingPoliciesPage.main);
      await expect(policiesTaggingPoliciesPage.main).toHaveScreenshot('Policies-TaggingPolicies-Container.png');
    });

    await test.step('Create tagging policy form', async () => {
      await policiesTaggingPoliciesPage.clickAddBtn();
      await policiesTaggingPoliciesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await policiesTaggingPoliciesCreatePage.heading.hover();
      await roundElementDimensions(policiesTaggingPoliciesCreatePage.main);
      await expect(policiesTaggingPoliciesCreatePage.main).toHaveScreenshot('Policies-TaggingPolicies-CreateForm.png');
    });
  });
});
