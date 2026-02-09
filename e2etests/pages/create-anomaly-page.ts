import {Locator, Page} from "@playwright/test";
import {BaseCreatePage} from "./base-create-page";

/**
 * Represents the Create Anomaly Page.
 * Extends the BaseCreatePage class.
 */
export class CreateAnomalyPage extends BaseCreatePage {
  readonly heading: Locator;
  readonly evaluationPeriodInput: Locator;
  readonly thresholdInput: Locator;

  /**
   * Initializes a new instance of the CreateAnomalyPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/anomalies/create');
    this.heading = this.main.getByTestId('lbl_create_anomaly_detection_policy');
    this.evaluationPeriodInput = this.main.getByTestId('input_evaluationPeriod');
    this.thresholdInput = this.main.getByTestId('input_threshold');
  }
}
