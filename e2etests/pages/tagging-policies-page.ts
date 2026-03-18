import {Locator, Page} from "@playwright/test";
    import {BasePage} from "./base-page";
    import {EmployeesResponse, UsersPoolsPermissionsResponse} from "../test-data/user-data";
    import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";
    import {TaggingPolicyResponse} from "../test-data/tagging-data";

    /**
     * Represents the Tagging Policies Page.
     * Extends the BasePage class.
     */
    export class TaggingPoliciesPage extends BasePage {
        readonly heading: Locator;
        readonly addBtn: Locator;

        /**
         * Initializes a new instance of the TaggingPoliciesPage class.
         * @param {Page} page - The Playwright page object.
         */
        constructor(page: Page) {
            super(page, '/tagging-policies');
            this.heading = this.main.getByTestId('lbl_tagging_policies');
            this.addBtn = this.main.getByTestId('btn_add');
        }

        /**
         * Sets up API interceptions for the Tagging Policies page.
         * Intercepts API requests and provides mock responses.
         * @returns {Promise<void>}
         */
        async setupApiInterceptions(): Promise<void> {
            const apiInterceptions: IInterceptorConfig[] = [
                {page: this.page, urlPattern: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=tagging_policy`, mockResponse: TaggingPolicyResponse},
            ];

            await Promise.all(apiInterceptions.map(interceptApiRequest));
        }

        /**
         * Clicks the Add button.
         * @returns {Promise<void>}
         */
        async clickAddBtn(): Promise<void> {
            await this.addBtn.click();
        }
    }
