import { test } from '@/fixtures/page.fixture';
import { expect } from '@playwright/test';
import { recommendationsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';
import { fitViewportToFullPage } from '@/utils/viewport';

test.use({ interceptAPI: { entries: recommendationsInterceptions } });

test('FFC: Recommendations', async ({ recommendationsPage }) => {
  const page = recommendationsPage;
  await page.navigateToURL();

  await test.step('Cards view', async () => {
    await page.clickCardsButtonIfNotActive();
    await captureScreenshot(page.main, 'Recommendations-Container--Cards.png', {
      fitViewport: true,
    });
  });

  await test.step('Table view', async () => {
    await page.clickTableButton();
    await fitViewportToFullPage(page.page);
    await expect(page.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-Savings.png');
    await expect(page.table).toHaveScreenshot('Recommendations-Table.png');
  });
});
