import { Page } from '@playwright/test';
import {BasePage} from "./base-page";


export class PendingInvitationPage extends BasePage {
    constructor(page: Page) {
        super(page, '/pending_invitations');
    }

    async acceptInviteFlow() {
        await this.page.getByRole('button', { name: 'Confirm' }).click();
        await this.page.getByRole('button', { name: 'Proceed to FinOps for Cloud' }).click();
        await this.page.getByRole('button', { name: 'Accept' }).click();
    }
}