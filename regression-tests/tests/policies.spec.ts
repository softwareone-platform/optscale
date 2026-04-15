import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { anomaliesInterceptions, policiesInterceptions, taggingPoliciesInterceptions } from "../mocks/policies-interceptions.mocks";

test.describe('FFC: Anomalies page', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: anomaliesInterceptions, failOnInterceptionMissing: true } });

  test('Page matches screenshots', async ({ anomaliesPage, anomaliesCreatePage }) => {
    await test.step('Navigate to Anomalies page', async () => {
      await anomaliesPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await anomaliesPage.heading.hover();
      await anomaliesPage.waitForCanvas();
      await roundElementDimensions(anomaliesPage.main);
      await expect(anomaliesPage.main).toHaveScreenshot('Anomalies-screenshot.png');
    });

    await test.step('Page content 1', async () => {
      await anomaliesPage.clickAddBtn();
      await anomaliesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await anomaliesCreatePage.heading.hover();
      await roundElementDimensions(anomaliesCreatePage.main);
      await expect(anomaliesCreatePage.main).toHaveScreenshot('Anomalies-create-screenshot.png');
    });
  });
});


test.describe('FFC: Policies page', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: policiesInterceptions } });

  test('Page matches screenshots', async ({ policiesPage, policiesCreatePage }) => {
    await test.step('Navigate to Policies page', async () => {
      await policiesPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await policiesPage.heading.hover();
      await roundElementDimensions(policiesPage.main);
      await expect(policiesPage.main).toHaveScreenshot('Policies-screenshot.png');
    });

    await test.step('Page content 1', async () => {
      await policiesPage.clickAddBtn();
      await policiesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await policiesCreatePage.heading.hover();
      await roundElementDimensions(policiesCreatePage.main);
      await expect(policiesCreatePage.main).toHaveScreenshot('Policies-create-screenshot.png');
    });
  });
});

test.describe('FFC: Tagging Policies page', () => {

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: taggingPoliciesInterceptions } });

  test('Page matches screenshots', async ({ taggingPoliciesPage, taggingPoliciesCreatePage }) => {
    await test.step('Navigate to Tagging Policies page', async () => {
      await taggingPoliciesPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await taggingPoliciesPage.heading.hover();
      await roundElementDimensions(taggingPoliciesPage.main);
      await expect(taggingPoliciesPage.main).toHaveScreenshot('TaggingPolicies-screenshot.png');
    });

    await test.step('Page content', async () => {
      await taggingPoliciesPage.clickAddBtn();
      await taggingPoliciesPage.getByAnyTestId('btn_suggestion_filter').waitFor({ state: 'visible', timeout: 40000 });
      await taggingPoliciesCreatePage.heading.hover();
      await roundElementDimensions(taggingPoliciesCreatePage.main);
      await expect(taggingPoliciesCreatePage.main).toHaveScreenshot('TaggingPolicies-create-screenshot.png');
    });
  });
});
