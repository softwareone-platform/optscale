import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class SettingsPage extends BasePage {
    readonly heading: Locator;

    constructor(page: Page) {
        super(page, '/settings');
        this.heading = this.page.locator('//h1[.="Settings"]');
    }
}