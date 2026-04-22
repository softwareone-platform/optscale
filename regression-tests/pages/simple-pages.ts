import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class EventsPage extends BasePage {
  readonly heading: Locator;
  readonly eventsTable: Locator;

  constructor(page: Page) {
    super(page, '/events');
    this.heading = this.main.getByTestId('lbl_events');
    this.eventsTable = this.main.getByTestId('sp_first_event').locator('.MuiAccordionSummary-content');
  }

  async clickEventsTable(): Promise<void> {
    await this.eventsTable.click({ timeout: 10000 });
  }
}

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
    await this.fitViewportToFullPage();
  }
}

export class PoolsPage extends BasePage {
  readonly heading: Locator;
  readonly expandRequiringAttentionBtn: Locator;
  readonly firstSubItem: Locator;
  readonly sideModal: Locator;
  readonly sideModalTabAssignment: Locator;

  constructor(page: Page) {
    super(page, '/pools');
    this.heading = this.main.getByTestId('lbl_pool_name');
    this.expandRequiringAttentionBtn = this.getByAnyTestId('expandRequiringAttention');
    this.firstSubItem = this.table.locator('//tr[@data-test-id="row_1"]');
    this.sideModal = this.page.getByTestId('smodal_edit_pool');
    this.sideModalTabAssignment = this.page.getByTestId('tab_assignment');
  }

  async clickExpandRequiringAttentionBtn(): Promise<void> {
    await this.expandRequiringAttentionBtn.click();
  }
}

export class RecommendationsPage extends BasePage {
  readonly heading: Locator;
  readonly possibleMonthlySavingsDiv: Locator;
  readonly cardsBtn: Locator;
  readonly tableBtn: Locator;
  readonly cardsGrid: Locator;
  readonly firstCard: Locator;
  readonly table: Locator;

  constructor(page: Page) {
    super(page, '/recommendations');
    this.heading = this.main.getByTestId('lbl_recommendations');
    this.possibleMonthlySavingsDiv = this.main.getByTestId('card_saving');
    this.cardsBtn = this.main.getByRole('button', { name: 'Cards' });
    this.tableBtn = this.main.getByRole('button', { name: 'Table' });
    this.cardsGrid = this.main.locator('//div[contains(@class, "cardsGrid MuiBox-root")]');
    this.firstCard = this.cardsGrid.locator('//div[contains(@class, "MuiCard-root")]').first();
    this.table = this.main.locator('table');
  }

  async clickCardsButtonIfNotActive(): Promise<void> {
    if (!(await this.evaluateActiveButton(this.cardsBtn))) {
      await this.cardsBtn.click();
    }
  }

  async clickTableButton(): Promise<void> {
    await this.tableBtn.click();
  }
}

export class SettingsPage extends BasePage {
  readonly heading: Locator;
  readonly invitationsTab: Locator;
  readonly emailNotificationsTab: Locator;
  readonly emailNotificationSection: Locator;
  readonly topRightSnackbar: Locator;

  constructor(page: Page) {
    super(page, '/settings');
    this.heading = this.main.locator('//h1[.="Settings"]');
    this.invitationsTab = this.main.getByTestId('tab_invitations');
    this.emailNotificationsTab = this.main.getByTestId('tab_emailNotifications');
    this.emailNotificationSection = this.main.getByTestId('lbl_[object Object]_title');
    // Snackbar is rendered at the document root (outside `main`).
    // Exclude the `alert_error` variant so we only target neutral info banners
    // like the "pending invitation" notification.
    this.topRightSnackbar = page.locator(
      '.MuiSnackbar-anchorOriginTopRight:not([data-test-id="alert_error"])',
    );
  }
}
