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

    async clickInvitationsTab() {
        await this.invitationsTab.click();
    }
}