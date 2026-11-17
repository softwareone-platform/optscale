import { Locator, Page } from '@playwright/test';
import * as path from 'path';
import { debugLog, errorLog } from '@/utils/debug-logging';
import { config } from '@/utils/config';

const TEST_OVERRIDES_CSS_PATH = path.resolve(__dirname, '../styles/test-overrides.css');
const LARGE_DATA_TIMEOUT = 60_000;
const PROGRESS_BAR_TIMEOUT = 10_000;
const PROBE_POLL_MS = 150;

/** Base class for all page objects. */
export abstract class BasePage {
  readonly page: Page;
  readonly url: string;
  readonly main: Locator;
  readonly header: Locator;
  readonly pageContentWrapper: Locator;
  readonly loadingPageImage: Locator;
  readonly progressBar: Locator;
  readonly table: Locator;

  protected constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
    this.main = this.page.locator('main');
    // Page title bar (ActionBar) — the first AppBar inside `main`. It precedes
    // `#page-content-wrapper`, so `.first()` skips the nested table action bars.
    // Some pages (e.g. connect) wrap it a level deeper, so match by descendant.
    this.header = this.main.locator('.MuiAppBar-root').first();
    this.pageContentWrapper = this.main.locator('#page-content-wrapper');
    this.table = this.main.locator('table');
    this.loadingPageImage = this.page.getByRole('img', { name: 'Loading page' });
    this.progressBar = this.page.locator('//main[@id="mainLayoutWrapper"]//*[@role="progressbar"]');
  }

  /**
   * Non-throwing "did this element appear?" probe. Polls visibility for up to
   * `timeout` ms and resolves true/false instead of throwing.
   *
   * A caught `waitFor` timeout still records a red (error) step in the
   * Playwright report/trace even though the test passes — misleading noise on
   * every page that legitimately never renders the probed element. Polling
   * `isVisible` (which returns rather than throws) keeps the same
   * wait-for-appearance semantics without the phantom error.
   */
  protected async probeVisible(locator: Locator, timeout: number = config.timeouts.probe): Promise<boolean> {
    const deadline = Date.now() + timeout;
    let visible = await locator.first().isVisible();
    while (!visible && Date.now() < deadline) {
      await new Promise(resolve => setTimeout(resolve, PROBE_POLL_MS));
      visible = await locator.first().isVisible();
    }
    return visible;
  }

  async navigateToURL(customUrl?: string): Promise<void> {
    const target = customUrl ?? this.url;
    debugLog(`Navigating to URL: ${target}`);
    await this.page.goto(target, { waitUntil: 'load' });
    await this.page.addStyleTag({ path: TEST_OVERRIDES_CSS_PATH });
    await this.waitForLoadingPageImageToDisappear();
    await this.waitForSkeletonsToDisappear();
  }

  /**
   * Waits for MUI skeleton loaders to swap to real data. Skeletons are a
   * "stable" frame under `animations: 'disabled'`, so without this a screenshot
   * (or the header's stability check) can latch onto the still-loading page.
   */
  async waitForSkeletonsToDisappear(timeout: number = LARGE_DATA_TIMEOUT): Promise<void> {
    const skeleton = this.main.locator('.MuiSkeleton-root');
    if (!(await this.probeVisible(skeleton))) return; // No skeletons rendered on this page.
    try {
      await this.page.waitForFunction(() => document.querySelectorAll('main .MuiSkeleton-root').length === 0, undefined, { timeout });
    } catch {
      errorLog('Skeleton loaders did not disappear within the timeout.');
    }
  }

  /** Resolves when any (default) or all `<canvas>` elements have painted at least one non-transparent pixel. */
  async waitForCanvas(mode: 'any' | 'all' = 'any', timeout: number = LARGE_DATA_TIMEOUT): Promise<void> {
    await this.page.waitForFunction(
      requiredMode => {
        const hasPixels = (canvas: HTMLCanvasElement) => {
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          return !!ctx && ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(pixel => pixel !== 0);
        };
        const canvases = Array.from(document.querySelectorAll('canvas'));
        return requiredMode === 'any' ? canvases.some(hasPixels) : canvases.every(hasPixels);
      },
      mode,
      { timeout }
    );
  }

  async waitForTextContent(locator: Locator, expectedText: string): Promise<void> {
    await locator.filter({ hasText: expectedText }).waitFor();
  }

  async isButtonActive(button: Locator): Promise<boolean> {
    return await button.evaluate(el => {
      return Array.from(el.classList).some(className => className.endsWith('-button-activeButton'));
    });
  }

  async waitForLoadingPageImageToDisappear(timeout: number = LARGE_DATA_TIMEOUT): Promise<void> {
    if (!(await this.probeVisible(this.loadingPageImage))) return;
    try {
      debugLog('Waiting for loading page image to disappear...');
      await this.loadingPageImage.waitFor({ state: 'hidden', timeout });
    } catch {
      errorLog('Loading page image did not disappear within the timeout.');
    }
  }

  async waitForAllProgressBarsToDisappear(timeout: number = PROGRESS_BAR_TIMEOUT): Promise<void> {
    if (!(await this.probeVisible(this.progressBar))) return;
    debugLog(`Waiting for ${await this.progressBar.count()} total progress bar(s) to disappear...`);
    try {
      await this.page.waitForFunction(
        () =>
          Array.from(document.querySelectorAll('main#mainLayoutWrapper [role="progressbar"]')).every(el => {
            const style = window.getComputedStyle(el);
            return style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
          }),
        null,
        { timeout }
      );
    } catch {
      errorLog(`${await this.progressBar.count()} progress bar(s) still visible at wait timeout`);
    }
  }
}

/**
 * Base for list pages that pair a heading with an "Add" button (`btn_add`).
 * `buildHeading` receives `main` so subclasses can locate the heading however
 * they need (test id, text, XPath) without duplicating the `main` locator.
 */
export abstract class HeadingWithAddButtonPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;

  protected constructor(page: Page, url: string, buildHeading: (main: Locator) => Locator) {
    super(page, url);
    this.heading = buildHeading(this.main);
    this.addBtn = this.main.getByTestId('btn_add');
  }
}
