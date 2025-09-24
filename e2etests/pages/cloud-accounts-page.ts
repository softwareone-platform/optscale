import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {debugLog} from "../utils/debug-logging";

/**
 * Represents the Cloud Accounts Page.
 * Extends the BasePage class.
 */
export class CloudAccountsPage extends BasePage {
    readonly heading: Locator;
    readonly addBtn: Locator;
    readonly advancedTabBtn: Locator;
    readonly lastBillingImportStatus: Locator;
    readonly billingStatusCompletedIcon: Locator;
    readonly table: Locator;
    readonly allCloudAccountLinks: Locator;

    /**
     * Initializes a new instance of the CloudAccountsPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/cloud-accounts');
        this.heading = this.main.locator('//h1[.="Data sources"]');
        this.table = this.main.locator('//table');
        this.advancedTabBtn = this.main.getByTestId('tab_advanced');
        this.lastBillingImportStatus = this.main.getByTestId('value_last_billing_report_status');
        this.billingStatusCompletedIcon = this.getByAnyTestId('CheckCircleIcon', this.lastBillingImportStatus);
        this.addBtn = this.main.getByTestId('btn_add');
        this.allCloudAccountLinks = this.table.locator('xpath=(//td//a)');
    }

    /**
     * Clicks the Add button on the Cloud Accounts page.
     * @returns {Promise<void>}
     */
    async clickAddBtn(): Promise<void> {
        await this.addBtn.click();
    }

    /**
     * Clicks the "Advanced" tab button on the Cloud Accounts page.
     * @returns {Promise<void>} A promise that resolves when the action is complete.
     */
    async clickAdvancedTabBtn(): Promise<void> {
        await this.advancedTabBtn.click();
    }

    /**
     * Clicks a cloud account link by its name.
     * @param {string} name - The name of the cloud account link to click.
     * @returns {Promise<void>} A promise that resolves when the action is complete.
     */
    async clickCloudAccountLinkByName(name: string): Promise<void> {
        const locator = this.allCloudAccountLinks.filter({hasText: name});
        debugLog(`Clicking on cloud account link with name: ${name}`);
        return locator.click();
    }

    /**
     * Clicks a cloud account link by its index in the list.
     * If the link has an expand button, it clicks the expand button first and then clicks the nested link.
     * @param {number} [index=1] - The index of the cloud account link to click (1-based).
     * @returns {Promise<void>} A promise that resolves when the action is complete.
     */
    async clickCloudAccountLink(index = 1): Promise<void> {
        const expandButton = this.allCloudAccountLinks.nth(index - 1).locator(`xpath=/../preceding-sibling::button/*[@data-testid="ExpandMoreIcon"]`);
        await this.allCloudAccountLinks.nth(index - 1).waitFor();

        const hasExpandButton = await expandButton.isVisible();
        debugLog(`Cloud account link at index: ${index} has expand button: ${hasExpandButton}`);

        if (hasExpandButton) {
            await expandButton.click();
            debugLog(`Clicking on expand cloud account link at index: ${index} - ${await this.allCloudAccountLinks.nth(index - 1).textContent()}`);
            const firstLink = this.allCloudAccountLinks.nth(index - 1).locator('//ancestor::tr[1]/following-sibling::tr[1]//a');
            debugLog(`Clicking on first nested cloud account link at index: ${index} - ${await firstLink.textContent()}`);
            await firstLink.click();
        } else {
            debugLog(`Clicking on cloud account link at index: ${index} - ${await this.allCloudAccountLinks.nth(index - 1).textContent()}`);
            return this.allCloudAccountLinks.nth(index - 1).click();
        }
    }

}
