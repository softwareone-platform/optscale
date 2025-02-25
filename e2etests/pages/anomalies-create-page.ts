import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class AnomaliesCreatePage extends BasePage {

    readonly page: Page;
    readonly heading: Locator;


    constructor(page: Page) {
        super(page, '/anomalies/create');
        this.page = page;
        this.heading = this.page.getByTestId('lbl_create_anomaly_detection_policy');
    }
}