import {BaseCreatePage} from "./base-create-page";
import {Locator, Page} from "@playwright/test";

export class PoliciesCreatePage extends BaseCreatePage {
    readonly heading: Locator;

    constructor(page: Page) {
        super(page, "/policies/create");
        this.heading = this.main.getByTestId('lbl_create_quota_and_budget_policy');
    }
}