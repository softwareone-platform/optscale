import { HeadingWithAddButtonPage } from './base-page';
import { Page } from '@playwright/test';

/**
 * Shared base for "policy-style" pages (Anomalies, Policies, Tagging Policies —
 * list and create variants). All share: a heading inside `main` + an "Add" button.
 */
abstract class PolicyPage extends HeadingWithAddButtonPage {
  protected constructor(page: Page, url: string, headingTestId: string) {
    super(page, url, main => main.getByTestId(headingTestId));
  }
}

/* ---------- Anomalies ---------- */

export class AnomaliesPage extends PolicyPage {
  constructor(page: Page) {
    super(page, '/anomalies', 'lbl_constraints_detection');
  }
}

export class CreatePoliciesPage extends PolicyPage {
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

/* ---------- Tagging Policies ---------- */

export class TaggingPoliciesPage extends PolicyPage {
  constructor(page: Page) {
    super(page, '/tagging-policies', 'lbl_tagging_policies');
  }
}
