import { existsSync } from 'fs';
import path from 'path';
import { expect, Locator, Page } from '@playwright/test';
import { fitViewportToFullPage } from '@/utils/viewport';
import { config } from '@/utils/config';

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

// Playwright writes the actual image whenever the expected one is absent — even under CI, and
// even if the error is caught — so the only way to keep a container run from minting committed
// screenshots is to check before comparing. `--update-snapshots` bypasses this entirely.
async function compareScreenshot(target: Locator, name: string, options?: ScreenshotOptions): Promise<void> {
  if (config.snapshotsAreShared && !existsSync(path.join(config.paths.snapshotDir, name))) {
    throw new Error(
      `No committed screenshot "${name}" in ${config.paths.snapshotDir}. Container runs never create them — ` +
        `add it deliberately with \`./run_pw.sh -u\` and commit it for review.`
    );
  }

  await expect(target).toHaveScreenshot(name, options);
}

const IDLE_MS = 400;
const MAX_WAIT_MS = 8_000;

// With `animations: 'disabled'` a skeleton loader is a "stable" frame, so Playwright's own
// frame-stabilisation would shoot it before the data swaps in. Waiting for DOM quiet avoids that.
async function waitForPageIdle(page: Page): Promise<void> {
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
    { idleMs: IDLE_MS, maxWaitMs: MAX_WAIT_MS }
  );
}

/**
 * The one way to take a screenshot: hover → wait idle → (optionally) fit viewport → compare.
 * A spec that has positioned the page itself passes `skipHover: true` rather than reaching for
 * a lower-level helper, so it keeps the idle wait.
 */
export async function captureScreenshot(target: Locator, name: string, options: CaptureOptions = {}): Promise<void> {
  if (!options.skipHover) await (options.hoverAnchor ?? target).hover();

  await waitForPageIdle(target.page());

  if (options.fitViewport) {
    await fitViewportToFullPage(target.page());
    await waitForPageIdle(target.page());
  }

  await compareScreenshot(target, name, options.screenshotOptions);
}
