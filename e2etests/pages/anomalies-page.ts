import {BasePage} from "./base-page";
    import {Locator, Page} from "@playwright/test";
    import {IInterceptorConfig, interceptApiRequest} from "../utils/api-requests/interceptor";
    import {AnomaliesAvailableFilters, AnomaliesConstraintsResponse} from "../mocks/anomalies-resp";

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
            const apiInterceptions: IInterceptorConfig[] = [
                {
                    urlPattern: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly`,
                    mockResponse: AnomaliesConstraintsResponse,
                    page: this.page,
                },
                {
                    urlPattern: `v2/organizations/[^/]+available_filters`,
                    mockResponse: AnomaliesAvailableFilters,
                    page: this.page,
                },
            ];

            await Promise.all(apiInterceptions.map(interceptApiRequest));
        }

        /**
         * Clicks the Add button on the Anomalies page.
         * @returns {Promise<void>}
         */
        async clickAddBtn(): Promise<void> {
            await this.addBtn.click();
        }
    }
