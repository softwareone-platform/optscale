import { Locator, Page } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { debugLog, errorLog } from '../utils/debug-logging';

/**
 * Abstract class representing the base structure for all pages.
 * This class provides common functionality for interacting with web pages in Playwright tests.
 */
export abstract class BasePage {
  readonly page: Page; // The Playwright page object representing the current page.
  readonly url: string; // The URL of the page.
  readonly main: Locator;
  readonly initialisationMessage: Locator;
  readonly loadingPageImg: Locator;
  readonly progressBar: Locator;
  readonly tooltip: Locator;
  readonly table: Locator;
  readonly infoColor: string; // Default color for neutral state
  readonly warningColor: string; // Default color for warning state
  readonly errorColor: string; // Default color for error state
  readonly successColor: string; // Default color for success state

  // Filters
  readonly filtersBox: Locator;
  readonly allFilterBoxButtons: Locator;
  readonly filterPopover: Locator;
  readonly suggestionsFilter: Locator;
  readonly dataSourceFilter: Locator;
  readonly poolFilter: Locator;
  readonly ownerFilter: Locator;
  readonly regionFilter: Locator;
  readonly serviceFilter: Locator;
  readonly resourceTypeFilter: Locator;
  readonly activityFilter: Locator;
  readonly recommendationsFilter: Locator;
  readonly constraintViolationsFilter: Locator;
  readonly firstSeenFilter: Locator;
  readonly lastSeenFilter: Locator;
  readonly tagFilter: Locator;
  readonly withoutTagFilter: Locator;
  readonly metaFilter: Locator;
  readonly paidNetworkTrafficFromFilter: Locator;
  readonly paidNetworkTrafficToFilter: Locator;
  readonly filterApplyButton: Locator;
  readonly resetFiltersBtn: Locator;
  readonly showMoreFiltersBtn: Locator;
  readonly showLessFiltersBtn: Locator;

