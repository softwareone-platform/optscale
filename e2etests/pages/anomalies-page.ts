import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {AllowedActionsPoolResponse, PoolResponse} from "../test-data/pools-data";
import {interceptApiRequest} from "../utils/interceptor";
import {AnomaliesAvailableFilters, AnomaliesConstraintsResponse} from "../test-data/anomalies-data";

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

    async setupApiInterceptions() {
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

    async clickAddBtn() {
        await this.addBtn.click();
    }
}
