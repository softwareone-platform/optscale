import { GeminisResponse,
        OptimisationsResponse, OptionsResponse, RIBreakdownResponse, SPBreakdownResponse, SummaryExpensesResponse } from "../test-data/recommendations-page-data";
    import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";
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
        readonly savedWithCommitmentsValue: Locator;
        readonly computeExpensesWithCommitmentsValue: Locator;
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
        readonly underutilizedInstancesCardSavingsValue: Locator;
        readonly obsoleteIPsCardSavingsValue: Locator;
        readonly notAttachedVolumesCardSavingsValue: Locator;
        readonly abandonedLoadBalancersCardSavingsValue: Locator;
        readonly instancesWithSpotPreemptibleOpportunitiesCardSavingsValue: Locator;
        readonly underutilzedRDSInstancesCardSavingsValue: Locator;
        readonly reservedInstancesOpportunitiesCardSavingsValue: Locator;
        readonly obsoleteSnapshotsCardSavingsValue: Locator;
        readonly obsoleteSnapshotChainsCardSavingsValue: Locator;
        readonly instancesWithSubscriptionOpportunitiesCardSavingsValue: Locator;
        readonly instancesWithMigrationOpportunitiesCardSavingsValue: Locator;
        readonly notDeallocatedInstancesCardSavingsValue: Locator;


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
            this.savedWithCommitmentsValue = this.main.getByTestId('p_ri_sp_expenses');
            this.computeExpensesWithCommitmentsValue = this.main.locator('//div[.="Compute expenses covered with commitments"]/../div/div');
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
            this.underutilizedInstancesCardSavingsValue = this.main.locator('//h3[normalize-space()="Underutilized instances"]/../../../div[2]/div[1]');
            this.obsoleteIPsCardSavingsValue = this.main.locator('//h3[normalize-space()="Obsolete IPs"]/../../../div[2]/div[1]');
            this.notAttachedVolumesCardSavingsValue = this.main.locator('//h3[normalize-space()="Not attached Volumes"]/../../../div[2]/div[1]');
            this.abandonedLoadBalancersCardSavingsValue = this.main.locator('//h3[normalize-space()="Abandoned Load Balancers"]/../../../div[2]/div[1]');
            this.instancesWithSpotPreemptibleOpportunitiesCardSavingsValue = this.main.locator('//h3[normalize-space()="Instances with Spot (Preemptible) opportunities"]/../../../div[2]/div[1]');
            this.underutilzedRDSInstancesCardSavingsValue = this.main.locator('//h3[normalize-space()="Underutilized RDS Instances"]/../../../div[2]/div[1]');
            this.reservedInstancesOpportunitiesCardSavingsValue = this.main.locator('//h3[normalize-space()="Reserved instances opportunities"]/../../../div[2]/div[1]');
            this.obsoleteSnapshotsCardSavingsValue = this.main.locator('//h3[normalize-space()="Obsolete snapshots"]/../../../div[2]/div[1]');
            this.obsoleteSnapshotChainsCardSavingsValue = this.main.locator('//h3[normalize-space()="Obsolete snapshot chains"]/../../../div[2]/div[1]');
            this.instancesWithSubscriptionOpportunitiesCardSavingsValue = this.main.locator('//h3[normalize-space()="Instances with Subscription opportunities"]/../../../div[2]/div[1]');
            this.instancesWithMigrationOpportunitiesCardSavingsValue = this.main.locator('//h3[normalize-space()="Instances with migration opportunities"]/../../../div[2]/div[1]');
            this.notDeallocatedInstancesCardSavingsValue = this.main.locator('//h3[normalize-space()="Not deallocated Instances"]/../../../div[2]/div[1]');
        }

        /**
         * Sets up API interceptions for the Recommendations page.
         * Intercepts API requests and provides mock responses.
         * @returns {Promise<void>}
         */
        async setupApiInterceptions(): Promise<void> {
            const apiInterceptions: IInterceptorConfig[] = [
                {page: this.page,urlPattern: `/v2/organizations/[^/]+/geminis`, mockResponse: GeminisResponse},
                {page: this.page,urlPattern: `/v2/organizations/[^/]+/options`, mockResponse: OptionsResponse},
                {page: this.page,urlPattern: `/v2/organizations/[^/]+/ri_breakdown`, mockResponse: RIBreakdownResponse},
                {page: this.page,urlPattern: `/v2/organizations/[^/]+/sp_breakdown`, mockResponse: SPBreakdownResponse},
                {page: this.page,urlPattern: `/v2/organizations/[^/]+/summary_expenses`, mockResponse: SummaryExpensesResponse},
                {page: this.page,urlPattern: `/v2/organizations/[^/]+/optimizations`, mockResponse: OptimisationsResponse}
            ];

            await Promise.all(apiInterceptions.map(interceptApiRequest));
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

        async getPossibleMonthlySavingsValue(): Promise<number> {
            let value = await this.possibleMonthlySavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getSavedWithCommitmentsValue(): Promise<number> {
            let value = await this.savedWithCommitmentsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getSavedExpensesWithCommitmentsPercentageValue(): Promise<string> {
            return await this.computeExpensesWithCommitmentsValue.textContent();
        }

        async getUnderutilizedInstancesCardSavingsValue(): Promise<number> {
            let value = await this.underutilizedInstancesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getObsoleteIPsCardSavingsValue(): Promise<number> {
            let value = await this.obsoleteIPsCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getNotAttachedVolumesCardSavingsValue(): Promise<number> {
            let value = await this.notAttachedVolumesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getAbandonedLoadBalancersCardSavingsValue(): Promise<number> {
            let value = await this.abandonedLoadBalancersCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getInstancesWithSpotPreemptibleOpportunitiesCardSavingsValue(): Promise<number> {
            let value = await this.instancesWithSpotPreemptibleOpportunitiesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getUnderutilzedRDSInstancesCardSavingsValue(): Promise<number> {
            let value = await this.underutilzedRDSInstancesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getReservedInstancesOpportunitiesCardSavingsValue(): Promise<number> {
            let value = await this.reservedInstancesOpportunitiesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getObsoleteSnapshotsCardSavingsValue(): Promise<number> {
            let value = await this.obsoleteSnapshotsCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getObsoleteSnapshotChainsCardSavingsValue(): Promise<number> {
            let value = await this.obsoleteSnapshotChainsCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getInstancesWithSubscriptionOpportunitiesCardSavingsValue(): Promise<number> {
            let value = await this.instancesWithSubscriptionOpportunitiesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getInstancesWithMigrationOpportunitiesCardSavingsValue(): Promise<number> {
            let value = await this.instancesWithMigrationOpportunitiesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getNotDeallocatedInstancesCardSavingsValue(): Promise<number> {
            let value = await this.notDeallocatedInstancesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }
        


    }
