import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { recommendationsInterceptions } from '../mocks/recommendations.mocks';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { regressionOptions } from '../utils/test-helpers';

test.use(regressionOptions(recommendationsInterceptions));

test('FFC: Recommendations — page matches screenshots', async ({ recommendationsPage }) => {
  await recommendationsPage.navigateToURL();

  await test.step('Cards view', async () => {
    await recommendationsPage.clickCardsButtonIfNotActive();
    await roundElementDimensions([
      recommendationsPage.main,
      recommendationsPage.possibleMonthlySavingsDiv,
      recommendationsPage.firstCard,
    ]);
    await recommendationsPage.fitViewportToFullPage();
    await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-Container--Cards.png');
  });

  await test.step('Table view', async () => {
    await recommendationsPage.clickTableButton();
    await roundElementDimensions([
      recommendationsPage.main,
      recommendationsPage.possibleMonthlySavingsDiv,
      recommendationsPage.table,
    ]);
    await recommendationsPage.fitViewportToFullPage();
    await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-Savings.png');
    await expect(recommendationsPage.table).toHaveScreenshot('Recommendations-Table.png');
  });
});
