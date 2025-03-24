import {Locator, Page} from "@playwright/test";
import {BaseCreatePage} from "./base-create-page";

/**
 * Represents the Anomalies Create Page.
 * Extends the BaseCreatePage class.
 */
export class AnomaliesCreatePage extends BaseCreatePage {

    readonly page: Page;
    readonly heading: Locator;

    /**
     * Initializes a new instance of the AnomaliesCreatePage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/anomalies/create');
        this.page = page;
        this.heading = this.page.getByTestId('lbl_create_anomaly_detection_policy');
    }
}