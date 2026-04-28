import { Page } from '@playwright/test';

/**
 * Resize the viewport so all `<main id="mainLayoutWrapper">` content fits
 * without scrolling. Polls in-page until the wrapper height stays the same
 * across consecutive samples, then resizes once.
 */
export async function fitViewportToFullPage(page: Page): Promise<void> {
  const MAX_HEIGHT = 12_000;
  const HEADER_HEIGHT = 80;
  const SAFETY_BUFFER = 8;

  await page.waitForLoadState('load').catch(() => {});

  const contentHeight = await page.waitForFunction(
    () => {
      const wrapper = document.querySelector('main#mainLayoutWrapper');
      if (!wrapper) return false;
      const h = Array.from(wrapper.children).reduce(
        (sum, c) => sum + (c as HTMLElement).offsetHeight,
        0
      );
      // Cache last measurement on the window; require N stable hits.
      const w = window as Window & {
        lastMeasuredHeight?: number;
        consecutiveStableSamples?: number;
      };
      if (h === w.lastMeasuredHeight) {
        w.consecutiveStableSamples = (w.consecutiveStableSamples ?? 0) + 1;
      } else {
        w.consecutiveStableSamples = 0;
        w.lastMeasuredHeight = h;
      }
      return (w.consecutiveStableSamples ?? 0) >= 5 ? h : false;
    },
    null,
    { polling: 100, timeout: 10_000 }
  ).then(handle => handle.jsonValue() as Promise<number>);

  const { width } = page.viewportSize() ?? { width: 1280 };
  await page.setViewportSize({
    width,
    height: Math.min(contentHeight + HEADER_HEIGHT + SAFETY_BUFFER, MAX_HEIGHT),
  });
}
