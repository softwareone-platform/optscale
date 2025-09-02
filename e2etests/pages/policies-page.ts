import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {PolicyResponse} from "../mocks/policies-resp";
import {IInterceptorConfig, interceptApiRequest} from "../utils/api-requests/interceptor";

/**
 * Represents the Policies Page.
 * Extends the BasePage class.
 */
export class PoliciesPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;

  /**
   * Initializes a new instance of the PoliciesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/policies');
    this.heading = this.page.getByTestId('lbl_constraints_quotas_and_budgets');
    this.addBtn = this.page.getByTestId('btn_add');
  }

  /**
   * Sets up API interceptions for the Policies page.
   * Intercepts API requests and provides mock responses.
   * @returns {Promise<void>}
   */
  async setupApiInterceptions(): Promise<void> {
    const apiInterceptions: IInterceptorConfig[] = [
      {
        page: this.page,
        urlPattern: `v2/organizations/[^/]+/organization_constraints\\?hit_days=3&type=resource_quota&type=recurring_budget&type=expiring_budget`,
        mockResponse: PolicyResponse
      },
    ];

    await Promise.all(apiInterceptions.map(interceptApiRequest));
  }

  /**
   * Clicks the Add button.
   * @returns {Promise<void>}
   */
  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}
