import {BasePage} from "./base-page";
    import {Locator, Page} from "@playwright/test";

    /**
     * Represents the Perspectives Page.
     * Extends the BasePage class.
     */
    export class PerspectivesPage extends BasePage {
        readonly heading: Locator;

        /**
         * Initializes a new instance of the PerspectivesPage class.
         * @param {Page} page - The Playwright page object.
         */
        constructor(page: Page) {
            super(page, '/resources/perspectives');
            this.heading = this.page.getByTestId('lbl_perspectives');
        }
    }