import { BaseCreatePage } from './base-create-page';
import { Locator, Page } from '@playwright/test';

/**
 * Represents the Policies Create Page.
 * Extends the BaseCreatePage class.
 */
export class PoliciesCreatePage extends BaseCreatePage {
  readonly heading: Locator;
  readonly resourceCountInput: Locator;
  readonly monthlyBudgetInput: Locator;
  readonly totalBudgetInput: Locator;
  readonly setDateBtn: Locator;
  readonly timePicker: Locator;
  readonly amButton: Locator;
  readonly pmButton: Locator;
  readonly setButton: Locator;

  /**
   * Initializes a new instance of the PoliciesCreatePage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/policies/create');
    this.heading = this.main.getByTestId('lbl_create_quota_and_budget_policy');
    this.resourceCountInput = this.main.getByTestId('input_maxValue');
    this.monthlyBudgetInput = this.main.getByTestId('input_monthlyBudget');
    this.totalBudgetInput = this.main.getByTestId('input_totalBudget');
    this.setDateBtn = this.main.getByTestId('btn_select_date');
    this.timePicker = this.page.locator('//input[@data-test-id="half-hour-time-selector"]/..');
    this.amButton = this.page.getByRole('button', { name: 'AM' });
    this.pmButton = this.page.getByRole('button', { name: 'PM' });
    this.setButton = this.page.getByRole('button', { name: 'Set' });
  }

  /**
   * Creates a new resource policy with the specified name, count, and optional filter.
   *
   * @param {string} name - The name of the resource policy.
   * @param {number} count - The maximum resource count for the policy.
   * @param {Locator} [filter] - An optional filter to apply. If the filter is not visible,
   *                             the "Show More Filters" button will be clicked to reveal it.
   * @param filterOption
   * @returns {Promise<void>} A promise that resolves when the policy is created.
   */
  async createResourcePolicy(name: string, count: number, filter?: Locator, filterOption?: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.selectFromComboBox(this.typeSelect, 'Resource quota');
    await this.showMoreFiltersBtn.waitFor();
    await this.resourceCountInput.fill(count.toString());
    await this.selectFilter(filter, filterOption);
    await this.saveBtn.click();
  }

  /**
   * Creates a recurring budget policy with the specified name, amount, and optional filter.
   *
   * @param {string} name - The name of the recurring budget policy.
   * @param {number} amount - The monthly budget amount for the policy.
   * @param {Locator} [filter] - An optional filter to apply. If the filter is not visible,
   *                              the "Show More Filters" button will be clicked to reveal it.
   * @param {string} [filterOption] - The specific filter option to select.
   * @returns {Promise<void>} A promise that resolves when the recurring budget policy is created.
   */
  async createRecurringBudgetPolicy(name: string, amount: number, filter?: Locator, filterOption?: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.selectFromComboBox(this.typeSelect, 'Recurring budget');
    await this.showMoreFiltersBtn.waitFor();
    await this.monthlyBudgetInput.fill(amount.toString());
    await this.selectFilter(filter, filterOption);
    await this.saveBtn.click();
  }

  /**
   * Creates an expiring budget policy with the specified name, budget, and optional filter.
   *
   * @param {string} name - The name of the expiring budget policy.
   * @param {number} budget - The total budget amount for the policy.
   * @param {Locator} [filter] - An optional filter to apply. If the filter is not visible,
   *                              the "Show More Filters" button will be clicked to reveal it.
   * @param {string} [filterOption] - The specific filter option to select.
   * @returns {Promise<void>} A promise that resolves when the expiring budget policy is created.
   */
  async createExpiringBudgetPolicy(name: string, budget: number, filter?: Locator, filterOption?: string): Promise<void> {
    await this.nameInput.fill(name);
    await this.selectFromComboBox(this.typeSelect, 'Expiring budget');
    await this.showMoreFiltersBtn.waitFor();
    await this.totalBudgetInput.fill(budget.toString());
    await this.setTime();
    await this.selectFilter(filter, filterOption);
    await this.saveBtn.click();
  }

  /**
   * Sets the time for the policy.
   *
   * @param {string} [time='12:00'] - The time to set in the format 'hh:mm'.
   * @param {boolean} [am=true] - Whether to set the time as AM (true) or PM (false).
   * @returns {Promise<void>} A promise that resolves when the time is set.
   */
  async setTime(time: string = '12:00', am: boolean = true): Promise<void> {
    await this.setDateBtn.click();
    await this.selectFromComboBox(this.timePicker, time);
    if (am) {
      await this.amButton.click();
    } else {
      await this.pmButton.click();
    }
    await this.setButton.click();
  }

  /**
   * Selects a filter and applies the specified filter option.
   *
   * @param {Locator} filter - The filter locator to select.
   * @param {string} filterOption - The specific filter option to apply.
   * @throws {Error} Throws an error if `filterOption` is not provided when `filter` is specified.
   * @returns {Promise<void>} A promise that resolves when the filter is applied.
   */
  private async selectFilter(filter: Locator, filterOption: string): Promise<void> {
    if (filter) {
      if (!filterOption) {
        throw new Error('filterOption must be provided when filter is specified');
      }
      if (!(await filter.isVisible())) await this.showMoreFiltersBtn.click();
      await filter.click();

      await this.filterPopover.getByLabel(filterOption).click();
      await this.filterApplyButton.click();
    }
  }
}
