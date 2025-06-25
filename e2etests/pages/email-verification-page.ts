import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class EmailVerificationPage extends BasePage {
    readonly verificationCodeInput: Locator;
    readonly verificationCodeResendCountdown: Locator;
    readonly sendVerificationCodeBtn: Locator;
    readonly confirmBtn: Locator;
    readonly proceedToFinOpsBtn: Locator;

    constructor(page: Page) {
        super(page, '/email-verification');
        this.verificationCodeInput = this.page.getByLabel('Code *');
        this.sendVerificationCodeBtn = this.page.getByRole("button", {name: "Send verification code again"});
        this.verificationCodeResendCountdown = this.page.getByText("code can be sent again in")
        this.confirmBtn = this.page.getByRole("button", {name: "Confirm"});
        this.proceedToFinOpsBtn = this.page.getByRole('button', {name: 'Proceed to FinOps for Cloud'});
    }


    async waitForVerificationCodeResetTimeout(timeout = 620000) {
        await this.verificationCodeResendCountdown.waitFor();
        await this.sendVerificationCodeBtn.waitFor({state: 'visible', timeout: timeout});
        await this.page.waitForTimeout(1000);
    }

    async verifyCodeAndConfirm(code: string) {
        await this.verificationCodeInput.fill(code);
        await this.confirmBtn.click();
    }

    async proceedToFinOps() {
        await this.proceedToFinOpsBtn.click();
    }
}