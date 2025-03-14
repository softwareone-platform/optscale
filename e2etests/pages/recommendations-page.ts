import { GeminisResponse,
        OptimisationsResponse, OptionsResponse, RIBreakdownResponse, SPBreakdownResponse, SummaryExpensesResponse } from "../test-data/recommendations-page-data";
    import { interceptApiRequest } from "../utils/interceptor";
    import {BasePage} from "./base-page";
    import {Locator, Page} from "@playwright/test";

    /**
     * Represents the Recommendations Page.
     * Extends the BasePage class.
     */
    export class RecommendationsPage extends BasePage {
        readonly heading: Locator;
        readonly archiveBtn: Locator;
        readonly forceCheckBtn: Locator;
        readonly dataSourcesSelect: Locator;
        readonly possibleMonthlySavingsDiv: Locator;
        readonly possibleMonthlySavingsValue: Locator;
        readonly lastCheckTimeValue: Locator;
        readonly nextCheckTimeValue: Locator;
        readonly s3DuplicatesBtn: Locator;
        readonly s3DuplicatesValue: Locator;
        readonly categoriesSelect: Locator;
        readonly applicableServices: Locator;
        readonly cardsBtn: Locator;
        readonly tableBtn: Locator;
        readonly searchInput: Locator;
        readonly firstCard: Locator;
        readonly table: Locator;

        /**
         * Initializes a new instance of the RecommendationsPage class.
         * @param {Page} page - The Playwright page object.
         */
        constructor(page: Page) {
            super(page, '/recommendations');
            this.heading = this.main.getByTestId('lbl_recommendations');
            this.archiveBtn = this.main.getByTestId('btn_archive');
            this.forceCheckBtn = this.main.getByTestId('btn_force_check');
            this.dataSourcesSelect = this.main.locator('//div[@id="select-data-source"]');
            this.possibleMonthlySavingsDiv = this.main.getByTestId('card_saving');
            this.possibleMonthlySavingsValue = this.main.getByTestId('p_saving_value');
            this.lastCheckTimeValue = this.main.getByTestId('p_last_time');
            this.nextCheckTimeValue = this.main.locator('//span[.="Next check time"]/../following-sibling::div');
            this.s3DuplicatesBtn = this.main.getByTestId('btn_s3_duplicates');
            this.s3DuplicatesValue = this.main.getByTestId('p_s3_duplicates_value');
            this.categoriesSelect = this.main.locator('//label[.="Categories"]/../div');
            this.applicableServices = this.main.locator('//label[.="Applicable services"]/../div')
            this.cardsBtn = this.main.getByRole('button', {name: 'Cards'});
            this.tableBtn = this.main.getByRole('button', {name: 'Table'});
            this.searchInput = this.main.getByPlaceholder('Search');
            this.firstCard = this.main.locator('//div[contains(@class, "MuiCard-root")]').first();
            this.table = this.main.locator('table');
        }

        /**
         * Sets up API interceptions for the Recommendations page.
         * Intercepts API requests and provides mock responses.
         * @returns {Promise<void>}
         */
        async setupApiInterceptions() {
            const apiInterceptions = [
                {urlPattern: `/v2/organizations/[^/]+/geminis`, mockResponse: GeminisResponse},
                {urlPattern: `/v2/organizations/[^/]+/options`, mockResponse: OptionsResponse},
                {urlPattern: `/v2/organizations/[^/]+/ri_breakdown`, mockResponse: RIBreakdownResponse},
                {urlPattern: `/v2/organizations/[^/]+/sp_breakdown`, mockResponse: SPBreakdownResponse},
                {urlPattern: `/v2/organizations/[^/]+/summary_expenses`, mockResponse: SummaryExpensesResponse},
                {urlPattern: `/v2/organizations/[^/]+/optimizations`, mockResponse: OptimisationsResponse}
            ];

            await Promise.all(apiInterceptions.map(({urlPattern, mockResponse}) =>
                interceptApiRequest({page: this.page, urlPattern, mockResponse})
            ));
        }

        /**
         * Selects a data source from the data sources combo box.
         * @param {string} dataSource - The data source to select.
         * @returns {Promise<void>}
         */
        async selectDataSource(dataSource: string) {
            await this.selectFromComboBox(this.dataSourcesSelect, dataSource, true);
        }

        /**
         * Selects a category from the categories combo box.
         * @param {string} category - The category to select.
         * @returns {Promise<void>}
         */
        async selectCategory(category: string) {
            await this.selectFromComboBox(this.categoriesSelect, category);
        }

        /**
         * Selects an applicable service from the applicable services combo box.
         * @param {string} service - The service to select.
         * @returns {Promise<void>}
         */
        async selectApplicableService(service: string) {
            await this.selectFromComboBox(this.applicableServices, service);
        }

        /**
         * Clicks the Cards button if it is not already active.
         * @returns {Promise<void>}
         */
        async clickCardsButtonIfNotActive() {
            if (!await this.evaluateActiveButton(this.cardsBtn)) {
                await this.cardsBtn.click();
            }
        }

        /**
         * Clicks the Table button.
         * @returns {Promise<void>}
         */
        async clickTableButton() {
            await this.tableBtn.click();
        }
    }