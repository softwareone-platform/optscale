import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class RegisterPage extends BasePage {
    readonly fullNameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly registerBtn: Locator;

    constructor(page: Page) {
        super(page, '/register');
        this.fullNameInput = this.page.getByLabel('Full name *');
        this.passwordInput = this.page.getByTestId('input_pass');
        this.confirmPasswordInput = this.page.getByTestId('input_conf_pass');
        this.registerBtn = this.page.getByTestId('btn_register');
    }

    async navigateToRegistration(inviteLink: string) {
        await this.page.goto(inviteLink, {waitUntil: 'networkidle'});
    }

    async registerUser(fullName: string, password: string) {
        await this.fullNameInput.fill(fullName);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.registerBtn.click();
    }

}