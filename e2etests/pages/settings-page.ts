import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class SettingsPage extends BasePage {
    readonly page: Page;
    readonly settingsHeading: Locator;

    constructor(page: Page) {
        super(page, '/settings');
        this.page = page;
        this.settingsHeading = this.page.locator('//h1[.="Settings"]');
    }
}