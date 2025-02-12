import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class PerspectivesPage extends BasePage {
    readonly heading: Locator;

    constructor(page: Page) {
        super(page, '/resources/perspectives');
        this.heading = this.page.getByTestId('lbl_perspectives');
    }
}