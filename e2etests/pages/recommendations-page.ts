import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class RecommendationsPage extends BasePage {
    readonly page: Page;
    readonly recommendationsHeading: Locator;

    constructor(page: Page) {
        super(page, '/recommendations');
        this.page = page;
        this.recommendationsHeading = this.page.getByTestId('lbl_recommendations');
    }
}