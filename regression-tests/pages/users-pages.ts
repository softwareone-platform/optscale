import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class UsersPage extends BasePage {
  readonly heading: Locator;
  readonly inviteBtn: Locator;

  constructor(page: Page) {
    super(page, '/users');
    this.heading = this.main.getByTestId('lbl_users');
    this.inviteBtn = this.main.getByTestId('btn_invite');
  }

  async clickInviteBtn(): Promise<void> { await this.inviteBtn.click(); }
}

export class UsersInvitePage extends BasePage {
  readonly form: Locator;

  constructor(page: Page) {
    super(page, '/users/invite');
    this.form = this.main.locator('form');
  }
}
