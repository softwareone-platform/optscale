import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

/**
 * Represents the Users Invite Page.
 * Extends the BasePage class.
 */
export class UsersInvitePage extends BasePage {
    readonly heading: Locator;
    readonly inviteUserEmailInput: Locator;
    readonly addRoleBtn: Locator;
    readonly roleSelect: Locator;
    readonly poolSelect: Locator;
    readonly inviteBtn: Locator;
    readonly cancelBtn: Locator;
    readonly userInvitedAlert: Locator;

    /**
     * Initializes a new instance of the UsersInvitePage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/users/invite');
        this.heading = this.main.getByTestId('lbl_users_invitation');
        this.inviteUserEmailInput = this.main.getByTestId('input_email');
        this.addRoleBtn = this.main.locator('[data-testid="AddOutlinedIcon"]');
        this.roleSelect = this.main.getByTestId('role-selector-form-control');
        this.poolSelect = this.main.getByTestId('pool-selector-form-control');
        this.inviteBtn = this.main.getByTestId('btn_invite');
        this.cancelBtn = this.main.getByTestId('btn_cancel');
        this.userInvitedAlert = this.page.getByText('User has been invited');
    }

    /**
     * Invites a user by filling out the form and clicking the invite button.
     * @param {string} email - The email of the user to invite.
     * @param {string} [role] - The role to assign to the user.
     * @param {string} [pool] - The pool to assign to the user.
     * @returns {Promise<void>}
     * @throws Will throw an error if the role is provided but the pool is not.
     */
    async inviteUser(email: string, role?: string, pool?: string) {
        await this.inviteUserEmailInput.waitFor();
        await this.page.waitForTimeout(1000);
        await this.inviteUserEmailInput.fill(email);
        if (role) {
            await this.addRoleBtn.click();
            await this.selectFromComboBox(this.roleSelect, role);
            if(pool) {
                await this.selectFromComboBox(this.poolSelect, pool);
            }
        }
        await this.page.waitForTimeout(1000);
        await this.inviteBtn.click();
    }
}