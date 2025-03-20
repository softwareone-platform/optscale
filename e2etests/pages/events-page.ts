import {Locator, Page} from "@playwright/test";
    import {BasePage} from "./base-page";
    import {interceptEventRequest} from "../utils/interceptor";
    import {EventsResponse} from "../test-data/events-data";

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

        /**
         * Sets up API interceptions for the Events page.
         * Intercepts API requests and provides mock responses.
         * @returns {Promise<void>}
         */
        async setupApiInterceptions(): Promise<void> {
            const apiInterceptions = [
                {urlPattern: `/api`, mockResponse: EventsResponse},
            ];

            await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
                interceptEventRequest({page: this.page, urlPattern, mockResponse})
            ));
        }
    }