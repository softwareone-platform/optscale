import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

/**
 * Represents the Login Page.
 * Extends the BasePage class.
 */
export class LoginPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;
    readonly proceedToLiveDemoBtn: Locator;
    readonly nextBtn: Locator;

    /**
     * Initializes a new instance of the LoginPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/');
        this.emailInput = this.page.getByTestId('input_email');
        this.passwordInput = this.page.getByTestId('input_pass');
        this.loginBtn = this.page.getByTestId('btn_login');
        this.proceedToLiveDemoBtn = this.page.getByTestId('btn_proceed_to_live_demo');
        this.nextBtn = this.page.getByRole('button', {name: 'Next'});
    }

    /**
     * Logs in using the provided email and password.
     * @param {string} email - The email address to use for login.
     * @param {string} password - The password to use for login.
     * @returns {Promise<void>}
     */
    async login(email: string, password: string) {
        await this.navigateToURL(true);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        await this.waitForElementDetached(this.loginBtn);
    }

    /**
     * Logs in using the provided email and password without navigating to the login page.
     * This method assumes that the login page is already loaded.
     * @param {string} email - The email address to use for login.
     * @param {string} password - The password to use for login.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */
    async loginWithoutNavigation(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        await this.waitForElementDetached(this.loginBtn);
    }

    /**
     * Logs in using a pre-filled email and the provided password.
     * This method assumes that the email input is already filled.
     * @param {string} password - The password to use for login.
     * @returns {Promise<void>} A promise that resolves when the login process is complete.
     */
    async loginWithPreFilledEmail(password: string) {
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        await this.waitForElementDetached(this.loginBtn);
    }

    /**
     * Logs in to the live demo using the provided email.
     * @param {string} email - The email address to use for login.
     * @returns {Promise<void>}
     */
    async loginToLiveDemo(email: string) {
        await this.page.goto(`${this.url}live-demo`, {waitUntil: 'load'});
        await this.emailInput.fill(email);
        await this.proceedToLiveDemoBtn.click();
        await this.nextBtn.click();
    }
}