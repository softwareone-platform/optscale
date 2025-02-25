import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class EventsPage extends BasePage {
    readonly heading: Locator;

    constructor(page: Page) {
        super(page, '/events');
        this.heading = this.page.getByTestId('lbl_events');
    }
}