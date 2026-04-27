import { expect, Locator, Page } from '@playwright/test';
import path from 'path';
import { fitViewportToFullPage } from '@/utils/viewport';

type ScreenshotOptions = Parameters<Locator['screenshot']>[0];

interface CaptureOptions {
  /** Element hovered before the shot. Defaults to `target`. */
  hoverAnchor?: Locator;
  /** Skip the hover step entirely (for hover-sensitive widgets). */
  skipHover?: boolean;
  /** Resize the viewport to fit the full `<main>` before snapshotting. */
  fitViewport?: boolean;
  /** Forwarded to `toHaveScreenshot`. */
  screenshotOptions?: ScreenshotOptions;
}

const sleep = (ms: number): Promise<void> => new Promise(r => setTimeout(r, ms));

/**
 * Inject `styles/no-scrollbars.css` into the page **at runtime**.
 *
 * Why this exists separately from Playwright's `expect.toHaveScreenshot.stylePath`:
 *  - `stylePath` injects styles during `toHaveScreenshot()`, *after* layout
 *    measurement is complete.
 *  - `fitViewportToFullPage` measures `scrollHeight` *before* the snapshot,
 *    so it needs the scrollbar rules applied earlier — otherwise platform
 *    scrollbar widths (Linux ~15 px, Windows ~17 px, macOS overlay 0 px)
 *    leak into the measured height and screenshots drift across machines.
 *
 * Only the scrollbar rules are needed for measurement; the antialiasing
 * rules in `pre-screenshot-styles.css` are pulled in by `stylePath` later.
 * Idempotent — repeated calls just append harmless duplicate `<style>` tags.
 */
async function applyNoScrollbarStyles(page: Page): Promise<void> {
  await page.addStyleTag({ path: NO_SCROLLBARS_STYLES_PATH });
}

const NO_SCROLLBARS_STYLES_PATH = path.resolve(__dirname, '..', 'styles', 'no-scrollbars.css');

/**
 * Waits until the page has been quiet for `idleMs` in a row.
 * Combines fonts-ready, DOM-mutation silence, and a bbox cross-check to
 * catch CSS-only transitions (e.g. MUI Accordion) that don't fire mutations.
 */
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
    await applyNoScrollbarStyles(target.page());
    await fitViewportToFullPage(target.page());
    await waitForPageIdle(target, { idleMs: 250 });
  }

  await expect(target).toHaveScreenshot(name, options.screenshotOptions);
}
