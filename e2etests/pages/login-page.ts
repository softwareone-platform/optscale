import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class LoginPage extends BasePage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        super(page, '/');
        this.page = page;
        this.emailInput = this.page.getByTestId('input_email');
        this.passwordInput = this.page.getByTestId('input_pass');
        this.loginBtn = this.page.getByTestId('btn_login');
    }

    async login(email: string, password: string) {
        await this.navigateToURL(true);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}
