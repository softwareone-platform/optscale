import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

/**
 * Represents the Settings Page.
 * Extends the BasePage class.
 */
export class SettingsPage extends BasePage {
    readonly heading: Locator;
    readonly invitationsTab: Locator;

    /**
     * Initializes a new instance of the SettingsPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/settings');
        this.heading = this.main.locator('//h1[.="Settings"]');
        this.invitationsTab = this.main.getByTestId('tab_invitations');
    }

    /**
     * Clicks the Invitations tab on the Settings page.
     * This method is used to navigate to the Invitations section within the Settings page.
     * @returns {Promise<void>} A promise that resolves when the Invitations tab is clicked.
     */
    async clickInvitationsTab() {
        await this.invitationsTab.click();
    }
}