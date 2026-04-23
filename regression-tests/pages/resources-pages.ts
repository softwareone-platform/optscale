import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class ResourcesPage extends BasePage {
  readonly heading: Locator;
  readonly tabExpensesBtn: Locator;
  readonly tabResourceCountBtn: Locator;
  readonly tabTagsBtn: Locator;
  readonly searchInput: Locator;
  readonly expensesBreakdownChart: Locator;
  readonly resourceCountBreakdownChart: Locator;
  readonly tagsBreakdownChart: Locator;
  readonly firstResourceItemInTable: Locator;

  constructor(page: Page) {
    super(page, '/resources');
    this.heading = this.main.getByTestId('lbl_resources');
    this.tabExpensesBtn = this.main.getByTestId('tab_expenses');
    this.tabResourceCountBtn = this.main.getByTestId('tab_counts');
    this.tabTagsBtn = this.main.getByTestId('tab_tags');
    this.searchInput = this.main.getByPlaceholder('Search');
    this.expensesBreakdownChart = this.main.getByTestId('expenses_breakdown_chart');
    this.resourceCountBreakdownChart = this.main.getByTestId('resource_count_breakdown_chart');
    this.tagsBreakdownChart = this.main.getByTestId('tags_breakdown_chart');
    this.firstResourceItemInTable = this.main.locator('table tbody tr').first().locator('a').first();
  }
}

export class ResourceDetailsPage extends BasePage {
  readonly heading: Locator;
  readonly detailsTab: Locator;
  readonly constraintsTab: Locator;
  readonly constraintsTable: Locator;
  readonly expensesTab: Locator;
  readonly recommendationsTab: Locator;
  readonly expensesGroupedButton: Locator;
  readonly expensesDetailedButton: Locator;

  constructor(page: Page) {
    super(page, '');
    this.heading = this.page.getByTestId('lbl_resource_name');
    this.detailsTab = this.page.getByTestId('tab_details');
    this.constraintsTab = this.page.getByTestId('tab_constraints');
    this.constraintsTable = this.page.getByTestId('table_constraints');
    this.expensesTab = this.page.getByTestId('tab_expenses');
    this.expensesGroupedButton = this.page.getByTestId('btn_grouped');
    this.expensesDetailedButton = this.page.getByTestId('btn_detailed');
    this.recommendationsTab = this.page.getByTestId('tab_recommendations');
  }

  async clickTab(tab: Locator): Promise<void> {
    await tab.click();
    await this.waitForAllProgressBarsToDisappear();
  }


  async clickExpensesGroupedButton(): Promise<void> {
    await this.expensesGroupedButton.click();
  }
  async clickExpensesDetailedButton(): Promise<void> {
    await this.expensesDetailedButton.click();
  }

  /**
   * Standard screenshot sequence: hover heading, optional canvas wait, fit
   * viewport to full page.
   */
  async prepareScreenshot(waitForCanvas = false): Promise<void> {
    await this.heading.hover();
    if (waitForCanvas) await this.waitForCanvas();
    await this.fitViewportToFullPage();
  }
}
