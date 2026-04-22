import { expect, Locator } from '@playwright/test';
import { roundElementDimensions } from './roundElementDimensions';
import type { InterceptionEntry } from './interceptor';

type ScreenshotOptions = Parameters<Locator['screenshot']>[0];

/**
 * Default `test.use(...)` payload for regression specs.
 *
 *   test.use(regressionOptions(eventsInterceptions));
 */
export const regressionOptions = (entries: InterceptionEntry[]) =>
  ({
    restoreSession: true,
    setFixedTime: true,
    // Wrapper object required due to a known Playwright fixture-override
    // quirk with array values. See `fixtures/page.fixture.ts`.
    interceptAPI: { entries },
  }) as const;

/**
 * Take a stable screenshot of a region.
 *
 *  1. `hover` over an anchor (usually the heading) to neutralise hover state
 *     elsewhere on the page.
 *  2. `roundElementDimensions(target)` to avoid sub-pixel diffs.
 *  3. `expect(target).toHaveScreenshot(name, options)`.
 *
 * @param target      Element to snapshot (typically `page.main`).
 * @param name        Baseline PNG file name.
 * @param hoverAnchor Element to hover before capturing. Defaults to `target`.
 * @param options     Extra `toHaveScreenshot` options forwarded as-is.
 */
export async function captureScreenshot(
  target: Locator,
  name: string,
  hoverAnchor?: Locator,
  options?: ScreenshotOptions,
): Promise<void> {
  await (hoverAnchor ?? target).hover();
  await roundElementDimensions(target);
  await expect(target).toHaveScreenshot(name, options);
}
