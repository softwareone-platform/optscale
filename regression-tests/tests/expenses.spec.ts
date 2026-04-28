import { test } from '@/fixtures/page.fixture';
import { expect } from '@playwright/test';
import { expensesInterceptions, expensesMapInterceptions, expensesBreakdownsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';
import { fitViewportToFullPage } from '@/utils/viewport';

test.describe(() => {
  test.use({ interceptAPI: { entries: expensesInterceptions } });

  test('FFC: Expenses Dashboard', async ({ expensesPage }) => {
    await expensesPage.navigateToURL();

    const views: Array<[string, () => Promise<void>, string]> = [
      ['Daily view', () => expensesPage.clickDailyBtnIfNotSelected(), 'Expenses-Container--Daily.png'],
      ['Weekly view', () => expensesPage.clickWeeklyBtn(), 'Expenses-Container--Weekly.png'],
      ['Monthly view', () => expensesPage.clickMonthlyBtn(), 'Expenses-Container--Monthly.png'],
    ];

    for (const [label, pickView, snapshot] of views) {
      await test.step(label, async () => {
        await pickView();
        await expensesPage.waitForCanvas();
        await captureScreenshot(expensesPage.main, snapshot, {
          hoverAnchor: expensesPage.heading,
        });
      });
    }
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: expensesMapInterceptions } });

  test('FFC: Expenses Map', async ({ expensesMapPage }) => {
    await expensesMapPage.navigateToURL();
    await expensesMapPage.heading.hover();
    await fitViewportToFullPage(expensesMapPage.page);
    await expect(expensesMapPage.mapLegend).toBeVisible();
    await expect(expensesMapPage.main).toHaveScreenshot('ExpensesMap-Container.png', {
      mask: [expensesMapPage.page.getByTestId('google-map-wrapper')],
    });
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: expensesBreakdownsInterceptions } });

  test('FFC: Expenses Breakdowns', async ({ expensesPage }) => {
    await expensesPage.navigateToURL();

    const breakdowns = [
      {
        label: 'Breakdown by source',
        open: () => expensesPage.clickSourceBtn(),
        heading: () => expensesPage.dataSourceHeading,
        snapshot: 'Expenses-Breakdown--Source.png',
        needsBreadcrumb: false,
      },
      {
        label: 'Breakdown by pool',
        open: () => expensesPage.clickPoolBtn(),
        heading: () => expensesPage.poolHeading,
        snapshot: 'Expenses-Breakdown--Pool.png',
        needsBreadcrumb: true,
      },
      {
        label: 'Breakdown by owner',
        open: () => expensesPage.clickOwnerBtn(),
        heading: () => expensesPage.ownerHeading,
        snapshot: 'Expenses-Breakdown--Owner.png',
        needsBreadcrumb: true,
      },
    ];

    for (const { label, open, heading, snapshot, needsBreadcrumb } of breakdowns) {
      await test.step(label, async () => {
        if (needsBreadcrumb) await expensesPage.clickCostExploreBreadcrumb();
        await open();
        await expensesPage.waitForCanvas();
        await captureScreenshot(expensesPage.main, snapshot, {
          hoverAnchor: heading(),
          fitViewport: true,
        });
      });
    }
  });
});
