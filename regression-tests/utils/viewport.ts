import { Page } from '@playwright/test';
import { config } from '@/utils/config';

const MAX_HEIGHT = 12_000;
const HEADER_HEIGHT = 80;
const SAFETY_BUFFER = 8;
const FALLBACK_WIDTH = 1280;
const STABLE_SAMPLES = 5;
const POLLING_MS = 100;

/**
 * Resize the viewport so all `<main id="mainLayoutWrapper">` content fits
 * without scrolling. Polls in-page until the wrapper height stays the same
 * across consecutive samples, then resizes once.
 */
export async function fitViewportToFullPage(page: Page): Promise<void> {
  await page.waitForLoadState('load').catch(() => {});

  const contentHeight = await page.waitForFunction(
    requiredStableSamples => {
      const wrapper = document.querySelector('main#mainLayoutWrapper');
      if (!wrapper) return false;
      const measuredHeight = Array.from(wrapper.children).reduce(
        (sum, child) => sum + (child as HTMLElement).offsetHeight,
        0
      );
      // Cache last measurement on the window; require N stable hits.
      const cache = window as Window & {
        lastMeasuredHeight?: number;
        consecutiveStableSamples?: number;
      };
      if (measuredHeight === cache.lastMeasuredHeight) {
        cache.consecutiveStableSamples = (cache.consecutiveStableSamples ?? 0) + 1;
      } else {
        cache.consecutiveStableSamples = 0;
        cache.lastMeasuredHeight = measuredHeight;
      }
      return (cache.consecutiveStableSamples ?? 0) >= requiredStableSamples ? measuredHeight : false;
    },
    STABLE_SAMPLES,
    { polling: POLLING_MS, timeout: config.timeouts.viewportStable }
  ).then(handle => handle.jsonValue() as Promise<number>);

  const { width } = page.viewportSize() ?? { width: FALLBACK_WIDTH };
  await page.setViewportSize({
    width,
    height: Math.min(contentHeight + HEADER_HEIGHT + SAFETY_BUFFER, MAX_HEIGHT),
  });
}
