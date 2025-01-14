import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class ResourcesPage extends BasePage {
    readonly page: Page;
    readonly resourcesHeading: Locator;

    constructor(page: Page) {
        super(page, '/resources');
        this.page = page;
        this.resourcesHeading = this.page.getByTestId('lbl_resources');
    }
}