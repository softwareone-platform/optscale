import {Locator, Page} from "@playwright/test";
import { BasePage } from "./base-page";

export class ExpensesPage extends BasePage {
    readonly page: Page;
    readonly costExplorerHeading: Locator;

    constructor(page: Page) {
        super(page, '/expenses');
        this.page = page;
        this.costExplorerHeading = this.page.locator('//h1[contains(text(), "Expenses of")]');
    }
}
