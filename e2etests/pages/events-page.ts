import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";
import {CloudAccountsResponse} from "../test-data/cloud-accounts-data";
import {interceptApiRequest, interceptEventRequest} from "../utils/interceptor";
import {EventsResponse} from "../test-data/events-data";

export class EventsPage extends BasePage {
    readonly heading: Locator;

    constructor(page: Page) {
        super(page, '/events');
        this.heading = this.page.getByTestId('lbl_events');
    }

    async setupApiInterceptions() {
        const apiInterceptions = [
            {urlPattern: `api`, mockResponse: EventsResponse},
        ];

        await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
            interceptEventRequest({page: this.page, urlPattern, mockResponse})
        ));
    }
}