import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

/**
 * Represents the Mailpit Page.
 * Extends the BasePage class.
 */
export class MailpitPage extends BasePage {

    /**
     * Initializes a new instance of the MailpitPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/mailpit');
    }

    /**
     * Logs in to Mailpit using the provided user credentials.
     * @param {string} user - The username for login.
     * @param {string} password - The password for login.
     * @returns {Promise<void>}
     */
    async loginToMailpit(user: string, password: string) {
        await this.page.goto(`https://${user}:${password}@cloudspend.velasuci.com/mailpit`, {waitUntil: 'networkidle'});
    }

    /**
     * Clicks on the invitation email in the Mailpit interface.
     * @param {string} email - The email address to search for.
     * @returns {Promise<void>}
     */
    async clickInvitationEmail(email: string) {
        await this.page.locator(`//div[contains(text(), "${email}")]`).first().click();
    }

    /**
     * Gets the invite link from the email content.
     * @param {string} inviteLink - The text of the invite link to search for.
     * @returns {Promise<Locator>} - The locator for the invite link.
     */
    async getInviteLink(inviteLink: string): Promise<Locator> {
        return this.page.frameLocator('#preview-html').getByText(inviteLink);
    }

    /**
     * Gets the verification link from the invitation email.
     * @param {string} invitationEmail - The email address to search for.
     * @returns {Promise<string>} - The verification link URL.
     * @throws Will throw an error if no verification link is found in the email.
     */
    async getVerificationLink(invitationEmail: string): Promise<string> {
        await this.page.goto('https://cloudspend.velasuci.com/mailpit/');
        await this.page.getByRole('link', {
            name: `From: To: ${invitationEmail} OptScale email verification FinOps`
        }).click();

        const iframe = this.page.locator('#preview-html').contentFrame();
        const linkEl = iframe.getByRole('link', {name: 'Verify email'});
        const href = await linkEl.getAttribute('href');

        if (!href) throw new Error('No verification link found in email');

        return href;
    }
}