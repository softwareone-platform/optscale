import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class CloudAccountsPage extends BasePage {
    readonly heading: Locator;

    constructor(page: Page) {
        super(page, '/cloud-accounts');
        this.heading = this.page.locator('//h1[.="Data Sources"]');
    }
}