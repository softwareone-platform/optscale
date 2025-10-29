import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

/**
 * Represents the Anomalies Page.
 * Extends the BasePage class.
 */
export class AnomaliesPage extends BasePage {
  readonly anomalyDetectionBreadcrumb: Locator;
  readonly heading: Locator;
  readonly anomalyDetectionPolicyHeading: Locator;
  readonly addBtn: Locator;
  readonly searchInput: Locator;
  readonly table: Locator;
  readonly defaultExpenseAnomalyLink: Locator;
  readonly defaultExpenseAnomalyCanvas: Locator;
  readonly defaultExpenseAnomalyDescription: Locator;
  readonly defaultExpenseAnomalyShowResourcesBtn: Locator;
  readonly defaultResourceCountAnomalyLink: Locator;
  readonly defaultResourceCountAnomalyCanvas: Locator;
  readonly defaultResourceCountAnomalyDescription: Locator;
  readonly defaultResourceCountAnomalyShowResourcesBtn: Locator;
  readonly policyDetailsDiv: Locator;
  readonly policyDetailsNameValue: Locator;
  readonly policyDetailsTypeValue: Locator;
  readonly policyDetailsEvaluationPeriodValue: Locator;
  readonly policyDetailsThresholdValue: Locator;

  /**
   * Initializes a new instance of the AnomaliesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/anomalies');
    this.anomalyDetectionBreadcrumb = this.main.locator('[href="/anomalies"]');
    this.heading = this.main.getByTestId('lbl_constraints_detection');
    this.anomalyDetectionPolicyHeading = this.getByAnyTestId('lbl_anomaly_detection_policy', this.main);
    this.addBtn = this.main.getByTestId('btn_add');
    this.searchInput = this.main.getByPlaceholder('Search');
    this.table = this.main.locator('table');
    this.defaultExpenseAnomalyLink = this.table.getByRole('link', { name: 'Default - expense anomaly' });
    this.defaultExpenseAnomalyCanvas = this.defaultExpenseAnomalyLink.locator('xpath=/ancestor::td[1]/following-sibling::td/canvas');
    this.defaultExpenseAnomalyDescription = this.defaultExpenseAnomalyLink.locator('xpath=/ancestor::td[1]/following-sibling::td[2]');
    this.defaultExpenseAnomalyShowResourcesBtn = this.defaultExpenseAnomalyLink.locator('xpath=/ancestor::td[1]/following-sibling::td[4]//button');
    this.defaultResourceCountAnomalyLink = this.table.getByRole('link', { name: 'Default - resource count anomaly' });
    this.defaultResourceCountAnomalyCanvas = this.defaultResourceCountAnomalyLink.locator('xpath=/ancestor::td[1]/following-sibling::td/canvas');
    this.defaultResourceCountAnomalyDescription = this.defaultResourceCountAnomalyLink.locator('xpath=/ancestor::td[1]/following-sibling::td[2]');
    this.defaultResourceCountAnomalyShowResourcesBtn = this.defaultResourceCountAnomalyLink.locator('xpath=/ancestor::td[1]/following-sibling::td[4]//button');
    this.policyDetailsDiv = this.main.locator('//div[contains(@class, "MTPBoxShadow")][1]')
    this.policyDetailsNameValue = this.policyDetailsDiv.locator('//span[contains(text(), "Name")]/../following-sibling::div');
    this.policyDetailsTypeValue = this.policyDetailsDiv.locator('//span[contains(text(), "Type")]/../following-sibling::div');
    this.policyDetailsEvaluationPeriodValue = this.policyDetailsDiv.locator('//span[contains(text(), "Evaluation period")]/../following-sibling::div');
    this.policyDetailsThresholdValue = this.policyDetailsDiv.locator('//span[contains(text(), "Threshold")]/../following-sibling::div');
  }

  /**
   * Clicks the Add button on the Anomalies page.
   * @returns {Promise<void>}
   */
  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }


}
