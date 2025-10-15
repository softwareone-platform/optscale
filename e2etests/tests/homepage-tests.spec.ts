import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { expectWithinDrift } from '../utils/custom-assertions';

test.describe('[MPT-11464] Home Page Recommendations block tests', { tag: ['@ui', '@recommendations', '@homepage'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  test.beforeEach(async ({ homePage }) => {
    await test.step('Login as FinOps user', async () => {
      await homePage.navigateToURL();
      await homePage.waitForLoadingPageImgToDisappear();
      await homePage.waitForPageLoaderToDisappear();
      await homePage.waitForAllCanvases();
    });
  });

  test('[230550] Compare possible savings on home page with those on recommendations page', async ({ homePage, recommendationsPage }) => {
    const homePageValue = await homePage.getRecommendationsPossibleSavingsValue();
    await homePage.recommendationsBtn.click();
    const recommendationsPageValue = await recommendationsPage.getPossibleMonthlySavingsValue();
    expect.soft(homePageValue).toBe(recommendationsPageValue);
  });

  test('[230551] Verify Cost items displayed in the recommendations block match the sum total of items displayed on cards with savings', async ({
    homePage,
    recommendationsPage,
  }) => {
    const homePageValue = await homePage.getRecommendationsCostValue();
    await homePage.recommendationsCostLink.click();
    expect.soft(await recommendationsPage.selectedComboBoxOption(recommendationsPage.categoriesSelect)).toEqual('Savings');
    expect.soft(await recommendationsPage.getTotalSumOfItemsFromSeeItemsButtons()).toBe(homePageValue);
  });

  test('[230552] Verify Security items displayed in the recommendations block match the sum total of items displayed on cards in the security category', async ({
    homePage,
    recommendationsPage,
  }) => {
    const homePageValue = await homePage.getRecommendationsSecurityValue();
    await homePage.recommendationsSecurityLink.click();
    expect.soft(await recommendationsPage.selectedComboBoxOption(recommendationsPage.categoriesSelect)).toEqual('Security');
    expect.soft(await recommendationsPage.getTotalSumOfItemsFromSeeItemsButtons()).toBe(homePageValue);
  });

  // Test failing due to bug MPT-11558 The home page recommendations block not returning the real Critical item count
  test('[230553] Verify Critical items displayed in the recommendations block match the sum total of items displayed on cards with the critical status', async ({
    homePage,
    recommendationsPage,
  }) => {
    const homePageValue = await homePage.getRecommendationsCriticalValue();
    await homePage.recommendationsCriticalLink.click();
    expect.soft(await recommendationsPage.selectedComboBoxOption(recommendationsPage.categoriesSelect)).toEqual('Critical');
    expect.soft(await recommendationsPage.getTotalSumOfItemsFromSeeItemsButtons()).toBe(homePageValue);
  });
});

test.describe('[MPT-11958] Home Page Resource block tests', { tag: ['@ui', '@resources', '@homepage'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  test.beforeEach(async ({ homePage }) => {
    await test.step('Login as FinOps user', async () => {
      await homePage.navigateToURL();
      await homePage.waitForLoadingPageImgToDisappear();
      await homePage.waitForPageLoaderToDisappear();
      await homePage.waitForAllCanvases();
    });
  });

  test('[230838] Verify Top Resource block Resource link works correctly', async ({ homePage, resourcesPage }) => {
    await test.step('Click on Top Resources button', async () => {
      await homePage.clickTopResourcesBtn();
      await expect.soft(resourcesPage.heading).toBeVisible();
    });
  });

  test('[230839] Verify top Resource link navigates to the correct resource details page and last 30 days value match', async ({
    homePage,
    resourceDetailsPage,
    datePicker,
  }) => {
    let homepageResourceTitle: string;
    let homePageExpenseValue: number;
    await test.step("Get first resource's homepage values", async () => {
      await homePage.topResourcesAllLinks.last().waitFor();
      homepageResourceTitle = await homePage.getFirstResourceTitle();
      homePageExpenseValue = await homePage.getFirstResourceValue();
      expect.soft(homepageResourceTitle).toBeTruthy();
    });

    await test.step('Click on the first resource link and verify navigation', async () => {
      await homePage.clickFirstTopResourceLink();
      await expect.soft(resourceDetailsPage.heading).toContainText(homepageResourceTitle);
    });

    await test.step('Click expenses tab and set date range to last 30 days', async () => {
      await resourceDetailsPage.clickExpensesTab();
      await datePicker.selectLast30DaysDateRange();
    });

    await test.step('Verify that the expenses column total matches the home page last 30 days expenses value', async () => {
      const expenseTotal = await resourceDetailsPage.sumCurrencyColumn(
        resourceDetailsPage.tableColumn2,
        resourceDetailsPage.navigateNextIcon
      );
      expectWithinDrift(homePageExpenseValue, expenseTotal, 0.0001); //0.01% drift is acceptable for the test
    });
  });

  test('[230842] Verify Top Resource Block displayed correctly', async ({ homePage }) => {
    await test.step('Verify that the Top Resources section is displayed with 6 or fewer resources and include names for each', async () => {
      const count = await homePage.topResourcesAllLinks.count();
      expect.soft(count).toBeLessThanOrEqual(6);

      for (let i = 0; i < count; i++) {
        const resourceName = (await homePage.topResourcesAllLinks.nth(i).textContent()).replace(/\.{3}\//g, '').trim();
        expect.soft(resourceName).toBeTruthy();
      }
    });
  });
});

test.describe('[MPT-12743] Home Page test for Pools requiring attention block', { tag: ['@ui', '@pools', '@homepage'] }, () => {
  test.use({ restoreSession: true });

  test.describe.configure({ mode: 'serial' }); //Tests in this describe block are state dependent, so they should not run in parallel with pools tests.

  test('[230921] Verify Pools requiring attention block is displayed and link navigates to the pools page', async ({
    homePage,
    poolsPage,
  }) => {
    await test.step('Navigate to home page', async () => {
      await homePage.navigateToURL();
      await homePage.waitForPageLoaderToDisappear();
      await homePage.waitForAllCanvases();
    });

    await test.step('Click the Pools requiring attention button', async () => {
      await homePage.clickPoolsRequiringAttentionBtn();
      await expect.soft(poolsPage.heading).toBeVisible();
    });
  });

  test('[230922] Verify that Pools Requiring attention is empty when the are no qualifying pools', async ({
    homePage,
    poolsPage,
    mainMenu,
  }) => {
    await test.step('Remove limits from all pools if any', async () => {
      await poolsPage.navigateToURL();
      await poolsPage.waitForPageLoaderToDisappear();
      await poolsPage.expandMoreIcon.waitFor();
      if ((await poolsPage.getColumnBadgeText()) !== 'All') await poolsPage.selectAllColumns();
      await poolsPage.toggleExpandPool();
      await poolsPage.removeAllSubPoolMonthlyLimits();
      await poolsPage.toggleExpandPool();
      if ((await poolsPage.getOrganizationLimitValue()) !== 0) await poolsPage.editPoolMonthlyLimit(0);
      await mainMenu.clickHomeBtn();
    });
    await test.step('Navigate to home page and verify Pools Requiring attention block is empty', async () => {
      await expect.soft(homePage.poolsNoDataMessage).toBeVisible();
      expect.soft(await homePage.getPoolsBlockTotalValue()).toBe(0);
    });
  });

  test(
    '[230923] Verify that Pools Requiring attention shows Pool and Sub-pools that have exceeded their limit',
    { tag: ['@p1'] },
    async ({ homePage, poolsPage, mainMenu }) => {
      let expenseValue: number;
      let subPoolExpenseValue: number;

      await test.step('Set monthly limit for a pool and sub-pool lower than expenses', async () => {
        await poolsPage.navigateToURL();
        await poolsPage.waitForPageLoaderToDisappear();
        await poolsPage.expandMoreIcon.waitFor();
        await poolsPage.selectAllColumns();
        await poolsPage.waitForPageLoaderToDisappear();
        expenseValue = await poolsPage.getExpensesThisMonth();
        const limitValue = Math.round(expenseValue - 1);
        await poolsPage.toggleExpandPool();
        subPoolExpenseValue = await poolsPage.getSubPoolExpensesThisMonth(1);
        const subPoolLimitValue = Math.round(subPoolExpenseValue - 1);
        await poolsPage.editSubPoolMonthlyLimit(subPoolLimitValue, true, 1);
        await poolsPage.editPoolMonthlyLimit(limitValue);
      });

      await test.step('Navigate to home page and verify pool and sub-pool displayed correctly in table', async () => {
        await mainMenu.clickHomeBtn();
        await homePage.waitForPageLoaderToDisappear();
        expect.soft(await homePage.poolsBlockNameColumn.count()).toBe(2);
        expect.soft(await homePage.getPoolsBlockExpensesColumnValue(1)).toBe(expenseValue);
        expect
          .soft(await homePage.getColorFromElement(homePage.poolsBlockExpensesColumn.first().locator('span')))
          .toBe(homePage.errorColor);
        expect.soft(await homePage.getColorFromElement(homePage.poolsBlockExpensesColumn.last().locator('span'))).toBe(homePage.errorColor);
        expect
          .soft(await homePage.getColorFromElement(homePage.poolsBlockForecastColumn.first().locator('span')))
          .toBe(homePage.warningColor);
        expect
          .soft(await homePage.getColorFromElement(homePage.poolsBlockForecastColumn.last().locator('span')))
          .toBe(homePage.warningColor);
        expect.soft(await homePage.getPoolsBlockExpensesColumnValue(2)).toBe(subPoolExpenseValue);
        expect.soft(await homePage.getPoolsBlockTotalValue()).toBe(2);
      });
    }
  );

  test('[230924] Verify that Pools Requiring attention shows Pool and Sub-pools that are forecasted to overspend', async ({
    homePage,
    poolsPage,
    mainMenu,
  }) => {
    let expenseValue: number;
    let forecastedValue: number;

    await test.step('Set monthly limit for a pool that is higher than expenses this month, but lower than forecast', async () => {
      await poolsPage.navigateToURL();
      await homePage.waitForPageLoaderToDisappear();
      await poolsPage.expandMoreIcon.waitFor();
      await poolsPage.selectAllColumns();
      expenseValue = await poolsPage.getExpensesThisMonth();
      forecastedValue = await poolsPage.getForecastThisMonth();
      const limitValue = Math.ceil(expenseValue / 0.91);
      await poolsPage.toggleExpandPool();
      await poolsPage.removeAllSubPoolMonthlyLimits();
      await poolsPage.editPoolMonthlyLimit(limitValue);
    });
    await test.step('Navigate to home page and verify Pools Requiring attention block', async () => {
      await mainMenu.clickHomeBtn();
      await expect.soft(homePage.poolsNoDataMessage).toBeVisible();
      await homePage.clickPoolsBlockForecastedOverspendTab();
      expect.soft(await homePage.getPoolsBlockExpensesColumnValue(1)).toBe(expenseValue);
      expect.soft(await homePage.getPoolsBlockForecastColumnValue(1)).toBe(forecastedValue);
      expect
        .soft(await homePage.getColorFromElement(homePage.poolsBlockExpensesColumn.locator('xpath=/div/div')))
        .toBe(homePage.successColor);
      expect.soft(await homePage.getColorFromElement(homePage.poolsBlockForecastColumn.locator('span'))).toBe(homePage.warningColor);
      expect.soft(await homePage.getPoolsBlockTotalValue()).toBe(1);
    });
  });
});
