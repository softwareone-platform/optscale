import { Page } from '@playwright/test';

export class PendingInvitationPage {
    constructor(private readonly page: Page) {}

    async acceptInviteFlow() {
        await this.page.getByRole('button', { name: 'Confirm' }).click();
        await this.page.getByRole('button', { name: 'Proceed to FinOps for Cloud' }).click();
        await this.page.getByRole('button', { name: 'Accept' }).click();
    }
}