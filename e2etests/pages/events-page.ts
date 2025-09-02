import {Locator, Page} from "@playwright/test";
    import {BasePage} from "./base-page";
    import {IInterceptorConfig, interceptApiRequest} from "../utils/api-requests/interceptor";
    import {EventsResponse} from "../mocks/events-resp";

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
            const apiInterceptions: IInterceptorConfig[] = [
                {
                    page: this.page,
                    urlPattern: "/api$",
                    mockResponse: EventsResponse,
                    graphQlOperationName: "events"
                },
            ];

            await Promise.all(apiInterceptions.map(interceptApiRequest));
        }
    }
