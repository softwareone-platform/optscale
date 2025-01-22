import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class CloudAccountsPage extends BasePage {
    readonly page: Page;
    readonly cloudAccountsHeading: Locator;

    constructor(page: Page) {
        super(page, '/cloud-accounts');
        this.page = page;
        this.cloudAccountsHeading = this.page.locator('//h1[.="Data Sources"]');
    }
}