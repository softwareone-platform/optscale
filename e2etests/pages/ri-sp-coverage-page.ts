import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class RiSpCoveragePage extends BasePage {
    readonly heading: Locator;

    constructor(page: Page) {
        super(page, '/recommendations/ri-sp-coverage');
        this.heading = this.main.locator('//h1[.="RI/SP coverage"]');
    }
}