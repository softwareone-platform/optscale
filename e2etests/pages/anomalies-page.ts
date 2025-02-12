import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class AnomaliesPage extends BasePage {
    readonly heading: Locator;
    readonly addBtn: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        super(page, '/anomalies');
        this.heading = this.main.getByTestId('lbl_constraints_detection');
        this.addBtn = this.main.getByTestId('btn_add');
        this.searchInput = this.main.getByPlaceholder('Search');
    }

    async clickAddBtn() {
        await this.addBtn.click();
    }
}
