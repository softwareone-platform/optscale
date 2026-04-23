import { Locator, Page } from '@playwright/test';
import * as path from 'path';
import { debugLog, errorLog } from '@/utils/debug-logging';
import { LARGE_DATA_TIMEOUT } from '@/playwright.config';

const TEST_OVERRIDES_CSS_PATH = path.resolve(__dirname, '../styles/test-overrides.css');

/**
 * Abstract class representing the base structure for all pages.
 */
export abstract class BasePage {
  readonly page: Page;
  readonly url: string;
  readonly main: Locator;
  readonly initialisationMessage: Locator;
  readonly loadingPageImg: Locator;
  readonly progressBar: Locator;
  readonly table: Locator;

  protected constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
    this.main = this.page.locator('main');
    this.table = this.main.locator('table');
    this.initialisationMessage = this.page.getByTestId('p_initializing');
    this.loadingPageImg = this.page.getByRole('img', { name: 'Loading page' });
    this.progressBar = this.page.locator('//main[@id="mainLayoutWrapper"]//*[@role="progressbar"]');
  }

  getByAnyTestId(testId: string, root: Locator | Page = this.page): Locator {
    return root.locator(`[data-test-id="${testId}"], [data-testid="${testId}"]`);
  }

  async navigateToURL(customUrl: string = null): Promise<void> {
    debugLog(`Navigating to URL: ${customUrl ? customUrl : this.url}`);
    await this.page.goto(customUrl ? customUrl : this.url, { waitUntil: 'load' });
    await this.page.addStyleTag({ path: TEST_OVERRIDES_CSS_PATH });
    await this.waitForLoadingPageImgToDisappear();
  }

  async fitViewportToFullPage(): Promise<void> {
    const MAX_HEIGHT = 12_000;
    const HEADER_HEIGHT = 80;
    const MAX_ITERATIONS = 5;

    const { width } = this.page.viewportSize() ?? { width: 1280 };

    // Iterate: resize viewport → measure content → resize again if the
    // content height changed (which it can, because resizing the viewport
    // itself triggers reflow — especially in responsive layouts).
    //
    // Stops as soon as two consecutive measurements agree or when we hit
    // `MAX_ITERATIONS`. This avoids the old two-step (shrink-to-768, then
    // grow) pattern which caused 12–50 px differences on pages with
    // flex/grid children whose height depended on the current viewport.
    let previousHeight = 0;
    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const contentHeight = await this.page.evaluate(() => {
        const wrapper = document.querySelector('main#mainLayoutWrapper');
        if (!wrapper) return 0;
        return Array.from(wrapper.children).reduce((sum, child) => sum + (child as HTMLElement).offsetHeight, 0);
      });

      const targetHeight = Math.min(contentHeight + HEADER_HEIGHT, MAX_HEIGHT);
      if (targetHeight === previousHeight) break;

      await this.page.setViewportSize({ width, height: targetHeight });

      await this.page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));

      previousHeight = targetHeight;
    }
  }

  /**
   * Resolves when any (default) or all `<canvas>` elements on the page have
   * painted at least one non-transparent pixel.
   */
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

  async evaluateActiveButton(button: Locator): Promise<boolean> {
    return await button.evaluate(el => {
      return Array.from(el.classList).some(className => className.endsWith('-button-activeButton'));
    });
  }

  async waitForLoadingPageImgToDisappear(timeout: number = LARGE_DATA_TIMEOUT): Promise<void> {
    try {
      await this.loadingPageImg.first().waitFor({ timeout: 1000 });
    } catch {
      return;
    }
    try {
      debugLog('Waiting for loading page image to disappear...');
      await this.loadingPageImg.waitFor({ state: 'hidden', timeout });
    } catch {
      errorLog('Loading page image did not disappear within the timeout.');
    }
  }

  async waitForAllProgressBarsToDisappear(timeout: number = 10000): Promise<void> {
    try {
      await this.progressBar.first().waitFor({ timeout: 1000 });
    } catch {
      return;
    }
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
