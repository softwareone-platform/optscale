import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class TaggingPoliciesPage extends BasePage {
    readonly page: Page;
    readonly taggingPoliciesHeading: Locator;

    constructor(page: Page) {
        super(page, '/tagging-policies');
        this.page = page;
        this.taggingPoliciesHeading = this.page.getByTestId('lbl_tagging_policies');
    }
}