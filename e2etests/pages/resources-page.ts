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
    readonly possibleSavingsCard: Locator;
    readonly possibleMonthlySavingsValue: Locator;
    readonly expensesBtn: Locator;
    readonly resourceCountBtn: Locator;
    readonly tagsBtn: Locator;
    readonly selectedDateText: Locator;
    readonly selectDateBtn: Locator;
    readonly dateRangePopup: Locator;
    readonly last7DaysBtn: Locator;
    readonly applyDateBtn: Locator;
    readonly categorizeBySelect: Locator;
    readonly expensesSelect: Locator;
    readonly poolBtn: Locator;
    readonly ownerBtn: Locator;
    readonly tagSelect: Locator;
    readonly showWeekendsCheckbox: Locator;
    readonly searchInput: Locator;
    readonly previousMonthSelect: Locator;
    readonly previousYearSelect: Locator;
    readonly expensesBreakdownChart: Locator;
    readonly resourceCountBreakdownChart: Locator;
    readonly tagsBreakdownChart: Locator;
    readonly firstResourceItemInTable: Locator;
    readonly resetFiltersBtn: Locator;
    readonly table: Locator;
    readonly tableExpensesValue: Locator;
    readonly navigateNextIcon: Locator;
    readonly tableColumn3: Locator;

    readonly filtersBox: Locator;
    readonly allFilterBoxButtons: Locator;
    readonly filterPopover: Locator;
    readonly suggestionsFilter: Locator;
    readonly dataSourceFilter: Locator;
    readonly poolFilter: Locator;
    readonly ownerFilter: Locator;
    readonly regionFilter: Locator;
    readonly serviceFilter: Locator;
    readonly resourceTypeFilter: Locator;
    readonly activityFilter: Locator;
    readonly recommendationsFilter: Locator;
    readonly constraintViolationsFilter: Locator;
    readonly firstSeenFilter: Locator;
    readonly lastSeenFilter: Locator;
    readonly tagFilter: Locator;
    readonly withoutTagFilter: Locator;
    readonly paidNetworkTrafficFromFilter: Locator;
    readonly paidNetworkTrafficToFilter: Locator;
    readonly k8sNodeFilter: Locator;
    readonly k8sServiceFilter: Locator;
    readonly k8sNamespaceFilter: Locator;


    readonly billingOnlyOption: Locator;
    readonly filterApplyButton: Locator;
    readonly showMoreFiltersBtn: Locator;
    readonly showLessFiltersBtn: Locator;

    readonly showLegend: Locator;
    readonly exportChartBtn: Locator;


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
        this.possibleSavingsCard = this.main.getByTestId('card_possible_savings');
        this.possibleMonthlySavingsValue = this.possibleSavingsCard.getByTestId('p_savings_value');

        this.selectedDateText = this.main.getByTestId('text_selected_dates');
        this.selectDateBtn = this.main.getByTestId('btn_select_date');
        this.dateRangePopup = this.page.getByTestId('window_date_range');
        this.last7DaysBtn = this.getByAnyTestId('btn_last_7_days', this.dateRangePopup);
        this.previousMonthSelect = this.dateRangePopup.getByTestId('selector_previous_month');
        this.previousYearSelect = this.dateRangePopup.getByTestId('selector_previous_year');
        this.applyDateBtn = this.dateRangePopup.getByTestId('btn_apply_date');

        this.expensesBtn = this.main.getByTestId('tab_expenses');
        this.resourceCountBtn = this.main.getByTestId('tab_counts');
        this.tagsBtn = this.main.getByTestId('tab_tags');

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

        this.filtersBox = this.main.locator('xpath=(//div[contains(@class, "MuiGrid-root")]//div[.="Filters:"])[1]/..');
        this.allFilterBoxButtons = this.filtersBox.locator('button');
        this.filterPopover = this.page.locator('//div[contains(@id, "filter-popover")]');

        this.suggestionsFilter = this.filtersBox.getByRole("button", {name: "Suggestions"});
        this.dataSourceFilter = this.filtersBox.getByRole("button", {name: "Data source ("});
        this.poolFilter = this.filtersBox.getByRole("button", {name: "Pool ("});
        this.ownerFilter = this.filtersBox.getByRole("button", {name: "Owner ("});
        this.regionFilter = this.filtersBox.getByRole("button", {name: "Region ("});
        this.serviceFilter = this.filtersBox.getByRole("button", {name: /^Service \(/});
        this.resourceTypeFilter = this.filtersBox.getByRole("button", {name: "Resource type ("});
        this.activityFilter = this.filtersBox.getByRole("button", {name: "Activity ("});
        this.recommendationsFilter = this.filtersBox.getByRole("button", {name: "Recommendations ("});
        this.constraintViolationsFilter = this.filtersBox.getByRole("button", {name: "Constraint violations ("});
        this.firstSeenFilter = this.filtersBox.getByRole("button", {name: "First seen ("});
        this.lastSeenFilter = this.filtersBox.getByRole("button", {name: "Last seen ("});
        this.tagFilter = this.filtersBox.getByRole("button", {name: /^Tag \(/});
        this.withoutTagFilter = this.filtersBox.getByRole("button", {name: "Without tag ("});
        this.paidNetworkTrafficFromFilter = this.filtersBox.getByRole("button", {name: "Paid network traffic from ("});
        this.paidNetworkTrafficToFilter = this.filtersBox.getByRole("button", {name: "Paid network traffic to ("});
        this.k8sNodeFilter = this.filtersBox.getByRole("button", {name: "K8s node ("});
        this.k8sServiceFilter = this.filtersBox.getByRole("button", {name: "K8s service ("});
        this.k8sNamespaceFilter = this.filtersBox.getByRole('button', {name: 'K8s namespace ('});


        this.billingOnlyOption = this.filterPopover.getByLabel('Billing only');
        this.filterApplyButton = this.filterPopover.getByRole("button", {name: "Apply"});
        this.resetFiltersBtn = this.main.getByRole("button", {name: "Reset filters"});
        this.showMoreFiltersBtn = this.main.getByRole('button', {name: 'Show more'});
        this.showLessFiltersBtn = this.main.getByRole('button', {name: 'Show less'});

        this.showLegend = this.main.getByLabel('Show legend');
        this.exportChartBtn = this.main.getByTestId('btn_export_chart');

        this.table = this.main.locator('table');
        this.tableColumn3 = this.table.locator('//td[3]');
        this.tableExpensesValue = this.tableColumn3.locator('//a[1]');
        this.firstResourceItemInTable = this.main.locator(
            '[data-test-id="CleanExpensesTable"] [data-test-id="row_0"] a[data-test-id^="resource_name_"]'
        );
        this.navigateNextIcon = this.getByAnyTestId('NavigateNextIcon', this.main);
    }

    /**
     * Sets up API interceptions for the Resources page.
     * Intercepts API requests and provides mock responses.
     * @returns {Promise<void>}
     */
    async setupApiInterceptions(): Promise<void> {
        const apiInterceptions: IInterceptorConfig[] = [
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/summary_expenses`,
                mockResponse: SummaryExpensesResponse
            },
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/breakdown_expenses`,
                mockResponse: BreakdownExpensesResponse
            },
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/clean_expenses`,
                mockResponse: CleanExpensesResponse
            },
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/available_filters`,
                mockResponse: AvailableFiltersResponse
            },
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/resources_count`,
                mockResponse: ResourcesCountResponse
            },
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/breakdown_tags`,
                mockResponse: BreakdownTagsResponse
            },
        ];

        await Promise.all(apiInterceptions.map(interceptApiRequest));
    }

    /**
     * Clicks the Expenses button if it is not already active.
     * @returns {Promise<void>}
     */
    async clickCardsExpensesIfNotActive(): Promise<void> {
        await this.expensesBtn.click();
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
        await this.page.getByRole('option', {name: month}).click();
        await this.previousYearSelect.click();
        await this.page.getByRole('option', {name: year}).click();
        await this.page.getByRole('button', {name: startDay, exact: true}).first().click();
        await this.page.getByRole('button', {name: endDay}).first().click();
        await this.applyDateBtn.click();
    }

    async selectLast7DaysDateRange() {
        await this.selectDateBtn.click();
        await this.last7DaysBtn.click();
        await this.applyDateBtn.click();
        console.log('Selected last 7 days date range');
        await this.waitForCanvas();
    }

    /**
     * Clicks a link to the details page.
     * @param {Locator} link - The link to click.
     * @returns {Promise<void>}
     */
    async clickLinkToDetails(link: Locator) {
        await link.click();
    }

    /**
     * Retrieves the total expenses value displayed on the Resources page.
     * The value is extracted from the `totalExpensesValue` locator and parsed into a numeric format.
     *
     * @returns {Promise<number>} A promise that resolves to the total expenses value as a number.
     */
    async getTotalExpensesValue(): Promise<number> {
        const value = await this.totalExpensesValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Resets all filters applied on the Resources page.
     * This method clicks the reset filters button, logs the action, and waits for the canvas to update.
     *
     * @returns {Promise<void>} Resolves when the filters are reset and the canvas is updated.
     */
    async resetFilters(): Promise<void> {
        await this.resetFiltersBtn.click();
        console.log('Resetting filters');
        await this.waitForCanvas();
    }


    /**
     * Applies the "Billing only" filter on the Resources page.
     * This method clicks the activity filter, selects the "Billing only" option, and applies the filter.
     * It logs the action and waits for the canvas to update.
     *
     * @returns {Promise<void>} Resolves when the filter is applied and the canvas is updated.
     */
    async clickActivityFilterBillingOnlyOptionAndApply(): Promise<void> {
        await this.activityFilter.click();
        await this.billingOnlyOption.click();
        await this.filterApplyButton.click();
        console.log('Clicking by billing only');
        await this.waitForCanvas();
    }

    /**
     * Retrieves the possible monthly savings value displayed on the Resources page.
     * The value is extracted from the `possibleMonthlySavingsValue` locator and parsed into a numeric format.
     *
     * @returns {Promise<number>} A promise that resolves to the possible monthly savings value as a number.
     */
    async getPossibleMonthlySavingsValue(): Promise<number> {
        const value = await this.possibleMonthlySavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Clicks the possible savings card on the Resources page.
     * This method interacts with the `possibleSavingsCard` locator and waits for the page to load after the click.
     *
     * @returns {Promise<void>} Resolves when the card is clicked and the page load state is complete.
     */
    async clickPossibleSavingsCard(): Promise<void> {
        await this.possibleSavingsCard.click();
        await this.page.waitForLoadState();
    }

    async clickShowMoreFilters(): Promise<void> {
        await this.showMoreFiltersBtn.click();
    }

    async clickShowLegend(): Promise<void> {
        await this.showLegend.click();
        console.log('Toggling legend visibility');
    }

    async selectCategorizeBy(option: string): Promise<void> {
        await this.selectFromComboBox(this.categorizeBySelect, option);
        await this.waitForCanvas();
    }


}
