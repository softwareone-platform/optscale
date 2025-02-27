import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {interceptApiRequest} from "../utils/interceptor";
import {ResourceDetailsResponse} from "../test-data/resource-details-data";

export class ResourceDetailsPage extends BasePage {
    readonly heading: Locator;
    readonly totalExpenses: Locator;
    readonly expensesThisMonth: Locator;
    readonly forecastThisMonth: Locator;
    readonly totalPaidNetworkTraffic: Locator;
    readonly goToCloudConsoleBtn: Locator;
    readonly addAssignmentBtn: Locator;
    readonly detailsTab: Locator;
    readonly constraintsTab: Locator;
    readonly constraintsTable: Locator;
    readonly expensesTab: Locator;
    readonly recommendationsTab: Locator;
    readonly expensesGroupedButton: Locator;
    readonly expensesDetailedButton: Locator;
    readonly expensesPaidNetworkTrafficButton: Locator;


    constructor(page: Page) {
        super(page, '');
        this.heading = this.page.getByTestId('lbl_resource_name');
        this.totalExpenses = this.page.getByTestId('card_total_exp');
        this.expensesThisMonth = this.page.getByTestId('card_exp_this_month');
        this.forecastThisMonth = this.page.getByTestId('card_forecast_this_month');
        this.totalPaidNetworkTraffic = this.page.getByTestId('card_total_paid_network_traffic');
        this.goToCloudConsoleBtn = this.page.getByTestId('btn_cloud_console');
        this.addAssignmentBtn = this.page.getByTestId('btn_add_rule');
        this.detailsTab = this.page.getByTestId('tab_details');
        this.constraintsTab = this.page.getByTestId('tab_constraints');
        this.constraintsTable = this.page.getByTestId('table_constraints');
        this.expensesTab = this.page.getByTestId('tab_expenses');
        this.expensesGroupedButton = this.page.getByTestId('btn_grouped');
        this.expensesDetailedButton = this.page.getByTestId('btn_detailed');
        this.expensesPaidNetworkTrafficButton = this.page.getByTestId('btn_paid_network_traffic');
        this.recommendationsTab = this.page.getByTestId('tab_recommendations');
    }

    async setupApiInterceptions() {
        const apiInterceptions = [
            {urlPattern: `restapi/v2/cloud_resources`, mockResponse: ResourceDetailsResponse},
        ];

        await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
            interceptApiRequest({page: this.page, urlPattern, mockResponse})
        ));
    }
    async isTabSelected(tab: Locator) {
        return await tab.getAttribute('aria-selected') === 'true';
    }

    async clickDetailsTab() {
        await this.detailsTab.click();
    }

    async clickConstraintsTab() {
        await this.constraintsTab.click();
    }

    async clickExpensesTab() {
        await this.expensesTab.click();
    }

    async clickRecommendationsTab() {
        await this.recommendationsTab.click();
    }

    async clickExpensesGroupedButtonIfNotActive() {
        if (!await this.evaluateActiveButton(this.expensesGroupedButton)){
            await this.expensesGroupedButton.click();
        }
    }

    async clickExpensesDetailedButton() {
        await this.expensesDetailedButton.click();
    }

    async clickExpensesPaidNetworkTrafficButton() {
        await this.expensesPaidNetworkTrafficButton.click();
    }
}
