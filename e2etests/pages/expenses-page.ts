import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

/**
 * Represents the Expenses Page.
 * Extends the BasePage class.
 */
export class ExpensesPage extends BasePage {
  readonly heading: Locator;
  readonly downloadButton: Locator;
  readonly expensesSelectedPeriodValue: Locator;
  readonly expensesPreviousPeriodValue: Locator;
  readonly dailyBtn: Locator;
  readonly weeklyBtn: Locator;
  readonly monthlyBtn: Locator;
  readonly selectedDateText: Locator;
  readonly selectDateBtn: Locator;
  readonly seeExpensesBreakdownGrid: Locator;
  readonly sourceBtn: Locator;
  readonly poolBtn: Locator;
  readonly ownerBtn: Locator;
  readonly geographyBtn: Locator;
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
    this.downloadButton = this.main.getByRole('button', {name: 'Download'});
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
    this.seeExpensesBreakdownGrid = this.main.locator('//div[.="See expenses breakdown by:"]/..');
    this.sourceBtn = this.seeExpensesBreakdownGrid.getByRole('button', {name: 'Source'});
    this.poolBtn = this.seeExpensesBreakdownGrid.getByRole('button', {name: 'Pool'});
    this.ownerBtn = this.seeExpensesBreakdownGrid.getByRole('button', {name: 'Owner'});
    this.geographyBtn = this.seeExpensesBreakdownGrid.getByRole('button', {name: 'Geography'});
  }

  /**
   * Clicks the daily button if it is not already selected.
   * @returns {Promise<void>}
   */
  async clickDailyBtnIfNotSelected(): Promise<void> {
    if (!(await this.evaluateActiveButton(this.dailyBtn))) {
      await this.dailyBtn.click();
    }
  }

  /**
   * Clicks the weekly button.
   * @returns {Promise<void>}
   */
  async clickWeeklyBtn(): Promise<void> {
    await this.weeklyBtn.click();
  }

  /**
   * Clicks the monthly button.
   * @returns {Promise<void>}
   */
  async clickMonthlyBtn(): Promise<void> {
    await this.monthlyBtn.click();
  }

  /**
   * Clicks the Cost Explorer breadcrumb.
   * @returns {Promise<void>}
   */
  async clickCostExploreBreadcrumb(): Promise<void> {
    await this.costExploreBreadcrumb.click();
  }

  /**
   * Clicks the Source button.
   * @returns {Promise<void>}
   */
  async clickSourceBtn(): Promise<void> {
    await this.sourceBtn.click();
  }

  /**
   * Clicks the Pool button.
   * @returns {Promise<void>}
   */
  async clickPoolBtn(): Promise<void> {
    await this.poolBtn.click();
  }

  /**
   * Clicks the Owner button.
   * @returns {Promise<void>}
   */
  async clickOwnerBtn(): Promise<void> {
    await this.ownerBtn.click();
  }
}
