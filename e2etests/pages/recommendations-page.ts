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
        readonly recommendationsModal: Locator;
        readonly modalColumn7: Locator;
        readonly underutilizedInstancesCardSavingsValue: Locator;
        readonly underutilizedInstancesSeeAllBtn: Locator;
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
        readonly instancesEligibleForGenerationUpgradeCardSavingsValue: Locator;
        readonly instancesForShutdownCardSavingsValue: Locator;
        readonly abandonedAmazonS3BucketsCardSavingsValue: Locator;
        readonly abandonedKinesisStreamsCardSavingsValue: Locator;
        readonly abandonedInstancesCardSavingsValue: Locator;
        readonly publicS3BucketsCardSavingsValue: Locator;
        readonly obsoleteImagesCardSavingsValue: Locator;
        readonly abandonedImagesCardSavingsValue: Locator;


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
            this.recommendationsModal =this.page.getByTestId('smodal_recommendation');
            this.modalColumn7 = this.recommendationsModal.locator('//tr/td[7]');

            this.underutilizedInstancesCardSavingsValue = this.main.locator('//h3[normalize-space()="Underutilized instances"]/../../../div[2]/div[1]');
            this.underutilizedInstancesSeeAllBtn = this.main.locator('//h3[normalize-space()="Underutilized instances"]/../../../../..//button[contains(text(), "See all")]');
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
            this.instancesEligibleForGenerationUpgradeCardSavingsValue = this.main.locator('//h3[normalize-space()="Instances eligible for generation upgrade"]/../../../div[2]/div[1]');
            this.instancesForShutdownCardSavingsValue = this.main.locator('//h3[normalize-space()="Instances for shutdown"]/../../../div[2]/div[1]');
            this.abandonedAmazonS3BucketsCardSavingsValue = this.main.locator('//h3[normalize-space()="Abandoned Amazon S3 buckets"]/../../../div[2]/div[1]');
            this.abandonedKinesisStreamsCardSavingsValue = this.main.locator('//h3[normalize-space()="Abandoned Kinesis Streams"]/../../../div[2]/div[1]');
            this.abandonedInstancesCardSavingsValue = this.main.locator('//h3[normalize-space()="Abandoned instances"]/../../../div[2]/div[1]');
            this.publicS3BucketsCardSavingsValue = this.main.locator('//h3[normalize-space()="Public S3 buckets"]/../../../div[2]/div[1]');
            this.obsoleteImagesCardSavingsValue = this.main.locator('//h3[normalize-space()="Obsolete images"]/../../../div[2]/div[1]');
            this.abandonedImagesCardSavingsValue = this.main.locator('//h3[normalize-space()="Abandoned images"]/../../../div[2]/div[1]');
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
            const value = await this.possibleMonthlySavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getSavedWithCommitmentsValue(): Promise<number> {
            const value = await this.savedWithCommitmentsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getSavedExpensesWithCommitmentsPercentageValue(): Promise<string> {
            return await this.computeExpensesWithCommitmentsValue.textContent();
        }

        async getUnderutilizedInstancesCardSavingsValue(): Promise<number> {
            const value = await this.underutilizedInstancesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getObsoleteIPsCardSavingsValue(): Promise<number> {
            const value = await this.obsoleteIPsCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getNotAttachedVolumesCardSavingsValue(): Promise<number> {
            const value = await this.notAttachedVolumesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getAbandonedLoadBalancersCardSavingsValue(): Promise<number> {
            const value = await this.abandonedLoadBalancersCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getInstancesWithSpotPreemptibleOpportunitiesCardSavingsValue(): Promise<number> {
            const value = await this.instancesWithSpotPreemptibleOpportunitiesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getUnderutilzedRDSInstancesCardSavingsValue(): Promise<number> {
            const value = await this.underutilzedRDSInstancesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getReservedInstancesOpportunitiesCardSavingsValue(): Promise<number> {
            const value = await this.reservedInstancesOpportunitiesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getObsoleteSnapshotsCardSavingsValue(): Promise<number> {
            const value = await this.obsoleteSnapshotsCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getObsoleteSnapshotChainsCardSavingsValue(): Promise<number> {
            const value = await this.obsoleteSnapshotChainsCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getInstancesWithSubscriptionOpportunitiesCardSavingsValue(): Promise<number> {
            const value = await this.instancesWithSubscriptionOpportunitiesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getInstancesWithMigrationOpportunitiesCardSavingsValue(): Promise<number> {
            const value = await this.instancesWithMigrationOpportunitiesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getNotDeallocatedInstancesCardSavingsValue(): Promise<number> {
            const value = await this.notDeallocatedInstancesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getInstancesEligibleForGenerationUpgradeCardSavingsValue(): Promise<number> {
            const value = await this.instancesEligibleForGenerationUpgradeCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getInstancesForShutdownCardSavingsValue(): Promise<number> {
            const value = await this.instancesForShutdownCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getAbandonedAmazonS3BucketsCardSavingsValue(): Promise<number> {
            const value = await this.abandonedAmazonS3BucketsCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getAbandonedKinesisStreamsCardSavingsValue(): Promise<number> {
            const value = await this.abandonedKinesisStreamsCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getAbandonedInstancesCardSavingsValue(): Promise<number> {
            const value = await this.abandonedInstancesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getPublicS3BucketsCardSavingsValue(): Promise<number> {
            const value = await this.publicS3BucketsCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getObsoleteImagesCardSavingsValue(): Promise<number> {
            const value = await this.obsoleteImagesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async getAbandonedImagesCardSavingsValue(): Promise<number> {
            const value = await this.abandonedImagesCardSavingsValue.textContent();
            return this.parseCurrencyValue(value);
        }

        async calculateTotalSavingsFromCards(): Promise<number> {
        let totalSavings = 0;
            totalSavings += await this.getUnderutilizedInstancesCardSavingsValue();
            totalSavings += await this.getObsoleteIPsCardSavingsValue();
            totalSavings += await this.getNotAttachedVolumesCardSavingsValue();
            totalSavings += await this.getAbandonedLoadBalancersCardSavingsValue();
            totalSavings += await this.getInstancesWithSpotPreemptibleOpportunitiesCardSavingsValue();
            totalSavings += await this.getUnderutilzedRDSInstancesCardSavingsValue();
            totalSavings += await this.getReservedInstancesOpportunitiesCardSavingsValue();
            totalSavings += await this.getObsoleteSnapshotsCardSavingsValue();
            totalSavings += await this.getObsoleteSnapshotChainsCardSavingsValue();
            totalSavings += await this.getInstancesWithSubscriptionOpportunitiesCardSavingsValue();
            totalSavings += await this.getInstancesWithMigrationOpportunitiesCardSavingsValue();
            totalSavings += await this.getNotDeallocatedInstancesCardSavingsValue();
            totalSavings += await this.getInstancesEligibleForGenerationUpgradeCardSavingsValue();
            totalSavings += await this.getInstancesForShutdownCardSavingsValue();
            totalSavings += await this.getAbandonedAmazonS3BucketsCardSavingsValue();
            totalSavings += await this.getAbandonedKinesisStreamsCardSavingsValue();
            totalSavings += await this.getAbandonedInstancesCardSavingsValue();
            totalSavings += await this.getPublicS3BucketsCardSavingsValue();
            totalSavings += await this.getObsoleteImagesCardSavingsValue();
            totalSavings += await this.getAbandonedImagesCardSavingsValue();

            console.log(`Total savings from cards: ${totalSavings}`);
            return totalSavings;
        }

    }
