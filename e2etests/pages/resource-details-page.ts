import {BasePage} from "./base-page";
        import {Locator, Page} from "@playwright/test";
        import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";
        import {
            AllowedActionsSunflowerEUResponse,
            LimitHitsResponse, RawExpensesResponse,
            ResourceDetailsResponse
        } from "../test-data/resource-details-data";

        /**
         * Represents the Resource Details Page.
         * Extends the BasePage class.
         */
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
            readonly table: Locator;
            readonly tableColumn2: Locator;
            readonly navigateNextIcon: Locator;

            /**
             * Initializes a new instance of the ResourceDetailsPage class.
             * @param {Page} page - The Playwright page object.
             */
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
                this.table = this.main.locator('table');
                this.tableColumn2 = this.table.locator('//td[2]')
                this.navigateNextIcon = this.getByAnyTestId('NavigateNextIcon', this.main);
            }

            /**
             * Sets up API interceptions for the Resource Details page.
             * Intercepts API requests and provides mock responses.
             * @returns {Promise<void>}
             */
            async setupApiInterceptions(): Promise<void> {
                const apiInterceptions: IInterceptorConfig[] = [
                    {page: this.page, urlPattern: `v2/cloud_resources/[^/]+?details=true`, mockResponse: ResourceDetailsResponse},
                    {page: this.page, urlPattern: `v2/cloud_resources/[^/]+/limit_hits`, mockResponse: LimitHitsResponse},
                    {page: this.page, urlPattern: `v2/allowed_actions\\?cloud_resource=.+`, mockResponse: AllowedActionsSunflowerEUResponse},
                    {page: this.page, urlPattern: `v2/resources/[^/]+/raw_expenses`, mockResponse: RawExpensesResponse},
                ];

                await Promise.all(apiInterceptions.map(interceptApiRequest));
            }

            /**
             * Checks if a tab is selected.
             * @param {Locator} tab - The tab to check.
             * @returns {Promise<boolean>}
             */
            async isTabSelected(tab: Locator): Promise<boolean> {
                return await tab.getAttribute('aria-selected') === 'true';
            }

            /**
             * Clicks the Details tab.
             * @returns {Promise<void>}
             */
            async clickDetailsTab(): Promise<void> {
                await this.detailsTab.click();
            }

            /**
             * Clicks the Constraints tab.
             * @returns {Promise<void>}
             */
            async clickConstraintsTab(): Promise<void> {
                await this.constraintsTab.click();
            }

            /**
             * Clicks the Expenses tab.
             * @returns {Promise<void>}
             */
            async clickExpensesTab(): Promise<void> {
                await this.expensesTab.click();
            }

            /**
             * Clicks the Recommendations tab.
             * @returns {Promise<void>}
             */
            async clickRecommendationsTab(): Promise<void> {
                await this.recommendationsTab.click();
            }

            /**
             * Clicks the Expenses Grouped button if it is not already active.
             * @returns {Promise<void>}
             */
            async clickExpensesGroupedButtonIfNotActive(): Promise<void> {
                if (!await this.evaluateActiveButton(this.expensesGroupedButton)){
                    await this.expensesGroupedButton.click();
                }
            }

            /**
             * Clicks the Expenses Detailed button.
             * @returns {Promise<void>}
             */
            async clickExpensesDetailedButton(): Promise<void> {
                await this.expensesDetailedButton.click();
            }

            /**
             * Clicks the Expenses Paid Network Traffic button.
             * @returns {Promise<void>}
             */
            async clickExpensesPaidNetworkTrafficButton(): Promise<void> {
                await this.expensesPaidNetworkTrafficButton.click();
            }
        }
