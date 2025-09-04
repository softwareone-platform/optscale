import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

/**
 * Represents the Policies Page.
 * Extends the BasePage class.
 */
export class PoliciesPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;

  /**
   * Initializes a new instance of the PoliciesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/policies');
    this.heading = this.page.getByTestId('lbl_constraints_quotas_and_budgets');
    this.addBtn = this.page.getByTestId('btn_add');
  }

  /**
   * Clicks the Add button.
   * @returns {Promise<void>}
   */
  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}
