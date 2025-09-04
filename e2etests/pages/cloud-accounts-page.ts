import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

/**
 * Represents the Cloud Accounts Page.
 * Extends the BasePage class.
 */
export class CloudAccountsPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;
  readonly table: Locator;

  /**
   * Initializes a new instance of the CloudAccountsPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/cloud-accounts');
    this.heading = this.main.locator('//h1[.="Data sources"]');
    this.table = this.main.locator('//table');
    this.addBtn = this.main.getByTestId('btn_add');
  }

  /**
   * Clicks the Add button on the Cloud Accounts page.
   * @returns {Promise<void>}
   */
  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}
