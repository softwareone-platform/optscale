import {Locator, Page} from "@playwright/test";
import { BasePage } from "./base-page";

export class ExpensesPage extends BasePage {
    readonly page: Page;
    readonly expensesHeading: Locator;
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

    constructor(page: Page) {
        super(page, '/expenses');
        this.page = page;
        this.expensesHeading = this.page.locator('//h1[contains(text(), "Expenses of")]');
        this.expensesSelectedPeriodValue = this.page.locator('//div[.="Total expenses for selected period"]/./following-sibling::div');
        this.expensesPreviousPeriodValue = this.page.locator('//div[.="Total expenses for previous period"]/./following-sibling::div');
        this.dailyBtn = this.page.getByTestId('breakdown_ls_item_daily');
        this.weeklyBtn = this.page.getByTestId('breakdown_ls_item_weekly');
        this.monthlyBtn = this.page.getByTestId('breakdown_ls_item_monthly');
        this.selectedDateText = this.page.getByTestId('text_selected_dates');
        this.selectDateBtn = this.page.getByTestId('btn_select_date');
        this.sourceBtn = this.page.getByRole('button', {name: 'Source'});
        this.poolBtn = this.page.getByRole('button', {name: 'Pool'});
        this.ownerBtn = this.page.getByRole('button', {name: 'Owner'});
    }
}
