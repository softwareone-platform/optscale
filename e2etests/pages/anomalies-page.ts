import {BasePage} from "./base-page";
    import {Locator, Page} from "@playwright/test";
    import {interceptApiRequest} from "../utils/interceptor";
    import {AnomaliesAvailableFilters, AnomaliesConstraintsResponse} from "../test-data/anomalies-data";

    /**
     * Represents the Anomalies Page.
     * Extends the BasePage class.
     */
    export class AnomaliesPage extends BasePage {
        readonly heading: Locator;
        readonly addBtn: Locator;
        readonly searchInput: Locator;

        /**
         * Initializes a new instance of the AnomaliesPage class.
         * @param {Page} page - The Playwright page object.
         */
        constructor(page: Page) {
            super(page, '/anomalies');
            this.heading = this.main.getByTestId('lbl_constraints_detection');
            this.addBtn = this.main.getByTestId('btn_add');
            this.searchInput = this.main.getByPlaceholder('Search');
        }

        /**
         * Sets up API interceptions for the Anomalies page.
         * Intercepts API requests and provides mock responses.
         * @returns {Promise<void>}
         */
        async setupApiInterceptions(): Promise<void> {
            const apiInterceptions = [
                {
                    urlPattern: `v2/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly`,
                    mockResponse: AnomaliesConstraintsResponse
                },
                {urlPattern: `v2/organizations/[^/]+available_filters`, mockResponse: AnomaliesAvailableFilters},
            ];

            await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
                interceptApiRequest({page: this.page, urlPattern, mockResponse})
            ));
        }

        /**
         * Clicks the Add button on the Anomalies page.
         * @returns {Promise<void>}
         */
        async clickAddBtn(): Promise<void> {
            await this.addBtn.click();
        }
    }