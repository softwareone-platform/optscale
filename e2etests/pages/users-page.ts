import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {interceptApiRequest} from "../utils/interceptor";
import {EmployeesResponse, UsersPoolsPermissionsResponse} from "../test-data/user-data";

export class UsersPage extends BasePage {
    readonly heading: Locator;
    readonly inviteBtn: Locator;

    constructor(page: Page) {
        super(page, '/users');
        this.inviteBtn = this.main.getByTestId('btn_invite');
        this.heading = this.main.getByTestId('lbl_users');
    }

    async setupApiInterceptions() {
        const apiInterceptions = [
            {urlPattern: `v2/organizations/[^/]+/employees`, mockResponse: EmployeesResponse},
            {urlPattern: `v2/organizations/[^/]+/pools\\?permission=INFO_ORGANIZATION`, mockResponse: UsersPoolsPermissionsResponse},
        ];

        await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
            interceptApiRequest({page: this.page, urlPattern, mockResponse})
        ));
    }
    async getUserEmailInTable(email: string): Promise<Locator> {
        return this.main.locator(`//td[contains(text(), '${email}')]`);
    }

    async clickInviteBtn() {
        await this.inviteBtn.click();
    }
}