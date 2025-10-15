import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';

/**
 * Represents the Pending Invitations Page.
 * Extends the BasePage class.
 */
export class PendingInvitationsPage extends BasePage {
  readonly acceptBtn: Locator;
  readonly declineBtn: Locator;
  readonly noPendingInvitationsMessage: Locator;

  /**
   * Initializes a new instance of the PendingInvitationsPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/pending_invitations');
    this.acceptBtn = this.page.getByRole('button', { name: 'Accept' });
    this.declineBtn = this.page.getByRole('button', { name: 'Decline' });
    this.noPendingInvitationsMessage = this.main.getByRole('heading', { name: 'No invitations pending' });
  }

  /**
   * Accepts an invitation by clicking the confirm, proceed, and accept buttons.
   * @returns {Promise<void>}
   */
  async acceptInviteFlow(): Promise<void> {
    await this.acceptBtn.click();
  }

  /**
   * Declines an invitation by clicking the confirm, proceed, and decline buttons.
   * @returns {Promise<void>}
   */
  async declineInviteFlow(): Promise<void> {
    await this.declineBtn.click();
  }

  /**
   * Clicks the Accept button.
   * This method is used to accept an invitation by clicking the Accept button.
   * @returns {Promise<void>} A promise that resolves when the Accept button is clicked.
   */
  async clickAcceptBtn(): Promise<void> {
    await this.acceptBtn.click();
  }
}
