import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { expensesInterceptions, expensesMapInterceptions, expensesBreakdownsInterceptions } from '../mocks/expenses.mocks';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { captureScreenshot, regressionOptions } from '../utils/test-helpers';

test.describe('FFC: Expenses Dashboard page', () => {
  test.use(regressionOptions(expensesInterceptions));

  test('Page matches screenshots', async ({ expensesPage }) => {
    await expensesPage.navigateToURL();

    const views: Array<[string, () => Promise<void>, string]> = [
      ['daily', () => expensesPage.clickDailyBtnIfNotSelected(), 'Expenses-Container--Daily.png'],
      ['weekly', () => expensesPage.clickWeeklyBtn(), 'Expenses-Container--Weekly.png'],
      ['monthly', () => expensesPage.clickMonthlyBtn(), 'Expenses-Container--Monthly.png'],
    ];

    for (const [label, pickView, snapshot] of views) {
      await test.step(`${label} view`, async () => {
        await pickView();
        await expensesPage.waitForCanvas();
        await captureScreenshot(expensesPage.main, snapshot, expensesPage.heading);
      });
    }
  });
});

test.describe('FFC: Expenses Map page', () => {
  test.use(regressionOptions(expensesMapInterceptions));

  test('Page matches screenshots', async ({ expensesMapPage }) => {
    await expensesMapPage.navigateToURL();
    await expensesMapPage.heading.hover();
    await expensesMapPage.fitViewportToFullPage();
    await expect(expensesMapPage.mapLegend).toBeVisible();
    await expect(expensesMapPage.main).toHaveScreenshot('ExpansesMap-Content.png', {
      mask: [expensesMapPage.page.locator('[data-testid="google-map-wrapper"]')],
    });
  });
});

test.describe('FFC: Expenses Breakdowns page', () => {
  test.use(regressionOptions(expensesBreakdownsInterceptions));

  test('Page matches screenshots', async ({ expensesPage }) => {
    await expensesPage.navigateToURL();

    const breakdowns: Array<{
      label: string;
      open: () => Promise<void>;
      heading: () => typeof expensesPage.dataSourceHeading;
      snapshot: string;
      needsBreadcrumb: boolean;
    }> = [
      {
        label: 'source',
        open: () => expensesPage.clickSourceBtn(),
        heading: () => expensesPage.dataSourceHeading,
        snapshot: 'Expenses-Breakdown--Source.png',
        needsBreadcrumb: false,
      },
      {
        label: 'pool',
        open: () => expensesPage.clickPoolBtn(),
        heading: () => expensesPage.poolHeading,
        snapshot: 'Expenses-Breakdown--Pool.png',
        needsBreadcrumb: true,
      },
      {
        label: 'owner',
        open: () => expensesPage.clickOwnerBtn(),
        heading: () => expensesPage.ownerHeading,
        snapshot: 'Expenses-Breakdown--Owner.png',
        needsBreadcrumb: true,
      },
    ];

    for (const { label, open, heading, snapshot, needsBreadcrumb } of breakdowns) {
      await test.step(`Breakdown by ${label}`, async () => {
        if (needsBreadcrumb) await expensesPage.clickCostExploreBreadcrumb();
        await open();
        await heading().hover();
        await expensesPage.waitForCanvas();
        await roundElementDimensions(expensesPage.main);
        await expensesPage.fitViewportToFullPage();
        await expect(expensesPage.main).toHaveScreenshot(snapshot);
      });
    }
  });
});
