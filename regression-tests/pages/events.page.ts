import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class EventsPage extends BasePage {
  readonly heading: Locator;
  readonly eventsTable: Locator;

  constructor(page: Page) {
    super(page, '/events');
    this.heading = this.main.getByTestId('lbl_events');
    this.eventsTable = this.main.getByTestId('sp_first_event').locator('.MuiAccordionSummary-content');
  }

  async clickEventsTable(): Promise<void> {
    await this.eventsTable.click({ timeout: 10000 });
  }
}
