import { expect, Locator, Page } from '@playwright/test';
import { fitViewportToFullPage } from '@/utils/viewport';

type ScreenshotOptions = Parameters<Locator['screenshot']>[0];

interface CaptureOptions {
  /** Hovered before the shot. Defaults to `target`. */
  hoverAnchor?: Locator;
  /** Skip the hover step (for hover-sensitive widgets). */
  skipHover?: boolean;
  /** Fit viewport to full `<main>` before snapshotting. */
  fitViewport?: boolean;
  /** Forwarded to `toHaveScreenshot`. */
  screenshotOptions?: ScreenshotOptions;
}

const sleep = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));

/** Waits until the page is quiet for `idleMs`: fonts ready, no DOM mutations, stable bbox. */
async function waitForPageIdle(
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

  // Cross-check: two consecutive bbox samples agree.
  for (let i = 0; i < 10; i++) {
    const a = await target.boundingBox();
    await sleep(50);
    const b = await target.boundingBox();
    if (a && b && a.width === b.width && a.height === b.height) return;
  }
}

/**
 * Stable region screenshot: hover → wait idle → (optionally) fit viewport → `toHaveScreenshot`.
 *
 * Avoids pinning inline width/height on `target`, which would freeze
 * mid-animation sizes and cause persistent pixel diffs.
 */
export async function captureScreenshot(
  target: Locator,
  name: string,
  options: CaptureOptions = {},
): Promise<void> {
  if (!options.skipHover) await (options.hoverAnchor ?? target).hover();

  await waitForPageIdle(target);

  if (options.fitViewport) {
    await fitViewportToFullPage(target.page());
    await waitForPageIdle(target, { idleMs: 250 });
  }

  await expect(target).toHaveScreenshot(name, options.screenshotOptions);
}
