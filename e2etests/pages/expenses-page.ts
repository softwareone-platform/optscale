import {Locator, Page} from "@playwright/test";
import { BasePage } from "./base-page";
import {interceptApiRequest} from "../utils/interceptor";
import {
    PoolsExpensesOwnerResponse,
    PoolsExpensesPoolResponse,
    PoolsExpensesResponse,
    PoolsExpensesSourceResponse
} from "../test-data/expenses-data";

/**
 * Represents the Expenses Page.
 * Extends the BasePage class.
 */
export class ExpensesPage extends BasePage {
    readonly heading: Locator;
    readonly expensesSelectedPeriodValue: Locator;
    readonly expensesPreviousPeriodValue: Locator;
    readonly dailyBtn: Locator;
    readonly weeklyBtn: Locator;
    readonly monthlyBtn: Locator;
    readonly selectedDateText: Locator;
    readonly selectDateBtn: Locator;
    readonly sourceBtn: Locator;
    readonly poolBtn: Locator;
    readonly ownerBtn: Locator;
    readonly costExploreBreadcrumb: Locator;
    readonly dataSourceHeading: Locator;
    readonly poolHeading: Locator;
    readonly ownerHeading: Locator;

    /**
     * Initializes a new instance of the ExpensesPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/expenses');
        this.costExploreBreadcrumb = this.main.locator('[href="/expenses"]');
        this.heading = this.main.locator('//h1[contains(text(), "Cost explorer for")]');
        this.dataSourceHeading = this.main.locator('//h1[contains(text(), "Expenses Breakdown by Data Source")]');
        this.poolHeading = this.main.locator('//h1[contains(text(), "Expenses Breakdown by Pool")]');
        this.ownerHeading = this.main.locator('//h1[contains(text(), "Expenses Breakdown by Owner")]');
        this.expensesSelectedPeriodValue = this.main.locator('//div[.="Total expenses for selected period"]/./following-sibling::div');
        this.expensesPreviousPeriodValue = this.main.locator('//div[.="Total expenses for previous period"]/./following-sibling::div');
        this.dailyBtn = this.main.getByTestId('breakdown_ls_item_daily');
        this.weeklyBtn = this.main.getByTestId('breakdown_ls_item_weekly');
        this.monthlyBtn = this.main.getByTestId('breakdown_ls_item_monthly');
        this.selectedDateText = this.main.getByTestId('text_selected_dates');
        this.selectDateBtn = this.main.getByTestId('btn_select_date');
        this.sourceBtn = this.main.getByRole('button', {name: 'Source'});
        this.poolBtn = this.main.getByRole('button', {name: 'Pool'});
        this.ownerBtn = this.main.getByRole('button', {name: 'Owner'});
    }

    /**
     * Sets up API interceptions for the Expenses page.
     * Intercepts API requests and provides mock responses.
     * @returns {Promise<void>}
     */
    async setupApiInterceptions() {
        const apiInterceptions = [
            {urlPattern: `/v2/pools_expenses/[^/]+filter_by=cloud`, mockResponse: PoolsExpensesSourceResponse},
            {urlPattern: `/v2/pools_expenses/[^/]+filter_by=pool`, mockResponse: PoolsExpensesPoolResponse},
            {urlPattern: `/v2/pools_expenses/[^/]+filter_by=employee`, mockResponse: PoolsExpensesOwnerResponse},
            {urlPattern: `/v2/pools_expenses/[^/]+?end_date=[0-9]+&start_date=[0-9]+(?!.*filter)`, mockResponse: PoolsExpensesResponse},
        ];

        await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
            interceptApiRequest({page: this.page, urlPattern, mockResponse})
        ));
    }

    /**
     * Clicks the daily button if it is not already selected.
     * @returns {Promise<void>}
     */
    async clickDailyBtnIfNotSelected() {
        if (!(await this.evaluateActiveButton(this.dailyBtn))) {
            await this.dailyBtn.click();
        }
    }

    /**
     * Clicks the weekly button.
     * @returns {Promise<void>}
     */
    async clickWeeklyBtn() {
        await this.weeklyBtn.click();
    }

    /**
     * Clicks the monthly button.
     * @returns {Promise<void>}
     */
    async clickMonthlyBtn() {
        await this.monthlyBtn.click();
    }

    /**
     * Clicks the Cost Explorer breadcrumb.
     * @returns {Promise<void>}
     */
    async clickCostExploreBreadcrumb() {
        await this.costExploreBreadcrumb.click();
    }

    /**
     * Clicks the Source button.
     * @returns {Promise<void>}
     */
    async clickSourceBtn() {
        await this.sourceBtn.click();
    }

    /**
     * Clicks the Pool button.
     * @returns {Promise<void>}
     */
    async clickPoolBtn() {
        await this.poolBtn.click();
    }

    /**
     * Clicks the Owner button.
     * @returns {Promise<void>}
     */
    async clickOwnerBtn() {
        await this.ownerBtn.click();
    }
}