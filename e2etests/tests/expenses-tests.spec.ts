import { test } from '../fixtures/page.fixture';
import { debugLog } from '../utils/debug-logging';
import { getExpectedDateRangeText, getThisMonthUnixDateRange } from '../utils/date-range-utils';
import { expect } from '@playwright/test';
import { ExpensesResponse } from '../types/api-response.types';
import { InterceptionEntry } from '../types/interceptor.types';
import { ExpensesDefaultResponse } from '../mocks/expenses-page-mocks';
import { comparePdfFiles } from '../utils/pdf-comparison';

test.describe('Expenses Page Tests', { tag: ['@ui', '@expenses'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  const defaultDateRange = getExpectedDateRangeText('this month');
  let dateRangeReset = false;
  const name = 'SoftwareOne (Test Environment)';

  test.beforeEach('Navigate to Expenses Page', async ({ expensesPage, datePicker }) => {
    await expensesPage.navigateToURL();
    await expensesPage.waitForPageLoaderToDisappear();
    await expensesPage.waitForCanvas();
    const dateRange = await datePicker.selectedDateText.textContent();
    debugLog(`Current date range on Expenses Page: ${dateRange}`);

    if (!dateRange.includes(defaultDateRange)) {
      await datePicker.selectThisMonthDateRange();
      dateRangeReset = true;
    }
  });

  test('Verify default Expenses Page layout', async ({ expensesPage }) => {
    await expect(expensesPage.downloadButton).toBeVisible();
    expect(dateRangeReset).toBe(false);
    expect(await expensesPage.evaluateActiveButton(expensesPage.dailyBtn)).toBe(true);
    await expect(expensesPage.seeExpensesBreakdownGrid).toBeVisible();
    await expect(expensesPage.sourceBtn).toBeVisible();
    await expect(expensesPage.poolBtn).toBeVisible();
    await expect(expensesPage.ownerBtn).toBeVisible();
    await expect(expensesPage.geographyBtn).toBeVisible();
  });

  test('Validate API default chart data', async ({ expensesPage }) => {
    const { startDate, endDate } = getThisMonthUnixDateRange();
    let expensesData: ExpensesResponse;

    await test.step('Load expenses data for the this month', async () => {
      const [expensesResponse] = await Promise.all([
        expensesPage.page.waitForResponse(resp => resp.url().includes('/pools_expenses/') && resp.request().method() === 'GET'),
        expensesPage.page.reload(),
      ]);

      expensesData = await expensesResponse.json();
    });

    await test.step('Validate expenses date range and breakdown type', async () => {
      expect.soft(expensesData.expenses.total).toBeGreaterThan(0);
      expect.soft(expensesData.expenses.previous_total).toBeLessThan(startDate);
      expect.soft(expensesData.expenses.name).toBe(name);

      const breakdown = expensesData.expenses.breakdown;
      const breakdownKeys = Object.keys(breakdown)
        .map(Number)
        .sort((a, b) => a - b);

      // Check first key matches startDate
      expect.soft(breakdownKeys[0]).toBe(startDate);

      // Check last key is the last day at midnight (00:00:00 UTC)
      const lastBreakdownKey = breakdownKeys[breakdownKeys.length - 1];
      expect.soft(lastBreakdownKey).toBeLessThanOrEqual(endDate);

      // Check there is a breakdown for each day in the range
      expect.soft(breakdownKeys.length).toBe((lastBreakdownKey - startDate) / 86400 + 1);

      // Check each breakdown value is a number (including 0)
      for (const key of breakdownKeys) {
        expect.soft(typeof breakdown[key]).toBe('number');
      }
    });
  });
});

test.describe('[MPT-] Expenses page mocked tests', { tag: ['@ui', '@expenses'] }, () => {
  test.skip(process.env.USE_LIVE_DEMO === 'true', 'Live demo environment is not supported by these tests');
  test.describe.configure({ mode: 'default' });

  const apiInterceptions: InterceptionEntry[] = [
    {
      url: `/v2/pools_expenses/`,
      mock: ExpensesDefaultResponse,
    },
  ];

  test.use({
    restoreSession: true,
    interceptAPI: { entries: apiInterceptions, forceFailure: false },
  });

  test.beforeEach('Login admin user', async ({ expensesPage }) => {
    await test.step('Login admin user, set time and navigate to Expenses page', async () => {
      await expensesPage.page.clock.setFixedTime(new Date('2025-09-29T14:22:00Z'));
      await expensesPage.navigateToURL();
      await expensesPage.waitForPageLoaderToDisappear();
      await expensesPage.waitForCanvas();
      await expensesPage.clickDailyBtnIfNotSelected();
    });
  });

  test.only('[] Verify service expenses chart download', async ({ expensesPage }) => {
    let actualPath = 'tests/downloads/expenses-page-daily-chart.pdf';
    let expectedPath = 'tests/expected/expected-expenses-page-daily-chart.pdf';
    let diffPath = 'tests/downloads/expenses-page-daily-chart-diff.png';
    let match: boolean;

    await test.step('Download daily chart and compare pdf', async () => {
      await test.step('Download the default chart', async () => {
        await expensesPage.downloadFile(expensesPage.downloadButton, actualPath);
        match = await comparePdfFiles(expectedPath, actualPath, diffPath);
        expect.soft(match).toBe(true);
      });

      await test.step('Download weekly chart and compare', async () => {
        actualPath = 'tests/downloads/expenses-page-weekly-chart.pdf';
        expectedPath = 'tests/expected/expected-expenses-page-weekly-chart.pdf';
        diffPath = 'tests/downloads/expenses-page-weekly-chart-diff.png';

        await expensesPage.clickWeeklyBtn();
        await expensesPage.downloadFile(expensesPage.downloadButton, actualPath);
        match = await comparePdfFiles(expectedPath, actualPath, diffPath);
        expect.soft(match).toBe(true);
      });

      await test.step('Download monthly chart and compare', async () => {
        actualPath = 'tests/downloads/expenses-page-monthly-chart.pdf';
        expectedPath = 'tests/expected/expected-expenses-page-monthly-chart.pdf';
        diffPath = 'tests/downloads/expenses-page-monthly-chart-diff.png';

        await expensesPage.clickMonthlyBtn();
        await expensesPage.downloadFile(expensesPage.downloadButton, actualPath);
        match = await comparePdfFiles(expectedPath, actualPath, diffPath);
        expect.soft(match).toBe(true);
      });
    });
  });
});
