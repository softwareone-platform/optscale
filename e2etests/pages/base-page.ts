import {Locator, Page} from "@playwright/test";
        /**
         * Abstract class representing the base structure for all pages.
         * This class provides common functionality for interacting with web pages in Playwright tests.
         */
        export abstract class BasePage {
            readonly page: Page; // The Playwright page object representing the current page.
            readonly url: string; // The URL of the page.
            readonly main: Locator; // Locator for the main element of the page.

            /**
             * Initializes a new instance of the BasePage class.
             * @param {Page} page - The Playwright page object.
             * @param {string} url - The URL of the page.
             */
            protected constructor(page: Page, url: string) {
                this.page = page;
                this.url = url;
                this.main = this.page.locator('main');
            }

            /**
             * Navigates to the URL of the page.
             * @returns {Promise<void>} A promise that resolves when the navigation is complete.
             */
            async navigateToURL(customUrl: string = null): Promise<void> {
                await this.page.goto( customUrl ? customUrl : this.url, {waitUntil: "load"});
            }

            /**
             * Selects an option from a combo box.
             * @param {Locator} comboBox - The locator for the combo box element.
             * @param {string} option - The option to select from the combo box.
             * @param {boolean} [closeList=false] - Whether to close the list after selecting the option.
             * @returns {Promise<void>} A promise that resolves when the option is selected.
             */
            async selectFromComboBox(comboBox: Locator, option: string, closeList: boolean = false): Promise<void> {
                await comboBox.click();
                await this.page.getByRole('option', {name: option, exact: true}).click();
                if (closeList) await this.page.locator('body').click();
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
                    if (!canvases.length) return false;

                    return Array.from(canvases).some(canvas => {
                        const ctx = canvas.getContext('2d', {willReadFrequently: true});
                        if (!ctx) return false;

                        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                        return data.some(pixel => pixel !== 0);
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
                    const canvases = document.querySelectorAll('canvas');
                    if (!canvases.length) return false;

                    return Array.from(canvases).every(canvas => {
                        const ctx = canvas.getContext('2d', { willReadFrequently: true });
                        if (!ctx) return false;

                        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                        return data.some(pixel => pixel !== 0);
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
        }
