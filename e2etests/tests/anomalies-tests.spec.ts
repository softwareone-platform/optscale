/* eslint-disable playwright/no-conditional-in-test,  playwright/no-conditional-expect */

import {
  AnomaliesDataSourceExpensesDailyBreakdown,
  AnomaliesDefaultExpenseServiceDailyResponse,
  AnomaliesDefaultExpensesOrganizationLimitsHitResponse,
  AnomaliesOwnerExpensesDailyBreakdown,
  AnomaliesPoolExpensesDailyBreakdown,
  AnomaliesRegionExpensesDailyBreakdown,
  AnomaliesResourceTypeExpensesDailyBreakdown,
} from '../mocks/anomalies-page.mocks';
import { AuthRequest } from '../api-requests/auth-request';
import { DefaultAnomalyResponse } from '../types/api-response.types';
import { InterceptionEntry } from '../types/interceptor.types';
import { RestAPIRequest } from '../api-requests/restapi-request';
import { comparePngImages } from '../utils/image-comparison';
import { debugLog } from '../utils/debug-logging';
import { deleteAnomalyPolicy } from '../utils/teardown-utils';
import { expect, request } from '@playwright/test';
import { test } from '../fixtures/page.fixture';

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

  test(
    '[231488] API responses matches expected structure for default anomaly detection policies',
    { tag: '@p1' },
    async ({ anomaliesPage }) => {
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
        debugLog(JSON.stringify(anomalyData));
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

            const now = Math.floor(Date.now() / 1000);
            expect.soft(latestTimestamp).toBeLessThanOrEqual(now);

            // Validate each breakdown value is a number
            for (const key of breakdownKeys) {
              expect.soft(typeof breakdown[key]).toBe('number');
              expect.soft(breakdown[key]).toBeGreaterThanOrEqual(0);
            }
          }
        }
      });
    }
  );

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

  test('[231433] Add a resource count anomaly detection policy', { tag: '@p1' }, async ({ anomaliesPage, anomaliesCreatePage }) => {
    await anomaliesPage.clickAddBtn();
    const policyName = `E2E Test - Resource Count Anomaly - ${Date.now()}`;

    const policyId = await anomaliesCreatePage.addNewAnomalyPolicy(policyName, 'Resource count', '14', '25');
    anomalyPolicyId.push(policyId);

    await expect.soft(anomaliesPage.policyLinkByName(policyName)).toBeVisible();
    await expect
      .soft(anomaliesPage.policyDescriptionByName(policyName))
      .toHaveText('Daily resource count must not exceed the average amount for the last 14 days by 25%.');
    await expect.soft(anomaliesPage.policyFilterByName(policyName)).toHaveText('-');
  });

  test('[231434] Add an expenses anomaly detection policy with filter', async ({ anomaliesPage, anomaliesCreatePage }) => {
    await anomaliesPage.clickAddBtn();
    const policyName = `E2E Test - Expense Anomaly - ${Date.now()}`;

    const policyId = await anomaliesCreatePage.addNewAnomalyPolicy(
      policyName,
      'Expenses',
      '10',
      '20',
      anomaliesCreatePage.suggestionsFilter,
      'Assigned to me'
    );
    anomalyPolicyId.push(policyId);

    await expect.soft(anomaliesPage.policyLinkByName(policyName)).toBeVisible();
    await expect
      .soft(anomaliesPage.policyDescriptionByName(policyName))
      .toHaveText('Daily expenses must not exceed the average amount for the last 10 days by 20%.');
    await expect.soft(anomaliesPage.policyFilterByName(policyName)).toHaveText(`Owner: ${await anomaliesPage.getUserNameByEnvironment()}`);
  });

  test('[231441] Verify delete policy functions correctly', async ({ anomaliesPage, anomaliesCreatePage }) => {
    await anomaliesPage.clickAddBtn();
    const policyName = `E2E Test - Delete Anomaly Policy - ${Date.now()}`;

    await anomaliesCreatePage.addNewAnomalyPolicy(policyName, 'Expenses', '5', '15');
    await anomaliesPage.policyLinkByName(policyName).waitFor();
    await anomaliesPage.deleteAnomalyPolicy(policyName);

    await expect.soft(anomaliesPage.policyLinkByName(policyName)).toBeHidden();
  });

  test.afterAll(async ({}) => {
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

test.describe('[MPT-14737] Mocked Anomalies Tests', { tag: ['@ui', '@anomalies'] }, () => {
  const apiInterceptions: InterceptionEntry[] = [
    {
      gql: 'GetExpensesDailyBreakdown',
      variableMatch: { 'params.breakdown_by': 'service_name' },
      mock: AnomaliesDefaultExpenseServiceDailyResponse,
    },
    {
      gql: 'GetExpensesDailyBreakdown',
      variableMatch: { 'params.breakdown_by': 'region' },
      mock: AnomaliesRegionExpensesDailyBreakdown,
    },
    {
      gql: 'GetExpensesDailyBreakdown',
      variableMatch: { 'params.breakdown_by': 'resource_type' },
      mock: AnomaliesResourceTypeExpensesDailyBreakdown,
    },
    {
      gql: 'GetExpensesDailyBreakdown',
      variableMatch: { 'params.breakdown_by': 'employee_id' },
      mock: AnomaliesOwnerExpensesDailyBreakdown,
    },
    {
      gql: 'GetExpensesDailyBreakdown',
      variableMatch: { 'params.breakdown_by': 'cloud_account_id' },
      mock: AnomaliesDataSourceExpensesDailyBreakdown,
    },
    {
      gql: 'GetExpensesDailyBreakdown',
      variableMatch: { 'params.breakdown_by': 'pool_id' },
      mock: AnomaliesPoolExpensesDailyBreakdown,
    },
    {
      gql: 'GetOrganizationLimitHits',
      mock: AnomaliesDefaultExpensesOrganizationLimitsHitResponse,
    },
  ];

  test.use({
    restoreSession: true,
    interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: false },
  });

  test('[231435] Verify Chart export for each category by comparing downloaded png', async ({ anomaliesPage }) => {
    test.fixme(process.env.CI === '1', 'Tests do not work in CI. It appears that the png comparison is unsupported on linux');
    let actualPath = 'tests/downloads/anomaly-expenses-region-daily-chart-export.png';
    let expectedPath = 'tests/expected/expected-anomaly-expenses-region-daily-chart-export.png';
    let diffPath = 'tests/downloads/diff-anomaly-expenses-region-daily-chart-export.png';
    let match: boolean;

    await anomaliesPage.page.clock.setFixedTime(new Date('2025-11-13T12:45:00Z'));
    await anomaliesPage.navigateToURL();

    await test.step('Category: Region', async () => {
      await anomaliesPage.clickLocator(anomaliesPage.defaultExpenseAnomalyLink);
      await anomaliesPage.waitForAllProgressBarsToDisappear();
      await anomaliesPage.waitForCanvas();
      await anomaliesPage.selectCategorizeBy('Region');

      await anomaliesPage.downloadFile(anomaliesPage.exportChartBtn, actualPath);
      match = await comparePngImages(expectedPath, actualPath, diffPath);
      expect.soft(match).toBe(true);
    });

    await test.step('Category: Resource type', async () => {
      actualPath = 'tests/downloads/anomaly-expenses-resource-type-daily-chart-export.png';
      expectedPath = 'tests/expected/expected-anomaly-expenses-resource-type-daily-chart-export.png';
      diffPath = 'tests/downloads/diff-anomaly-expenses-resource-type-daily-chart-export.png';

      await anomaliesPage.selectCategorizeBy('Resource type');
      await anomaliesPage.downloadFile(anomaliesPage.exportChartBtn, actualPath);
      match = await comparePngImages(expectedPath, actualPath, diffPath);
      expect.soft(match).toBe(true);
    });

    await test.step('Category: Data source', async () => {
      actualPath = 'tests/downloads/anomaly-expenses-data-source-daily-chart-export.png';
      expectedPath = 'tests/expected/expected-anomaly-expenses-data-source-daily-chart-export.png';
      diffPath = 'tests/downloads/diff-anomaly-expenses-data-source-daily-chart-export.png';

      await anomaliesPage.selectCategorizeBy('Data source');
      await anomaliesPage.downloadFile(anomaliesPage.exportChartBtn, actualPath);
      match = await comparePngImages(expectedPath, actualPath, diffPath);
      expect.soft(match).toBe(true);
    });

    await test.step('Category: Owner', async () => {
      actualPath = 'tests/downloads/anomaly-expenses-owner-daily-chart-export.png';
      expectedPath = 'tests/expected/expected-anomaly-expenses-owner-daily-chart-export.png';
      diffPath = 'tests/downloads/diff-anomaly-expenses-owner-daily-chart-export.png';

      await anomaliesPage.selectCategorizeBy('Owner');
      await anomaliesPage.downloadFile(anomaliesPage.exportChartBtn, actualPath);
      match = await comparePngImages(expectedPath, actualPath, diffPath);
      expect.soft(match).toBe(true);
    });

    await test.step('Category: Pool', async () => {
      actualPath = 'tests/downloads/anomaly-expenses-pool-daily-chart-export.png';
      expectedPath = 'tests/expected/expected-anomaly-expenses-pool-daily-chart-export.png';
      diffPath = 'tests/downloads/diff-anomaly-expenses-pool-daily-chart-export.png';

      await anomaliesPage.selectCategorizeBy('Pool');
      await anomaliesPage.downloadFile(anomaliesPage.exportChartBtn, actualPath);
      match = await comparePngImages(expectedPath, actualPath, diffPath);
      expect.soft(match).toBe(true);
    });
  });

  test('[231436] Verify Chart export for each expenses option by comparing downloaded png', async ({ anomaliesPage }) => {
    test.fixme(process.env.CI === '1', 'Tests do not work in CI. It appears that the png comparison is unsupported on linux');
    let actualPath = 'tests/downloads/anomaly-expenses-service-daily-chart-export.png';
    let expectedPath = 'tests/expected/expected-anomaly-expenses-service-daily-chart-export.png';
    let diffPath = 'tests/downloads/diff-anomaly-expenses-service-daily-chart-export.png';
    let match: boolean;

    await anomaliesPage.page.clock.setFixedTime(new Date('2025-11-11T14:11:00Z'));
    await anomaliesPage.navigateToURL();

    await anomaliesPage.clickLocator(anomaliesPage.defaultExpenseAnomalyLink);
    await anomaliesPage.waitForAllProgressBarsToDisappear();
    await anomaliesPage.waitForCanvas();
    await anomaliesPage.downloadFile(anomaliesPage.exportChartBtn, actualPath);
    match = await comparePngImages(expectedPath, actualPath, diffPath);
    expect.soft(match).toBe(true);

    actualPath = 'tests/downloads/anomaly-expenses-service-daily-chart-no-legend-export.png';
    expectedPath = 'tests/expected/expected-anomaly-expenses-service-daily-chart-no-legend-export.png';
    diffPath = 'tests/downloads/diff-anomaly-expenses-service-daily-chart-no-legend-export.png';

    await anomaliesPage.clickShowLegend();
    await anomaliesPage.downloadFile(anomaliesPage.exportChartBtn, actualPath);
    match = await comparePngImages(expectedPath, actualPath, diffPath);
    expect.soft(match).toBe(true);

    actualPath = 'tests/downloads/anomaly-expenses-service-weekly-chart-export.png';
    expectedPath = 'tests/expected/expected-anomaly-expenses-service-weekly-chart-export.png';
    diffPath = 'tests/downloads/diff-anomaly-expenses-service-weekly-chart-export.png';

    await anomaliesPage.clickShowLegend();
    await anomaliesPage.selectExpenses('Weekly');
    await anomaliesPage.downloadFile(anomaliesPage.exportChartBtn, actualPath);
    match = await comparePngImages(expectedPath, actualPath, diffPath);
    expect.soft(match).toBe(true);

    actualPath = 'tests/downloads/anomaly-expenses-service-monthly-chart-export.png';
    expectedPath = 'tests/expected/expected-anomaly-expenses-service-monthly-chart-export.png';
    diffPath = 'tests/downloads/diff-anomaly-expenses-service-monthly-chart-export.png';

    await anomaliesPage.selectExpenses('Monthly');
    await anomaliesPage.downloadFile(anomaliesPage.exportChartBtn, actualPath);
    match = await comparePngImages(expectedPath, actualPath, diffPath);
    expect.soft(match).toBe(true);
  });

  test('[231439] Verify detected anomalies are displayed in the table correctly', async ({ anomaliesPage }) => {
    await anomaliesPage.page.clock.setFixedTime(new Date('2025-11-11T14:11:00Z'));
    await anomaliesPage.navigateToURL();

    await anomaliesPage.clickLocator(anomaliesPage.defaultExpenseAnomalyLink);
    await anomaliesPage.waitForAllProgressBarsToDisappear();

    expect.soft(await anomaliesPage.getViolatedAtTextByIndex(1)).toBe('10/12/2025 08:55 PM');
    expect.soft(await anomaliesPage.getAverageActualExpensesByIndex(1)).toBe('$14,358.9 ⟶ $48,409.6 (237%)');

    expect.soft(await anomaliesPage.getViolatedAtTextByIndex(2)).toBe('09/12/2025 06:35 PM');
    expect.soft(await anomaliesPage.getAverageActualExpensesByIndex(2)).toBe('$13,649.7 ⟶ $47,918.1 (251%)');

    expect.soft(await anomaliesPage.getViolatedAtTextByIndex(3)).toBe('08/12/2025 09:30 PM');
    expect.soft(await anomaliesPage.getAverageActualExpensesByIndex(3)).toBe('$13,184.3 ⟶ $25,579.3 (94%)');

    expect.soft(await anomaliesPage.getViolatedAtTextByIndex(4)).toBe('06/12/2025 09:20 PM');
    expect.soft(await anomaliesPage.getAverageActualExpensesByIndex(4)).toBe('$10,737 ⟶ $43,279.5 (303%)');
  });

  test('[231440] Verify detected anomalies are resource button navigate correctly', async ({ anomaliesPage, resourcesPage }) => {
    await anomaliesPage.page.clock.setFixedTime(new Date('2025-11-11T14:11:00Z'));
    await anomaliesPage.navigateToURL();

    await anomaliesPage.clickLocator(anomaliesPage.defaultExpenseAnomalyLink);
    await anomaliesPage.waitForAllProgressBarsToDisappear();

    await anomaliesPage.clickLocator(anomaliesPage.showResourcesBtn.first());
    await expect(resourcesPage.heading).toBeVisible();
  });
});

