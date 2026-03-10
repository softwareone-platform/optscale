import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

/**
 * Represents the Events Page.
 * Extends the BasePage class.
 */
export class EventsPage extends BasePage {
  readonly heading: Locator;
  readonly allBtn: Locator;
  readonly infoBtn: Locator;
  readonly warningBtn: Locator;
  readonly errorBtn: Locator;
  readonly noEventsMessage: Locator;

  /**
   * Initializes a new instance of the EventsPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/events');
    this.heading = this.main.getByTestId('lbl_events');
    this.allBtn = this.main.getByTestId('event_lvl_all');
    this.infoBtn = this.main.getByTestId('event_lvl_info');
    this.warningBtn = this.main.getByTestId('event_lvl_warning');
    this.errorBtn = this.main.getByTestId('event_lvl_error');
    this.noEventsMessage = this.main.getByText('There are no events for selected criteria. Please try to change the filters.');
  }

  async filterByEventLevel(level: 'All' | 'Info' | 'Warning' | 'Error'): Promise<void> {
    switch (level) {
      case 'All':
        await this.clickButtonIfNotActive(this.allBtn);
        break;
      case 'Info':
        await this.clickButtonIfNotActive(this.infoBtn);
        break;
      case 'Warning':
        await this.clickButtonIfNotActive(this.warningBtn);
        break;
      case 'Error':
        await this.clickButtonIfNotActive(this.errorBtn);
        break;
    }
    await this.waitForAllProgressBarsToDisappear();
  }

  async getEventByText(text: string): Promise<Locator> {
    return this.main.locator(`//p[contains(text(), "${text}")]`)
  }

  /**
   * Gets an event by matching multiple text conditions.
   * @returns {Locator} A locator for the event matching both text conditions.
   * @param text
   */
  getEventByMultipleTexts(text: string[]): Locator {
    let xpath = '//p';
    for (const t of text) {
      xpath += `[contains(text(), "${t}")]`;
    }
    return this.main.locator(xpath).first();
  }
}
