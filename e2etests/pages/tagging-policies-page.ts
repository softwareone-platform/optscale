import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {EmployeesResponse, UsersPoolsPermissionsResponse} from "../test-data/user-data";
import {interceptApiRequest} from "../utils/interceptor";
import {TaggingPolicyResponse} from "../test-data/tagging-data";

export class TaggingPoliciesPage extends BasePage {
    readonly heading: Locator;
    readonly addBtn: Locator;

    constructor(page: Page) {
        super(page, '/tagging-policies');
        this.heading = this.main.getByTestId('lbl_tagging_policies');
        this.addBtn = this.main.getByTestId('btn_add');
    }

    async setupApiInterceptions() {
        const apiInterceptions = [
            {urlPattern: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=tagging_policy`, mockResponse: TaggingPolicyResponse},
        ];

        await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
            interceptApiRequest({page: this.page, urlPattern, mockResponse})
        ));
    }

    async clickAddBtn() {
        await this.addBtn.click();
    }
}