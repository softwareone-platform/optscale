import { test } from '@/fixtures/page.fixture';
import { recommendationsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';
import { fitViewportToFullPage } from '@/utils/viewport';

/** Filesystem-safe slug from a card title, for per-card screenshot names. */
const slug = (text: string): string =>
  text
    .trim()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '');

test.describe('Recommendations', () => {
  test.use({ interceptAPI: { entries: recommendationsInterceptions } });

  test('cards and table', async ({ recommendationsPage }) => {
    const page = recommendationsPage;
    await page.navigateToURL();
    await page.clickCardsButtonIfNotActive();

    await test.step('Header', async () => {
      await captureScreenshot(page.header, 'Recommendations-Header.png', { skipHover: true });
    });

    await test.step('Summary', async () => {
      await captureScreenshot(page.summaryGrid, 'Recommendations-Summary.png', { skipHover: true });
    });

    await test.step('Action bar', async () => {
      await captureScreenshot(page.actionBar, 'Recommendations-ActionBar.png', { skipHover: true });
    });

    await test.step('Cards', async () => {
      const count = await page.cards.count();
      for (let i = 0; i < count; i++) {
        const card = page.cards.nth(i);
        const title = await card.locator('h3').first().innerText();
        await captureScreenshot(card, `Recommendations-Card--${slug(title)}.png`, { skipHover: true });
      }
    });

    await test.step('Table view', async () => {
      await page.tableBtn.click();
      // Table can exceed the viewport; grow it so the full table renders inside
      // the `main` scroll container, then capture the element (stable dimensions).
      await fitViewportToFullPage(page.page);
      await captureScreenshot(page.possibleMonthlySavingsDiv, 'Recommendations-Savings.png', { skipHover: true });
      await captureScreenshot(page.table, 'Recommendations-Table.png', { skipHover: true });
    });
  });
});
