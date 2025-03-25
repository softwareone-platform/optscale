import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

/**
 * Represents the Register Page.
 * Extends the BasePage class.
 */
export class RegisterPage extends BasePage {
    readonly fullNameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerBtn: Locator;

    /**
     * Initializes a new instance of the RegisterPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/register');
        this.fullNameInput = this.page.getByLabel('Full name *');
        this.passwordInput = this.page.getByTestId('input_pass');
        this.confirmPasswordInput = this.page.getByTestId('input_conf_pass');
        this.registerBtn = this.page.getByTestId('btn_register');
    }

    /**
     * Navigates to the registration page using the provided invite link.
     * @param {string} inviteLink - The invite link to navigate to.
     * @returns {Promise<void>}
     */
    async navigateToRegistration(inviteLink: string) {
        await this.page.goto(inviteLink, {waitUntil: 'networkidle'});
    }

    /**
     * Registers a user by filling out the registration form and clicking the register button.
     * @param {string} fullName - The full name of the user.
     * @param {string} password - The password for the user.
     * @returns {Promise<void>}
     */
    async registerUser(fullName: string, password: string) {
        await this.fullNameInput.fill(fullName);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.registerBtn.click();
    }
}