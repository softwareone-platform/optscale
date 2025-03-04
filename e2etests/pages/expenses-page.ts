import {Locator, Page} from "@playwright/test";
import { BasePage } from "./base-page";
import {AllowedActionsPoolResponse, PoolResponse} from "../test-data/pools-data";
import {interceptApiRequest} from "../utils/interceptor";
import {
    PoolsExpensesOwnerResponse,
    PoolsExpensesPoolResponse,
    PoolsExpensesResponse,
    PoolsExpensesSourceResponse
} from "../test-data/expenses-data";

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

    constructor(page: Page) {
        super(page, '/expenses');
        this.costExploreBreadcrumb = this.main.locator('//a[.="Cost Explorer"]');
        this.heading = this.page.locator('//h1[contains(text(), "Expenses of")]');
        this.expensesSelectedPeriodValue = this.page.locator('//div[.="Total expenses for selected period"]/./following-sibling::div');
        this.expensesPreviousPeriodValue = this.page.locator('//div[.="Total expenses for previous period"]/./following-sibling::div');
        this.dailyBtn = this.page.getByTestId('breakdown_ls_item_daily');
        this.weeklyBtn = this.page.getByTestId('breakdown_ls_item_weekly');
        this.monthlyBtn = this.page.getByTestId('breakdown_ls_item_monthly');
        this.selectedDateText = this.page.getByTestId('text_selected_dates');
        this.selectDateBtn = this.page.getByTestId('btn_select_date');
        this.sourceBtn = this.main.getByRole('button', {name: 'Source'});
        this.poolBtn = this.main.getByRole('button', {name: 'Pool'});
        this.ownerBtn = this.main.getByRole('button', {name: 'Owner'});
    }
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

    async clickDailyBtnIfNotSelected() {
        if (!(await this.evaluateActiveButton(this.dailyBtn))) {
            await this.dailyBtn.click();
        }
    }

    async clickWeeklyBtn() {
            await this.weeklyBtn.click();
    }

    async clickMonthlyBtn() {
            await this.monthlyBtn.click();
    }

    async clickCostExploreBreadcrumb() {
        await this.costExploreBreadcrumb.click();
    }

    async clickSourceBtn() {
        await this.sourceBtn.click();
    }

    async clickPoolBtn() {
        await this.poolBtn.click();
    }

    async clickOwnerBtn() {
        await this.ownerBtn.click();
    }
}
