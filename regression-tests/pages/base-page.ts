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
        return Array.from(wrapper.children).reduce(
          (sum, child) => sum + (child as HTMLElement).offsetHeight,
          0,
        );
      });

      const targetHeight = Math.min(contentHeight + HEADER_HEIGHT, MAX_HEIGHT);
      if (targetHeight === previousHeight) break;

      await this.page.setViewportSize({ width, height: targetHeight });

      // Two rAFs give the browser a full commit cycle before we re-measure.
      await this.page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
          ),
      );

      previousHeight = targetHeight;
    }
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
