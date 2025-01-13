import {BasePage} from "./base-page";
import {Page} from "@playwright/test";

export class HomePage extends BasePage {
    readonly page: Page;

    constructor(page: Page) {
        super(page, '/');
        this.page = page;
    }
}