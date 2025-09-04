import {Locator, Page} from "@playwright/test";
    import {BasePage} from "./base-page";

    /**
     * Represents the Tagging Policies Page.
     * Extends the BasePage class.
     */
    export class TaggingPoliciesPage extends BasePage {
        readonly heading: Locator;
        readonly addBtn: Locator;

        /**
         * Initializes a new instance of the TaggingPoliciesPage class.
         * @param {Page} page - The Playwright page object.
         */
        constructor(page: Page) {
            super(page, '/tagging-policies');
            this.heading = this.main.getByTestId('lbl_tagging_policies');
            this.addBtn = this.main.getByTestId('btn_add');
        }

        /**
         * Clicks the Add button.
         * @returns {Promise<void>}
         */
        async clickAddBtn(): Promise<void> {
            await this.addBtn.click();
        }
    }
