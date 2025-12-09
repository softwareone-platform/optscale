import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";
import {RegionExpensesData} from "../test-data/region-expenses-data";

/**
 * Represents the Expenses Page.
 * Extends the BasePage class.
 */
export class ExpensesMapPage extends BasePage {
  readonly heading: Locator;

  /**
   * Initializes a new instance of the ExpensesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/expenses-map');
    this.heading = this.main.locator('//h1[contains(text(), "Cost Map")]');
  }

  /**
   * Sets up API interceptions for the Expenses page.
   * Intercepts API requests and provides mock responses.
   * @returns {Promise<void>}
   */
  async setupApiInterceptions(): Promise<void> {
    const apiInterceptions: IInterceptorConfig[] = [
      {page: this.page, urlPattern: `/v2/organizations/[^/]+/region_expenses?.*$`, mockResponse: RegionExpensesData}
    ];

    await Promise.all(apiInterceptions.map(interceptApiRequest));
  }
}
