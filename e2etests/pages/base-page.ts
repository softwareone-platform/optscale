import {Locator, Page} from "@playwright/test";

export abstract class BasePage {
    readonly page: Page
    readonly url: string

    protected constructor(page: Page, url: string) {
        this.page = page
        this.url = url
    }

    async navigateToURL(waitForPageLoad = false): Promise<void> {
        await this.page.goto(this.url, {waitUntil: "domcontentloaded"});
        if (waitForPageLoad) {
            await this.waitForDocumentComplete();
        }
    }

    async waitForDocumentComplete(): Promise<void> {
        await this.page.evaluate(() => {
            return new Promise<void>((resolve) => {
                if (document.readyState === "complete") {
                    resolve();
                } else {
                    window.addEventListener('load', () => resolve(), {once: true});
                }
            });
        });
    }

    /**
     * Selects an option from a combo box.
     *
     * @param {Locator} comboBox - The locator for the combo box element.
     * @param {string} option - The option to select from the combo box.
     * @param {boolean} [closeList=false] - Whether to close the list after selecting the option.
     * @returns {Promise<void>} A promise that resolves when the option is selected.
     */
    async selectFromComboBox(comboBox: Locator, option: string, closeList = false) {
        await comboBox.click();
        await this.page.getByRole('option', {name: option, exact: true}).click();
        if (closeList) await this.page.locator('body').click();
    }

    /**
     * Sets up routing for the page to intercept all network requests and add an Authorization header.
     *
     * @param {string} token - The token to be used for the Authorization header.
     * @returns {Promise<void>} A promise that resolves when the routing is set up.
     */
    async setupRouting(token: string) {
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
     *
     * @returns {Promise<void>} A promise that resolves when the condition is met.
     */
    async waitForCanvas() {
        await this.page.waitForFunction(() => {
            // Select all canvas elements on the page
            const canvases = document.querySelectorAll('canvas');
            if (!canvases.length) return false;

            // Check if any canvas has non-zero pixel data
            return Array.from(canvases).some(canvas => {
                const ctx = canvas.getContext('2d', {willReadFrequently: true});
                if (!ctx) return false;

                const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                return data.some(pixel => pixel !== 0); // Ensure at least one pixel is non-zero
            });
        });
    }


    /**
     * Waits for the text content of an element to include the expected text.
     *
     * @param {Locator} locator - The locator for the element whose text content is being checked.
     * @param {string} expectedText - The text expected to be included in the element's text content.
     * @returns {Promise<void>} A promise that resolves when the text content includes the expected text.
     */
    async waitForTextContent(locator: Locator, expectedText: string) {
        await locator.filter({hasText: expectedText}).waitFor();
    }

    /**
     * Evaluates whether a button element has the active button class.
     *
     * @param {Locator} button - The locator for the button element to be evaluated.
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the button has the active button class.
     */
    async evaluateActiveButton(button: Locator) {
        const hasActiveButtonClass = await button.evaluate((el) => el.classList.contains('tss-1jtfdbf-button-activeButton'));
        return hasActiveButtonClass;
    }
}
