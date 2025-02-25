import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class TaggingPoliciesPage extends BasePage {
    readonly heading: Locator;
    readonly addBtn: Locator;

    constructor(page: Page) {
        super(page, '/tagging-policies');
        this.heading = this.main.getByTestId('lbl_tagging_policies');
        this.addBtn = this.main.getByTestId('btn_add');
    }
    async clickAddBtn() {
        await this.addBtn.click();
    }
}