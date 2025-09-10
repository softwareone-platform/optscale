import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {debugLog} from "../utils/debug-logging";

/**
 * Represents the Cloud Accounts Page.
 * Extends the BasePage class.
 */
export class CloudAccountsPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;
  readonly advancedTabBtn: Locator;
  readonly lastBillingImportStatus: Locator;
  readonly billingStatusCompletedIcon: Locator;
  readonly table: Locator;
  readonly allCloudAccountLinks: Locator;

  /**
   * Initializes a new instance of the CloudAccountsPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/cloud-accounts');
    this.heading = this.main.locator('//h1[.="Data sources"]');
    this.table = this.main.locator('//table');
    this.advancedTabBtn = this.main.getByTestId('tab_advanced');
    this.lastBillingImportStatus = this.main.getByTestId('value_last_billing_report_status');
    this.billingStatusCompletedIcon = this.getByAnyTestId('CheckCircleIcon', this.lastBillingImportStatus);
    this.addBtn = this.main.getByTestId('btn_add');
    this.allCloudAccountLinks = this.table.locator('//td//a');
  }

  /**
   * Clicks the Add button on the Cloud Accounts page.
   * @returns {Promise<void>}
   */
  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }

  async clickAdvancedTabBtn(): Promise<void> {
    await this.advancedTabBtn.click();
  }

  async clickCloudAccountLinkByName(name: string): Promise<void> {
      const locator = this.allCloudAccountLinks.filter({hasText: name});
      debugLog(`Clicking on cloud account link with name: ${name}`);
      return locator.click();
  }

  async clickCloudAccountLink(index = 1): Promise<void> {
      debugLog(`Clicking on cloud account link at index: ${index} - ${await this.allCloudAccountLinks.nth(index - 1).textContent()}`);
    return this.allCloudAccountLinks.nth(index - 1).click();
  }
}
