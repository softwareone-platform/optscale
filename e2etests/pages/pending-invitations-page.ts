import {Locator, Page} from '@playwright/test';
import {BasePage} from "./base-page";

/**
 * Represents the Pending Invitations Page.
 * Extends the BasePage class.
 */
export class PendingInvitationsPage extends BasePage {
    readonly confirmBtn: Locator;
    readonly proceedToFinOpsBtn: Locator;
    readonly acceptBtn: Locator;
    readonly declineBtn: Locator;
    readonly noPendingInvitationsMessage: Locator;

    /**
     * Initializes a new instance of the PendingInvitationsPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/pending_invitations');
        this.confirmBtn = this.page.getByRole('button', { name: 'Confirm' });
        this.proceedToFinOpsBtn = this.page.getByRole('button', { name: 'Proceed to FinOps for Cloud' });
        this.acceptBtn = this.page.getByRole('button', { name: 'Accept' });
        this.declineBtn = this.page.getByRole('button', { name: 'Decline' });
        this.noPendingInvitationsMessage = this.main.getByRole('heading', { name: 'No invitations pending' });
    }

    /**
     * Accepts an invitation by clicking the confirm, proceed, and accept buttons.
     * @returns {Promise<void>}
     */
    async acceptInviteFlow() {
        await this.confirmBtn.click();
        await this.proceedToFinOpsBtn.click();
        await this.acceptBtn.click();
    }

    /**
     * Declines an invitation by clicking the confirm, proceed, and decline buttons.
     * @returns {Promise<void>}
     */
    async declineInviteFlow() {
        await this.confirmBtn.click();
        await this.proceedToFinOpsBtn.click();
        await this.declineBtn.click();
    }

    async clickAcceptBtn() {
        await this.acceptBtn.click();
    }
}