import { Locator, Page } from '@playwright/test';
import * as path from 'path';
import { debugLog, errorLog } from '@/utils/debug-logging';
import { LARGE_DATA_TIMEOUT } from '@/playwright.config';

const TEST_OVERRIDES_CSS_PATH = path.resolve(__dirname, '../styles/test-overrides.css');

/** Base class for all page objects. */
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


  async navigateToURL(customUrl: string = null): Promise<void> {
    debugLog(`Navigating to URL: ${customUrl ? customUrl : this.url}`);
    await this.page.goto(customUrl ? customUrl : this.url, { waitUntil: 'load' });
    await this.page.addStyleTag({ path: TEST_OVERRIDES_CSS_PATH });
    await this.waitForLoadingPageImgToDisappear();
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
