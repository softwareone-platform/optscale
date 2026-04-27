import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';
import { fitViewportToFullPage } from '@/utils/viewport';

export class HomePage extends BasePage {
  readonly organizationExpensesBlock: Locator;
  readonly topResourcesBlock: Locator;
  readonly recommendationsBlock: Locator;
  readonly policyViolationsBlock: Locator;
  readonly poolsRequiringAttentionBlock: Locator;

  constructor(page: Page) {
    super(page, '/');
    this.organizationExpensesBlock = this.page.getByTestId('block_org_expenses');
    this.topResourcesBlock = this.page.getByTestId('block_top_resources');
    this.recommendationsBlock = this.page.getByTestId('block_recommendations');
    this.policyViolationsBlock = this.page.getByTestId('block_policies_violations');
    this.poolsRequiringAttentionBlock = this.main.getByTestId('block_pools');
  }

  async waitForAllBoxesToLoad(): Promise<void> {
    await this.waitForLoadingPageImgToDisappear();
    await this.organizationExpensesBlock.locator('h3 + span[role="progressbar"]').waitFor({ state: 'detached' });
    await this.topResourcesBlock.locator('h3 + span[role="progressbar"]').waitFor({ state: 'detached' });
    await this.recommendationsBlock.locator('h3 + span[role="progressbar"]').waitFor({ state: 'detached' });
    await this.policyViolationsBlock.locator('h3 + span[role="progressbar"]').waitFor({ state: 'detached' });
    await this.poolsRequiringAttentionBlock.locator('h3 + span[role="progressbar"]').waitFor({ state: 'detached' });
    await fitViewportToFullPage(this.page);
  }
}
