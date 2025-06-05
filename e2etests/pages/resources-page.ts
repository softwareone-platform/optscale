import {BasePage} from "./base-page";
    import {Locator, Page} from "@playwright/test";
    import {SummaryExpensesResponse} from "../test-data/recommendations-page-data";
    import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";
    import {
        AvailableFiltersResponse,
        BreakdownExpensesResponse, BreakdownTagsResponse,
        CleanExpensesResponse,
        ResourcesCountResponse
    } from "../test-data/resources-data";

    /**
     * Represents the Resources Page.
     * Extends the BasePage class.
     */
    export class ResourcesPage extends BasePage {
        readonly heading: Locator;
        readonly perspectivesBtn: Locator;
        readonly savePerspectiveBtn: Locator;
        readonly configureClusterTypesBtn: Locator;
        readonly totalExpensesValue: Locator;
        readonly resourceCountValue: Locator;
        readonly expensesBtn: Locator;
        readonly resourceCountBtn: Locator;
        readonly tagsBtn: Locator;
        readonly selectedDateText: Locator;
        readonly selectDateBtn: Locator;
        readonly filtersSelect: Locator;
        readonly categorizeBySelect: Locator;
        readonly expensesSelect: Locator;
        readonly poolBtn: Locator;
        readonly ownerBtn: Locator;
        readonly tagSelect: Locator;
        readonly showWeekendsCheckbox: Locator;
        readonly searchInput: Locator;
        readonly previousMonthSelect: Locator;
        readonly previousYearSelect: Locator;
        readonly applyDateButton: Locator;
        readonly expensesBreakdownChart: Locator;
        readonly resourceCountBreakdownChart: Locator;
        readonly tagsBreakdownChart: Locator;
        readonly firstResourceItemInTable: Locator;

        /**
         * Initializes a new instance of the ResourcesPage class.
         * @param {Page} page - The Playwright page object.
         */
        constructor(page: Page) {
            super(page, '/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true');
            this.heading = this.main.getByTestId('lbl_resources');
            this.perspectivesBtn = this.main.getByRole('button', {name: 'Perspectives'});
            this.savePerspectiveBtn = this.main.getByRole('button', {name: 'Save perspective'});
            this.configureClusterTypesBtn = this.main.getByRole('button', {name: 'Configure cluster types'});
            this.totalExpensesValue = this.main.getByTestId('p_expenses_value');
            this.resourceCountValue = this.main.getByTestId('p_count_value');
            this.expensesBtn = this.main.getByTestId('breakdown_ls_item_expenses');
            this.resourceCountBtn = this.main.getByTestId('breakdown_ls_item_resource_count');
            this.tagsBtn = this.main.getByTestId('breakdown_ls_item_tags');
            this.selectedDateText = this.main.getByTestId('text_selected_dates');
            this.selectDateBtn = this.main.getByTestId('btn_select_date');
            this.previousMonthSelect = this.main.getByTestId('selector_previous_month');
            this.previousYearSelect = this.main.getByTestId('selector_previous_year');
            this.applyDateButton = this.main.getByTestId('btn_apply_date');
            this.filtersSelect = this.main.getByTestId('selector_suggestedFilters');
            this.categorizeBySelect = this.main.getByTestId('resource-categorize-by-selector-select');
            this.expensesSelect = this.main.getByTestId('expenses-split-selector-select');
            this.poolBtn = this.main.getByTestId('ls_item_pool');
            this.ownerBtn = this.main.getByTestId('ls_item_owner');
            this.tagSelect = this.main.getByTestId('selector_tag');
            this.showWeekendsCheckbox = this.main.getByLabel('Show weekends');
            this.searchInput = this.main.getByPlaceholder('Search');
            this.expensesBreakdownChart = this.main.getByTestId('expenses_breakdown_chart');
            this.resourceCountBreakdownChart = this.main.getByTestId('resource_count_breakdown_chart');
            this.tagsBreakdownChart = this.main.getByTestId('tags_breakdown_chart');
            this.firstResourceItemInTable = this.main.locator(
              '[data-test-id="CleanExpensesTable"] [data-test-id="row_0"] a[data-test-id^="resource_name_"]'
            );
        }

        /**
         * Sets up API interceptions for the Resources page.
         * Intercepts API requests and provides mock responses.
         * @returns {Promise<void>}
         */
        async setupApiInterceptions(): Promise<void> {
            const apiInterceptions: IInterceptorConfig[] = [
                {page: this.page, urlPattern: `/v2/organizations/[^/]+/summary_expenses`, mockResponse: SummaryExpensesResponse},
                {page: this.page, urlPattern: `/v2/organizations/[^/]+/breakdown_expenses`, mockResponse: BreakdownExpensesResponse},
                {page: this.page, urlPattern: `/v2/organizations/[^/]+/clean_expenses`, mockResponse: CleanExpensesResponse},
                {page: this.page, urlPattern: `/v2/organizations/[^/]+/available_filters`, mockResponse: AvailableFiltersResponse},
                {page: this.page, urlPattern: `/v2/organizations/[^/]+/resources_count`, mockResponse: ResourcesCountResponse},
                {page: this.page, urlPattern: `/v2/organizations/[^/]+/breakdown_tags`, mockResponse: BreakdownTagsResponse},
            ];

            await Promise.all(apiInterceptions.map(interceptApiRequest));
        }

        /**
         * Clicks the Expenses button if it is not already active.
         * @returns {Promise<void>}
         */
        async clickCardsExpensesIfNotActive(): Promise<void> {
            if (!await this.evaluateActiveButton(this.expensesBtn)) {
                await this.expensesBtn.click();
            }
        }

        /**
         * Selects a previous date range.
         * @param {string} month - The month to select.
         * @param {string} year - The year to select.
         * @param {string} startDay - The start day to select.
         * @param {string} endDay - The end day to select.
         * @returns {Promise<void>}
         */
        async selectPreviousDateRange(month: string, year: string, startDay: string, endDay: string) {
            await this.selectDateBtn.click();
            await this.previousMonthSelect.click();
            await this.page.getByRole('option', { name: month }).click();
            await this.previousYearSelect.click();
            await this.page.getByRole('option', { name: year }).click();
            await this.page.getByRole('button', { name: startDay, exact: true }).first().click();
            await this.page.getByRole('button', { name: endDay }).first().click();
            await this.applyDateButton.click();
        }

        /**
         * Clicks a link to the details page.
         * @param {Locator} link - The link to click.
         * @returns {Promise<void>}
         */
        async clickLinkToDetails(link: Locator) {
            await link.click();
        }
    }
