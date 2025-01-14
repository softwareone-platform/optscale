import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class PoliciesPage extends BasePage {
    readonly page: Page;
    readonly policiesHeading: Locator;

    constructor(page: Page) {
        super(page, '/anomalies');
        this.page = page;
        this.policiesHeading = this.page.getByTestId('lbl_constraints_quotas_and_budgets');
    }
}