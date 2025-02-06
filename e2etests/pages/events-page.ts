import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class EventsPage extends BasePage {
    readonly page: Page;
    readonly eventsHeading: Locator;

    constructor(page: Page) {
        super(page, '/events');
        this.page = page;
        this.eventsHeading = this.page.getByTestId('lbl_events');
    }
}