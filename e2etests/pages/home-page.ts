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

    //Organization expenses block elements
    readonly organizationExpensesBlock: Locator;
    readonly organizationExpensesBtn: Locator;

    //Top resources block elements
    readonly topResourcesBlock: Locator;
    readonly topResourcesBtn: Locator;
    readonly topResourcesPerspectives: Locator;
    readonly topResourcesFirstLink: Locator;
    readonly topResourceFirstValue: Locator;
    readonly topResourcesAllLinks: Locator;

    //Recommendations block elements
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

    //Policy violations block
    readonly policyViolationsBlock: Locator;

    //Pools requiring attention block
    readonly poolsRequiringAttentionBlock: Locator;
    readonly poolsRequiringAttentionBtn: Locator;
    readonly poolsReqAttnExceededLimitBtn: Locator;
    readonly poolsReqAttnExceededForecastedOverspendBtn: Locator;
    readonly poolsBlockTable: Locator;
    readonly poolsBlockTableHeaders: Locator;
    readonly poolsBlockTableRows: Locator;
    readonly poolsNoDataMessage: Locator;
    readonly poolsBlockTotal: Locator;
    readonly poolsBlockNameColumn: Locator;
    readonly poolsBlockExpensesColumn: Locator;
    readonly poolsBlockForecastColumn: Locator;
    readonly poolsBlockActionsColumn: Locator;


    /**
     * Initializes a new instance of the HomePage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/');
        this.connectDataSourceBanner = this.page.getByTestId('img_connect_data_source');

        ///Organization expenses block elements
        this.organizationExpensesBlock = this.page.getByTestId('block_org_expenses');
        this.organizationExpensesBtn = this.organizationExpensesBlock.getByTestId('btn_go_to_org_expenses');

        //Top resources block elements
        this.topResourcesBlock = this.page.getByTestId('block_top_resources');
        this.topResourcesBtn = this.topResourcesBlock.getByTestId('btn_go_to_resources');
        this.topResourcesPerspectives = this.topResourcesBlock.getByText('Perspectives');
        this.topResourcesFirstLink = this.topResourcesBlock.locator('//a').first();
        this.topResourceFirstValue = this.topResourcesBlock.getByText('$').first();
        this.topResourcesAllLinks = this.topResourcesBlock.locator('//a');

        //Recommendations block elements
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

        //Policy violations block
        this.policyViolationsBlock = this.page.getByTestId('block_policies_violations');

        //Pools requiring attention block
        this.poolsRequiringAttentionBlock = this.main.getByTestId('block_pools');
        this.poolsRequiringAttentionBtn = this.poolsRequiringAttentionBlock.getByTestId('btn_go_to_pools');
        this.poolsReqAttnExceededLimitBtn = this.poolsRequiringAttentionBlock.getByTestId('tab_exceeded_limit');
        this.poolsReqAttnExceededForecastedOverspendBtn = this.poolsRequiringAttentionBlock.getByTestId('tab_forecasted_overspend');
        this.poolsBlockTable = this.poolsRequiringAttentionBlock.locator('table');
        this.poolsNoDataMessage = this.poolsBlockTable.getByText('No data to display');
        this.poolsBlockTableHeaders = this.poolsBlockTable.locator('//thead//th');
        this.poolsBlockTableRows = this.poolsBlockTable.locator('//tbody/tr');
        this.poolsBlockTotal = this.poolsRequiringAttentionBlock.locator('//span[contains(text(), "Total")]/../following-sibling::div');
        this.poolsBlockNameColumn = this.poolsBlockTable.locator('//tbody//td[1]');
        this.poolsBlockExpensesColumn = this.poolsBlockTable.locator('//tbody//td[2]');
        this.poolsBlockForecastColumn = this.poolsBlockTable.locator('//tbody//td[3]');
        this.poolsBlockActionsColumn = this.poolsBlockTable.locator('//tbody//td[4]');
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

    /**
     * Clicks the "Top Resources" button on the Home Page.
     * This method simulates a user clicking the button to navigate to the Top Resources section.
     *
     * @returns {Promise<void>} A promise that resolves when the click action is complete.
     */
    async clickTopResourcesBtn(): Promise<void> {
        await this.topResourcesBtn.click();
    }

    /**
     * Clicks the first link in the "Top Resources" section.
     * This method simulates a user clicking the first resource link in the Top Resources block.
     *
     * @returns {Promise<void>} A promise that resolves when the click action is complete.
     */
    async clickFirstTopResourceLink(): Promise<void> {
        await this.topResourcesFirstLink.click();
    }

    /**
     * Retrieves the title of the first resource in the "Top Resources" section.
     * This method fetches the text content of the first resource link, removes unnecessary characters,
     * and trims whitespace.
     *
     * @returns {Promise<string>} The cleaned title of the first resource.
     */
    async getFirstResourceTitle(): Promise<string> {
        return (await this.topResourcesFirstLink.textContent()).replace(/\.{3}\//g, '').trim();
    }

    /**
     * Retrieves the value of the first resource in the "Top Resources" section.
     * This method fetches the text content of the first resource value element and parses it as a currency value.
     *
     * @returns {Promise<number>} The parsed currency value of the first resource.
     */
    async getFirstResourceValue(): Promise<number> {
        const value = await this.topResourceFirstValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Clicks the "Pools Requiring Attention" button on the Home Page.
     * This method simulates a user clicking the button to navigate to the Pools Requiring Attention section.
     *
     * @returns {Promise<void>} A promise that resolves when the click action is complete.
     */
    async clickPoolsRequiringAttentionBtn(): Promise<void> {
        await this.poolsRequiringAttentionBtn.click();
        await this.waitForPageLoaderToDisappear();
    }

    /**
     * Retrieves the total value displayed in the Pools block.
     * This method fetches the text content of the total value element, removes the "Total:" label,
     * trims whitespace, and parses it as an integer.
     *
     * @returns {Promise<number>} The parsed integer value of the total.
     */
    async getPoolsBlockTotalValue(): Promise<number> {
        const totalText = await this.poolsBlockTotal.textContent();
        const totalValue = totalText.replace('Total:', '').trim();
        console.log(`Total value in Pools block: ${totalValue}`);
        return parseInt(totalValue);
    }

    /**
     * Retrieves the value of the expenses column for a specific row in the Pools block table.
     * This method adjusts the provided index to be zero-based, fetches the text content of the
     * specified row in the expenses column, and parses it as a currency value.
     *
     * @param {number} index - The 1-based index of the row in the expenses column.
     * @returns {Promise<number>} The parsed currency value of the expenses for the specified row.
     */
    async getPoolsBlockExpensesColumnValue(index: number): Promise<number> {
        index = index - 1; // Adjusting index to be zero-based
        const expensesValue = await this.poolsBlockExpensesColumn.nth(index).textContent();
        return this.parseCurrencyValue(expensesValue);
    }

    /**
     * Retrieves the value of the forecast column for a specific row in the Pools block table.
     * This method adjusts the provided index to be zero-based, fetches the text content of the
     * specified row in the forecast column, and parses it as a currency value.
     *
     * @param {number} index - The 1-based index of the row in the forecast column.
     * @returns {Promise<number>} The parsed currency value of the forecast for the specified row.
     */
    async getPoolsBlockForecastColumnValue(index: number): Promise<number> {
        index = index - 1; // Adjusting index to be zero-based
        const forecastValue = await this.poolsBlockForecastColumn.nth(index).textContent();
        return this.parseCurrencyValue(forecastValue);
    }

    /**
     * Clicks the "Forecasted Overspend" tab in the Pools Requiring Attention block.
     * This method simulates a user clicking the tab to view pools with forecasted overspend.
     *
     * @returns {Promise<void>} A promise that resolves when the click action is complete.
     */
    async clickPoolsBlockForecastedOverspendTab(): Promise<void> {
        await this.poolsReqAttnExceededForecastedOverspendBtn.click();
        await this.waitForPageLoad();
    }
}
