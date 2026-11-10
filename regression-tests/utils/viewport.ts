import { Page } from '@playwright/test';
import { config } from '@/utils/config';

const MAX_HEIGHT = 12_000;
const HEADER_HEIGHT = 80;
const SAFETY_BUFFER = 8;
const FALLBACK_WIDTH = 1280;
const STABLE_SAMPLES = 5;
const POLLING_MS = 100;

/** Where the in-page poll keeps its running count, namespaced so it can't collide with app globals. */
type MeasuringWindow = Window & {
  __fitViewportMeasurement?: { lastHeight: number; stableSamples: number };
};

/**
 * Resize the viewport so all `<main id="mainLayoutWrapper">` content fits
 * without scrolling. Polls in-page until the wrapper height stays the same
 * across consecutive samples, then resizes once.
 */
export async function fitViewportToFullPage(page: Page): Promise<void> {
  await page.waitForLoadState('load').catch(() => {});

  // The count has to live in the page to survive between polls, which means it also survives
  // between calls. Specs call this several times per page, and a stale count that already reads
  // "stable" returns on the first poll — skipping the wait this function exists for.
  await page.evaluate(() => {
    delete (window as MeasuringWindow).__fitViewportMeasurement;
  });

  const contentHeight = await page
    .waitForFunction(
      requiredStableSamples => {
        const wrapper = document.querySelector('main#mainLayoutWrapper');
        if (!wrapper) return false;

        const measuredHeight = Array.from(wrapper.children).reduce((sum, child) => sum + (child as HTMLElement).offsetHeight, 0);

        const measuring = window as MeasuringWindow;
        if (!measuring.__fitViewportMeasurement) {
          measuring.__fitViewportMeasurement = { lastHeight: measuredHeight, stableSamples: 0 };
          return false;
        }

        const measurement = measuring.__fitViewportMeasurement;
        if (measuredHeight === measurement.lastHeight) {
          measurement.stableSamples += 1;
        } else {
          measurement.lastHeight = measuredHeight;
          measurement.stableSamples = 0;
        }

        return measurement.stableSamples >= requiredStableSamples ? measuredHeight : false;
      },
      STABLE_SAMPLES,
      { polling: POLLING_MS, timeout: config.timeouts.viewportStable }
    )
    .then(handle => handle.jsonValue() as Promise<number>);

  const { width } = page.viewportSize() ?? { width: FALLBACK_WIDTH };
  await page.setViewportSize({
    width,
    height: Math.min(contentHeight + HEADER_HEIGHT + SAFETY_BUFFER, MAX_HEIGHT),
  });
}
