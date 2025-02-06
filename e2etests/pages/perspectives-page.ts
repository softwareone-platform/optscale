import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class PerspectivesPage extends BasePage {

    readonly page: Page;
    readonly perspectivesHeading: Locator;

    constructor(page: Page) {
        super(page, '/resources/perspectives');
        this.page = page;
        this.perspectivesHeading = this.page.getByTestId('lbl_perspectives');
    }
}