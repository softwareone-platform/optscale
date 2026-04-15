import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class AnomaliesPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;

  constructor(page: Page) {
    super(page, '/anomalies');
    this.heading = this.main.getByTestId('lbl_constraints_detection');
    this.addBtn = this.main.getByTestId('btn_add');
  }

  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}

export class AnomaliesCreatePage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page, '/anomalies/create');
    this.heading = this.page.getByTestId('lbl_create_anomaly_detection_policy');
  }
}
