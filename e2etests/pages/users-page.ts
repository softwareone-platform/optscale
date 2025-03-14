import {Locator, Page} from "@playwright/test";
    import {BasePage} from "./base-page";
    import {interceptApiRequest} from "../utils/interceptor";
    import {EmployeesResponse, UsersPoolsPermissionsResponse} from "../test-data/user-data";

    /**
     * Represents the Users Page.
     * Extends the BasePage class.
     */
    export class UsersPage extends BasePage {
        readonly heading: Locator;
        readonly inviteBtn: Locator;

        /**
         * Initializes a new instance of the UsersPage class.
         * @param {Page} page - The Playwright page object.
         */
        constructor(page: Page) {
            super(page, '/users');
            this.inviteBtn = this.main.getByTestId('btn_invite');
            this.heading = this.main.getByTestId('lbl_users');
        }

        /**
         * Sets up API interceptions for the Users page.
         * Intercepts API requests and provides mock responses.
         * @returns {Promise<void>}
         */
        async setupApiInterceptions() {
            const apiInterceptions = [
                {urlPattern: `/v2/organizations/[^/]+/employees`, mockResponse: EmployeesResponse},
                {urlPattern: `/v2/organizations/[^/]+/pools\\?permission=INFO_ORGANIZATION`, mockResponse: UsersPoolsPermissionsResponse},
            ];

            await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
                interceptApiRequest({page: this.page, urlPattern, mockResponse})
            ));
        }

        /**
         * Gets the user email in the table.
         * @param {string} email - The email to search for.
         * @returns {Promise<Locator>} - The locator for the email cell.
         */
        async getUserEmailInTable(email: string): Promise<Locator> {
            return this.main.locator(`//td[contains(text(), '${email}')]`);
        }

        /**
         * Clicks the Invite button.
         * @returns {Promise<void>}
         */
        async clickInviteBtn() {
            await this.inviteBtn.click();
        }
    }