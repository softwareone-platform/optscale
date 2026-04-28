import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class PoolsPage extends BasePage {
  readonly heading: Locator;
  readonly expandRequiringAttentionBtn: Locator;
  readonly firstSubItem: Locator;
  readonly sideModal: Locator;
  readonly sideModalTabAssignment: Locator;

  constructor(page: Page) {
    super(page, '/pools');
    this.heading = this.main.getByTestId('lbl_pool_name');
    this.expandRequiringAttentionBtn = this.page.getByTestId('expandRequiringAttention');
    this.firstSubItem = this.table.locator('//tr[@data-test-id="row_1"]');
    this.sideModal = this.page.getByTestId('smodal_edit_pool');
    this.sideModalTabAssignment = this.page.getByTestId('tab_assignment');
  }

  async clickExpandRequiringAttentionBtn(): Promise<void> {
    await this.expandRequiringAttentionBtn.click();
  }
}
