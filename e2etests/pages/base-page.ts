import {Locator, Page} from "@playwright/test";
import fs from "fs";
import path from "path";
import {debugLog} from "../utils/debug-logging";

/**
 * Abstract class representing the base structure for all pages.
 * This class provides common functionality for interacting with web pages in Playwright tests.
 */
export abstract class BasePage {
    readonly page: Page; // The Playwright page object representing the current page.
    readonly url: string; // The URL of the page.
    readonly main: Locator;
    readonly loadingPageImg: Locator;
    readonly pageLoader: Locator;
    readonly tooltip: Locator;

    readonly infoColor: string; // Default color for neutral state
    readonly warningColor: string; // Default color for warning state
    readonly errorColor: string; // Default color for error state
    readonly successColor: string; // Default color for success state

    /**
     * Initializes a new instance of the BasePage class.
     * @param {Page} page - The Playwright page object.
     * @param {string} url - The URL of the page.
     */
    protected constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
        this.main = this.page.locator('main');
        this.loadingPageImg = this.page.getByRole('img', {name: 'Loading page'});
        this.pageLoader = this.main.locator('[role="progressbar"]');
        this.tooltip = this.page.getByRole('tooltip');
        this.infoColor = 'rgb(0, 0, 0)'; // Default color for neutral state
        this.warningColor = 'rgb(232, 125, 30)'; // Default color for warning state
        this.errorColor = 'rgb(187, 20, 37)'; // Default color for error state
        this.successColor = 'rgb(0, 120, 77)'; // Default color for success state
    }

    /**
     * Navigates to the URL of the page.
     * @returns {Promise<void>} A promise that resolves when the navigation is complete.
     */
    async navigateToURL(customUrl: string = null): Promise<void> {
        await this.page.goto(customUrl ? customUrl : this.url, {waitUntil: "load"});
        await this.waitForLoadingPageImgToDisappear();
    }

    /**
     * Retrieves a locator for an element based on a test ID attribute.
     * This method searches for elements with either `data-test-id` or `data-testid` attributes
     * matching the provided test ID value.
     *
     * @param {string} testId - The test ID value to search for.
     * @param {Locator | Page} [root=this.page] - The root element or page to perform the search within.
     * Defaults to the current Playwright page.
     * @returns {Locator} A Playwright locator for the matching element(s).
     */
    getByAnyTestId(testId: string, root: Locator | Page = this.page): Locator {
        return root.locator(`[data-test-id="${testId}"], [data-testid="${testId}"]`);
    }

    /**
     * Selects an option from a combo box if it is not already selected.
     * @param {Locator} comboBox - The locator for the combo box element.
     * @param {string} option - The option to select from the combo box.
     * @param {boolean} [closeList=false] - Whether to close the list after selecting the option.
     * @returns {Promise<void>} A promise that resolves when the option is selected.
     */
    async selectFromComboBox(comboBox: Locator, option: string, closeList: boolean = false): Promise<void> {
        if (await this.selectedComboBoxOption(comboBox) !== option) {
            await comboBox.click();
            await this.page.getByRole('option', {name: option, exact: true}).click();
            if (closeList) await this.page.locator('body').click();
        }
    }

    /**
     * Retrieves the currently selected option from a combo box.
     * This method locates the text content of the selected option within the combo box
     * and trims any leading or trailing whitespace.
     *
     * @param {Locator} comboBox - The locator for the combo box element.
     * @returns {Promise<string>} A promise that resolves to the trimmed text content of the selected option.
     */
    async selectedComboBoxOption(comboBox: Locator): Promise<string> {
        return (await comboBox.locator('xpath=/div[1]').textContent())?.trim();
    }

    /**
     * Sets up routing for the page to intercept all network requests and add an Authorization header.
     * @param {string} token - The token to be used for the Authorization header.
     * @returns {Promise<void>} A promise that resolves when the routing is set up.
     */
    async setupRouting(token: string): Promise<void> {
        await this.page.route('**/*', (route) => {
            console.log(`Intercepting request to: ${route.request().url()}`);
            const headers = {
                ...route.request().headers(),
                Authorization: `Bearer ${token}`
            };
            route.continue({headers});
        });
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
        const options = timeout ? {timeout} : undefined; // Set timeout options if provided.
        await this.page.waitForLoadState('load', options); // Wait for the page to reach the 'load' state.
    }

    /**
     * Waits for at least one canvas element on the page to have non-zero pixel data.
     * This method is useful to ensure that a canvas has finished rendering before proceeding.
     * @returns {Promise<void>} A promise that resolves when the condition is met.
     */
    async waitForCanvas(timeout: number = 15000): Promise<void> {
        await this.page.waitForFunction(() => {
            const canvases = document.querySelectorAll('canvas');
            return Array.from(canvases).some(canvas => {
                const ctx = canvas.getContext('2d', {willReadFrequently: true});
                return ctx && ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(pixel => pixel !== 0);
            });
        }, null, {timeout});
    }

    /**
     * Waits for all canvas elements on the page to have non-zero pixel data.
     * This method ensures that all canvases have finished rendering before proceeding.
     * @returns {Promise<void>} A promise that resolves when the condition is met.
     */
    async waitForAllCanvases(): Promise<void> {
        await this.page.waitForFunction(() => {
            return Array.from(document.querySelectorAll('canvas')).every(canvas => {
                const ctx = canvas.getContext('2d', {willReadFrequently: true});
                return ctx && ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(pixel => pixel !== 0);
            });
        });
    }

    /**
     * Waits for the text content of an element to include the expected text.
     * @param {Locator} locator - The locator for the element whose text content is being checked.
     * @param {string} expectedText - The text expected to be included in the element's text content.
     * @returns {Promise<void>} A promise that resolves when the text content includes the expected text.
     */
    async waitForTextContent(locator: Locator, expectedText: string): Promise<void> {
        await locator.filter({hasText: expectedText}).waitFor();
    }

    /**
     * Evaluates whether a button element has the active button class.
     * @param {Locator} button - The locator for the button element to be evaluated.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the button has the active button class.
     */
    async evaluateActiveButton(button: Locator): Promise<boolean> {
        return await button.evaluate((el) => el.classList.contains('tss-1jtfdbf-button-activeButton'));
    }

    /**
     * Brings the context of the current page to the front.
     * This method is useful when multiple pages or contexts are open and you need to focus on the current page.
     * @returns {Promise<void>} A promise that resolves when the context is brought to the front.
     */
    async bringContextToFront(): Promise<void> {
        await this.page.bringToFront();
    }

    /**
     * Waits for an element to be detached from the DOM.
     * @param {Locator} element - The locator for the element to wait for detachment.
     * @returns {Promise<void>} A promise that resolves when the element is detached.
     */
    async waitForElementDetached(element: Locator): Promise<void> {
        await element.waitFor({state: 'detached'});
    }

    /**
     * Introduces a delay for screenshot updates, required to ensure that the target is fully loaded.
     * @param {number} [timeout=5000] - The delay duration in milliseconds.
     * @returns {Promise<void>} A promise that resolves after the specified timeout.
     */
    async screenshotUpdateDelay(timeout: number = 5000): Promise<void> {
        if (process.env.SCREENSHOT_UPDATE_DELAY === 'true') {
            console.log(`Waiting for ${timeout}ms for screenshot update...`);
            await this.page.waitForTimeout(timeout);
        }
    }

    /**
     * Parses a currency value from a string input and converts it into a numeric value.
     * Handles various formats, including optional multipliers (e.g., 'k' for thousand, 'm' for million),
     * and different decimal separator strategies (comma or dot).
     *
     * @param {string} input - The string input representing the currency value.
     * @returns {number} The parsed numeric value, or NaN if the input is invalid.
     */
    parseCurrencyValue(input: string): number {
        if (!input) return NaN;

        // Lowercase for uniformity and trim whitespace
        const value = input.trim().toLowerCase();

        // Match number part and optional multiplier (e.g. 'k', 'm')
        const match = value.match(/([-\d.,]+)\s*([km])?/i);
        if (!match) return NaN;

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
        if (isNaN(result)) return NaN;

        // Apply multiplier if present
        switch (multiplierSuffix) {
            case 'k':
                result *= 1_000;
                break;
            case 'm':
                result *= 1_000_000;
                break;
        }

        return result;
    }

    /**
     * Calculates the sum of currency values in a column across multiple pages.
     * This method iterates through all pages of a table, extracts currency values from a specified column,
     * parses them into numeric values, and sums them up. It handles pagination by clicking the "next page" button
     * until no more pages are available.
     *
     * @param {Locator} columnLocator - The Playwright locator for the column containing currency values.
     * @param {Locator} nextPageBtn - The Playwright locator for the "next page" button.
     * @returns {Promise<number>} A promise that resolves to the total sum of currency values, rounded to two decimal places.
     */
    async sumCurrencyColumn(
        columnLocator: Locator,
        nextPageBtn: Locator
    ): Promise<number> {
        let totalSum = 0;

        while (true) {
            // Wait for the last element in the column to be visible
            await columnLocator.last().waitFor({state: 'visible', timeout: 5000}).catch(() => {
            });

            // Extract text content from all cells in the column
            const texts = await columnLocator.allTextContents();

            // Parse the currency values from the text content
            const values = texts.map(text => {
                const currencyOnly = text.split('(')[0].trim(); // Remove any text in parentheses
                return this.parseCurrencyValue(currencyOnly); // Convert the currency string to a numeric value
            });

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
        await columnLocator.last().waitFor({state: 'visible', timeout: 5000}).catch(() => {
        });

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
    async waitForLoadingPageImgToDisappear(timeout: number = 10000): Promise<void> {
        try {
            await this.loadingPageImg.first().waitFor({timeout: 1000});
        } catch (error) {
            return; // Exit the method if the loading image is not present.
        }
        try {
            debugLog('Waiting for loading page image to disappear...');
            await this.loadingPageImg.waitFor({state: 'hidden', timeout: timeout});
        } catch (error) {
            console.error("Loading page image did not disappear within the timeout."); // Log a warning if the image remains visible after the timeout.
        }
    }

    /**
     * Waits for the page loader spinner to disappear.
     *
     * This method checks if the page loader spinner is present on the page and waits for it to become hidden.
     * It is useful for ensuring that the page has fully loaded before proceeding with further actions.
     *
     * @param {number} [timeout=10000] - The maximum time to wait for the spinner to disappear, in milliseconds.
     * @returns {Promise<void>} A promise that resolves when the spinner is no longer visible or rejects if the timeout is exceeded.
     */
    async waitForPageLoaderToDisappear(timeout: number = 10000): Promise<void> {
        try {
            await this.pageLoader.first().waitFor({timeout: 1000});
        } catch (error) {
            return; // Exit the method if the spinner is not present.
        }
        try {
            debugLog('Waiting for page loader to disappear...');
            await this.pageLoader.last().waitFor({state: 'hidden', timeout: timeout});
        } catch {
            console.error("Page loader did not disappear within the timeout."); // Log a warning if the spinner remains visible after the timeout.
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

        // Ensure download folder exists
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
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
        return await element.evaluate((el) => {
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

}




