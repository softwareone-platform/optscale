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

  //TODO: Get url from gmail
  /**
   * Waits for the verification code reset timeout to complete.
   * This method ensures that the resend countdown is visible, waits for the resend button to become visible,
   * and adds a short delay to ensure the page is ready for further interactions.
   *
   * @param {number} [timeout=620000] - The maximum time (in milliseconds) to wait for the resend button to become visible.
   * @returns {Promise<void>} Resolves when the timeout and visibility checks are complete.
   */
  async waitForVerificationCodeResetTimeout(timeout: number = 620000): Promise<void> {
    await this.verificationCodeResendCountdown.waitFor();
    await this.sendVerificationCodeBtn.waitFor({state: 'visible', timeout: timeout});
    await this.page.waitForTimeout(1000);
  }

  /**
   * Verifies the provided code and clicks the confirm button.
   * This method fills the verification code input field with the given code and submits it by clicking the confirm button.
   *
   * @param {string} code - The verification code to be entered.
   * @returns {Promise<void>} Resolves when the code is entered and the confirm button is clicked.
   */
  async verifyCodeAndConfirm(code: string): Promise<void> {
    await this.verificationCodeInput.fill(code);
    await this.confirmBtn.click();
  }

  /**
   * Proceeds to the FinOps page.
   * This method clicks the button to navigate to the FinOps page after verification is complete.
   *
   * @returns {Promise<void>} Resolves when the navigation action is performed.
   */
  async proceedToFinOps(): Promise<void> {
    await this.proceedToFinOpsBtn.click();
  }
}
