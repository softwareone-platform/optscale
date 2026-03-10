/* eslint-disable playwright/no-conditional-in-test,  playwright/no-conditional-expect */
import { test } from '../fixtures/page.fixture';
import { debugLog } from '../utils/debug-logging';
import { getExpectedDateRangeText, getThisMonthUnixDateRange } from '../utils/date-range-utils';
import { expect } from '@playwright/test';
import {
  ExpensesFilterByDataSourceResponse,
  ExpensesFilterByEmployeeResponse,
  ExpensesFilterByPoolResponse,
  ExpensesResponse,
} from '../types/api-response.types';
import { InterceptionEntry } from '../types/interceptor.types';
import { ExpensesDefaultResponse } from '../mocks/expenses-page-mocks';
import { comparePdfFiles } from '../utils/pdf-comparison';
import { isWithinRoundingDrift } from '../utils/custom-assertions';
import { getEnvironmentTestOrgName } from '../utils/environment-util';
import path from 'path';

test.describe('[MPT-12859] Expenses Page default view Tests', { tag: ['@ui', '@expenses'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  const defaultDateRange = getExpectedDateRangeText('this month');
  let dateRangeReset = false;
  const name = getEnvironmentTestOrgName();

  test.beforeEach('Navigate to Expenses Page', async ({ expensesPage, datePicker }) => {
    await expensesPage.navigateToURL();
    await expensesPage.waitForAllProgressBarsToDisappear();
    await expensesPage.waitForCanvas();
    const dateRange = await datePicker.selectedDateText.textContent();
    debugLog(`Current date range on Expenses Page: ${dateRange}`);

    if (!dateRange.includes(defaultDateRange)) {
      await datePicker.selectThisMonthDateRange();
      dateRangeReset = true;
    }
  });

  test('[231181] Verify default Expenses Page layout', async ({ expensesPage }) => {
    await expect(expensesPage.downloadButton).toBeVisible();
    expect(dateRangeReset).toBe(false);
    expect(await expensesPage.evaluateActiveButton(expensesPage.dailyBtn)).toBe(true);
    await expect(expensesPage.seeExpensesBreakdownGrid).toBeVisible();
    await expect(expensesPage.sourceBtn).toBeVisible();
    await expect(expensesPage.poolBtn).toBeVisible();
    await expect(expensesPage.ownerBtn).toBeVisible();
    await expect(expensesPage.geographyBtn).toBeVisible();
  });

  test('Validate API default chart data', { tag: '@p1' }, async ({ expensesPage }) => {
    const { startDate, endDate } = getThisMonthUnixDateRange();
    let expensesData: ExpensesResponse;

    await test.step('Load expenses data for the this month', async () => {
      const [expensesResponse] = await Promise.all([
        expensesPage.page.waitForResponse(resp => resp.url().includes('/pools_expenses/') && resp.request().method() === 'GET'),
        expensesPage.page.reload(),
      ]);

      expensesData = await expensesResponse.json();
    });

    await test.step('[231182] Validate expenses date range and breakdown type', async () => {
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

  test('[231212] Breakdown by Geography button navigates to Cost map page', async ({ expensesPage, expensesMapPage }) => {
    await expensesPage.geographyBtn.click();
    await expect(expensesMapPage.heading).toBeVisible();
  });
});

test.describe('[MPT-12859] Expenses page default view mocked tests', { tag: ['@ui', '@expenses'] }, () => {
  test.fixme(process.env.CI === '1', 'Tests do not work in CI. It appears that the png comparison is unsupported on linux');
  test.describe.configure({ mode: 'default' });

  const apiInterceptions: InterceptionEntry[] = [
    {
      url: `/v2/pools_expenses/`,
      mock: ExpensesDefaultResponse,
    },
  ];

  test.use({
    restoreSession: true,
    interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: false },
  });

  test.beforeEach('Login admin user', async ({ expensesPage }) => {
    await test.step('Login admin user, set time and navigate to Expenses page', async () => {
      await expensesPage.page.clock.setFixedTime(new Date('2025-09-29T14:22:00Z'));
      await expensesPage.navigateToURL();
      await expensesPage.waitForAllProgressBarsToDisappear();
      await expensesPage.waitForCanvas();
      await expensesPage.clickDailyBtnIfNotSelected();
    });
  });
  test('[231183] Verify expenses chart download', { tag: '@p1' }, async ({ expensesPage }) => {
    let actualPath = path.resolve('tests', 'downloads', 'expenses-page-daily-chart.pdf');
    let expectedPath = path.resolve('tests', 'expected', 'expected-expenses-page-daily-chart.pdf');
    let diffPath = path.resolve('tests', 'downloads', 'expenses-page-daily-chart-diff.png');
    let match: boolean;

    await test.step('Download the default chart', async () => {
      await expensesPage.downloadFile(expensesPage.downloadButton, actualPath);
      match = await comparePdfFiles(expectedPath, actualPath, diffPath);
      expect.soft(match).toBe(true);
    });

    await test.step('Download weekly chart and compare', async () => {
      actualPath = path.resolve('tests', 'downloads', 'expenses-page-weekly-chart.pdf');
      expectedPath = path.resolve('tests', 'expected', 'expected-expenses-page-weekly-chart.pdf');
      diffPath = path.resolve('tests', 'downloads', 'expenses-page-weekly-chart-diff.png');

      await expensesPage.clickWeeklyBtn();
      await expensesPage.downloadFile(expensesPage.downloadButton, actualPath);
      match = await comparePdfFiles(expectedPath, actualPath, diffPath);
      expect.soft(match).toBe(true);
    });

    await test.step('Download monthly chart and compare', async () => {
      actualPath = path.resolve('tests', 'downloads', 'expenses-page-monthly-chart.pdf');
      expectedPath = path.resolve('tests', 'expected', 'expected-expenses-page-monthly-chart.pdf');
      diffPath = path.resolve('tests', 'downloads', 'expenses-page-monthly-chart-diff.png');

      await expensesPage.clickMonthlyBtn();
      await expensesPage.downloadFile(expensesPage.downloadButton, actualPath);
      match = await comparePdfFiles(expectedPath, actualPath, diffPath);
      expect.soft(match).toBe(true);
    });
  });
});
test.describe('[MPT-12859] Expenses Page Source Breakdown Tests', { tag: ['@ui', '@expenses'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  const defaultDateRange = getExpectedDateRangeText('this month');
  const name = getEnvironmentTestOrgName();

  test.beforeEach('Navigate to Expenses Page', async ({ expensesPage, datePicker }) => {
    await expensesPage.navigateToURL();
    await expensesPage.waitForAllProgressBarsToDisappear();
    await expensesPage.waitForCanvas();
    const dateRange = await datePicker.selectedDateText.textContent();
    debugLog(`Current date range on Expenses Page: ${dateRange}`);

    await expensesPage.clickSourceBtn();
    await expensesPage.waitForAllProgressBarsToDisappear();
    await expensesPage.waitForCanvas();
  });

  test('[231214] Verify Expenses Page Source Breakdown layout', async ({ expensesPage, datePicker }) => {
    await test.step('Verify Expenses Page Source Breakdown elements', async () => {
      await expect(expensesPage.downloadButton).toBeHidden();
      await expect(expensesPage.seeExpensesBreakdownGrid).toBeHidden();
      await expect(expensesPage.dataSourceHeading).toBeVisible();
      const dateRange = await datePicker.selectedDateText.textContent();
      expect(dateRange.includes(defaultDateRange)).toBe(true);
      await expect(expensesPage.expensesPieChartDiv).toBeVisible();
      await expect(expensesPage.tableHeadingDatasource).toBeVisible();
    });

    await test.step('Click Cost Explorer breadcrumb and verify navigation', async () => {
      await expensesPage.clickCostExploreBreadcrumb();
      await expect(expensesPage.downloadButton).toBeVisible();
    });
  });

  test('[231215] Validate API Source Breakdown chart data', async ({ expensesPage }) => {
    const { startDate, endDate } = getThisMonthUnixDateRange();
    let expensesData: ExpensesFilterByDataSourceResponse;

    await test.step('Load expenses data', async () => {
      const [expensesResponse] = await Promise.all([
        expensesPage.page.waitForResponse(
          resp => resp.url().includes('/pools_expenses/') && resp.url().includes('filter_by=cloud') && resp.request().method() === 'GET'
        ),
        expensesPage.page.reload(),
      ]);

      expensesData = await expensesResponse.json();
    });

    await test.step('Validate data source expenses date range and breakdown type', async () => {
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

      // Check each breakdown value conforms to DataSourceExpense[] interface
      for (const key of breakdownKeys) {
        const breakdownValue = breakdown[key];
        expect.soft(Array.isArray(breakdownValue)).toBe(true);

        if (Array.isArray(breakdownValue)) {
          for (const dataSource of breakdownValue) {
            expect.soft(typeof dataSource.id).toBe('string');
            expect.soft(typeof dataSource.name).toBe('string');
            expect.soft(typeof dataSource.type).toBe('string');
            expect.soft(typeof dataSource.expense).toBe('number');
            expect.soft(dataSource.expense).toBeGreaterThanOrEqual(0);
          }
        }
      }
      // Check each cloud total conforms to CloudTotals interface
      for (const cloudTotal of expensesData.expenses.cloud) {
        expect.soft(typeof cloudTotal.id).toBe('string');
        expect.soft(typeof cloudTotal.name).toBe('string');
        expect.soft(typeof cloudTotal.type).toBe('string');
        expect.soft(typeof cloudTotal.total).toBe('number');
        expect.soft(cloudTotal.total).toBeGreaterThanOrEqual(0);
        expect.soft(typeof cloudTotal.previous_total).toBe('number');
        expect.soft(cloudTotal.previous_total).toBeGreaterThanOrEqual(0);
      }
    });
  });

  test(
    '[231216] Verify data source expenses total for(default) period matches chart and table totals',
    { tag: '@p1' },
    async ({ expensesPage }) => {
      const totalForPeriod = await expensesPage.getTotalExpensesForSelectedPeriod();
      debugLog(`Total expenses for selected period: ${totalForPeriod}`);
      const chartTotal = await expensesPage.getExpensesPieChartValue();
      debugLog(`Total expenses from pie chart: ${chartTotal}`);
      const tableTotal = await expensesPage.getTableItemisedExpensesValue();
      debugLog(`Total expenses from itemised table: ${tableTotal}`);

      await test.step('Compare total expenses values', async () => {
        expect.soft(chartTotal).toBe(totalForPeriod);
        expect(isWithinRoundingDrift(tableTotal, totalForPeriod, 0.01)).toBe(true);
      });
    }
  );

  test('[231217] Verify data source expenses total for (last month) period matches chart and table totals', async ({
    expensesPage,
    datePicker,
  }) => {
    await datePicker.selectLastMonthDateRange();
    const expectedDateRange = getExpectedDateRangeText('last month');
    debugLog(`Selected date range: ${expectedDateRange}`);
    const totalForPeriod = await expensesPage.getTotalExpensesForSelectedPeriod();
    debugLog(`Total expenses for selected period: ${totalForPeriod}`);
    const chartTotal = await expensesPage.getExpensesPieChartValue();
    debugLog(`Total expenses from pie chart: ${chartTotal}`);
    const tableTotal = await expensesPage.getTableItemisedExpensesValue();
    debugLog(`Total expenses from itemised table: ${tableTotal}`);

    await test.step('Compare total expenses values', async () => {
      const dateRange = await datePicker.selectedDateText.textContent();
      debugLog(`Actual date range: ${dateRange}`);
      expect.soft(dateRange.includes(expectedDateRange)).toBe(true);
      expect.soft(isWithinRoundingDrift(chartTotal, totalForPeriod, 0.001)).toBe(true);
      expect.soft(isWithinRoundingDrift(tableTotal, totalForPeriod, 0.001)).toBe(true);
    });
  });
});

test.describe('[MPT-12859] Expenses Page Pool Breakdown Tests', { tag: ['@ui', '@expenses'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  const defaultDateRange = getExpectedDateRangeText('this month');
  const name = getEnvironmentTestOrgName();

  test.beforeEach('Navigate to Expenses Page', async ({ expensesPage, datePicker }) => {
    await expensesPage.navigateToURL();
    await expensesPage.waitForAllProgressBarsToDisappear();
    await expensesPage.waitForCanvas();
    const dateRange = await datePicker.selectedDateText.textContent();
    debugLog(`Current date range on Expenses Page: ${dateRange}`);

    await expensesPage.clickPoolBtn();
    await expensesPage.waitForAllProgressBarsToDisappear();
    await expensesPage.waitForCanvas();
  });

  test('[231218] Verify Expenses Page Pool Breakdown layout', async ({ expensesPage, datePicker }) => {
    await test.step('Verify Expenses Page Pool Breakdown elements', async () => {
      await expect(expensesPage.downloadButton).toBeHidden();
      await expect(expensesPage.seeExpensesBreakdownGrid).toBeHidden();
      await expect(expensesPage.poolHeading).toBeVisible();
      const dateRange = await datePicker.selectedDateText.textContent();
      expect(dateRange.includes(defaultDateRange)).toBe(true);
      await expect(expensesPage.expensesPieChartDiv).toBeVisible();
      await expect(expensesPage.tableHeadingPool).toBeVisible();
    });

    await test.step('Click Cost Explorer breadcrumb and verify navigation', async () => {
      await expensesPage.clickCostExploreBreadcrumb();
      await expect(expensesPage.downloadButton).toBeVisible();
    });
  });

  test('[231219] Validate API Pool Breakdown chart data', { tag: '@p1' }, async ({ expensesPage }) => {
    const { startDate, endDate } = getThisMonthUnixDateRange();
    let expensesData: ExpensesFilterByPoolResponse;

    await test.step('Load expenses data', async () => {
      const [expensesResponse] = await Promise.all([
        expensesPage.page.waitForResponse(
          resp => resp.url().includes('/pools_expenses/') && resp.url().includes('filter_by=pool') && resp.request().method() === 'GET'
        ),
        expensesPage.page.reload(),
      ]);
      expensesData = await expensesResponse.json();
    });

    await test.step('Validate expenses date range and pool breakdown type', async () => {
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

      // Check each breakdown value conforms to DataSourceExpense[] interface
      for (const key of breakdownKeys) {
        const breakdownValue = breakdown[key];
        expect.soft(Array.isArray(breakdownValue)).toBe(true);

        if (Array.isArray(breakdownValue)) {
          for (const pool of breakdownValue) {
            expect.soft(typeof pool.id).toBe('string');
            expect.soft(typeof pool.name).toBe('string');
            expect.soft(typeof pool.purpose).toBe('string');
            expect.soft(typeof pool.expense).toBe('number');
            expect.soft(pool.expense).toBeGreaterThanOrEqual(0);
          }
        }
      }
    });
  });

  test('[231220] Verify pool expenses total for(default) period matches chart and table totals', async ({ expensesPage }) => {
    const totalForPeriod = await expensesPage.getTotalExpensesForSelectedPeriod();
    debugLog(`Total expenses for selected period: ${totalForPeriod}`);
    const chartTotal = await expensesPage.getExpensesPieChartValue();
    debugLog(`Total expenses from pie chart: ${chartTotal}`);
    const tableTotal = await expensesPage.getTableItemisedExpensesValue();
    debugLog(`Total expenses from itemised table: ${tableTotal}`);

    await test.step('Compare total expenses values', async () => {
      expect.soft(chartTotal).toBe(totalForPeriod);
      expect(isWithinRoundingDrift(tableTotal, totalForPeriod, 0.01)).toBe(true);
    });
  });

  test('[231221] Verify pool expenses total for (last 7 days) period matches chart and table totals', async ({
    expensesPage,
    datePicker,
  }) => {
    await datePicker.selectLast7DaysDateRange();
    const expectedDateRange = getExpectedDateRangeText('last 7 days');
    debugLog(`Selected date range: ${expectedDateRange}`);
    const totalForPeriod = await expensesPage.getTotalExpensesForSelectedPeriod();
    debugLog(`Total expenses for selected period: ${totalForPeriod}`);
    const chartTotal = await expensesPage.getExpensesPieChartValue();
    debugLog(`Total expenses from pie chart: ${chartTotal}`);
    const tableTotal = await expensesPage.getTableItemisedExpensesValue();
    debugLog(`Total expenses from itemised table: ${tableTotal}`);

    await test.step('Compare total expenses values', async () => {
      const dateRange = await datePicker.selectedDateText.textContent();
      expect(dateRange.includes(expectedDateRange)).toBe(true);
      expect.soft(chartTotal).toBe(totalForPeriod);
      expect(isWithinRoundingDrift(tableTotal, totalForPeriod, 0.01)).toBe(true);
    });
  });
});

test.describe('[MPT-12859] Expenses Page Owner Breakdown Tests', { tag: ['@ui', '@expenses'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  const defaultDateRange = getExpectedDateRangeText('this month');
  const name = getEnvironmentTestOrgName();

  test.beforeEach('Navigate to Expenses Page', async ({ expensesPage, datePicker }) => {
    await expensesPage.navigateToURL();
    await expensesPage.waitForAllProgressBarsToDisappear();
    await expensesPage.waitForCanvas();
    const dateRange = await datePicker.selectedDateText.textContent();
    debugLog(`Current date range on Expenses Page: ${dateRange}`);

    await expensesPage.clickOwnerBtn();
    await expensesPage.waitForAllProgressBarsToDisappear();
    await expensesPage.waitForCanvas();
  });

  test('[231222] Verify Expenses Page Owner Breakdown layout', async ({ expensesPage, datePicker }) => {
    await test.step('Verify Expenses Page Owner Breakdown elements', async () => {
      await expect(expensesPage.downloadButton).toBeHidden();
      await expect(expensesPage.seeExpensesBreakdownGrid).toBeHidden();
      await expect(expensesPage.ownerHeading).toBeVisible();
      const dateRange = await datePicker.selectedDateText.textContent();
      expect(dateRange.includes(defaultDateRange)).toBe(true);
      await expect(expensesPage.expensesPieChartDiv).toBeVisible();
      await expect(expensesPage.tableHeadingOwner).toBeVisible();
    });

    await test.step('Click Cost Explorer breadcrumb and verify navigation', async () => {
      await expensesPage.clickCostExploreBreadcrumb();
      await expect(expensesPage.downloadButton).toBeVisible();
    });
  });

  test('[231223] Validate API Owner Breakdown chart data', async ({ expensesPage }) => {
    const { startDate, endDate } = getThisMonthUnixDateRange();
    let expensesData: ExpensesFilterByEmployeeResponse;

    await test.step('Load expenses data', async () => {
      const [expensesResponse] = await Promise.all([
        expensesPage.page.waitForResponse(
          resp => resp.url().includes('/pools_expenses/') && resp.url().includes('filter_by=employee') && resp.request().method() === 'GET'
        ),
        expensesPage.page.reload(),
      ]);
      expensesData = await expensesResponse.json();
    });

    await test.step('Validate expenses date range and owner breakdown type', async () => {
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

      // Check each breakdown value conforms to DataSourceExpense[] interface
      for (const key of breakdownKeys) {
        const breakdownValue = breakdown[key];
        expect.soft(Array.isArray(breakdownValue)).toBe(true);

        if (Array.isArray(breakdownValue)) {
          for (const owner of breakdownValue) {
            expect.soft(typeof owner.id).toBe('string');
            expect.soft(typeof owner.name).toBe('string');
            expect.soft(typeof owner.expense).toBe('number');
            expect.soft(owner.expense).toBeGreaterThanOrEqual(0);
          }
        }
      }
    });
  });

  test('[231224] Verify owner expenses total for(default) period matches chart and table totals', async ({ expensesPage }) => {
    const totalForPeriod = await expensesPage.getTotalExpensesForSelectedPeriod();
    debugLog(`Total expenses for selected period: ${totalForPeriod}`);
    const chartTotal = await expensesPage.getExpensesPieChartValue();
    debugLog(`Total expenses from pie chart: ${chartTotal}`);
    const tableTotal = await expensesPage.getTableItemisedExpensesValue();
    debugLog(`Total expenses from itemised table: ${tableTotal}`);

    await test.step('Compare total expenses values', async () => {
      expect.soft(chartTotal).toBe(totalForPeriod);
      expect(isWithinRoundingDrift(tableTotal, totalForPeriod, 0.01)).toBe(true);
    });
  });

  test('[231225] Verify owner expenses total for (last 30 days) period matches chart and table totals', async ({
    expensesPage,
    datePicker,
  }) => {
    await datePicker.selectLast30DaysDateRange();
    const expectedDateRange = getExpectedDateRangeText('last 30 days');
    debugLog(`Selected date range: ${expectedDateRange}`);
    const totalForPeriod = await expensesPage.getTotalExpensesForSelectedPeriod();
    debugLog(`Total expenses for selected period: ${totalForPeriod}`);
    const chartTotal = await expensesPage.getExpensesPieChartValue();
    debugLog(`Total expenses from pie chart: ${chartTotal}`);
    const tableTotal = await expensesPage.getTableItemisedExpensesValue();
    debugLog(`Total expenses from itemised table: ${tableTotal}`);

    await test.step('Compare total expenses values', async () => {
      const dateRange = await datePicker.selectedDateText.textContent();
      expect(dateRange.includes(expectedDateRange)).toBe(true);
      expect.soft(chartTotal).toBe(totalForPeriod);
      expect(isWithinRoundingDrift(tableTotal, totalForPeriod, 0.01)).toBe(true);
    });
  });
});
