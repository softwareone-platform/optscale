import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {PolicyResponse} from "../test-data/policies-data";
import {interceptApiRequest} from "../utils/interceptor";

export class PoliciesPage extends BasePage {
    readonly heading: Locator;
    readonly addBtn: Locator;

    constructor(page: Page) {
        super(page, '/policies');
        this.heading = this.page.getByTestId('lbl_constraints_quotas_and_budgets');
        this.addBtn = this.page.getByTestId('btn_add');
    }
async setupApiInterceptions() {
        const apiInterceptions = [
            {urlPattern: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_quota&type=recurring_budget&type=expiring_budget`, mockResponse: PolicyResponse},
        ];

        await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
            interceptApiRequest({page: this.page, urlPattern, mockResponse})
        ));
}

    async clickAddBtn() {
        await this.addBtn.click();
    }
}