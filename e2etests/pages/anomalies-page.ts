import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

/**
 * Represents the Anomalies Page.
 * Extends the BasePage class.
 */
export class AnomaliesPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;
  readonly searchInput: Locator;

  /**
   * Initializes a new instance of the AnomaliesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/anomalies');
    this.heading = this.main.getByTestId('lbl_constraints_detection');
    this.addBtn = this.main.getByTestId('btn_add');
    this.searchInput = this.main.getByPlaceholder('Search');
  }

  /**
   * Clicks the Add button on the Anomalies page.
   * @returns {Promise<void>}
   */
  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}