  /**
   * Initializes a new instance of the BasePage class.
   * @param {Page} page - The Playwright page object.
   * @param {string} url - The URL of the page.
   */
  protected constructor(page: Page, url: string) {
    this.page = page;
    this.url = url;
    this.main = this.page.locator('main');
    this.table = this.main.locator('table');
    this.initialisationMessage = this.page.getByTestId('p_initializing');
    this.loadingPageImg = this.page.getByRole('img', { name: 'Loading page' });
    this.progressBar = this.page.locator('//main[@id="mainLayoutWrapper"]//*[@role="progressbar"]');
    this.tooltip = this.page.getByRole('tooltip');
    this.infoColor = 'rgb(0, 0, 0)'; // Default color for neutral state
    this.warningColor = 'rgb(232, 125, 30)'; // Default color for warning state
    this.errorColor = 'rgb(187, 20, 37)'; // Default color for error state
    this.successColor = 'rgb(0, 120, 77)'; // Default color for success state

    //Filters
    this.filtersBox = this.main.locator('xpath=(//div[.="Filters:"])[1]/..');
    this.allFilterBoxButtons = this.filtersBox.locator('button');
    this.filterPopover = this.page.locator('//div[contains(@id, "filter-popover")]');
    this.filterApplyButton = this.filterPopover.getByRole('button', { name: 'Apply' });

    this.suggestionsFilter = this.filtersBox.getByRole('button', { name: 'Suggestions' });
    this.dataSourceFilter = this.filtersBox.getByRole('button', { name: 'Data source (' });
    this.poolFilter = this.filtersBox.getByRole('button', { name: 'Pool (' });
    this.ownerFilter = this.filtersBox.getByRole('button', { name: 'Owner (' });
    this.regionFilter = this.filtersBox.getByRole('button', { name: 'Region (' });
    this.serviceFilter = this.filtersBox.getByRole('button', { name: /^Service \(/ });
    this.resourceTypeFilter = this.filtersBox.getByRole('button', { name: 'Resource type (' });
    this.activityFilter = this.filtersBox.getByRole('button', { name: 'Activity (' });
    this.recommendationsFilter = this.filtersBox.getByRole('button', { name: 'Recommendations (' });
    this.constraintViolationsFilter = this.filtersBox.getByRole('button', { name: 'Constraint violations (' });
    this.firstSeenFilter = this.filtersBox.getByRole('button', { name: 'First seen (' });
    this.lastSeenFilter = this.filtersBox.getByRole('button', { name: 'Last seen (' });
    this.tagFilter = this.filtersBox.getByRole('button', { name: /^Tag \(/ });
    this.withoutTagFilter = this.filtersBox.getByRole('button', { name: 'Without tag (' });
    this.metaFilter = this.filtersBox.getByRole('button', { name: 'Meta (' });
    this.paidNetworkTrafficFromFilter = this.filtersBox.getByRole('button', { name: 'Paid network traffic from (' });
    this.paidNetworkTrafficToFilter = this.filtersBox.getByRole('button', { name: 'Paid network traffic to (' });
    this.resetFiltersBtn = this.main.getByRole('button', { name: 'Reset filters' });
    this.showMoreFiltersBtn = this.main.getByRole('button', { name: 'Show more' });
    this.showLessFiltersBtn = this.main.getByRole('button', { name: 'Show less' });
  }

  /**
   * Navigates to the page URL.
   *
   * This method navigates to either a custom URL or the default page URL and waits
   * for the loading page image to disappear before continuing.
   *
   * @param {string | null} [customUrl=null] - Optional custom URL to navigate to. If not provided, uses the page's default URL.
   * @returns {Promise<void>} A promise that resolves when navigation is complete and the page has loaded.
   *
   * @example
   * // Navigate to the default page URL
   * await resourcesPage.navigateToURL();
   *
   * @example
   * // Navigate to a custom URL
   * await resourcesPage.navigateToURL('/resources?filter=active');
   *
   * @remarks
   * This method waits for the 'load' event and also ensures the loading spinner/image
   * has disappeared, providing a more reliable indication that the page is ready for interaction.
   */
  async navigateToURL(customUrl: string = null): Promise<void> {
    debugLog(`Navigating to URL: ${customUrl ? customUrl : this.url}`);
    await this.page.goto(customUrl ? customUrl : this.url, { waitUntil: 'load' });
    await this.waitForLoadingPageImgToDisappear();
  }

  /**
   * Fits the viewport to the full height of the page content.
   *
   * This method adjusts the browser viewport to match the full scrollable height
   * of the main content wrapper, up to a maximum height limit. This is useful
   * for capturing full-page screenshots or ensuring all content is visible
   * without scrolling.
   *
   * @returns {Promise<void>} A promise that resolves when the viewport has been resized.
   *
   * @example
   * // Fit viewport before taking a full-page screenshot
   * await resourcesPage.fitViewportToFullPage();
   * await resourcesPage.page.screenshot({ path: 'full-page.png' });
   *
   * @example
   * // Ensure all table rows are visible for testing
   * await poolsPage.fitViewportToFullPage();
   * const rowCount = await poolsPage.table.locator('tr').count();
   *
   * @remarks
   * - The viewport width remains unchanged to maintain consistency
   * - Maximum height is capped at 12000px to avoid GPU/OS limitations
   * - Includes an 80px header height adjustment
   * - If the main content wrapper is not found, returns 0 height (no resize)
   */
  async fitViewportToFullPage(): Promise<void> {
    const { maxHeight = 12000 } = {};
    const headerHeight = 80;
    // Get current width (keep it stable) and full content height
    const { width } = this.page.viewportSize() ?? { width: 1280 };
    const scrollHeight = await this.page.evaluate(() => {
      const contentWrapper = document.querySelector('main#mainLayoutWrapper') as HTMLElement | null;
      if (!contentWrapper) return 0;
      return Math.max(contentWrapper.scrollHeight, contentWrapper.offsetHeight, contentWrapper.clientHeight);
    });

    // Clamp to avoid GPU/OS caps (varies by browser/os)
    const targetHeight = Math.min(scrollHeight + headerHeight, maxHeight);

    await this.page.setViewportSize({ width, height: targetHeight });
  }

  /**
   * Locates an element by either `data-test-id` or `data-testid` attribute.
   *
   * This method provides a unified way to query elements that may use either the
   * hyphenated (`data-test-id`) or the camelCase-style (`data-testid`) test ID
   * attribute convention, returning the first match for either variant.
   *
   * @param {string} testId - The test ID value to search for.
   * @param {Locator | Page} [root=this.page] - The root element or page to scope the search within.
   *   Defaults to the current page, but can be narrowed to a specific locator for scoped queries.
   * @returns {Locator} A Playwright locator matching elements with the given test ID under either attribute name.
   *
   * @example
   * // Find an element by test ID anywhere on the page
   * const submitBtn = basePage.getByAnyTestId('submit-button');
   * await submitBtn.click();
   *
   * @example
   * // Scope the search to a specific container
   * const modal = page.locator('.modal');
   * const confirmBtn = basePage.getByAnyTestId('confirm-button', modal);
   * await confirmBtn.click();
   *
   * @remarks
   * This method is useful when the codebase is inconsistent about which test ID
   * attribute convention is used (`data-test-id` vs `data-testid`), allowing tests
   * to remain resilient regardless of which attribute is present on the element.
   */
  getByAnyTestId(testId: string, root: Locator | Page = this.page): Locator {
    return root.locator(`[data-test-id="${testId}"], [data-testid="${testId}"]`);
  }


  /**
   * Selects an option from a combo box if it is not already selected.
   *
   * Reads the currently selected value and, if it differs from the desired option,
   * opens the dropdown and clicks the matching option by its exact name. Optionally
   * dismisses the dropdown afterwards by clicking the page body.
   *
   * @param {Locator} comboBox - The Playwright locator representing the combo box element.
   * @param {string} option - The exact text of the option to select (case-sensitive).
   * @param {boolean} [closeList=false] - When `true`, clicks the page body after selection
   *   to close the dropdown. Useful when subsequent interactions require the list to be dismissed.
   * @returns {Promise<void>} Resolves when the option is selected, or immediately if it was already selected.
   *
   * @example
   * // Select 'Monthly' from a period combo box
   * await basePage.selectFromComboBox(periodComboBox, 'Monthly');
   *
   * @example
   * // Select an option and close the dropdown afterwards
   * await basePage.selectFromComboBox(regionComboBox, 'US East', true);
   */
  async selectFromComboBox(comboBox: Locator, option: string, closeList: boolean = false): Promise<void> {
    if ((await this.selectedComboBoxOption(comboBox)) !== option) {
      await comboBox.click();
      await this.page.getByRole('option', { name: option, exact: true }).click();
      if (closeList) await this.page.locator('body').click();
    }
  }

  /**
   * Retrieves the currently selected option text from a combo box.
   *
   * Reads the text content of the first child `div` inside the combo box element,
   * which is expected to display the currently selected value, and returns it trimmed.
   *
   * @param {Locator} comboBox - The Playwright locator representing the combo box element.
   * @returns {Promise<string>} Resolves to the trimmed text of the selected option,
   *   or `undefined` if no text content is found.
   *
   * @example
   * const selected = await basePage.selectedComboBoxOption(periodComboBox);
   * expect(selected).toBe('Monthly');
   *
   * @remarks
   * Relies on the combo box having a first child `div` that holds the displayed value.
   * If the combo box DOM structure differs, this method may not return the expected result.
   */
  async selectedComboBoxOption(comboBox: Locator): Promise<string> {
    return (await comboBox.locator('xpath=/div[1]').textContent())?.trim();
  }

  /**
   * Waits for the page to load completely.
   * This method uses Playwright's `waitForLoadState` to ensure the page has reached the 'load' state.
   * An optional timeout can be provided to override the default waiting time.
   *
   * @param {number} [timeout] - Optional timeout in milliseconds to wait for the page load state.
   * @returns {Promise<void>} A promise that resolves when the page has fully loaded.
   */
  async waitForPageLoad(timeout?: number): Promise<void> {
    const options = timeout ? { timeout } : undefined; // Set timeout options if provided.
    await this.page.waitForLoadState('load', options); // Wait for the page to reach the 'load' state.
  }

  /**
   * Waits for at least one canvas element on the page to have non-zero pixel data.
   *
   * This method polls the DOM until any `<canvas>` element contains at least one
   * non-zero pixel in its 2D rendering context, indicating that it has finished
   * rendering. It is useful for ensuring charts or visual elements are fully painted
   * before taking screenshots or making visual assertions.
   *
   * @param {number} [timeout=20000] - Maximum time in milliseconds to wait for a canvas
   *   to contain non-zero pixel data. Defaults to 20000ms (20 seconds).
   * @returns {Promise<void>} Resolves as soon as at least one canvas has rendered content,
   *   or rejects if the timeout is exceeded before any canvas renders.
   *
   * @example
   * // Wait for a chart to finish rendering before taking a screenshot
   * await basePage.waitForCanvas();
   * await basePage.page.screenshot({ path: 'chart.png' });
   *
   * @example
   * // Use a custom timeout for slow-rendering canvases
   * await basePage.waitForCanvas(30000);
   *
   * @remarks
   * - Uses `willReadFrequently: true` on the canvas context for optimised pixel reads.
   * - Only requires **one** canvas to be non-empty; use `waitForAllCanvases` if all
   *   canvases must be rendered before proceeding.
   * - If no `<canvas>` elements are present on the page, this method will wait until
   *   the timeout is reached.
   */
  async waitForCanvas(timeout: number = 20000): Promise<void> {
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

  /**
   * Waits for all canvas elements on the page to have non-zero pixel data.
   *
   * This method polls the DOM until every `<canvas>` element contains at least one
   * non-zero pixel in its 2D rendering context, indicating that all canvases have
   * finished rendering. Use this when multiple charts or visual elements must all be
   * fully painted before proceeding.
   *
   * @returns {Promise<void>} Resolves when every canvas on the page has rendered content,
   *   or rejects if the default Playwright timeout is exceeded.
   *
   * @example
   * // Wait for all charts to finish rendering before taking a screenshot
   * await basePage.waitForAllCanvases();
   * await basePage.page.screenshot({ path: 'dashboard.png' });
   *
   * @remarks
   * - Uses `willReadFrequently: true` on each canvas context for optimised pixel reads.
   * - Requires **all** canvases to be non-empty; use `waitForCanvas` if only one canvas
   *   needs to be rendered before proceeding.
   * - If no `<canvas>` elements are present on the page, this method resolves immediately
   *   since `every` returns `true` for an empty array.
   * - No explicit timeout parameter is exposed; the default Playwright function timeout applies.
   */
  async waitForAllCanvases(): Promise<void> {
    await this.page.waitForFunction(() => {
      return Array.from(document.querySelectorAll('canvas')).every(canvas => {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        return ctx && ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(pixel => pixel !== 0);
      });
    });
  }

  /**
   * Waits for the text content of an element to include the expected text.
   *
   * This method filters the locator to match only elements containing the specified
   * text, then waits for that filtered element to appear in the DOM. It is useful for
   * asserting that dynamic content has been rendered before proceeding with further
   * interactions or assertions.
   *
   * @param {Locator} locator - The locator for the element whose text content is being checked.
   * @param {string} expectedText - The text expected to be present within the element's text content.
   * @returns {Promise<void>} Resolves when the element containing the expected text is attached to the DOM.
   *
   * @example
   * // Wait for a success message to appear
   * await basePage.waitForTextContent(basePage.tooltip, 'Saved successfully');
   *
   * @example
   * // Wait for a table cell to display a specific value
   * await basePage.waitForTextContent(basePage.table.locator('td').first(), '$1,234.56');
   *
   * @remarks
   * - Uses Playwright's `filter({ hasText })` which performs a substring match, not an exact match.
   * - The method waits for the element to be attached to the DOM but does not assert visibility.
   *   Use `toBeVisible()` for stricter visibility assertions.
   */
  async waitForTextContent(locator: Locator, expectedText: string): Promise<void> {
    await locator.filter({ hasText: expectedText }).waitFor();
  }

  /**
   * Evaluates whether a button element has the active button class.
   *
   * This method inspects the CSS class list of the given button element and returns
   * `true` if any class name ends with `-button-activeButton`, which is the convention
   * used in this codebase to mark a button as active/selected.
   *
   * @param {Locator} button - The Playwright locator for the button element to evaluate.
   * @returns {Promise<boolean>} Resolves to `true` if the button has the active class, `false` otherwise.
   *
   * @example
   * // Check if a toggle button is active before clicking
   * const isActive = await basePage.evaluateActiveButton(myToggleBtn);
   * console.log(`Button is active: ${isActive}`);
   *
   * @example
   * // Use with clickButtonIfNotActive to ensure a button is activated
   * await basePage.clickButtonIfNotActive(viewToggleBtn);
   *
   * @remarks
   * - The check is based on the CSS class suffix `-button-activeButton`, which is specific
   *   to MUI-based components in this project. If the component library changes, this
   *   detection logic may need to be updated.
   * - This method evaluates the element in the browser context via `element.evaluate`.
   */
  async evaluateActiveButton(button: Locator): Promise<boolean> {
    return await button.evaluate(el => {
      return Array.from(el.classList).some(className => className.endsWith('-button-activeButton'));
    });
  }

  /**
   * Clicks a button if it is not already active.
   *
   * This method checks whether the specified button has the active class.
   * If the button is not active, it performs a click action on the button.
   *
   * @param {Locator} button - The Playwright locator representing the button to be clicked.
   * @returns {Promise<void>} A promise that resolves when the button is clicked or skipped if already active.
   */
  async clickButtonIfNotActive(button: Locator): Promise<void> {
    if (!(await this.evaluateActiveButton(button))) {
      await button.click();
    }
  }

  /**
   * Checks if an element is marked as selected using the aria-selected attribute.
   *
   * This method retrieves the `aria-selected` attribute from the specified element
   * and returns true if its value is 'true', otherwise returns false.
   * This is commonly used for checking the selection state of elements in accessible
   * UI components like tabs, options in listboxes, or tree items.
   *
   * @param {Locator} element - The Playwright locator for the element to check.
   * @returns {Promise<boolean>} A promise that resolves to true if the element has aria-selected="true", false otherwise.
   *
   * @example
   * // Check if a tab is selected
   * const tab = page.getByRole('tab', { name: 'Overview' });
   * const isSelected = await basePage.isAriaSelected(tab);
   * if (isSelected) {
   *   console.log('Tab is currently selected');
   * }
   *
   * @example
   * // Use in an assertion
   * const option = page.getByRole('option', { name: 'Option 1' });
   * await expect(await basePage.isAriaSelected(option)).toBe(true);
   *
   * @remarks
   * This method checks the ARIA attribute rather than visual state, making it
   * more reliable for accessibility-compliant components. If the aria-selected
   * attribute is not present, the method will return false.
   */
  async isAriaSelected(element: Locator): Promise<boolean> {
    return (await element.getAttribute('aria-selected')) === 'true';
  }

  /**
   * Brings the current page to the front of the browser window stack.
   *
   * This method calls Playwright's `bringToFront` on the current page, ensuring it
   * is the active/focused tab. It is useful in multi-page or multi-context test
   * scenarios where focus may have shifted to another page or popup.
   *
   * @returns {Promise<void>} Resolves when the page has been brought to the front.
   *
   * @example
   * // Bring the main page back into focus after a popup was opened
   * await basePage.bringContextToFront();
   *
   * @remarks
   * - This is a thin wrapper around Playwright's `page.bringToFront()`.
   * - Has no effect if the page is already the active tab.
   */
  async bringContextToFront(): Promise<void> {
    await this.page.bringToFront();
  }

  /**
   * Waits for an element to be detached from the DOM.
   *
   * This method waits until the specified element is removed from the DOM entirely.
   * It is useful for asserting that a modal, tooltip, spinner, or other transient
   * element has been fully dismissed before proceeding.
   *
   * @param {Locator} element - The Playwright locator for the element to wait for detachment.
   * @returns {Promise<void>} Resolves when the element has been detached from the DOM,
   *   or rejects if the default Playwright timeout is exceeded.
   *
   * @example
   * // Wait for a loading spinner to be removed before interacting with the page
   * await basePage.waitForElementDetached(basePage.progressBar);
   *
   * @example
   * // Wait for a modal to be closed and removed from the DOM
   * await confirmModal.clickCancel();
   * await basePage.waitForElementDetached(confirmModal.dialog);
   *
   * @remarks
   * - Uses Playwright's `waitFor({ state: 'detached' })`, which waits for the element
   *   to be removed from the DOM, not just hidden.
   * - If the element is already detached when this method is called, it resolves immediately.
   */
  async waitForElementDetached(element: Locator): Promise<void> {
    await element.waitFor({ state: 'detached' });
  }

  /**
   * Introduces a conditional delay intended for use during screenshot update runs.
   *
   * When the `SCREENSHOT_UPDATE_DELAY` environment variable is set to `'true'`,
   * this method pauses execution for the specified duration to allow visual elements
   * to fully settle before a screenshot is captured. When the variable is not set,
   * this method resolves immediately without any delay.
   *
   * @param {number} [timeout=5000] - The delay duration in milliseconds. Defaults to 5000ms (5 seconds).
   * @returns {Promise<void>} Resolves after the delay if the env var is set, or immediately otherwise.
   *
   * @example
   * // Allow animations to settle before capturing a baseline screenshot
   * await basePage.screenshotUpdateDelay();
   * await expect(basePage.page).toMatchSnapshot('dashboard.png');
   *
   * @example
   * // Use a shorter delay for faster screenshot update runs
   * await basePage.screenshotUpdateDelay(2000);
   *
   * @remarks
   * - This method is a no-op in normal test runs; the delay is only applied when
   *   `SCREENSHOT_UPDATE_DELAY=true` is set in the environment.
   * - Prefer using this over a bare `delay()` call in screenshot-related tests to
   *   keep the delay behaviour configurable and skippable in CI.
   */
  async screenshotUpdateDelay(timeout: number = 5000): Promise<void> {
    if (process.env.SCREENSHOT_UPDATE_DELAY === 'true') {
      debugLog(`Waiting for ${timeout}ms for screenshot update...`);
      await new Promise(resolve => setTimeout(resolve, timeout));
    }
  }

  /**
   * Parses a currency value from a string input and converts it into a numeric value.
   * Handles various formats, including:
   * - Optional multipliers (e.g., 'k' for thousand, 'm' for million)
   * - Different decimal separator strategies (comma or dot)
   * - Negative values (e.g., '-$1.77')
   * - Approximate values with symbols (e.g., '≈$0')
   * - Currency symbols and prefixes
   *
   * @param {string} input - The string input representing the currency value.
   * @returns {number} The parsed numeric value, or NaN if the input is invalid.
   */
  parseCurrencyValue(input: string): number {
    if (!input) {
      throw Error(`parseCurrencyValue: Input is empty or null`);
    }

    // Lowercase for uniformity and trim whitespace
    let value = input.trim().toLowerCase();

    // Remove currency symbols and approximate symbols
    value = value.replace(/[$£€¥₹≈~]/g, '');

    // Match number part (including negative sign) and optional multiplier (e.g. 'k', 'm')
    const match = value.match(/([-\d.,]+)\s*([km])?/i);
    if (!match) {
      errorLog(`parseCurrencyValue: Unable to parse value from input "${input}"`);
      return NaN;
    }

    let numberPart = match[1];
    // Remove all whitespace from the number part
    numberPart = numberPart.replace(/ /g, '');
    const multiplierSuffix = match[2];

    // Determine decimal separator strategy
    const commaCount = (numberPart.match(/,/g) || []).length;
    const dotCount = (numberPart.match(/\./g) || []).length;

    if (commaCount > 0 && dotCount > 0) {
      // Mixed separators – assume last is decimal separator
      if (numberPart.lastIndexOf(',') > numberPart.lastIndexOf('.')) {
        numberPart = numberPart.replace(/\./g, '').replace(',', '.');
      } else {
        numberPart = numberPart.replace(/,/g, '');
      }
    } else if (commaCount > 0) {
      // Could be thousands or decimal separator
      const parts = numberPart.split(',');
      if (parts.length === 2 && parts[1].length <= 2) {
        numberPart = numberPart.replace(',', '.');
      } else {
        numberPart = numberPart.replace(/,/g, '');
      }
    } else {
      // Assume dot is decimal or nothing to clean
      numberPart = numberPart.replace(/,/g, '');
    }

    let result = parseFloat(numberPart);
    if (isNaN(result)) {
      throw Error(`parseCurrencyValue: Parsed number is NaN for input "${input}"`);
    }

    // Apply multiplier if present
    switch (multiplierSuffix) {
      case 'k':
        result *= 1_000;
        break;
      case 'm':
        result *= 1_000_000;
        break;
    }
    // debugLog(`parseCurrencyValue: Parsed "${input}" to ${result}`);
    return result;
  }

  /**
   * Calculates the sum of currency values in a column across multiple pages.
   * This method iterates through all pages of a table, extracts currency values from a specified column,
   * parses them into numeric values, and sums them up. It handles pagination by clicking the "next page" button
   * until no more pages are available or a zero value is encountered (indicating all subsequent values will be zero).
   *
   * @param {Locator} columnLocator - The Playwright locator for the column containing currency values.
   * @param {Locator} nextPageBtn - The Playwright locator for the "next page" button.
   * @returns {Promise<number>} A promise that resolves to the total sum of currency values, rounded to two decimal places.
   */
  async sumCurrencyColumn(columnLocator: Locator, nextPageBtn: Locator): Promise<number> {
    await columnLocator.last().waitFor({ timeout: 10000 });
    let totalSum = 0;

    while (true) {
      // Wait for the last element in the column to be visible
      await columnLocator
        .last()
        .waitFor({ state: 'visible', timeout: 5000 })
        .catch(() => {});

      // Extract text content from all cells in the column
      const texts = await columnLocator.allTextContents();

      // Parse the currency values from the text content
      const values = texts.map(text => {
        const currencyOnly = text.split('(')[0].trim(); // Remove any text in parentheses
        return this.parseCurrencyValue(currencyOnly); // Convert the currency string to a numeric value
      });

      // Check if any value is zero and stop iteration
      if (values.some(val => val === 0)) {
        // Add only non-zero values before stopping
        totalSum += values.reduce((sum, val) => (val === 0 ? sum : sum + val), 0);
        debugLog('Encountered zero value, stopping iteration.');
        break;
      }

      // Add the parsed values to the total sum
      totalSum += values.reduce((sum, val) => sum + val, 0);

      // Check if the "next page" button is visible and enabled
      const isVisible = await nextPageBtn.isVisible();
      if (!isVisible) break;

      const isEnabled = await nextPageBtn.isEnabled();
      if (!isEnabled) break;

      // Navigate to the next page
      await nextPageBtn.click();
      await this.waitForPageLoad();
    }

    // Return the total sum rounded to two decimal places
    return parseFloat(totalSum.toFixed(2));
  }

  async sumCurrencyColumnWithoutPagination(columnLocator: Locator): Promise<number> {
    // Wait for the last element in the column to be visible
    await columnLocator
      .last()
      .waitFor({ state: 'visible', timeout: 5000 })
      .catch(() => {});

    // Extract text content from all cells in the column
    const texts = await columnLocator.allTextContents();

    // Parse the currency values from the text content
    const values = texts.map(text => {
      const currencyOnly = text.split('(')[0].trim(); // Remove any text in parentheses
      return this.parseCurrencyValue(currencyOnly); // Convert the currency string to a numeric value
    });

    // Return the total sum rounded to two decimal places
    return parseFloat(values.reduce((sum, val) => sum + val, 0).toFixed(2));
  }

  /**
   * Waits for the loading page image to disappear.
   * This method checks if the loading image is present and waits for it to become hidden.
   * It logs the waiting process and handles cases where the image does not disappear within the timeout.
   *
   * @param {number} [timeout=10000] - The maximum time to wait for the loading image to disappear, in milliseconds.
   * @returns {Promise<void>} A promise that resolves when the loading image is no longer visible or exits early if the image is not present.
   */
  async waitForLoadingPageImgToDisappear(timeout: number = 20000): Promise<void> {
    try {
      await this.loadingPageImg.first().waitFor({ timeout: 1000 });
    } catch (_error) {
      return; // Exit the method if the loading image is not present.
    }
    try {
      debugLog('Waiting for loading page image to disappear...');
      await this.loadingPageImg.waitFor({ state: 'hidden', timeout: timeout });
    } catch (_error) {
      errorLog('[ERROR] Loading page image did not disappear within the timeout.'); // Log a warning if the image remains visible after the timeout.
    }
  }

  /**
   * Waits for the initialisation message to disappear from the page.
   *
   * This method first checks if the initialisation message is present on the page.
   * If the message is found, it waits for it to disappear within the specified timeout.
   * If the message is not present, the method exits early.
   *
   * @param {number} [timeout=10000] - The maximum time to wait for the initialisation message to disappear, in milliseconds.
   * @returns {Promise<void>} A promise that resolves when the initialisation message is no longer visible or exits early if the message is not present.
   */
  async waitForInitialisationToComplete(timeout: number = 20000): Promise<void> {
    try {
      await this.initialisationMessage.first().waitFor({ timeout: 1000 });
    } catch (_error) {
      // Exit the method if the initialisation message is not present.
      return;
    }
    try {
      debugLog('Waiting for initialisaton message to disappear...');
      await this.initialisationMessage.waitFor({ state: 'hidden', timeout: timeout });
    } catch (_error) {
      errorLog('[ERROR] initialisaton message did not disappear within the timeout.');
    }
  }

  /**
   * Waits for all progress bars to disappear.
   *
   * This method checks if the Progress bar is present on the page and waits for all instances of it to become hidden.
   * It is useful for ensuring that the page has fully loaded before proceeding with further actions.
   *
   * @param {number} [timeout=10000] - The maximum time to wait for the spinner to disappear, in milliseconds.
   * @returns {Promise<void>} A promise that resolves when the spinner is no longer visible or the timeout is exceeded.
   */
  async waitForAllProgressBarsToDisappear(timeout: number = 10000): Promise<void> {
    try {
      await this.progressBar.first().waitFor({ timeout: 1000 });
    } catch (_error) {
      return; // Exit the method if the spinner is not present.
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

  /**
   * Clicks a button to trigger a download, saves the file, and optionally asserts its existence.
   *
   * @param triggerButton - The locator that triggers the download.
   * @param relativePath - Relative path to save the file (e.g., './downloads/file.png').
   * @returns The full absolute path to the saved file.
   */
  async downloadFile(triggerButton: Locator, relativePath: string): Promise<string> {
    const dir = path.dirname(relativePath);
    await triggerButton.waitFor();

    // Ensure download folder exists
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Wait for download event and trigger it
    const downloadPromise = this.page.waitForEvent('download');
    await triggerButton.click();
    const download = await downloadPromise;

    // Save to specified location
    await download.saveAs(relativePath);
    const absPath = path.resolve(relativePath);

    if (!fs.existsSync(absPath)) {
      throw new Error(`Download failed: ${absPath} does not exist`);
    }

    return absPath;
  }

  /**
   * Retrieves the computed color style of a given element.
   * This method waits for the element to be available in the DOM and then evaluates its computed style
   * to extract the `color` property.
   *
   * @param {Locator} element - The Playwright locator for the target element.
   * @returns {Promise<string>} A promise that resolves to the computed color value of the element (e.g., "rgb(255, 0, 0)").
   */
  async getColorFromElement(element: Locator): Promise<string> {
    await element.waitFor();
    return await element.evaluate(el => {
      return window.getComputedStyle(el).color;
    });
  }

  /**
   * Attaches a listener to log browser console errors.
   * This method listens for `console` events on the Playwright page and logs any messages
   * of type `error` to the Node.js console with a custom prefix.
   */
  attachConsoleErrorLogger() {
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`[Browser Console Error] ${msg.text()}`);
      }
    });
  }

  /**
   * Introduces a delay for a specified duration.
   *
   * This method creates a promise that resolves after the given number of milliseconds,
   * effectively pausing execution for the specified time.
   *
   * @param {number} ms - The duration of the delay in milliseconds.
   * @returns {Promise<void>} A promise that resolves after the specified delay.
   */
  async delay(ms: number): Promise<void> {
    debugLog(`Waiting for ${ms}ms...`);
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Clicks on a specified locator.
   *
   * This method performs a click action on the provided Playwright `Locator`.
   * It is useful for interacting with elements on the page, such as buttons, links, or other clickable elements.
   *
   * @param {Locator} locator - The Playwright locator representing the element to be clicked.
   * @returns {Promise<void>} A promise that resolves when the click action is completed.
   */
  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  /**
   * Toggles the state of a checkbox.
   * @param {Locator} checkbox - The locator for the checkbox element.
   * @returns {Promise<void>} A promise that resolves when the checkbox state is toggled.
   */
  async toggleCheckbox(checkbox: Locator): Promise<void> {
    const isChecked = await checkbox.isChecked();
    if (isChecked) {
      await checkbox.uncheck();
    } else {
      await checkbox.check();
    }
  }

  /**
   * Unchecks a checkbox if it is currently checked.
   *
   * This method evaluates the current state of the checkbox and performs
   * an uncheck action only if the checkbox is already checked.
   *
   * @param {Locator} checkbox - The Playwright locator representing the checkbox element.
   * @returns {Promise<void>} A promise that resolves when the checkbox is unchecked.
   */
  async uncheckCheckbox(checkbox: Locator): Promise<void> {
    const isChecked = await checkbox.isChecked();
    if (isChecked) {
      await checkbox.uncheck();
    }
  }

  /**
   * Checks a checkbox if it is currently unchecked.
   *
   * This method evaluates the current state of the checkbox and performs
   * a check action only if the checkbox is not already checked.
   *
   * @param {Locator} checkbox - The Playwright locator representing the checkbox element.
   * @returns {Promise<void>} A promise that resolves when the checkbox is checked.
   */
  async checkCheckbox(checkbox: Locator): Promise<void> {
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
    }
  }

  /**
   * Retrieves the current value from an input field.
   *
   * This method uses Playwright's `inputValue` function to fetch the value
   * of the specified input element.
   *
   * @param {Locator} input - The Playwright locator representing the input field.
   * @returns {Promise<string>} A promise that resolves to the current value of the input field as a string.
   */
  async getValueFromInput(input: Locator): Promise<string> {
    return await input.inputValue();
  }

  /**
   * Fills an input field with a new value only if the current value is different.
   *
   * This method retrieves the current value of the input field and compares it
   * with the provided value. If the values differ, the input field is cleared
   * and filled with the new value.
   *
   * @param {Locator} input - The Playwright locator representing the input field.
   * @param {string} value - The new value to set in the input field.
   * @returns {Promise<void>} A promise that resolves when the input field is updated.
   */
  async fillInputIfDifferent(input: Locator, value: string): Promise<void> {
    const currentValue = await this.getValueFromInput(input);
    if (currentValue !== value) {
      await input.clear();
      await input.fill(value);
    }
  }

  /**
   * Selects a filter by its text and applies the specified filter option.
   *
   * This method locates a filter button within the filters box by matching its name
   * with the provided `filter` parameter. It then applies the specified `filterOption`
   * to the selected filter.
   *
   * @param {string} filter - The name of the filter to select.
   * @param {string} filterOption - The specific filter option to apply.
   * @returns {Promise<void>} A promise that resolves when the filter is applied.
   */
  async selectFilterByText(filter: string, filterOption: string): Promise<void> {
    const filterLocator = this.filtersBox.getByRole('button', { name: new RegExp(`^${filter}`) });
    await this.selectFilter(filterLocator, filterOption);
  }

  /**
   * Clicks the "Show More Filters" button on the Resources page.
   * This method interacts with the `showMoreFiltersBtn` locator to expand the filters section.
   *
   * @returns {Promise<void>} Resolves when the button is clicked.
   */
  async clickShowMoreFilters(): Promise<void> {
    await this.showMoreFiltersBtn.click();
  }

  /**
   * Resets all filters on the page.
   *
   * This method checks if the "Reset Filters" button is visible, clicks it to reset all filters,
   * and optionally waits for the page loader to disappear and the canvas to update.
   *
   * @param {boolean} [wait=true] - Whether to wait for the page loader to disappear and the canvas to load after resetting the filters.
   * @returns {Promise<void>} Resolves when the filters are reset and the optional wait is complete.
   */
  async resetFilters(wait: boolean = true): Promise<void> {
    if (await this.resetFiltersBtn.isVisible()) {
      debugLog('Resetting all filters');
      await this.resetFiltersBtn.click();
      await this.resetFiltersBtn.waitFor({ state: 'hidden' });
      if (wait) {
        await this.waitForAllProgressBarsToDisappear();
        await this.waitForCanvas();
      }
    }
  }

  /**
   * Selects a filter and applies the specified filter option.
   *
   * @param {Locator} filter - The filter locator to select.
   * @param {string} filterOption - The specific filter option to apply.
   * @throws {Error} Throws an error if `filterOption` is not provided when `filter` is specified.
   * @returns {Promise<void>} A promise that resolves when the filter is applied.
   */
  protected async selectFilter(filter: Locator, filterOption: string): Promise<void> {
    if (filter) {
      if (!filterOption) {
        throw new Error('filterOption must be provided when filter is specified');
      }
      if (!(await filter.isVisible())) await this.showMoreFiltersBtn.click();
      await filter.click();

      await this.filterPopover.getByLabel(filterOption).click();
      await this.filterApplyButton.click();
    }
  }

  /**
   * Retrieves the currently active filter button from the filters box.
   *
   * This method locates and returns the filter button that has the "contained" style,
   * which indicates it is currently active or selected. Active filters are identified
   * by the presence of the "MuiButton-contained" CSS class.
   *
   * @returns {Locator} A Playwright locator for the active filter button.
   *
   * @example
   * // Get the active filter and verify it's visible
   * const activeFilter = await resourcesPage.getActiveFilter();
   * await expect(activeFilter).toBeVisible();
   *
   * @example
   * // Get the text of the active filter
   * const activeFilter = resourcesPage.getActiveFilter();
   * const filterText = await activeFilter.textContent();
   * console.log(`Active filter: ${filterText}`);
   *
   * @remarks
   * This method uses XPath to find buttons with the MUI "contained" variant class,
   * which is the visual style applied to active/selected filter buttons in the UI.
   * Note that this method is synchronous and returns a Locator immediately.
   */
  getActiveFilter(): Locator {
    return this.filtersBox.locator('//button[contains(@class, "MuiButton-contained")]');
  }
}
