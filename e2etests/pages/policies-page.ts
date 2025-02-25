import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class PoliciesPage extends BasePage {
    readonly heading: Locator;
    readonly addBtn: Locator;

    constructor(page: Page) {
        super(page, '/policies');
        this.heading = this.page.getByTestId('lbl_constraints_quotas_and_budgets');
        this.addBtn = this.page.getByTestId('btn_add');
    }

    async clickAddBtn() {
        await this.addBtn.click();
    }
}