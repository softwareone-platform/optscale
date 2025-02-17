import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class CloudAccountsPage extends BasePage {
    readonly heading: Locator;
    readonly addBtn: Locator;
    readonly table: Locator;

    constructor(page: Page) {
        super(page, '/cloud-accounts');
        this.heading = this.main.locator('//h1[.="Data Sources"]');
        this.table = this.main.locator('//table');
        this.addBtn = this.main.getByTestId('btn_add');
    }
    async clickAddBtn(): Promise<void> {
        await this.addBtn.click();
    }
}