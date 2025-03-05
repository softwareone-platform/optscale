import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {interceptApiRequest, interceptDataSourcesRequest} from "../utils/interceptor";
import {CloudAccountsResponse, DataSourcesResponse} from "../test-data/cloud-accounts-data";

export class CloudAccountsPage extends BasePage {
    readonly heading: Locator;
    readonly addBtn: Locator;
    readonly table: Locator;

    constructor(page: Page) {
        super(page, '/cloud-accounts');
        this.heading = this.main.locator('//h1[.="Data Sources"]');
        this.table = this.main.locator('//table');
        this.addBtn = this.main.getByTestId('btn_add');
    }

    async setupApiInterceptions() {
        const apiInterceptions = [
            {urlPattern: `v2/pools/[^/]+?children=false&details=false`, mockResponse: CloudAccountsResponse},
        ];

        await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
            interceptApiRequest({page: this.page, urlPattern, mockResponse})
        ));
    }

    async setupDataSourcesInterceptions() {
        const dataSourcesInterceptions = [
            {urlPattern: `/api`, mockResponse: DataSourcesResponse},
        ];

        await Promise.all(dataSourcesInterceptions.map(({urlPattern, mockResponse}) =>
            interceptDataSourcesRequest({page: this.page, urlPattern, mockResponse})
        ));
    }

    async clickAddBtn(): Promise<void> {
        await this.addBtn.click();
    }
}