import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class SettingsPage extends BasePage {
    readonly heading: Locator;

    constructor(page: Page) {
        super(page, '/settings');
        this.heading = this.page.locator('//h1[.="Settings"]');
    }
}import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

/**
 * Represents the Settings Page.
 * Extends the BasePage class.
 */
export class SettingsPage extends BasePage {
    readonly heading: Locator;

    /**
     * Initializes a new instance of the SettingsPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/settings');
        this.heading = this.page.locator('//h1[.="Settings"]');
    }
}