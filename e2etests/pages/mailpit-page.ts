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

    // async clickFinOpsForCloudLink(): Promise<Page> {
    //     const [newPage] = await Promise.all([
    //         this.page.waitForEvent('popup'), // Playwright will catch the new page
    //         this.page.frameLocator('#preview-html').getByRole('link', { name: 'Go to FinOps for Cloud' }).click(),
    //     ]);
    //     return newPage;
    // }

    async waitForInviteLink(inviteLink: string): Promise<void> {
        await this.page.frameLocator('#preview-html').getByText(inviteLink).waitFor();
    }

}