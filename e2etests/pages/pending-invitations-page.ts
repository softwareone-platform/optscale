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
  readonly proceedToFinOpsBtn: Locator;

  /**
   * Initializes a new instance of the PendingInvitationsPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/pending_invitations');
    this.acceptBtn = this.page.getByRole('button', { name: 'Accept' });
    this.declineBtn = this.page.getByRole('button', { name: 'Decline' });
    this.noPendingInvitationsMessage = this.main.getByRole('heading', { name: 'No invitations pending' });
    this.proceedToFinOpsBtn = this.page.getByTestId('btn_proceed');
  }

  /**
   * Accepts an invitation by clicking the confirm, proceed, and accept buttons.
   * @returns {Promise<void>}
   */
  async acceptInvite(): Promise<void> {
    await this.acceptBtn.click();
    await this.waitForAllProgressBarsToDisappear();
  }

  /**
   * Accepts the privacy policy by waiting for the "Proceed to FinOps" button to appear
   * and then clicking it.
   *
   * @returns {Promise<void>} A promise that resolves when the action is complete.
   */
  async acceptPrivacyPolicy(): Promise<void> {
    await this.proceedToFinOpsBtn.waitFor();
    await this.proceedToFinOpsBtn.click();
  }

  /**
   * Declines an invitation by clicking the confirm, proceed, and decline buttons.
   * @returns {Promise<void>}
   */
  async declineInvite(): Promise<void> {
    await this.declineBtn.click();
    await this.waitForAllProgressBarsToDisappear();
  }
}
