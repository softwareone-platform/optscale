import { Locator, Page } from '@playwright/test';
import { BaseCreatePage } from './base-create-page';
import { CreateAnomalyPolicyResponse } from '../types/api-response.types';
import { debugLog } from '../utils/debug-logging';

/**
 * Represents the Anomalies Create Page.
 * Extends the BaseCreatePage class.
 */
export class AnomaliesCreatePage extends BaseCreatePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly evaluationPeriodInput: Locator;
  readonly thresholdInput: Locator;

  /**
   * Initializes a new instance of the AnomaliesCreatePage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/anomalies/create');
    this.page = page;
    this.heading = this.page.getByTestId('lbl_create_anomaly_detection_policy');
    this.evaluationPeriodInput = this.page.getByTestId('input_evaluationPeriod');
    this.thresholdInput = this.page.getByTestId('input_threshold');
  }

  /**
   * Adds a new anomaly detection policy by filling in the required fields and submitting the form.
   *
   * @param {string} name - The name of the anomaly policy.
   * @param {string} type - The type of the anomaly policy.
   * @param {string} days - The evaluation period in days for the anomaly policy.
   * @param {string} threshold - The threshold percentage for the anomaly policy.
   * @param {Locator} [filter] - An optional filter to be applied to the anomaly policy.
   * @param {string} [filterOption] - The specific option to select for the provided filter. Required if `filter` is specified.
   * @returns {Promise<string>} A promise that resolves to the ID of the created anomaly policy.
   * @throws {Error} If `filter` is specified but `filterOption` is not provided.
   */
  async addNewAnomalyPolicy(
    name: string,
    type: string,
    days: string,
    threshold: string,
    filter?: Locator,
    filterOption?: string
  ): Promise<string> {
    let responseData: CreateAnomalyPolicyResponse;
    await this.waitForAllProgressBarsToDisappear();
    await this.nameInput.fill(name);
    await this.selectFromComboBox(this.typeSelect, type);
    await this.evaluationPeriodInput.fill(days);
    await this.thresholdInput.fill(threshold);

    if (filter) {
      if (!filterOption) {
        throw new Error('filterOption must be provided when filter is specified');
      }
      if (!(await filter.isVisible())) await this.clickLocator(this.showMoreFiltersBtn);
      await filter.click();
      const option = this.filterPopover.getByText(filterOption);
      await option.click();
      await this.filterApplyButton.click();
    }

    const [response] = await Promise.all([
      this.page.waitForResponse(
        resp =>
          resp.url().includes('api/v2/organizations') &&
          resp.url().includes('organization_constraints') &&
          resp.request().method() === 'POST'
      ),
      this.saveBtn.click(),
    ]);

    responseData = await response.json();
    debugLog(`Created anomaly policy with ID: ${responseData.id}`);
    return responseData.id;
  }
}
