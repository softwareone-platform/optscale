import {Locator, Page} from "@playwright/test";

/**
 * Abstract class representing the base structure for all pages.
 * This class provides common functionality for interacting with web pages in Playwright tests.
 */
export abstract class BasePage {
    readonly page: Page; // The Playwright page object representing the current page.
    readonly url: string; // The URL of the page.
    readonly main: Locator; // Locator for the main element of the page.
    readonly pageLoaderSpinner: Locator; // Locator for the page loader spinner, if applicable.

    /**
     * Initializes a new instance of the BasePage class.
     * @param {Page} page - The Playwright page object.
     * @param {string} url - The URL of the page.
     */
    protected constructor(page: Page, url: string) {
        this.page = page;
        this.url = url;
        this.main = this.page.locator('main');
        this.pageLoaderSpinner = this.main.locator('[role="progressbar"]');
    }

    /**
     * Navigates to the URL of the page.
     * @returns {Promise<void>} A promise that resolves when the navigation is complete.
     */
    async navigateToURL(customUrl: string = null): Promise<void> {
        await this.page.goto(customUrl ? customUrl : this.url, {waitUntil: "load"});
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
     * Waits for at least one canvas element on the page to have non-zero pixel data.
     * This method is useful to ensure that a canvas has finished rendering before proceeding.
     * @returns {Promise<void>} A promise that resolves when the condition is met.
     */
async waitForCanvas(): Promise<void> {
    await this.page.waitForFunction(() => {
        const canvases = document.querySelectorAll('canvas');
        return Array.from(canvases).some(canvas => {
            const ctx = canvas.getContext('2d', {willReadFrequently: true});
            return ctx && ctx.getImageData(0, 0, canvas.width, canvas.height).data.some(pixel => pixel !== 0);
        });
    });
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
     * Sums the currency values from a column across multiple pages in a modal.
     * Iterates through all pages of the modal, extracts and parses currency values from the specified column,
     * and calculates the total sum. Handles pagination by checking the visibility and enabled state of the "next page" button.
     *
     * @param {Locator} columnLocator - The locator for the column containing the currency values.
     * @param {Locator} modalNextPageBtn - The locator for the "next page" button in the modal.
     * @returns {Promise<number>} The total sum of the currency values across all pages, rounded to two decimal places.
     */
    async sumCurrencyColumn(
        columnLocator: Locator,
        modalNextPageBtn: Locator
    ): Promise<number> {
        let totalSum = 0;

        while (true) {
            // Wait for the first element in the column to be visible
            await columnLocator.first().waitFor({state: 'visible', timeout: 5000}).catch(() => {
            });

            // Extract text content from all cells in the column
            const texts = await columnLocator.allTextContents();

            // Parse the currency values from the text content
            const values = texts.map(text => {
                const currencyOnly = text.split('(')[0].trim();
                return this.parseCurrencyValue(currencyOnly);
            });

            // Add the parsed values to the total sum
            totalSum += values.reduce((sum, val) => sum + val, 0);

            // Check if the "next page" button is visible and enabled
            const isVisible = await modalNextPageBtn.isVisible();
            if (!isVisible) break;

            const isEnabled = await modalNextPageBtn.isEnabled();
            if (!isEnabled) break;

            // Navigate to the next page
            await modalNextPageBtn.click();

            // Optional: wait for pagination to update
            await modalNextPageBtn.page().waitForTimeout(300);
        }

        // Return the total sum rounded to two decimal places
        return parseFloat(totalSum.toFixed(2));
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
        const count = await this.pageLoaderSpinner.count(); // Check the number of spinner elements present.
        if (count > 0) { // If spinner elements are found, proceed to wait for their disappearance.
            try {
                console.log("Waiting for page loader spinner to disappear...");
                await this.pageLoaderSpinner.waitFor({state: 'hidden', timeout: timeout}); // Wait for the spinner to become hidden.
            } catch {
                console.warn("Page loader spinner did not disappear within the timeout."); // Log a warning if the spinner remains visible after the timeout.
            }
        }
    }
}
