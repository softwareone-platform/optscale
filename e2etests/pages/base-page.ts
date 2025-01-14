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

    async getSelectedOptionFromSelect(selectElement: Locator) {
        return await selectElement.evaluate((select: HTMLSelectElement) => {
            const selectedOption = select.selectedOptions[0];
            return selectedOption.text;
        });
    }

    async setupRouting(token: string) {
        await this.page.route('**/*', (route) => {
            // console.log(`Intercepting request to: ${route.request().url()}`);
            const headers = {
                ...route.request().headers(),
                Authorization: `Bearer ${token}`,
            };
            route.continue({headers});
        });
    }
}
