import { expect, Locator, Page } from '@playwright/test';

type ScreenshotOptions = Parameters<Locator['screenshot']>[0];

export interface CaptureOptions {
  /** Element hovered before the shot. Defaults to `target`. */
  hoverAnchor?: Locator;
  /** Skip the hover step entirely (for hover-sensitive widgets). */
  skipHover?: boolean;
  /** Page object exposing `fitViewportToFullPage()` — resizes before snapshotting. */
  fitViewport?: { fitViewportToFullPage: () => Promise<void> };
  /** Forwarded to `toHaveScreenshot`. */
  screenshotOptions?: ScreenshotOptions;
}

const sleep = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));

/**
 * Waits until the page has been quiet for `idleMs` in a row.
 * Combines fonts-ready, DOM-mutation silence, and a bbox cross-check to
 * catch CSS-only transitions (e.g. MUI Accordion) that don't fire mutations.
 */
export async function waitForPageIdle(
  target: Locator,
  { idleMs = 400, maxWaitMs = 8_000 }: { idleMs?: number; maxWaitMs?: number } = {},
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
          if (performance.now() > deadline) return done();
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
    { idleMs, maxWaitMs },
  );

  // Cross-check: two consecutive bbox samples match.
  for (let i = 0; i < 10; i++) {
    const a = await target.boundingBox();
    await sleep(50);
    const b = await target.boundingBox();
    if (a && b && a.width === b.width && a.height === b.height) return;
  }
}

/**
 * Take a stable screenshot of a region: hover → wait idle → (optionally)
 * fit viewport and wait again → `toHaveScreenshot`.
 *
 * Deliberately does NOT pin inline width/height on `target` — that freezes
 * mid-animation sizes and causes persistent pixel diffs.
 */
export async function captureScreenshot(
  target: Locator,
  name: string,
  options: CaptureOptions = {},
): Promise<void> {
  if (!options.skipHover) await (options.hoverAnchor ?? target).hover();

  await waitForPageIdle(target);

  if (options.fitViewport) {
    await options.fitViewport.fitViewportToFullPage();
    await waitForPageIdle(target, { idleMs: 250 });
  }

  await expect(target).toHaveScreenshot(name, options.screenshotOptions);
}
