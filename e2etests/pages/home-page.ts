import {
    OrganizationCleanExpansesResponse,
    OrganizationConstraintsResponse,
    OrganizationExpensesPoolsResponse,
    PoolsResponse
} from "../test-data/homepage-data";
import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {interceptApiRequest} from "../utils/interceptor";

export class HomePage extends BasePage {
    readonly connectDataSourceBanner: Locator;
    readonly organizationExpensesBlock: Locator;
    readonly organizationExpensesBtn: Locator;
    readonly topResourcesBlock: Locator;
    readonly topResourcesBtn: Locator;
    readonly topResourcesPerspectives: Locator;
    readonly recommendationsBlock: Locator;
    readonly recommendationsBtn: Locator;
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

    constructor(page: Page) {
        super(page, '/');
        this.connectDataSourceBanner = this.page.getByTestId('img_connect_data_source');
        this.organizationExpensesBlock = this.page.getByTestId('block_org_expenses');
        this.organizationExpensesBtn = this.organizationExpensesBlock.getByTestId('btn_go_to_org_expenses');
        this.topResourcesBlock = this.page.getByTestId('block_top_resources');
        this.topResourcesBtn = this.topResourcesBlock.getByTestId('btn_go_to_resources');
        this.topResourcesPerspectives = this.topResourcesBlock.getByText('Perspectives');
        this.recommendationsBlock  = this.page.getByTestId('block_recommendations');
        this.recommendationsBtn = this.recommendationsBlock.getByTestId('btn_see_all_recommendations');
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
    async setupApiInterceptions() {
        const apiInterceptions = [
            {urlPattern: `/v2/organizations/[^/]+/pool_expenses`, mockResponse: OrganizationExpensesPoolsResponse},
            {urlPattern: `/v2/organizations/[^/]+/clean_expenses`, mockResponse: OrganizationCleanExpansesResponse},
            {urlPattern: `/v2/organizations/[^/]+/organization_constraints`, mockResponse: OrganizationConstraintsResponse},
            {urlPattern: `/v2/pools/`, mockResponse: PoolsResponse}
        ];

        await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
            interceptApiRequest({page: this.page, urlPattern, mockResponse})
        ));
    }
    async selectPerspectives(option: string) {
        await this.topResourcesPerspectives.click();
        await this.page.locator('[id="simple-popover"]').getByText(option, {exact: true}).click();
    }

    async  waitForAllProgressBarsToDisappear() {
        console.log('Waiting for all progress bars appear');
        await this.progressBar.first().waitFor({state: 'visible'});
        const progressBars = this.progressBar;
        await progressBars.evaluateAll(bars => bars.every(bar => bar.style.display === 'none'));
        console.log('All progress bars have disappeared');
    }
}