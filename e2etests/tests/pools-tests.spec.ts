/* eslint-disable playwright/no-conditional-in-test,  playwright/no-conditional-expect */
import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { isWithinRoundingDrift } from '../utils/custom-assertions';
import { debugLog } from '../utils/debug-logging';

function extractMultiplier(input: string): number | null {
  const match = input.match(/\(x([\d.]+)\)/);
  return match ? parseFloat(match[1]) : null;
}

function calculateMultiplier(forecast: number, limit: number): number {
  if (limit === 0) return 0; // Avoid division by zero
  return Math.round((forecast / limit) * 10) / 10; // Round to 1 decimal place
}

//TODO: Add test for Actions including adding sub-pool, editing sub-pool, deleting sub-pool, and editing pool, changing owner.
// Also test for error validation when trying to delete a pool limit when a sub-pool still has a limit set. Tests for tooltips showing calculated values.
test.describe('[MPT-12743] Pools Tests', { tag: ['@ui', '@pools'] }, () => {
  test.use({ restoreSession: true });

  test.describe.configure({ mode: 'default' }); // Test in this block are state dependent, so they can't run in parallel with other tests in this block

  test.beforeEach(async ({ poolsPage }) => {
    await poolsPage.navigateToURL();
    await poolsPage.expandMoreIcon.waitFor();
    if ((await poolsPage.getColumnBadgeText()) !== 'All') await poolsPage.selectAllColumns();
    await poolsPage.toggleExpandPool();
    await poolsPage.removeAllSubPoolMonthlyLimits();
    await poolsPage.toggleExpandPool();
  });

  test('[230911] Verify Pools page column selection', async ({ poolsPage }) => {
    const defaultColumns = [
      poolsPage.nameTableHeading,
      poolsPage.monthlyLimitTableHeading,
      poolsPage.expensesThisMonthTableHeading,
      poolsPage.forecastThisMonthTableHeading,
      poolsPage.ownerTableHeading,
      poolsPage.actionsTableHeading,
    ];

    await test.step('Verify default columns are displayed', async () => {
      for (const column of defaultColumns) {
        await expect.soft(column).toBeVisible();
      }
    });

    await test.step('Clear all columns and verify only Name and Actions columns are visible', async () => {
      await poolsPage.clickColumnSelectButton();
      await poolsPage.clickColumnToggle('clear all');
      await expect.soft(poolsPage.nameTableHeading && poolsPage.actionsTableHeading).toBeVisible();
      for (const column of defaultColumns) {
        if (column !== poolsPage.nameTableHeading && column !== poolsPage.actionsTableHeading) {
          await expect.soft(column).toBeHidden();
        }
      }
    });

    await test.step('Select all columns and verify all columns are visible', async () => {
      await poolsPage.clickColumnToggle('select all');
      for (const column of defaultColumns) {
        await expect.soft(column).toBeVisible();
      }
    });

    await test.step('Select specific columns and verify only those columns are visible', async () => {
      await poolsPage.clickColumnToggle('monthly limit');
      await expect.soft(poolsPage.monthlyLimitTableHeading).toBeHidden();

      await poolsPage.clickColumnToggle('expenses');
      await expect.soft(poolsPage.expensesThisMonthTableHeading).toBeHidden();

      await poolsPage.clickColumnToggle('forecast');
      await expect.soft(poolsPage.forecastThisMonthTableHeading).toBeHidden();

      await poolsPage.clickColumnToggle('owner');
      await expect.soft(poolsPage.ownerTableHeading).toBeHidden();

      await poolsPage.clickColumnToggle('monthly limit');
      await poolsPage.clickColumnToggle('expenses');
      await poolsPage.clickColumnToggle('forecast');
      await poolsPage.clickColumnToggle('owner');
      for (const column of defaultColumns) {
        await expect.soft(column).toBeVisible();
      }
    });
  });

  test('[230912] Verify Organization limit, Pools Expenses and Forecast this month match totals in the table', async ({ poolsPage }) => {
    // test.fail((await poolsPage.getPoolCount()) !== 1, `Expected 1 pool, but found ${await poolsPage.getPoolCount()}`);

    let organizationLimitValue: number;
    let expensesThisMonthValue: number;
    let forecastThisMonthValue: number;

    await test.step('Get Organization Limit, Expenses This Month, and Forecast This Month values', async () => {
      organizationLimitValue = await poolsPage.getOrganizationLimitValue();
      expensesThisMonthValue = await poolsPage.getExpensesThisMonth();
      forecastThisMonthValue = await poolsPage.getForecastThisMonth();
      debugLog(
        `Organization Limit: ${organizationLimitValue}, Expenses This Month: ${expensesThisMonthValue}, Forecast This Month: ${forecastThisMonthValue}`
      );
    });

    await test.step('Verify Organisation Limit matches the table', async () => {
      if (organizationLimitValue === 0) {
        debugLog('No organization limit set');
        await expect.soft(poolsPage.poolColumn2).toHaveText('-');
      } else {
        const limit = await poolsPage.getPoolLimitFromTable();
        debugLog(`Organization Limit: ${organizationLimitValue}`);
        expect.soft(limit).toEqual(organizationLimitValue);
      }
    });

    await test.step('Verify Expenses This Month matches the table', async () => {
      const expenses = await poolsPage.getExpensesThisMonthFromTable();
      expect.soft(expenses).toEqual(expensesThisMonthValue);
    });

    await test.step('Verify Forecast This Month matches the table', async () => {
      const forecast = await poolsPage.getForecastThisMonthFromTable();
      expect.soft(forecast).toEqual(forecastThisMonthValue);
    });

    await test.step('Verify sub-pools expenses match total pool expenses', async () => {
      const subPoolsExpenses = await poolsPage.sumSubPoolTotals('expenses this month');
      debugLog(`Sub-pools expenses: ${subPoolsExpenses}`);
      expect.soft(isWithinRoundingDrift(subPoolsExpenses, expensesThisMonthValue, 0.0001)).toBe(true);
    });

    await test.step('Verify sub-pools forecast match total pool forecast', async () => {
      const subPoolsForecast = await poolsPage.sumSubPoolTotals('forecast this month');
      debugLog(`Sub-pools forecast: ${subPoolsForecast}`);
      expect.soft(isWithinRoundingDrift(subPoolsForecast, forecastThisMonthValue, 0.0001)).toBe(true);
    });
  });

  test('[230913] Verify Organisation Limit functionality - limit not set', async ({ poolsPage }) => {
    test.fail((await poolsPage.getPoolCount()) !== 1, `Expected 1 pool, but found ${await poolsPage.getPoolCount()}`);

    await test.step('Remove organisation limit if it is set.', async () => {
      if ((await poolsPage.getOrganizationLimitValue()) !== 0) {
        await poolsPage.editPoolMonthlyLimit(0);
        debugLog('Removed organization limit');
      }
    });

    await test.step('Assert Pools page elements displayed correctly when limit not set', async () => {
      await expect.soft(poolsPage.exceededLimitCard).toBeHidden();
      expect.soft(await poolsPage.getColorFromElement(poolsPage.expensesCard)).toBe(poolsPage.errorColor);
      await expect.soft(poolsPage.expensesThisMonthCancelIcon).toBeVisible();
      expect.soft(await poolsPage.getColorFromElement(poolsPage.forecastCard)).toBe(poolsPage.errorColor);
      await expect.soft(poolsPage.forecastThisMonthCancelIcon).toBeVisible();
      expect.soft(await poolsPage.poolTableRow.getAttribute('style')).toContain('border-left: 4px solid transparent;');
      await expect.soft(poolsPage.poolColumn2).toHaveText('-');
      expect.soft(await poolsPage.getColorFromElement(poolsPage.poolColumn3)).toBe(poolsPage.infoColor);
      expect.soft(await poolsPage.getColorFromElement(poolsPage.poolColumn4)).toBe(poolsPage.infoColor);
    });
  });

  test('[230914] Verify Organisation Limit functionality - expenses are less than 90% of limit', async ({ poolsPage }) => {
    test.fail((await poolsPage.getPoolCount()) !== 1, `Expected 1 pool, but found ${await poolsPage.getPoolCount()}`);

    const expensesThisMonth = await poolsPage.getExpensesThisMonth();
    test.skip(expensesThisMonth <= 100, 'Skipping test as it requires expenses to be greater than 100');
    const forecastThisMonth = await poolsPage.getForecastThisMonth();
    const organizationLimit = Math.ceil(expensesThisMonth / 0.89); //under 90% of the expenses

    await test.step('Set organization limit to an integer where the expenses are less than the 90% of the limit', async () => {
      await poolsPage.editPoolMonthlyLimit(organizationLimit);
      debugLog(`Set organization limit to ${organizationLimit}`);
    });

    await test.step('Assert Pools page elements displayed correctly when limit set', async () => {
      await expect.soft(poolsPage.exceededLimitCard).toBeHidden();
      expect.soft(await poolsPage.getColorFromElement(poolsPage.expensesCard)).toBe(poolsPage.successColor);
      await expect.soft(poolsPage.expensesThisMonthCheckIcon).toBeVisible();

      if (forecastThisMonth > organizationLimit) {
        expect.soft(await poolsPage.getColorFromElement(poolsPage.forecastCard)).toBe(poolsPage.errorColor);
        await expect.soft(poolsPage.forecastThisMonthCancelIcon).toBeVisible();
        expect.soft(await poolsPage.poolTableRow.getAttribute('style')).toContain(`border-left: 4px solid ${poolsPage.warningColor};`);
        expect.soft(await poolsPage.getColorFromElement(poolsPage.column4TextSpan)).toBe(poolsPage.warningColor);
      }
      expect.soft((await poolsPage.poolColumn2.textContent()).replace(/\D/g, '')).toBe(organizationLimit.toString());
      expect.soft(await poolsPage.getColorFromElement(poolsPage.column3TextDiv)).toBe(poolsPage.successColor);
    });
  });

  test('[230915] Verify Organisation Limit functionality - expenses are greater than 90% of limit', async ({ poolsPage }) => {
    test.fail((await poolsPage.getPoolCount()) !== 1, `Expected 1 pool, but found ${await poolsPage.getPoolCount()}`);

    const expensesThisMonth = await poolsPage.getExpensesThisMonth();
    const organizationLimit = Math.ceil(expensesThisMonth / 0.91);

    await test.step('Set organization limit to an integer where the expenses is more than the 90% of the limit', async () => {
      await poolsPage.editPoolMonthlyLimit(organizationLimit);
      debugLog(`Set organization limit to ${organizationLimit}`);
    });

    await test.step('Assert Pools page elements displayed correctly when limit set', async () => {
      await expect.soft(poolsPage.exceededLimitCard).toBeHidden();
      expect.soft(await poolsPage.getColorFromElement(poolsPage.expensesCard)).toBe(poolsPage.warningColor);
      await expect.soft(poolsPage.expensesThisMonthWarningIcon).toBeVisible();
      expect.soft(await poolsPage.getColorFromElement(poolsPage.forecastCard)).toBe(poolsPage.errorColor);
      await expect.soft(poolsPage.forecastThisMonthCancelIcon).toBeVisible();
      expect.soft(await poolsPage.poolTableRow.getAttribute('style')).toContain(`border-left: 4px solid ${poolsPage.warningColor};`);
      expect.soft((await poolsPage.poolColumn2.textContent()).replace(/\D/g, '')).toBe(organizationLimit.toString());
      expect.soft(await poolsPage.getColorFromElement(poolsPage.column3TextDiv)).toBe(poolsPage.successColor);
      expect.soft(await poolsPage.getColorFromElement(poolsPage.column4TextSpan)).toBe(poolsPage.warningColor);
    });
  });

  test('[230916] Verify Organisation Limit functionality - limit set lower than expenses this month', async ({ poolsPage }) => {
    test.fail((await poolsPage.getPoolCount()) !== 1, `Expected 1 pool, but found ${await poolsPage.getPoolCount()}`);

    const expensesThisMonth = await poolsPage.getExpensesThisMonth();
    const forecastThisMonth = await poolsPage.getForecastThisMonth();
    test.skip(expensesThisMonth <= 1, 'Skipping test as it requires expenses to be greater than 1');
    const organizationLimit: number = Math.round(expensesThisMonth - 1);

    await test.step('Set organization limit to an integer below the current expenses this month', async () => {
      await poolsPage.editPoolMonthlyLimit(organizationLimit);
      debugLog(`Set organization limit to ${organizationLimit}`);
    });

    await test.step('Assert Pools page elements displayed correctly when limit set below expenses this month', async () => {
      const overLimit = await poolsPage.getSpentOverLimitValue();
      const calculatedOverLimit = parseFloat((expensesThisMonth - organizationLimit).toFixed(2));

      expect.soft(overLimit).toBe(calculatedOverLimit);
      expect.soft(await poolsPage.getExceededLimitValue()).toBe(1);
      expect.soft(await poolsPage.getColorFromElement(poolsPage.exceededLimitCard)).toBe(poolsPage.errorColor);
      await expect.soft(poolsPage.exceededLimitCancelIcon).toBeVisible();
      expect.soft(await poolsPage.getColorFromElement(poolsPage.expensesCard)).toBe(poolsPage.errorColor);
      await expect.soft(poolsPage.expensesThisMonthCancelIcon).toBeVisible();
      expect.soft(await poolsPage.getColorFromElement(poolsPage.forecastCard)).toBe(poolsPage.errorColor);
      await expect.soft(poolsPage.forecastThisMonthCancelIcon).toBeVisible();
      expect.soft(await poolsPage.poolTableRow.getAttribute('style')).toContain(`border-left: 4px solid ${poolsPage.errorColor};`);
      expect.soft(await poolsPage.getColorFromElement(poolsPage.column3TextSpan)).toBe(poolsPage.errorColor);
      expect.soft(await poolsPage.getColorFromElement(poolsPage.column4TextSpan)).toBe(poolsPage.warningColor);
      const multiplier = extractMultiplier(await poolsPage.poolColumn4.textContent());
      expect.soft(multiplier).toBe(calculateMultiplier(forecastThisMonth, organizationLimit));
    });
  });

  test('[230917] Verify Organisation Limit functionality - limit set lower forecast', async ({ poolsPage }) => {
    const expensesThisMonth = await poolsPage.getExpensesThisMonth();
    const forecastThisMonth = await poolsPage.getForecastThisMonth();
    test.skip(expensesThisMonth <= 1, 'Skipping test as it requires expenses to be greater than 1');
    const organizationLimit: number = Math.round(forecastThisMonth - 1);

    await test.step('Set organization limit to an integer below the current forecast this month', async () => {
      await poolsPage.editPoolMonthlyLimit(organizationLimit);
      debugLog(`Set organization limit to ${organizationLimit}`);
    });

    await test.step('Assert Pools page elements displayed correctly when limit set below forecast this month', async () => {
      await expect.soft(poolsPage.exceededLimitCard).toBeHidden();
      expect.soft(await poolsPage.getColorFromElement(poolsPage.forecastCard)).toBe(poolsPage.errorColor);
      if (expensesThisMonth >= Math.round(organizationLimit / 0.9)) {
        expect.soft(await poolsPage.getColorFromElement(poolsPage.expensesCard)).toBe(poolsPage.warningColor);
        await expect.soft(poolsPage.expensesThisMonthWarningIcon).toBeVisible();
      } else {
        expect.soft(await poolsPage.getColorFromElement(poolsPage.expensesCard)).toBe(poolsPage.successColor);
        await expect.soft(poolsPage.expensesThisMonthCheckIcon).toBeVisible();
      }
      expect.soft(await poolsPage.poolTableRow.getAttribute('style')).toContain(`border-left: 4px solid ${poolsPage.warningColor};`);
      expect.soft(await poolsPage.getColorFromElement(poolsPage.column3TextDiv)).toBe(poolsPage.successColor);
      expect.soft(await poolsPage.getColorFromElement(poolsPage.column4TextSpan)).toBe(poolsPage.warningColor);
    });
  });

  test('[230918] Verify sub-pool monthly limit behaviour', async ({ poolsPage }) => {
    test.fail((await poolsPage.getPoolCount()) !== 1, `Expected 1 pool, but found ${await poolsPage.getPoolCount()}`);
    test.setTimeout(75000);

    await test.step('Remove pool limit if set.', async () => {
      if ((await poolsPage.getOrganizationLimitValue()) !== 0) {
        await poolsPage.editPoolMonthlyLimit(0);
        debugLog('Removed organization limit');
      }
    });

    await test.step('Set a sub-pool with a monthly limit without extending the pool limit', async () => {
      await poolsPage.toggleExpandPool();
      await poolsPage.editSubPoolMonthlyLimit(1000, false, 1, false);
      await expect.soft(poolsPage.sideModalMonthlyLimitWarningMessage).toBeVisible();
      expect.soft(await poolsPage.getColorFromElement(poolsPage.sideModalMonthlyLimitWarningMessage)).toBe(poolsPage.errorColor);
      await poolsPage.clickSideModalCloseBtn();
    });

    await test.step('Set a sub-pool and extend the limit to the parent pool', async () => {
      await poolsPage.editSubPoolMonthlyLimit(1000, true, 1, true);
      expect.soft(await poolsPage.getSubPoolMonthlyLimit(1)).toBe(1000);
      expect.soft(await poolsPage.getPoolLimitFromTable()).toBe(1000);
    });

    await test.step('Set a second sub-pool and extend the limit to the parent pool', async () => {
      await poolsPage.editSubPoolMonthlyLimit(500, true, 2, true);
      expect.soft(await poolsPage.getSubPoolMonthlyLimit(2)).toBe(500);
      expect.soft(await poolsPage.getPoolLimitFromTable()).toBe(1500);
    });

    await test.step('Remove sub-pool monthly limits and verify that monthly limit is unchanged', async () => {
      await poolsPage.editSubPoolMonthlyLimit(0, false, 1, true);
      expect.soft(await poolsPage.getSubPoolMonthlyLimit(1)).toBe(0);
      await poolsPage.editSubPoolMonthlyLimit(0, false, 2, true);
      expect.soft(await poolsPage.getSubPoolMonthlyLimit(2)).toBe(0);
      expect.soft(await poolsPage.getPoolLimitFromTable()).toBe(1500);
    });
  });

  test('[230919] Verify pool exceeded count and expand requiring attention', async ({ poolsPage }) => {
    // test.fail((await poolsPage.getPoolCount()) !== 1, `Expected 1 pool, but found ${await poolsPage.getPoolCount()}`);
    test.setTimeout(75000);

    const expensesThisMonth = await poolsPage.getExpensesThisMonth();
    const organizationLimit = Math.round(expensesThisMonth + 1);
    let subPoolExpenses: number;
    let subPoolLimit: number;
    let subPoolForecast: number;

    await test.step('Set organization limit to an integer above the current expenses this month', async () => {
      await poolsPage.editPoolMonthlyLimit(organizationLimit);
      debugLog(`Set organization limit to ${organizationLimit}`);
    });

    await test.step('Assert that expand requiring attention does not expand when no sub-pools are exceeded', async () => {
      await poolsPage.clickExpandRequiringAttentionBtn();
      await expect.soft(poolsPage.subPoolNameColumn.first()).toBeHidden();
    });

    await test.step('Assert no pools are exceeded when sub-pool limit set above sub-pool expenses', async () => {
      await poolsPage.toggleExpandPool();
      subPoolExpenses = await poolsPage.getSubPoolExpensesThisMonth(1);
      subPoolLimit = Math.round(subPoolExpenses + 1);
      await poolsPage.editSubPoolMonthlyLimit(subPoolLimit, false, 1, true);
      await expect.soft(poolsPage.exceededLimitCard).toBeHidden();
    });

    await test.step('Assert pool is exceeded when sub-pool limit set below sub-pool expenses', async () => {
      subPoolLimit = Math.round(subPoolExpenses - 1);
      await poolsPage.editSubPoolMonthlyLimit(subPoolLimit, true, 1, true);
      expect.soft(await poolsPage.getExceededLimitValue()).toBe(1);
      expect.soft(await poolsPage.getColorFromElement(poolsPage.subPoolColumn3.first().locator('span'))).toBe(poolsPage.errorColor);
      expect.soft(await poolsPage.getColorFromElement(poolsPage.subPoolColumn4.first().locator('span'))).toBe(poolsPage.warningColor);

      const multiplier = extractMultiplier(await poolsPage.subPoolColumn4.first().textContent());
      subPoolForecast = await poolsPage.getSubPoolForecastThisMonth(1);
      expect.soft(multiplier).toBe(calculateMultiplier(subPoolForecast, subPoolLimit));
    });

    await test.step('Assert that expand requiring attention does expand when sub-pools limits are exceeded', async () => {
      await poolsPage.toggleExpandPool();
      await expect.soft(poolsPage.subPoolNameColumn.first()).toBeHidden();
      await poolsPage.clickExpandRequiringAttentionBtn();
      await expect.soft(poolsPage.subPoolNameColumn.first()).toBeVisible();
    });
  });
});
