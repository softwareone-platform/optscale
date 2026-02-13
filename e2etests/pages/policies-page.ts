import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Represents the Policies Page.
 * Extends the BasePage class.
 */
export class PoliciesPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;
  readonly realDataAddBtn: Locator;
  readonly showResourcesBtn: Locator;
  readonly deleteBtn: Locator;
  readonly sideModalDeleteBtn: Locator;
  readonly policyDetailsDiv: Locator;
  readonly resourceUnderLimitLink: Locator;
  readonly resourceUnderLimitStatus: Locator;
  readonly resourceOverLimitLink: Locator;
  readonly resourceOverLimitStatus: Locator;
  readonly recurringBudgetUnderLimitLink: Locator;
  readonly recurringBudgetUnderLimitStatus: Locator
  readonly recurringBudgetOverLimitLink: Locator;
  readonly recurringBudgetOverLimitStatus: Locator;
  readonly expiringBudgetUnderLimitLink: Locator;
  readonly expiringBudgetUnderLimitStatus: Locator;
  readonly expiringBudgetOverLimitLink: Locator;
  readonly expiringBudgetOverLimitStatus: Locator;
  readonly policyViolationsHistoryHeading: Locator;


  /**
   * Initializes a new instance of the PoliciesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/policies');
    this.heading = this.page.getByTestId('lbl_constraints_quotas_and_budgets');
    this.addBtn = this.page.getByTestId('btn_add');
    this.realDataAddBtn = this.getByAnyTestId('btn_add_quotas_and_budget_policy');
    this.showResourcesBtn = this.page.getByTestId('actions_column_link_1');
    this.deleteBtn = this.page.getByTestId('btn_delete');
    this.sideModalDeleteBtn = this.page.getByTestId('btn_smodal_delete');
    this.policyDetailsDiv = this.main.locator('//div[@id="page-content-wrapper"]/div');
    this.resourceUnderLimitLink = this.table.locator('//td//a[.="Resource under limit"]');
    this.resourceUnderLimitStatus = this.resourceUnderLimitLink.locator('xpath=/ancestor::tr/td[2]/div/div');
    this.resourceOverLimitLink = this.table.locator('//td//a[.="Resource over limit"]');
    this.resourceOverLimitStatus = this.resourceOverLimitLink.locator('xpath=/ancestor::tr/td[2]/div/div');
    this.recurringBudgetUnderLimitLink = this.table.locator('//td//a[.="Recurring budget under"]');
    this.recurringBudgetUnderLimitStatus = this.recurringBudgetUnderLimitLink.locator('xpath=/ancestor::tr/td[2]/div/div');
    this.recurringBudgetOverLimitLink = this.table.locator('//td//a[.="Recurring budget over"]');
    this.recurringBudgetOverLimitStatus = this.recurringBudgetOverLimitLink.locator('xpath=/ancestor::tr/td[2]/div/div');
    this.expiringBudgetUnderLimitLink = this.table.locator('//td//a[.="Expiring budget under"]');
    this.expiringBudgetUnderLimitStatus = this.expiringBudgetUnderLimitLink.locator('xpath=/ancestor::tr/td[2]/div/div');
    this.expiringBudgetOverLimitLink = this.table.locator('//td//a[.="Expiring budget over"]');
    this.expiringBudgetOverLimitStatus = this.expiringBudgetOverLimitLink.locator('xpath=/ancestor::tr/td[2]/div/div');
    this.policyViolationsHistoryHeading = this.main.getByText('Policy violations history');
  }

  /**
   * Clicks the Add button.
   * @returns {Promise<void>}
   */
  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }

  /**
   * Clicks the Real Data Add button.
   * This method triggers a click event on the `realDataAddBtn` locator.
   *
   * @returns {Promise<void>} A promise that resolves when the click action is complete.
   */
  async clickRealDataAddBtn(): Promise<void> {
    await this.realDataAddBtn.click();
  }

  /**
   * Navigates to the Create Policy page.
   * This method attempts to click the Real Data Add button if it is available within a timeout.
   * If the Real Data Add button is not available, it falls back to clicking the Add button.
   * It ensures that all progress bars have disappeared before completing the navigation.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async navigateToCreatePolicy(): Promise<void> {
    try {
      await this.realDataAddBtn.waitFor({ timeout: 3000 });
      await this.clickRealDataAddBtn();
      await this.waitForAllProgressBarsToDisappear();
      return;
    } catch {
      // Do nothing if real policies exist
    }
    await this.clickAddBtn();
    await this.waitForAllProgressBarsToDisappear();
  }

  /**
   * Deletes a policy from the details page.
   * This method clicks the delete button and then confirms the deletion
   * by clicking the side modal delete button. It waits for all progress
   * bars to disappear before completing the operation.
   *
   * @returns {Promise<void>} A promise that resolves when the policy is deleted.
   */
  async deletePolicyFromDetailsPage(): Promise<void> {
    await this.deleteBtn.click();
    await this.sideModalDeleteBtn.click();
    await this.waitForAllProgressBarsToDisappear();
  }
}
