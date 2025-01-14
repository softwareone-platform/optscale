import {BasePage} from "./base-page";
import {Page} from "@playwright/test";

export class PoolsPage extends BasePage {
    readonly page: Page;

    constructor(page: Page) {
        super(page, '/pools');
        this.page = page;
    }
}