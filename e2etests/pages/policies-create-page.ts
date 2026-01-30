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
}
