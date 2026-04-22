import { expect, Locator, Page } from '@playwright/test';

type ScreenshotOptions = Parameters<Locator['screenshot']>[0];

export interface CaptureOptions {
  /**
   * Element to hover before capturing, to neutralise hover state elsewhere on
   * the page. Defaults to `target`. Ignored when `skipHover` is `true`.
   */
  hoverAnchor?: Locator;
  /**
   * Skip the hover step entirely. Use for hover-sensitive widgets (header,
   * menus, tiles that react to pointer events).
   */
  skipHover?: boolean;
  /**
   * When set, resize the viewport so the full target is visible before
   * snapshotting. Pass any object exposing `fitViewportToFullPage()`
   * (typically the page object itself).
   */
  fitViewport?: { fitViewportToFullPage: () => Promise<void> };
  /** Forwarded to `toHaveScreenshot`. */
  screenshotOptions?: ScreenshotOptions;
}

/**
 * Waits until the page has been visibly quiet for `idleMs` in a row.
 *
 * Combines three orthogonal signals:
 *   1. `document.fonts.ready`              — text metrics final.
 *   2. `MutationObserver` on `<html>`      — DOM has stopped changing.
 *   3. Final bounding-box sample on target — catches CSS-only layout shifts
 *                                            (animations, transitions) that
 *                                            don't mutate the DOM.
 *
 * More reliable than polling `boundingBox()` because it runs inside the page,
 * reacts to every DOM mutation, and resets its timer on each one. A page that
 * hydrates async content in several waves will wait out all waves in a single
 * call instead of prematurely returning between two of them.
 */
export async function waitForPageIdle(
  target: Locator,
  { idleMs = 400, maxWaitMs = 8_000 }: { idleMs?: number; maxWaitMs?: number } = {}
): Promise<void> {
  const page: Page = target.page();

  await page.evaluate(() => document.fonts.ready);

  await page.evaluate(
    ({ idleMs, maxWaitMs }) =>
      new Promise<void>(resolve => {
        const deadline = performance.now() + maxWaitMs;
        let timer: ReturnType<typeof setTimeout>;

        const done = () => {
          observer.disconnect();
          clearTimeout(timer);
          resolve();
        };

        const reset = () => {
          clearTimeout(timer);
          if (performance.now() > deadline) {
            done();
            return;
          }
          timer = setTimeout(done, idleMs);
        };

        const observer = new MutationObserver(reset);
        observer.observe(document.documentElement, {
          subtree: true,
          childList: true,
          attributes: true,
          characterData: true,
        });

        reset();
      }),
    { idleMs, maxWaitMs }
  );

  // Final cross-check: two consecutive bbox samples match. Guards against
  // CSS-only transitions (e.g. MUI Accordion height interpolation) that don't
  // fire mutations.
  const sleep = (ms: number) => new Promise<void>(r => setTimeout(r, ms));
  for (let i = 0; i < 10; i++) {
    const a = await target.boundingBox();
    await sleep(50);
    const b = await target.boundingBox();
    if (a && b && a.width === b.width && a.height === b.height) return;
  }
}

/**
 * Take a stable screenshot of a region.
 *
 *   1. Hover a neutral anchor (or skip).
 *   2. Wait for the page to go idle (fonts + DOM mutations + stable layout).
 *   3. Optionally fit the viewport to the target's full height — then wait
 *      idle again, because viewport resizes trigger reflows.
 *   4. `expect(target).toHaveScreenshot(name, screenshotOptions)`.
 *
 * Intentionally does **not** pin inline width/height on the target. Doing so
 * freezes animating elements at their in-progress size and causes persistent
 * pixel diffs that `toHaveScreenshot` can never reconcile.
 */
export async function captureScreenshot(target: Locator, name: string, options: CaptureOptions = {}): Promise<void> {
  if (!options.skipHover) {
    await (options.hoverAnchor ?? target).hover();
  }

  await waitForPageIdle(target);

  if (options.fitViewport) {
    await options.fitViewport.fitViewportToFullPage();
    await waitForPageIdle(target, { idleMs: 250 });
  }

  await expect(target).toHaveScreenshot(name, options.screenshotOptions);
}
