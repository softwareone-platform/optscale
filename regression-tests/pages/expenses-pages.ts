import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class ExpensesPage extends BasePage {
  readonly heading: Locator;
  readonly dailyBtn: Locator;
  readonly weeklyBtn: Locator;
  readonly monthlyBtn: Locator;
  readonly seeExpensesBreakdownGrid: Locator;
  readonly sourceBtn: Locator;
  readonly poolBtn: Locator;
  readonly ownerBtn: Locator;
  readonly costExploreBreadcrumb: Locator;
  readonly dataSourceHeading: Locator;
  readonly poolHeading: Locator;
  readonly ownerHeading: Locator;

  constructor(page: Page) {
    super(page, '/expenses');
    this.costExploreBreadcrumb = this.main.locator('[href="/expenses"]');
    this.heading = this.main.locator('//h1[contains(text(), "Cost explorer for")]');
    this.dataSourceHeading = this.main.locator('//h1[contains(text(), "Expenses Breakdown by Data Source")]');
    this.poolHeading = this.main.locator('//h1[contains(text(), "Expenses Breakdown by Pool")]');
    this.ownerHeading = this.main.locator('//h1[contains(text(), "Expenses Breakdown by Owner")]');
    this.dailyBtn = this.main.getByTestId('breakdown_ls_item_daily');
    this.weeklyBtn = this.main.getByTestId('breakdown_ls_item_weekly');
    this.monthlyBtn = this.main.getByTestId('breakdown_ls_item_monthly');
    this.seeExpensesBreakdownGrid = this.main.locator('//div[.="See expenses breakdown by:"]/..');
    this.sourceBtn = this.seeExpensesBreakdownGrid.getByRole('button', { name: 'Source' });
    this.poolBtn = this.seeExpensesBreakdownGrid.getByRole('button', { name: 'Pool' });
    this.ownerBtn = this.seeExpensesBreakdownGrid.getByRole('button', { name: 'Owner' });
  }

  async clickDailyBtnIfNotSelected(): Promise<void> {
    if (!(await this.evaluateActiveButton(this.dailyBtn))) {
      await this.dailyBtn.click();
    }
  }

  async clickWeeklyBtn(): Promise<void> { await this.weeklyBtn.click(); }
  async clickMonthlyBtn(): Promise<void> { await this.monthlyBtn.click(); }
  async clickCostExploreBreadcrumb(): Promise<void> { await this.costExploreBreadcrumb.click(); }
  async clickSourceBtn(): Promise<void> { await this.sourceBtn.click(); }
  async clickPoolBtn(): Promise<void> { await this.poolBtn.click(); }
  async clickOwnerBtn(): Promise<void> { await this.ownerBtn.click(); }
}

export class ExpensesMapPage extends BasePage {
  readonly heading: Locator;
  readonly mapLegend: Locator;

  constructor(page: Page) {
    super(page, '/expenses-map');
    this.heading = this.main.locator('//h1[contains(text(), "Cost map")]');
    this.mapLegend = this.main.locator('[data-testid="map-legend"]');
  }
}
