import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class TaggingPoliciesPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;

  constructor(page: Page) {
    super(page, '/tagging-policies');
    this.heading = this.main.getByTestId('lbl_tagging_policies');
    this.addBtn = this.main.getByTestId('btn_add');
  }

  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}

export class TaggingPoliciesCreatePage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page, '/tagging-policies/create');
    this.heading = this.main.getByTestId('lbl_create_tagging_policy');
  }
}
