import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class MailpitPage extends BasePage {


    constructor(page: Page) {
        super(page, '/mailpit');
    }

    async loginToMailpit(user: string, password: string) {
        await this.page.goto(`https://${user}:${password}@cloudspend.velasuci.com/mailpit`, {waitUntil: 'networkidle'});

    }

    async confirmInvitationEmailReceived(email: string) {
        await this.page.locator(`//div[contains(text(), "${email}")]`).waitFor();
    }

    async waitForInviteLink(inviteLink: string): Promise<void> {
        await this.page.frameLocator('#preview-html').getByText(inviteLink).waitFor();
    }
    async openEmailVerification(invitationEmail: string): Promise<Page> {
        await this.page.goto('https://cloudspend.velasuci.com/mailpit/');

        const popupPromise = this.page.waitForEvent('popup');

        await this.page.getByRole('link', {
            name: `From: To: ${invitationEmail} OptScale email verification FinOps`
        }).click();

        const iframe = await this.page.locator('#preview-html').contentFrame();
        await iframe.getByRole('link', { name: 'Verify email' }).click();

        return await popupPromise;
    }
}