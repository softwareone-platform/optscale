import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

/**
 * Shared base for "policy-style" pages (Anomalies, Policies, Tagging Policies — both
 * list and create variants). All of them share the same skeleton:
 *  - a heading inside `main`
 *  - an "Add" button
 */
export abstract class PolicyPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;

  protected constructor(page: Page, url: string, headingTestId: string) {
    super(page, url);
    this.heading = this.main.getByTestId(headingTestId);
    this.addBtn = this.main.getByTestId('btn_add');
  }

  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}

/* ---------- Anomalies ---------- */

export class AnomaliesPage extends PolicyPage {
  constructor(page: Page) {
    super(page, '/anomalies', 'lbl_constraints_detection');
  }
}

export class AnomaliesCreatePage extends PolicyPage {
  constructor(page: Page) {
    super(page, '/anomalies/create', 'lbl_create_anomaly_detection_policy');
  }
}

/* ---------- Quota & Budget Policies ---------- */

export class PoliciesPage extends PolicyPage {
  constructor(page: Page) {
    super(page, '/policies', 'lbl_constraints_quotas_and_budgets');
  }
}

export class PoliciesCreatePage extends PolicyPage {
  constructor(page: Page) {
    super(page, '/policies/create', 'lbl_create_quota_and_budget_policy');
  }
}

/* ---------- Tagging Policies ---------- */

export class TaggingPoliciesPage extends PolicyPage {
  constructor(page: Page) {
    super(page, '/tagging-policies', 'lbl_tagging_policies');
  }
}

export class TaggingPoliciesCreatePage extends PolicyPage {
  constructor(page: Page) {
    super(page, '/tagging-policies/create', 'lbl_create_tagging_policy');
  }
}
