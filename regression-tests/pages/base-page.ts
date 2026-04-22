import { Locator, Page } from '@playwright/test';
import * as path from 'path';
import { debugLog, errorLog } from '../utils/debug-logging';
import { LARGE_DATA_TIMEOUT } from '../playwright.config';

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
    const maxHeight = 12000;
    const headerHeight = 80;
    const { width } = this.page.viewportSize() ?? { width: 1280 };
    await this.page.setViewportSize({ width, height: 768 });
    const contentHeight = await this.page.evaluate(() => {
      const contentWrapper = document.querySelector('main#mainLayoutWrapper');
      if (!contentWrapper) return 0;
      return Array.from(contentWrapper.children).reduce(
        (sum, child) => sum + (child as HTMLElement).offsetHeight, 0
      );
    });
    const targetHeight = Math.min(contentHeight + headerHeight, maxHeight);
    await this.page.setViewportSize({ width, height: targetHeight });
    // Wait two animation frames for the layout to settle after viewport resize
    await this.page.evaluate(
      () => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())))
    );
  }

  async waitForCanvas(timeout: number = LARGE_DATA_TIMEOUT): Promise<void> {
    await this.page.waitForFunction(
      () => {
        const canvases = document.querySelectorAll('canvas');
        return Array.from(canvases).some(canvas => {
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          return ctx && ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(pixel => pixel !== 0);
        });
      },
      null,
      { timeout }
    );
  }

  async waitForAllCanvases(timeout: number = LARGE_DATA_TIMEOUT): Promise<void> {
    await this.page.waitForFunction(
      () => {
        return Array.from(document.querySelectorAll('canvas')).every(canvas => {
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          return ctx && ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(pixel => pixel !== 0);
        });
      },
      null,
      { timeout }
    );
  }

  async waitForAPIResponseByPartialTextMatch(urlText: string, timeout: number): Promise<void> {
    debugLog(`Waiting for ${urlText} API response`);
    await this.page.waitForResponse(
      response => response.url().includes(urlText) && response.status() === 200,
      { timeout }
    );
    debugLog(`API response including ${urlText} received`);
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
    } catch (_error) {
      return;
    }
    try {
      debugLog('Waiting for loading page image to disappear...');
      await this.loadingPageImg.waitFor({ state: 'hidden', timeout: timeout });
    } catch (_error) {
      errorLog('[ERROR] Loading page image did not disappear within the timeout.');
    }
  }

  async waitForAllProgressBarsToDisappear(timeout: number = 10000): Promise<void> {
    try {
      await this.progressBar.first().waitFor({ timeout: 1000 });
    } catch (_error) {
      return;
    }
    debugLog(`Waiting for ${await this.progressBar.count()} total progress bar(s) to disappear...`);
    try {
      await this.page.waitForFunction(
        () => {
          const xpath = '//main[@id="mainLayoutWrapper"]//*[@role="progressbar"]';
          const result = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
          const elements = [];
          for (let i = 0; i < result.snapshotLength; i++) {
            elements.push(result.snapshotItem(i));
          }
          return elements.every(element => {
            const style = window.getComputedStyle(element);
            return style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0';
          });
        },
        null,
        { timeout }
      );
    } catch {
      errorLog(`${await this.progressBar.count()} :Progress Bar(s) still visible at wait timeout`);
    }
  }
}
