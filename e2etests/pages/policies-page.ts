import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class PoliciesPage extends BasePage {
    readonly page: Page;
    readonly policiesHeading: Locator;
    readonly addBtn: Locator;

    constructor(page: Page) {
        super(page, '/policies');
        this.page = page;
        this.policiesHeading = this.page.getByTestId('lbl_constraints_quotas_and_budgets');
        this.addBtn = this.page.getByTestId('btn_add');
    }

    async clickAddBtn() {
        await this.addBtn.click();
    }
}