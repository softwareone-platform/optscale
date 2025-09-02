import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {IInterceptorConfig, interceptApiRequest} from "../utils/api-requests/interceptor";
import {EmployeesResponse, UsersPoolsPermissionsResponse} from "../mocks/user-resp";

/**
 * Represents the Users Page.
 * Extends the BasePage class.
 */
export class UsersPage extends BasePage {
  readonly heading: Locator;
  readonly inviteBtn: Locator;

  /**
   * Initializes a new instance of the UsersPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/users');
    this.inviteBtn = this.main.getByTestId('btn_invite');
    this.heading = this.main.getByTestId('lbl_users');
  }

  /**
   * Sets up API interceptions for the Users page.
   * Intercepts API requests and provides mock responses.
   * @returns {Promise<void>}
   */
  async setupApiInterceptions(): Promise<void> {
    const apiInterceptions: IInterceptorConfig[] = [
      {page: this.page, urlPattern: `/v2/organizations/[^/]+/employees`, mockResponse: EmployeesResponse},
      {
        page: this.page,
        urlPattern: `/v2/organizations/[^/]+/pools\\?permission=INFO_ORGANIZATION`,
        mockResponse: UsersPoolsPermissionsResponse
      },
    ];

    await Promise.all(apiInterceptions.map(interceptApiRequest));
  }

  /**
   * Gets the user email in the table.
   * @param {string} email - The email to search for.
   * @returns {Promise<Locator>} - The locator for the email cell.
   */
  async getUserEmailInTable(email: string): Promise<Locator> {
    return this.main.locator(`//td[contains(text(), '${email}')]`);
  }

  /**
   * Clicks the Invite button.
   * @returns {Promise<void>}
   */
  async clickInviteBtn(): Promise<void> {
    await this.inviteBtn.click();
  }
}
