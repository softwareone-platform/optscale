import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class AnomaliesPage extends BasePage {
    readonly page: Page;
    readonly anomaliesHeading: Locator;
    readonly addBtn: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        super(page, '/anomalies');
        this.page = page;
        this.anomaliesHeading = this.page.getByTestId('lbl_constraints_detection');
        this.addBtn = this.page.getByTestId('btn_add');
        this.searchInput = this.page.getByPlaceholder('Search');
    }
}
