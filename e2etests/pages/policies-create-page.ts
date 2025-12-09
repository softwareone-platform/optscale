import {BaseCreatePage} from "./base-create-page";
import {Locator, Page} from "@playwright/test";

/**
 * Represents the Policies Create Page.
 * Extends the BaseCreatePage class.
 */
export class PoliciesCreatePage extends BaseCreatePage {
  readonly heading: Locator;

  /**
   * Initializes a new instance of the PoliciesCreatePage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, "/policies/create");
    this.heading = this.main.getByTestId('lbl_create_quota_and_budget_policy');
  }
}
