import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class PoliciesPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;

  constructor(page: Page) {
    super(page, '/policies');
    this.heading = this.page.getByTestId('lbl_constraints_quotas_and_budgets');
    this.addBtn = this.page.getByTestId('btn_add');
  }

  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}

export class PoliciesCreatePage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page, '/policies/create');
    this.heading = this.main.getByTestId('lbl_create_quota_and_budget_policy');
  }
}
