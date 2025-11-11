/* eslint-disable playwright/no-conditional-in-test,  playwright/no-conditional-expect */

import { test } from '../fixtures/page.fixture';
import { expect, request } from '@playwright/test';
import { DefaultAnomalyResponse } from '../types/api-response.types';
import { deleteAnomalyPolicy } from '../utils/teardown-utils';
import { AuthRequest } from '../api-requests/auth-request';
import { RestAPIRequest } from '../api-requests/restapi-request';

test.describe('[MPT-14737] Anomalies Tests', { tag: ['@ui', '@anomalies'] }, () => {
  test.use({ restoreSession: true });
  test.describe.configure({ mode: 'default' });

  let anomalyPolicyId: string[] = [];

  test.beforeEach('Navigate to Anomalies page', async ({ anomaliesPage }) => {
    await anomaliesPage.navigateToURL();
  });

  test('[231429] Anomalies page components', async ({ anomaliesPage }) => {
    await expect.soft(anomaliesPage.heading).toHaveText('Anomaly detection');
    await expect.soft(anomaliesPage.addBtn).toBeVisible();
    await expect.soft(anomaliesPage.searchInput).toBeVisible();
    await expect.soft(anomaliesPage.defaultExpenseAnomalyLink).toBeVisible();
    await expect.soft(anomaliesPage.defaultExpenseAnomalyCanvas).toBeVisible();
    await expect
      .soft(anomaliesPage.defaultExpenseAnomalyDescription)
      .toHaveText('Daily expenses must not exceed the average amount for the last 7 days by 30%.');
    await expect.soft(anomaliesPage.defaultResourceCountAnomalyShowResourcesBtn).toBeVisible();
    await expect.soft(anomaliesPage.defaultResourceCountAnomalyLink).toBeVisible();
    await expect.soft(anomaliesPage.defaultResourceCountAnomalyCanvas).toBeVisible();
    await expect
      .soft(anomaliesPage.defaultResourceCountAnomalyDescription)
      .toHaveText('Daily resource count must not exceed the average amount for the last 7 days by 30%.');
    await expect(anomaliesPage.defaultResourceCountAnomalyShowResourcesBtn).toBeVisible();
  });

  test('[231432] Verify navigation of link and show resources button', async ({ anomaliesPage, resourcesPage }) => {
    await anomaliesPage.waitForAllProgressBarsToDisappear();
    await anomaliesPage.clickLocator(anomaliesPage.defaultExpenseAnomalyLink);
    await expect.soft(anomaliesPage.anomalyDetectionPolicyHeading).toHaveText('Anomaly detection policy');
    await expect.soft(anomaliesPage.policyDetailsNameValue).toHaveText('Default - expense anomaly');
    await expect.soft(anomaliesPage.policyDetailsTypeValue).toHaveText('Expenses');
    await expect.soft(anomaliesPage.policyDetailsEvaluationPeriodValue).toHaveText('7 days');
    await expect.soft(anomaliesPage.policyDetailsThresholdValue).toHaveText('30%');

    await anomaliesPage.clickLocator(anomaliesPage.anomalyDetectionBreadcrumb);
    await anomaliesPage.waitForAllProgressBarsToDisappear();
    await anomaliesPage.clickLocator(anomaliesPage.defaultExpenseAnomalyShowResourcesBtn);
    await expect(resourcesPage.heading).toBeVisible();
  });

  test('[231488] API responses matches expected structure for default anomaly detection policies', async ({ anomaliesPage }) => {
    let anomalyData: DefaultAnomalyResponse;
    await test.step('Load expenses data', async () => {
      const [anomalyResponse] = await Promise.all([
        anomaliesPage.page.waitForResponse(
          resp =>
            resp.url().includes('/organization_constraints') &&
            resp.url().includes('type=resource_count_anomaly&type=expense_anomaly') &&
            resp.request().method() === 'GET'
        ),
        anomaliesPage.page.reload(),
      ]);
      anomalyData = await anomalyResponse.json();
    });

    await test.step('Validate API response structure', async () => {
      // Validate that anomalyData is an object with organization_constraints array
      expect.soft(anomalyData).toHaveProperty('organization_constraints');
      expect.soft(Array.isArray(anomalyData.organization_constraints)).toBe(true);
      expect.soft(anomalyData.organization_constraints.length).toBeGreaterThanOrEqual(2);

      // Validate each organization constraint
      for (const constraint of anomalyData.organization_constraints) {
        // Basic structure validation
        expect.soft(typeof constraint.deleted_at).toBe('number');
        expect.soft(typeof constraint.id).toBe('string');
        expect.soft(typeof constraint.created_at).toBe('number');
        expect.soft(typeof constraint.organization_id).toBe('string');
        expect.soft(typeof constraint.name).toBe('string');
        expect.soft(typeof constraint.type).toBe('string');
        expect.soft(typeof constraint.definition).toBe('object');
        expect.soft(typeof constraint.filters).toBe('object');
        expect.soft(typeof constraint.last_run).toBe('number');
        expect.soft(typeof constraint.last_run_result).toBe('object');
        expect.soft(typeof constraint.limit_hits).toBe('object');
        expect.soft(Array.isArray(constraint.limit_hits)).toBe(true);

        // Validate name-type correlation
        if (constraint.name === 'Default - resource count anomaly') {
          expect.soft(constraint.type).toBe('resource_count_anomaly');
        } else if (constraint.name === 'Default - expense anomaly') {
          expect.soft(constraint.type).toBe('expense_anomaly');
        }

        // Validate default definition thresholds
        if (constraint.name.includes('Default')) {
          expect.soft(constraint.definition.threshold_days).toBe(7);
          expect.soft(constraint.definition.threshold).toBe(30);
        }

        // Validate last_run_result structure
        expect.soft(constraint.last_run_result).toHaveProperty('average');
        expect.soft(constraint.last_run_result).toHaveProperty('today');
        expect.soft(typeof constraint.last_run_result.average).toBe('number');
        expect.soft(typeof constraint.last_run_result.today).toBe('number');

        // Validate breakdown keys are consecutive daily timestamps for last 7 days
        const breakdown = constraint.last_run_result.breakdown;
        const breakdownKeys = Object.keys(breakdown)
          .map(Number)
          .sort((a, b) => a - b);

        // Validate we have exactly 7 timestamps
        expect.soft(breakdownKeys).toHaveLength(7);

        // Validate timestamps are consecutive daily intervals (86400 seconds apart)
        for (let i = 0; i < breakdownKeys.length - 1; i++) {
          const dayDifference = breakdownKeys[i + 1] - breakdownKeys[i];
          expect.soft(dayDifference).toBe(86400); // Exactly 24 hours
        }

        // Validate the range spans exactly 6 days (7 total timestamps)
        const oldestTimestamp = breakdownKeys[0];
        const latestTimestamp = breakdownKeys[breakdownKeys.length - 1];
        expect.soft(latestTimestamp - oldestTimestamp).toBe(6 * 86400);

        // Validate timestamps are reasonable (within last 14 days for safety)
        const now = Math.floor(Date.now() / 1000);
        const thirtyDaysAgo = now - 14 * 86400;
        expect.soft(oldestTimestamp).toBeGreaterThan(thirtyDaysAgo);
        expect.soft(latestTimestamp).toBeLessThanOrEqual(now);

        // Validate each breakdown value is a number
        for (const key of breakdownKeys) {
          expect.soft(typeof breakdown[key]).toBe('number');
          expect.soft(breakdown[key]).toBeGreaterThanOrEqual(0);
        }
      }
    });
  });

  test('[231431] Anomalies page search function', async ({ anomaliesPage }) => {
    await anomaliesPage.searchAnomaly('expense');
    await expect.soft(anomaliesPage.defaultExpenseAnomalyLink).toBeVisible();
    await expect.soft(anomaliesPage.defaultResourceCountAnomalyLink).toBeHidden();

    await anomaliesPage.searchAnomaly('resource');
    await expect.soft(anomaliesPage.defaultResourceCountAnomalyLink).toBeVisible();
    await expect.soft(anomaliesPage.defaultExpenseAnomalyLink).toBeHidden();

    await anomaliesPage.searchAnomaly('non-existent anomaly');
    await expect.soft(anomaliesPage.defaultExpenseAnomalyLink).toBeHidden();
    await expect.soft(anomaliesPage.defaultResourceCountAnomalyLink).toBeHidden();

    await anomaliesPage.searchAnomaly('30%');
    await expect.soft(anomaliesPage.defaultExpenseAnomalyLink).toBeVisible();
    await expect.soft(anomaliesPage.defaultResourceCountAnomalyLink).toBeVisible();
  });

  test('[231433] Add a resource count anomaly detection policy', async ({ anomaliesPage, anomaliesCreatePage }) => {
    await anomaliesPage.clickAddBtn();
    const policyName = `E2E Test - Resource Count Anomaly - ${Date.now()}`;

    const policyId = await anomaliesCreatePage.addNewAnomalyPolicy(policyName, 'Resource count', '14', '25');
    anomalyPolicyId.push(policyId);

    await expect.soft(anomaliesPage.policyLinkByName(policyName)).toBeVisible();
    await expect.soft(anomaliesPage.policyDescriptionByName(policyName)).toHaveText('Daily resource count must not exceed the average amount for the last 14 days by 25%.');
    await expect.soft(anomaliesPage.policyFilterByName(policyName)).toHaveText('-');
  });

  test('[231434] Add an expenses anomaly detection policy with filter', async ({ anomaliesPage, anomaliesCreatePage }) => {
    await anomaliesPage.clickAddBtn();
    const policyName = `E2E Test - Expense Anomaly - ${Date.now()}`;

    const policyId = await anomaliesCreatePage.addNewAnomalyPolicy(policyName, 'Expenses', '10', '20', anomaliesCreatePage.suggestionsFilter, 'Assigned to me');
    anomalyPolicyId.push(policyId);

    await expect.soft(anomaliesPage.policyLinkByName(policyName)).toBeVisible();
    await expect.soft(anomaliesPage.policyDescriptionByName(policyName)).toHaveText('Daily expenses must not exceed the average amount for the last 10 days by 20%.');
    await expect.soft(anomaliesPage.policyFilterByName(policyName)).toHaveText(`Owner: ${await anomaliesPage.getUserNameByEnvironment()}`);
  });


  test.afterAll(async ({ }) => {
    if (process.env.CLEAN_UP === 'true') {
      const apiRequestContext = await request.newContext({
        ignoreHTTPSErrors: true,
        baseURL: process.env.BASE_URL,
      });
      const authRequest = new AuthRequest(apiRequestContext);
      const restAPIRequest = new RestAPIRequest(apiRequestContext);
      for (const id of anomalyPolicyId) {
        await deleteAnomalyPolicy(authRequest, restAPIRequest, id);
      }
      await apiRequestContext.dispose();
    }
  });
});
