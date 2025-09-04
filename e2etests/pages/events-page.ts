import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {IInterceptor, apiInterceptors} from "../utils/api-requests/interceptor";
import {EventsResponse} from "../mocks";

/**
 * Represents the Events Page.
 * Extends the BasePage class.
 */
export class EventsPage extends BasePage {
  readonly heading: Locator;

  /**
   * Initializes a new instance of the EventsPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/events');
    this.heading = this.page.getByTestId('lbl_events');
  }
}
