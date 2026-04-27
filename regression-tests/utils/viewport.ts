import { Page } from '@playwright/test';

/**
 * Resize the viewport so the entire `<main id="mainLayoutWrapper">` content
 * fits without scrolling.
 *
 * Re-measures iteratively because resizing itself can trigger reflow on
 * responsive layouts; stops as soon as two consecutive measurements agree
 * or `MAX_ITERATIONS` is reached.
 */
export async function fitViewportToFullPage(page: Page): Promise<void> {
  const MAX_HEIGHT = 12_000;
  const HEADER_HEIGHT = 80;
  const MAX_ITERATIONS = 5;

  const { width } = page.viewportSize() ?? { width: 1280 };

  let previousHeight = 0;
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const contentHeight = await page.evaluate(() => {
      const wrapper = document.querySelector('main#mainLayoutWrapper');
      if (!wrapper) return 0;
      return Array.from(wrapper.children).reduce((sum, child) => sum + (child as HTMLElement).offsetHeight, 0);
    });

    const targetHeight = Math.min(contentHeight + HEADER_HEIGHT, MAX_HEIGHT);
    if (targetHeight === previousHeight) break;

    await page.setViewportSize({ width, height: targetHeight });
    await page.evaluate(
      () => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
    );

    previousHeight = targetHeight;
  }
}
