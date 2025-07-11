import {
    AllowedActionsResponse,
    DataSourcesResponse,
    OptimizationsResponse,
    OrganizationCleanExpansesResponseGraphQL,
    OrganizationConstraintsResponse,
    OrganizationExpensesPoolsResponse,
    PoolsResponse
} from "../test-data/homepage-data";
import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";

/**
 * Represents the Home Page.
 * Extends the BasePage class.
 */
export class HomePage extends BasePage {
    readonly connectDataSourceBanner: Locator;
    readonly organizationExpensesBlock: Locator;
    readonly organizationExpensesBtn: Locator;
    readonly topResourcesBlock: Locator;
    readonly topResourcesBtn: Locator;
    readonly topResourcesPerspectives: Locator;
    readonly recommendationsBlock: Locator;
    readonly recommendationsBtn: Locator;
    readonly recommendationsPossibleSavingsValue: Locator;
    readonly recommendationsHelpLink: Locator;
    readonly recommendationsCostLink: Locator;
    readonly recommendationsCostValue: Locator;
    readonly recommendationsSecurityLink: Locator;
    readonly recommendationsSecurityValue: Locator;
    readonly recommendationsCriticalLink: Locator;
    readonly recommendationsCriticalValue: Locator;
    readonly policyViolationsBlock: Locator;
    readonly poolsRequiringAttentionBlock: Locator;
    readonly poolsRequiringAttentionBtn: Locator;
    readonly poolsReqAttnExceededLimitBtn: Locator;
    readonly poolsReqAttnExceededForecastedOverspendBtn: Locator;
    readonly progressBar: Locator;

    /**
     * Initializes a new instance of the HomePage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/');
        this.connectDataSourceBanner = this.page.getByTestId('img_connect_data_source');
        this.organizationExpensesBlock = this.page.getByTestId('block_org_expenses');
        this.organizationExpensesBtn = this.organizationExpensesBlock.getByTestId('btn_go_to_org_expenses');
        this.topResourcesBlock = this.page.getByTestId('block_top_resources');
        this.topResourcesBtn = this.topResourcesBlock.getByTestId('btn_go_to_resources');
        this.topResourcesPerspectives = this.topResourcesBlock.getByText('Perspectives');
        this.recommendationsBlock = this.page.getByTestId('block_recommendations');
        this.recommendationsBtn = this.recommendationsBlock.getByTestId('btn_see_all_recommendations');
        this.recommendationsPossibleSavingsValue = this.recommendationsBlock.locator('//h6[1]');
        this.recommendationsHelpLink = this.recommendationsBlock.getByTestId('HelpOutlineIcon');
        this.recommendationsCostLink = this.recommendationsBlock.getByTestId('block_recommendations_cost_link');
        this.recommendationsCostValue = this.recommendationsBlock.getByTestId('block_recommendations_cost_value');
        this.recommendationsSecurityLink = this.recommendationsBlock.getByTestId('block_recommendations_security_link');
        this.recommendationsSecurityValue = this.recommendationsBlock.getByTestId('block_recommendations_security_value');
        this.recommendationsCriticalLink = this.recommendationsBlock.getByTestId('block_recommendations_critical_link');
        this.recommendationsCriticalValue = this.recommendationsBlock.getByTestId('block_recommendations_critical_value');
        this.policyViolationsBlock = this.page.getByTestId('block_policies_violations');
        this.poolsRequiringAttentionBlock = this.page.getByTestId('block_pools');
        this.poolsRequiringAttentionBtn = this.poolsRequiringAttentionBlock.getByTestId('btn_go_to_pools');
        this.poolsReqAttnExceededLimitBtn = this.poolsRequiringAttentionBlock.getByTestId('tab_exceeded_limit');
        this.poolsReqAttnExceededForecastedOverspendBtn = this.poolsRequiringAttentionBlock.getByTestId('tab_forecasted_overspend');
        this.progressBar = this.page.getByRole('progressbar');
    }

    /**
     * Sets up API interceptions for the Home page.
     * Intercepts API requests and provides mock responses.
     * @returns {Promise<void>}
     */
    async setupApiInterceptions(): Promise<void> {
        const apiInterceptions: IInterceptorConfig[] = [
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/pool_expenses`,
                mockResponse: OrganizationExpensesPoolsResponse
            },
            {
                page: this.page,
                urlPattern: `/api$`,
                mockResponse: OrganizationCleanExpansesResponseGraphQL,
                graphQlOperationName: 'CleanExpenses'
            },
            {
                page: this.page,
                urlPattern: `/api$`,
                mockResponse: DataSourcesResponse,
                graphQlOperationName: 'DataSources'
            },
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/optimizations`,
                mockResponse: OptimizationsResponse
            },
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_count_anomaly&type=expense_anomaly&type=resource_quota&type=recurring_budget&type=expiring_budget&type=tagging_policy`,
                mockResponse: OrganizationConstraintsResponse
            },
            {page: this.page, urlPattern: `/v2/pools/[^/]+?children=true&details=true`, mockResponse: PoolsResponse},
            {page: this.page, urlPattern: `/v2/allowed_actions`, mockResponse: AllowedActionsResponse}
        ];

        await Promise.all(apiInterceptions.map(interceptApiRequest));
    }

    /**
     * Selects a perspective from the top resources perspectives.
     * @param {string} option - The perspective option to select.
     * @returns {Promise<void>}
     */
    async selectPerspectives(option: string): Promise<void> {
        await this.topResourcesPerspectives.click();
        await this.page.locator('[id="simple-popover"]').getByText(option, {exact: true}).click();
    }

    /**
     * Retrieves the possible savings value from the recommendations block.
     * This method fetches the text content of the savings value element and parses it as a currency value.
     *
     * @returns {Promise<number>} The parsed currency value representing possible savings.
     */
    async getRecommendationsPossibleSavingsValue(): Promise<number> {
        const value = await this.recommendationsPossibleSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the cost value from the recommendations block.
     * This method fetches the text content of the cost value element and parses it as an integer.
     *
     * @returns {Promise<number>} The parsed integer value representing the cost.
     */
    async getRecommendationsCostValue(): Promise<number> {
        const text = await this.recommendationsCostValue.textContent();
        return parseInt(text.trim(), 10);
    }

    /**
     * Retrieves the security value from the recommendations block.
     * This method fetches the text content of the security value element and parses it as an integer.
     *
     * @returns {Promise<number>} The parsed integer value representing the security value.
     */
    async getRecommendationsSecurityValue(): Promise<number> {
        const text = await this.recommendationsSecurityValue.textContent();
        return parseInt(text.trim(), 10);
    }

    /**
     * Retrieves the critical value from the recommendations block.
     * This method fetches the text content of the critical value element and parses it as an integer.
     *
     * @returns {Promise<number>} The parsed integer value representing the critical value.
     */
    async getRecommendationsCriticalValue(): Promise<number> {
        const text = await this.recommendationsCriticalValue.textContent();
        return parseInt(text.trim(), 10);
    }
}
