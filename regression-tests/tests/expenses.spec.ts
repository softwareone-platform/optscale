import { test } from '@/fixtures/page.fixture';
import { expect } from '@playwright/test';
import { expensesInterceptions, expensesMapInterceptions, expensesBreakdownsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';
import { fitViewportToFullPage } from '@/utils/viewport';

test.describe('Expenses', () => {
  test.use({ interceptAPI: { entries: expensesInterceptions } });

  test('dashboard', async ({ expensesPage }) => {
    await expensesPage.navigateToURL();

    await test.step('Header', async () => {
      await captureScreenshot(expensesPage.header, 'Expenses-Header.png', { skipHover: true });
    });

    const views: Array<[string, () => Promise<void>, string]> = [
      ['Daily view', () => expensesPage.clickDailyBtnIfNotSelected(), 'Expenses-Container--Daily.png'],
      ['Weekly view', () => expensesPage.weeklyBtn.click(), 'Expenses-Container--Weekly.png'],
      ['Monthly view', () => expensesPage.monthlyBtn.click(), 'Expenses-Container--Monthly.png'],
    ];

    for (const [label, pickView, snapshot] of views) {
      await test.step(label, async () => {
        await pickView();
        await expensesPage.waitForCanvas();
        await captureScreenshot(expensesPage.pageContentWrapper, snapshot, {
          hoverAnchor: expensesPage.heading,
        });
      });
    }
  });
});

test.describe('Expenses', () => {
  test.use({ interceptAPI: { entries: expensesMapInterceptions } });

  test('map', async ({ expensesMapPage }) => {
    await expensesMapPage.navigateToURL();
    await captureScreenshot(expensesMapPage.header, 'ExpensesMap-Header.png', { skipHover: true });
    await expensesMapPage.heading.hover();
    await fitViewportToFullPage(expensesMapPage.page);
    await expect(expensesMapPage.mapLegend).toBeVisible();
    await captureScreenshot(expensesMapPage.pageContentWrapper, 'ExpensesMap-Container.png', {
      skipHover: true,
      screenshotOptions: { mask: [expensesMapPage.page.getByTestId('google-map-wrapper')] },
    });
  });
});

test.describe('Expenses', () => {
  test.use({ interceptAPI: { entries: expensesBreakdownsInterceptions } });

  test('breakdowns', async ({ expensesPage }) => {
    await expensesPage.navigateToURL();

    const breakdowns = [
      {
        label: 'Breakdown by source',
        open: () => expensesPage.sourceBtn.click(),
        heading: () => expensesPage.dataSourceHeading,
        snapshot: 'Expenses-Breakdown--Source.png',
        needsBreadcrumb: false,
      },
      {
        label: 'Breakdown by pool',
        open: () => expensesPage.poolBtn.click(),
        heading: () => expensesPage.poolHeading,
        snapshot: 'Expenses-Breakdown--Pool.png',
        needsBreadcrumb: true,
      },
      {
        label: 'Breakdown by owner',
        open: () => expensesPage.ownerBtn.click(),
        heading: () => expensesPage.ownerHeading,
        snapshot: 'Expenses-Breakdown--Owner.png',
        needsBreadcrumb: true,
      },
    ];

    for (const { label, open, heading, snapshot, needsBreadcrumb } of breakdowns) {
      await test.step(label, async () => {
        if (needsBreadcrumb) await expensesPage.costExploreBreadcrumb.click();
        await open();
        await expensesPage.waitForCanvas();
        await captureScreenshot(expensesPage.pageContentWrapper, snapshot, {
          hoverAnchor: heading(),
          fitViewport: true,
        });
      });
    }
  });
});
