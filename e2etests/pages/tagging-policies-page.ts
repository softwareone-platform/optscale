import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Represents the Tagging Policies Page.
 * Extends the BasePage class.
 */
export class TaggingPoliciesPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;
  readonly addRealDataBtn: Locator;
  readonly policyDetailsDiv: Locator;
  readonly deleteBtn: Locator = this.main.getByTestId('btn_delete');
  readonly sideModalDeleteBtn: Locator = this.main.getByTestId('btn_smodal_delete');

  /**
   * Initializes a new instance of the TaggingPoliciesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/tagging-policies');
    this.heading = this.main.getByTestId('lbl_tagging_policies');
    this.addBtn = this.main.getByTestId('btn_add');
    this.addRealDataBtn = this.getByAnyTestId('btn_add_tagging_policy');
    this.policyDetailsDiv = this.main.locator('//div[@class="MTPBoxShadow MuiBox-root mui-0"][1]');
    this.deleteBtn = this.page.getByTestId('btn_delete');
    this.sideModalDeleteBtn = this.page.getByTestId('btn_smodal_delete');
  }

  /**
   * Clicks the Add button.
   * @returns {Promise<void>}
   */
  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }

  /**
   * Navigates to the "Create Tagging Policy" page.
   *
   * This method attempts to click the "Add Real Data" button if it is available within a timeout of 3 seconds.
   * If the button is not available (e.g., real policies already exist), it falls back to clicking the "Add" button.
   * After clicking the appropriate button, it waits for all progress bars to disappear, ensuring the navigation is complete.
   *
   * @returns {Promise<void>} A promise that resolves when the navigation is complete.
   */
  async navigateToCreateTaggingPolicy(): Promise<void> {
    try {
      await this.addRealDataBtn.waitFor({ timeout: 3000 });
      await this.addRealDataBtn.click();
      await this.waitForAllProgressBarsToDisappear();
      return;
    } catch {
      // Do nothing if real policies exist
    }
    await this.clickAddBtn();
    await this.waitForAllProgressBarsToDisappear();
  }

  /**
   * Deletes a tagging policy from the details page.
   *
   * This method performs the following steps:
   * 1. Clicks the delete button on the policy details page.
   * 2. Clicks the delete button in the side modal to confirm the deletion.
   * 3. Waits for all progress bars to disappear, ensuring the deletion process is complete.
   *
   * @returns {Promise<void>} A promise that resolves when the deletion process is complete.
   */
  async deletePolicyFromDetailsPage(): Promise<void> {
    await this.deleteBtn.click();
    await this.sideModalDeleteBtn.click();
    await this.waitForAllProgressBarsToDisappear();
  }
}
