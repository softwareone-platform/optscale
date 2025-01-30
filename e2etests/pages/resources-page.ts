import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class ResourcesPage extends BasePage {
    readonly page: Page;
    readonly main: Locator;
    readonly resourcesHeading: Locator;
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


    constructor(page: Page) {
        super(page, '/resources');
        this.page = page;
        this.main = this.page.locator('main');
        this.resourcesHeading = this.page.getByTestId('lbl_resources');
        this.perspectivesBtn = this.page.getByRole('button', {name: 'Perspectives'});
        this.savePerspectiveBtn = this.page.getByRole('button', {name: 'Save perspective'});
        this.configureClusterTypesBtn = this.page.getByRole('button', {name: 'Configure cluster types'});
        this.totalExpensesValue = this.page.getByTestId('p_expenses_value');
        this.resourceCountValue = this.page.getByTestId('p_count_value');
        this.expensesBtn = this.page.getByTestId('breakdown_ls_item_expenses');
        this.resourceCountBtn = this.page.getByTestId('breakdown_ls_item_resource_count');
        this.tagsBtn = this.page.getByTestId('breakdown_ls_item_tags');
        this.selectedDateText = this.page.getByTestId('text_selected_dates');
        this.selectDateBtn = this.page.getByTestId('btn_select_date');
        this.previousMonthSelect = this.page.getByTestId('selector_previous_month');
        this.previousYearSelect = this.page.getByTestId('selector_previous_year');
        this.applyDateButton = this.page.getByTestId('btn_apply_date');
        this.filtersSelect = this.page.getByTestId('selector_suggestedFilters');
        this.categorizeBySelect = this.page.getByTestId('resource-categorize-by-selector-select');
        this.expensesSelect = this.page.getByTestId('expenses-split-selector-select');
        this.poolBtn = this.page.getByTestId('ls_item_pool');
        this.ownerBtn = this.page.getByTestId('ls_item_owner');
        this.tagSelect = this.page.getByTestId('selector_tag');
        this.showWeekendsCheckbox = this.page.getByLabel('Show weekends');
        this.searchInput = this.page.getByPlaceholder('Search');
        this.expensesBreakdownChart = this.page.getByTestId('expenses_breakdown_chart');
        this.resourceCountBreakdownChart = this.page.getByTestId('resource_count_breakdown_chart');
        this.tagsBreakdownChart = this.page.getByTestId('tags_breakdown_chart');
    }

    async evaluateActiveButton(button: Locator) {
        const hasActiveButtonClass = await button.evaluate((el) => el.classList.contains('tss-1jtfdbf-button-activeButton'));
        return hasActiveButtonClass;
    }

    async clickCardsExpensesIfNotActive() {
        if (!await this.evaluateActiveButton(this.expensesBtn)) {
            await this.expensesBtn.click();
        }
    }

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
}