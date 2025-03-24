import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {interceptApiRequest} from "../utils/interceptor";
import {AllowedActionsPoolResponse, PoolResponse} from "../test-data/pools-data";

/**
 * Represents the Pools Page.
 * Extends the BasePage class.
 */
export class PoolsPage extends BasePage {
    readonly main: Locator;
    readonly heading: Locator;
    readonly configureAssignmentRulesBtn: Locator;
    readonly organizationLimitValue: Locator;
    readonly expensesThisMonthValue: Locator;
    readonly forecastThisMonthValue: Locator;
    readonly expandRequiringAttentionBtn: Locator;
    readonly columnSelectBtn: Locator;

    /**
     * Initializes a new instance of the PoolsPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/pools');
        this.main = this.page.locator('main');
        this.heading = this.page.getByTestId('lbl_pool_name');
        this.configureAssignmentRulesBtn = this.page.getByTestId('btn_configure_assignment_rules');
        this.organizationLimitValue = this.page.locator('//div[.="Organization limit"]/./following-sibling::div');
        this.expensesThisMonthValue = this.page.locator('//div[.="Expenses this month"]/./following-sibling::div');
        this.forecastThisMonthValue = this.page.locator('//div[.="Forecast this month"]/./following-sibling::div');
        this.expandRequiringAttentionBtn = this.page.locator('[data-testid="expandRequiringAttention"]');
        this.columnSelectBtn = this.page.locator('[data-testid="ViewColumnIcon"]');
    }

    /**
     * Sets up API interceptions for the Pools page.
     * Intercepts API requests and provides mock responses.
     * @returns {Promise<void>}
     */
    async setupApiInterceptions() {
        const apiInterceptions = [
            {urlPattern: `v2/pools/[^/]+?children=true&details=true`, mockResponse: PoolResponse},
            {urlPattern: `v2/allowed_actions?pool=`, mockResponse: AllowedActionsPoolResponse},
        ];

        await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
            interceptApiRequest({page: this.page, urlPattern, mockResponse})
        ));
    }

    /**
     * Clicks the Expand Requiring Attention button.
     * @returns {Promise<void>}
     */
    async clickExpandRequiringAttentionBtn() {
        await this.expandRequiringAttentionBtn.click();
    }
}