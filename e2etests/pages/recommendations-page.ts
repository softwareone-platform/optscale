import {
    GeminisResponse,
    OptimisationsResponse, OptionsResponse, RIBreakdownResponse, SPBreakdownResponse, SummaryExpensesResponse
} from "../test-data/recommendations-page-data";
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
    readonly recommendationsModalCloseBtn: Locator;
    readonly modalColumn5: Locator;
    readonly modalColumn7: Locator;
    readonly underutilizedInstancesCardSavingsValue: Locator;
    readonly underutilizedInstancesSeeAllBtn: Locator;
    readonly underutilizedInstancesTableSavingsValue: Locator;
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
    readonly abandonedInstancesTableSavingsValue: Locator;
    readonly abandonedInstancesSeeAllBtn: Locator;
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
        this.recommendationsModal = this.page.getByTestId('smodal_recommendation');
        this.recommendationsModalCloseBtn = this.recommendationsModal.getByTestId('btn_close');
        this.modalColumn5 = this.recommendationsModal.locator('//tr/td[5]');
        this.modalColumn7 = this.recommendationsModal.locator('//tr/td[7]');

        this.underutilizedInstancesCardSavingsValue = this.main.locator('//h3[normalize-space()="Underutilized instances"]/../../../div[2]/div[1]');
        this.underutilizedInstancesTableSavingsValue = this.table.locator('//td[.="Underutilized instances"]/following-sibling::td[3]');
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
        this.abandonedInstancesTableSavingsValue = this.table.locator('//td[.="Abandoned instances"]/following-sibling::td[3]');
        this.abandonedInstancesSeeAllBtn = this.main.locator('//h3[normalize-space()="Abandoned instances"]/../../../../..//button[contains(text(), "See all")]');
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
            {page: this.page, urlPattern: `/v2/organizations/[^/]+/geminis`, mockResponse: GeminisResponse},
            {page: this.page, urlPattern: `/v2/organizations/[^/]+/options`, mockResponse: OptionsResponse},
            {page: this.page, urlPattern: `/v2/organizations/[^/]+/ri_breakdown`, mockResponse: RIBreakdownResponse},
            {page: this.page, urlPattern: `/v2/organizations/[^/]+/sp_breakdown`, mockResponse: SPBreakdownResponse},
            {
                page: this.page,
                urlPattern: `/v2/organizations/[^/]+/summary_expenses`,
                mockResponse: SummaryExpensesResponse
            },
            {page: this.page, urlPattern: `/v2/organizations/[^/]+/optimizations`, mockResponse: OptimisationsResponse}
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

    /**
     * Retrieves the possible monthly savings value from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed possible monthly savings value.
     */
    async getPossibleMonthlySavingsValue(): Promise<number> {
        const value = await this.possibleMonthlySavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the saved amount with commitments value from the page.
     * Parses the text content of the saved value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed saved amount with commitments value.
     */
    async getSavedWithCommitmentsValue(): Promise<number> {
        const value = await this.savedWithCommitmentsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the percentage of saved expenses covered with commitments.
     * Extracts the text content of the relevant element.
     *
     * @returns {Promise<string>} The percentage value as a string.
     */
    async getSavedExpensesWithCommitmentsPercentageValue(): Promise<string> {
        return await this.computeExpensesWithCommitmentsValue.textContent();
    }

    /**
     * Retrieves the savings value for underutilized instances from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for underutilized instances.
     */
    async getUnderutilizedInstancesCardSavingsValue(): Promise<number> {
        const value = await this.underutilizedInstancesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    async getUnderUtilizedInstancesTableSavingsValue(): Promise<number> {
        const value = await this.underutilizedInstancesTableSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }
    /**
     * Retrieves the savings value for obsolete IPs from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for obsolete IPs.
     */
    async getObsoleteIPsCardSavingsValue(): Promise<number> {
        const value = await this.obsoleteIPsCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for not attached volumes from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for not attached volumes.
     */
    async getNotAttachedVolumesCardSavingsValue(): Promise<number> {
        const value = await this.notAttachedVolumesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for abandoned load balancers from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for abandoned load balancers.
     */
    async getAbandonedLoadBalancersCardSavingsValue(): Promise<number> {
        const value = await this.abandonedLoadBalancersCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for instances with spot preemptible opportunities from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for instances with spot preemptible opportunities.
     */
    async getInstancesWithSpotPreemptibleOpportunitiesCardSavingsValue(): Promise<number> {
        const value = await this.instancesWithSpotPreemptibleOpportunitiesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for underutilized RDS instances from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for underutilized RDS instances.
     */
    async getUnderutilzedRDSInstancesCardSavingsValue(): Promise<number> {
        const value = await this.underutilzedRDSInstancesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for reserved instances opportunities from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for reserved instances opportunities.
     */
    async getReservedInstancesOpportunitiesCardSavingsValue(): Promise<number> {
        const value = await this.reservedInstancesOpportunitiesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for obsolete snapshots from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for obsolete snapshots.
     */
    async getObsoleteSnapshotsCardSavingsValue(): Promise<number> {
        const value = await this.obsoleteSnapshotsCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for obsolete snapshot chains from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for obsolete snapshot chains.
     */
    async getObsoleteSnapshotChainsCardSavingsValue(): Promise<number> {
        const value = await this.obsoleteSnapshotChainsCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for instances with subscription opportunities from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for instances with subscription opportunities.
     */
    async getInstancesWithSubscriptionOpportunitiesCardSavingsValue(): Promise<number> {
        const value = await this.instancesWithSubscriptionOpportunitiesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for instances with migration opportunities from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for instances with migration opportunities.
     */
    async getInstancesWithMigrationOpportunitiesCardSavingsValue(): Promise<number> {
        const value = await this.instancesWithMigrationOpportunitiesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for not deallocated instances from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for not deallocated instances.
     */
    async getNotDeallocatedInstancesCardSavingsValue(): Promise<number> {
        const value = await this.notDeallocatedInstancesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for instances eligible for generation upgrade from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for instances eligible for generation upgrade.
     */
    async getInstancesEligibleForGenerationUpgradeCardSavingsValue(): Promise<number> {
        const value = await this.instancesEligibleForGenerationUpgradeCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for instances for shutdown from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for instances for shutdown.
     */
    async getInstancesForShutdownCardSavingsValue(): Promise<number> {
        const value = await this.instancesForShutdownCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for abandoned Amazon S3 buckets from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for abandoned Amazon S3 buckets.
     */
    async getAbandonedAmazonS3BucketsCardSavingsValue(): Promise<number> {
        const value = await this.abandonedAmazonS3BucketsCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for abandoned Kinesis streams from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for abandoned Kinesis streams.
     */
    async getAbandonedKinesisStreamsCardSavingsValue(): Promise<number> {
        const value = await this.abandonedKinesisStreamsCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for abandoned instances from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for abandoned instances.
     */
    async getAbandonedInstancesCardSavingsValue(): Promise<number> {
        const value = await this.abandonedInstancesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    async getAbandonedInstancesTableSavingsValue(): Promise<number> {
        const value = await this.abandonedInstancesTableSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for public S3 buckets from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for public S3 buckets.
     */
    async getPublicS3BucketsCardSavingsValue(): Promise<number> {
        const value = await this.publicS3BucketsCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for obsolete images from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for obsolete images.
     */
    async getObsoleteImagesCardSavingsValue(): Promise<number> {
        const value = await this.obsoleteImagesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the savings value for abandoned images from the page.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed savings value for abandoned images.
     */
    async getAbandonedImagesCardSavingsValue(): Promise<number> {
        const value = await this.abandonedImagesCardSavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Calculates the total savings from all cards on the page.
     * Aggregates the savings values from all card elements.
     *
     * @returns {Promise<number>} The total savings value from all cards.
     */
    async calculateTotalSavingsFromCards(): Promise<number> {
        const cardSavingsMethods = [
            this.getUnderutilizedInstancesCardSavingsValue,
            this.getObsoleteIPsCardSavingsValue,
            this.getNotAttachedVolumesCardSavingsValue,
            this.getAbandonedLoadBalancersCardSavingsValue,
            this.getInstancesWithSpotPreemptibleOpportunitiesCardSavingsValue,
            this.getUnderutilzedRDSInstancesCardSavingsValue,
            this.getReservedInstancesOpportunitiesCardSavingsValue,
            this.getObsoleteSnapshotsCardSavingsValue,
            this.getObsoleteSnapshotChainsCardSavingsValue,
            this.getInstancesWithSubscriptionOpportunitiesCardSavingsValue,
            this.getInstancesWithMigrationOpportunitiesCardSavingsValue,
            this.getNotDeallocatedInstancesCardSavingsValue,
            this.getInstancesEligibleForGenerationUpgradeCardSavingsValue,
            this.getInstancesForShutdownCardSavingsValue,
            this.getAbandonedAmazonS3BucketsCardSavingsValue,
            this.getAbandonedKinesisStreamsCardSavingsValue,
            this.getAbandonedInstancesCardSavingsValue,
            this.getPublicS3BucketsCardSavingsValue,
            this.getObsoleteImagesCardSavingsValue,
            this.getAbandonedImagesCardSavingsValue,
        ];

const totalSavings = await Promise.all(cardSavingsMethods.map(method => method.call(this)))
            .then(values => values.reduce((sum, value) => sum + value, 0))
            .then(total => parseFloat(total.toFixed(2)));

        console.log(`Total savings from cards: ${totalSavings}`);
        return totalSavings;
    }

    async getItemisedSavingsFromModal(seeAllLocator: Locator, columnLocator: Locator): Promise<number> {
        await seeAllLocator.click();
        await this.recommendationsModal.waitFor();
        await columnLocator.last().waitFor();
        const itemisedSavings = await this.sumCurrencyColumn(columnLocator);
        await this.recommendationsModalCloseBtn.click();
        console.log(`Itemised Savings: ${itemisedSavings}`);
        return itemisedSavings;
    }

}
