import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class UsersPage extends BasePage {
    readonly heading: Locator;
    readonly inviteBtn: Locator;

    constructor(page: Page) {
        super(page, '/users');
        this.inviteBtn = this.main.getByTestId('btn_invite');
        this.heading = this.main.getByTestId('lbl_users');
    }
    async getUserEmailInTable(email: string): Promise<Locator> {
        return this.main.locator(`//td[contains(text(), '${email}')]`);
    }

    async clickInviteBtn() {
        await this.inviteBtn.click();
    }
}