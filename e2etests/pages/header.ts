import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class Header extends BasePage {
    readonly page: Page;
    readonly organizationSelect: Locator;

    constructor(page: Page) {
        super(page, '/');
        this.page = page;
        this.organizationSelect = this.page.getByTestId('organization-selector-select');
    }
}