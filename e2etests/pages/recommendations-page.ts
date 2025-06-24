import {
    GeminisResponse,
    OptimisationsResponse, OptionsResponse, RIBreakdownResponse, SPBreakdownResponse, SummaryExpensesResponse
} from "../test-data/recommendations-page-data";
import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";
import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {test} from "../fixtures/page-fixture";

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
    readonly ri_spCard: Locator;
    readonly computeExpensesWithCommitmentsValue: Locator;
    readonly lastCheckTimeValue: Locator;
    readonly nextCheckTimeValue: Locator;
    readonly s3DuplicatesCard: Locator;
    readonly s3DuplicatesCaption: Locator;
    readonly s3DuplicatesValue: Locator;
    readonly s3DuplicatesPossibleMonthlySavingsValue: Locator;
    readonly categoriesSelect: Locator;
    readonly applicableServices: Locator;
    readonly cardsBtn: Locator;
    readonly tableBtn: Locator;
    readonly searchInput: Locator;
    readonly cardDiv: Locator;
    readonly firstCard: Locator;

    readonly cardRDS_Icon: Locator;
    readonly tableRDS_Icon: Locator;
    // readonly computeSpan: Locator;
    readonly cardAWS_IAM_Icon: Locator;
    // readonly ec2Span: Locator;
    // readonly ec2_ebsSpan: Locator;
    // readonly ec2_vpcSpan: Locator;
    // readonly kinesisSpan: Locator;
    // readonly s3Span: Locator;
    readonly cardGoogleIAM_Icon: Locator;


    readonly recommendationsModal: Locator;
    readonly recommendationsModalCloseBtn: Locator;
    readonly modalColumn5: Locator;
    readonly modalColumn6: Locator;
    readonly modalColumn7: Locator;
    readonly modalColumn8: Locator;
    readonly modalNextPageBtn: Locator;

    readonly table: Locator;
    readonly possibleSavingsColumn: Locator;
    readonly applicableServicesColumn: Locator;
    readonly allCardHeadings: Locator;
    readonly allCriticalIcon: Locator;
    readonly allSeeAllBtns: Locator;
    readonly allNameTableButtons: Locator;
    readonly statusColumn: Locator;
    readonly abandonedAmazonS3BucketsCardSavingsValue: Locator;
    readonly abandonedAmazonS3BucketsSeeAllBtn: Locator;
    readonly abandonedAmazonS3BucketsTableSavingsValue: Locator;
    readonly abandonedImagesCardSavingsValue: Locator;
    readonly abandonedImagesSeeAllBtn: Locator;
    readonly abandonedImagesTableSavingsValue: Locator;
    readonly abandonedInstancesCardSavingsValue: Locator;
    readonly abandonedInstancesSeeAllBtn: Locator;
    readonly abandonedInstancesTableSavingsValue: Locator;
    readonly abandonedKinesisStreamsCardSavingsValue: Locator;
    readonly abandonedKinesisStreamsSeeAllBtn: Locator;
    readonly abandonedKinesisStreamsTableSavingsValue: Locator;
    readonly abandonedLoadBalancersCardSavingsValue: Locator;
    readonly abandonedLoadBalancersSeeAllBtn: Locator;
    readonly abandonedLoadBalancersTableSavingsValue: Locator;
    readonly instancesEligibleForGenerationUpgradeCardSavingsValue: Locator;
    readonly instancesEligibleForGenerationUpgradeSeeAllBtn: Locator;
    readonly instancesEligibleForGenerationUpgradeTableSavingsValue: Locator;
    readonly instancesForShutdownCardSavingsValue: Locator;
    readonly instancesForShutdownSeeAllBtn: Locator;
    readonly instancesForShutdownTableSavingsValue: Locator;
    readonly instancesWithMigrationOpportunitiesCardSavingsValue: Locator;
    readonly instancesWithMigrationOpportunitiesSeeAllBtn: Locator;
    readonly instancesWithMigrationOpportunitiesTableSavingsValue: Locator;
    readonly instancesWithSpotPreemptibleOpportunitiesCardSavingsValue: Locator;
    readonly instancesWithSpotPreemptibleOpportunitiesSeeAllBtn: Locator;
    readonly instancesWithSpotPreemptibleOpportunitiesTableSavingsValue: Locator;
    readonly instancesWithSubscriptionOpportunitiesCardSavingsValue: Locator;
    readonly instancesWithSubscriptionOpportunitiesSeeAllBtn: Locator;
    readonly instancesWithSubscriptionOpportunitiesTableSavingsValue: Locator;
    readonly notAttachedVolumesCardSavingsValue: Locator;
    readonly notAttachedVolumesSeeAllBtn: Locator;
    readonly notAttachedVolumesTableSavingsValue: Locator;
    readonly notDeallocatedInstancesCardSavingsValue: Locator;
    readonly notDeallocatedInstancesSeeAllBtn: Locator;
    readonly notDeallocatedInstancesTableSavingsValue: Locator;
    readonly obsoleteImagesCardSavingsValue: Locator;
    readonly obsoleteImagesSeeAllBtn: Locator;
    readonly obsoleteImagesTableSavingsValue: Locator;
    readonly obsoleteIPsCardSavingsValue: Locator;
    readonly obsoleteIPsSeeAllBtn: Locator;
    readonly obsoleteIPsTableSavingsValue: Locator;
    readonly obsoleteSnapshotChainsCardSavingsValue: Locator;
    readonly obsoleteSnapshotChainsSeeAllBtn: Locator;
    readonly obsoleteSnapshotChainsTableSavingsValue: Locator;
    readonly obsoleteSnapshotsCardSavingsValue: Locator;
    readonly obsoleteSnapshotsSeeAllBtn: Locator;
    readonly obsoleteSnapshotsTableSavingsValue: Locator;

    readonly reservedInstancesOpportunitiesCardSavingsValue: Locator;
    readonly reservedInstancesOpportunitiesSeeAllBtn: Locator;
    readonly reservedInstancesOpportunitiesTableSavingsValue: Locator;

    readonly underutilizedInstancesCardSavingsValue: Locator;
    readonly underutilizedInstancesSeeAllBtn: Locator;
    readonly underutilizedInstancesTableSavingsValue: Locator;
    readonly underutilzedRDSInstancesCardSavingsValue: Locator;
    readonly underutilzedRDSInstancesSeeAllBtn: Locator;
    readonly underutilzedRDSInstancesTableSavingsValue: Locator;

    readonly publicS3BucketsCardCountValue: Locator;


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
        this.ri_spCard = this.main.getByTestId('card_ri_sp_expenses');
        this.savedWithCommitmentsValue = this.main.getByTestId('p_ri_sp_expenses');
        this.computeExpensesWithCommitmentsValue = this.main.locator('//div[.="Compute expenses covered with commitments"]/../div/div');
        this.lastCheckTimeValue = this.main.getByTestId('p_last_time');
        this.nextCheckTimeValue = this.main.locator('//span[.="Next check time"]/../following-sibling::div');
        this.s3DuplicatesCard = this.main.getByTestId('card_s3_duplicates');
        this.s3DuplicatesCaption = this.s3DuplicatesCard.locator('//span[@data-test-id="p_s3_duplicates"]');
        this.s3DuplicatesValue = this.s3DuplicatesCard.getByTestId('p_s3_duplicates_value');
        this.s3DuplicatesPossibleMonthlySavingsValue = this.s3DuplicatesCard.locator('//div[.="Possible monthly savings"]/following-sibling::div');
        this.categoriesSelect = this.main.locator('//label[.="Categories"]/../div');
        this.applicableServices = this.main.locator('//label[.="Applicable services"]/../div')
        this.cardsBtn = this.main.getByRole('button', {name: 'Cards'});
        this.tableBtn = this.main.getByRole('button', {name: 'Table'});
        this.searchInput = this.main.getByPlaceholder('Search');
        this.cardDiv = this.main.locator('//div[@class="MuiStack-root mui-1ov46kg"]/div[3]');
        this.table = this.main.locator('table');

        // Data source icons
        this.cardRDS_Icon = this.cardDiv.locator('//span[.="RDS"]');
        this.cardGoogleIAM_Icon = this.cardDiv.locator('//*[local-name()="path" and @fill="#fbbc05"]   /ancestor::*[1]   /following-sibling::span[normalize-space(.)="IAM"]');
        this.cardAWS_IAM_Icon = this.cardDiv.locator('//*[local-name()="path" and @fill="#252f3e"]/ancestor::*[1]/following-sibling::span[normalize-space(.)="IAM"]');
        this.tableRDS_Icon = this.table.locator('//td[5]//span[.="RDS"]');


        // Side modal locators
        this.recommendationsModal = this.page.getByTestId('smodal_recommendation');
        this.recommendationsModalCloseBtn = this.recommendationsModal.getByTestId('btn_close');
        this.modalNextPageBtn = this.recommendationsModal.getByTestId('btn_pagination_next');
        this.modalColumn5 = this.recommendationsModal.locator('//tr/td[5]');
        this.modalColumn6 = this.recommendationsModal.locator('//tr/td[6]');
        this.modalColumn7 = this.recommendationsModal.locator('//tr/td[7]');
        this.modalColumn8 = this.recommendationsModal.locator('//tr/td[8]');

        // Card and table locators

        this.firstCard = this.cardDiv.locator('//div[contains(@class, "MuiCard-root")]').first();
        this.allCardHeadings = this.cardDiv.locator('//h3');
        this.possibleSavingsColumn = this.table.locator('//td[4]');
        this.statusColumn = this.table.locator('//td[2]');
        this.applicableServicesColumn = this.table.locator('//td[5]');
        this.allCriticalIcon = this.cardDiv.locator('//div[contains(@class, "MuiCard-root") ]//*[@data-testid="CancelIcon"]');
        this.allSeeAllBtns = this.cardDiv.locator('//div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.allNameTableButtons = this.table.locator('//td[1]//button');
        this.abandonedAmazonS3BucketsCardSavingsValue = this.main.locator('//h3[.="Abandoned Amazon S3 buckets"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.abandonedAmazonS3BucketsSeeAllBtn = this.main.locator('//h3[.="Abandoned Amazon S3 buckets"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.abandonedAmazonS3BucketsTableSavingsValue = this.table.locator('//button[contains(text(), "Abandoned Amazon S3 buckets")]/ancestor::td/following-sibling::td[3]');
        this.abandonedImagesCardSavingsValue = this.main.locator('//h3[.="Abandoned images"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.abandonedImagesSeeAllBtn = this.main.locator('//h3[.="Abandoned images"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.abandonedImagesTableSavingsValue = this.table.locator('//button[contains(text(), "Abandoned images")]/ancestor::td/following-sibling::td[3]');
        this.abandonedInstancesCardSavingsValue = this.main.locator('//h3[.="Abandoned instances"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.abandonedInstancesSeeAllBtn = this.main.locator('//h3[.="Abandoned instances"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.abandonedInstancesTableSavingsValue = this.table.locator('//button[contains(text(), "Abandoned instances")]/ancestor::td/following-sibling::td[3]');
        this.abandonedKinesisStreamsCardSavingsValue = this.main.locator('//h3[.="Abandoned Kinesis Streams"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.abandonedKinesisStreamsSeeAllBtn = this.main.locator('//h3[.="Abandoned Kinesis Streams"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.abandonedKinesisStreamsTableSavingsValue = this.table.locator('//button[contains(text(), "Abandoned Kinesis Streams")]/ancestor::td/following-sibling::td[3]');
        this.abandonedLoadBalancersCardSavingsValue = this.main.locator('//h3[.="Abandoned Load Balancers"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.abandonedLoadBalancersSeeAllBtn = this.main.locator('//h3[.="Abandoned Load Balancers"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.abandonedLoadBalancersTableSavingsValue = this.table.locator('//button[contains(text(), "Abandoned Load Balancers")]/ancestor::td/following-sibling::td[3]');
        this.instancesEligibleForGenerationUpgradeCardSavingsValue = this.main.locator('//h3[.="Instances eligible for generation upgrade"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.instancesEligibleForGenerationUpgradeSeeAllBtn = this.main.locator('//h3[.="Instances eligible for generation upgrade"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.instancesEligibleForGenerationUpgradeTableSavingsValue = this.table.locator('//button[contains(text(), "Instances eligible for generation upgrade")]/ancestor::td/following-sibling::td[3]');
        this.instancesForShutdownCardSavingsValue = this.main.locator('//h3[.="Instances for shutdown"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.instancesForShutdownSeeAllBtn = this.main.locator('//h3[.="Instances for shutdown"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.instancesForShutdownTableSavingsValue = this.table.locator('//button[contains(text(), "Instances for shutdown")]/ancestor::td/following-sibling::td[3]');
        this.instancesWithMigrationOpportunitiesCardSavingsValue = this.main.locator('//h3[.="Instances with migration opportunities"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.instancesWithMigrationOpportunitiesSeeAllBtn = this.main.locator('//h3[.="Instances with migration opportunities"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.instancesWithMigrationOpportunitiesTableSavingsValue = this.table.locator('//button[contains(text(), "Instances with migration opportunities")]/ancestor::td/following-sibling::td[3]');
        this.instancesWithSpotPreemptibleOpportunitiesCardSavingsValue = this.main.locator('//h3[.="Instances with Spot (Preemptible) opportunities"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.instancesWithSpotPreemptibleOpportunitiesSeeAllBtn = this.main.locator('//h3[.="Instances with Spot (Preemptible) opportunities"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.instancesWithSpotPreemptibleOpportunitiesTableSavingsValue = this.table.locator('//button[contains(text(), "Instances with Spot (Preemptible) opportunities")]/ancestor::td/following-sibling::td[3]');
        this.instancesWithSubscriptionOpportunitiesCardSavingsValue = this.main.locator('//h3[.="Instances with Subscription opportunities"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.instancesWithSubscriptionOpportunitiesSeeAllBtn = this.main.locator('//h3[.="Instances with Subscription opportunities"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.instancesWithSubscriptionOpportunitiesTableSavingsValue = this.table.locator('//button[contains(text(), "Instances with Subscription opportunities")]/ancestor::td/following-sibling::td[3]');
        this.notAttachedVolumesCardSavingsValue = this.main.locator('//h3[.="Not attached Volumes"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.notAttachedVolumesSeeAllBtn = this.main.locator('//h3[.="Not attached Volumes"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.notAttachedVolumesTableSavingsValue = this.table.locator('//button[contains(text(), "Not attached Volumes")]/ancestor::td/following-sibling::td[3]');
        this.notDeallocatedInstancesCardSavingsValue = this.main.locator('//h3[.="Not deallocated Instances"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.notDeallocatedInstancesSeeAllBtn = this.main.locator('//h3[.="Not deallocated Instances"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.notDeallocatedInstancesTableSavingsValue = this.table.locator('//button[contains(text(), "Not deallocated Instances")]/ancestor::td/following-sibling::td[3]');
        this.obsoleteImagesCardSavingsValue = this.main.locator('//h3[.="Obsolete images"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.obsoleteImagesSeeAllBtn = this.main.locator('//h3[.="Obsolete images"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.obsoleteImagesTableSavingsValue = this.table.locator('//button[contains(text(), "Obsolete images")]/ancestor::td/following-sibling::td[3]');
        this.obsoleteIPsCardSavingsValue = this.main.locator('//h3[.="Obsolete IPs"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.obsoleteIPsSeeAllBtn = this.main.locator('//h3[.="Obsolete IPs"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.obsoleteIPsTableSavingsValue = this.table.locator('//button[contains(text(), "Obsolete IPs")]/ancestor::td/following-sibling::td[3]');
        this.obsoleteSnapshotChainsCardSavingsValue = this.main.locator('//h3[.="Obsolete snapshot chains"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.obsoleteSnapshotChainsSeeAllBtn = this.main.locator('//h3[.="Obsolete snapshot chains"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.obsoleteSnapshotChainsTableSavingsValue = this.table.locator('//button[contains(text(), "Obsolete snapshot chains")]/ancestor::td/following-sibling::td[3]');
        this.obsoleteSnapshotsCardSavingsValue = this.main.locator('//h3[.="Obsolete snapshots"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.obsoleteSnapshotsSeeAllBtn = this.main.locator('//h3[.="Obsolete snapshots"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.obsoleteSnapshotsTableSavingsValue = this.table.locator('//button[contains(text(), "Obsolete snapshots")]/ancestor::td/following-sibling::td[3]');
        this.reservedInstancesOpportunitiesCardSavingsValue = this.main.locator('//h3[.="Reserved instances opportunities"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.reservedInstancesOpportunitiesSeeAllBtn = this.main.locator('//h3[.="Reserved instances opportunities"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.reservedInstancesOpportunitiesTableSavingsValue = this.table.locator('//button[contains(text(), "Reserved instances opportunities")]/ancestor::td/following-sibling::td[3]');
        this.underutilizedInstancesCardSavingsValue = this.main.locator('//h3[.="Underutilized instances"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.underutilizedInstancesSeeAllBtn = this.main.locator('//h3[.="Underutilized instances"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.underutilizedInstancesTableSavingsValue = this.table.locator('//button[contains(text(), "Underutilized instances")]/ancestor::td/following-sibling::td[3]');
        this.underutilzedRDSInstancesCardSavingsValue = this.main.locator('//h3[.="Underutilized RDS Instances"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
        this.underutilzedRDSInstancesSeeAllBtn = this.main.locator('//h3[.="Underutilized RDS Instances"]/ancestor::div[contains(@class, "MuiCard-root")]//button[contains(text(), "See")]');
        this.underutilzedRDSInstancesTableSavingsValue = this.table.locator('//button[contains(text(), "Underutilized RDS Instances")]/ancestor::td/following-sibling::td[3]');

        this.publicS3BucketsCardCountValue = this.main.locator('//h3[.="Public S3 buckets"]/ancestor::div[contains(@class, "MuiStack-root")]/div[contains(@class, "value")]/div[1]');
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
     * Clicks the RI/SP card on the Recommendations page.
     *
     * This method interacts with the `ri_spCard` locator to simulate a user clicking
     * on the RI/SP card element. The action is typically used to navigate to a specific
     * section or trigger functionality associated with the RI/SP card.
     *
     * @returns {Promise<void>} Resolves when the click action is complete.
     */
    async clickRI_SPCard() {
        await this.ri_spCard.click();
    }

    /**
     * Selects a category from the categories combo box.
     * @param {string} category - The category to select.
     * @returns {Promise<void>}
     */
    async selectCategory(category: string) {
        await this.categoriesSelect.waitFor();
        await this.selectFromComboBox(this.categoriesSelect, category);
    }

    /**
     * Selects an applicable service from the applicable services combo box.
     * @param {string} service - The service to select.
     * @returns {Promise<void>}
     */
    async selectApplicableService(service: string) {
        await this.applicableServices.waitFor();
        await this.selectFromComboBox(this.applicableServices, service);
        await this.page.waitForTimeout(200);
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
     * Retrieves the possible monthly savings value for S3 Duplicate Finder.
     * Parses the text content of the savings value element into a numeric value.
     *
     * @returns {Promise<number>} The parsed possible monthly savings value.
     */
    async getS3DuplicateFinderPossibleMonthlySavingsValue(): Promise<number> {
        const value = await this.s3DuplicatesPossibleMonthlySavingsValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Clicks the S3 Duplicates card on the Recommendations page.
     * This action navigates to the S3 Duplicate Finder section.
     *
     * @returns {Promise<void>}
     */
    async clickS3DuplicatesCard() {
        await this.s3DuplicatesCard.click();
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
     * Retrieves a card or table savings value given its locator.
     *
     * @param {Locator} savingsLocator - The locator for the card's savings value.
     * @returns {Promise<number>} The parsed savings value.
     */
    async getSavingsValue(savingsLocator: Locator): Promise<number> {
        await savingsLocator.scrollIntoViewIfNeeded();
        const text = await savingsLocator.textContent();
        return this.parseCurrencyValue(text);
    }

    /**
     * Retrieves the count value of public S3 buckets from the page.
     * Extracts the text content of the corresponding element.
     *
     * @returns {Promise<string>} The count value of public S3 buckets as a string.
     */
    async getPublicS3BucketsCardCountValue(): Promise<string> {
        return await this.publicS3BucketsCardCountValue.textContent();
    }


    /**
     * Calculates the total savings from all cards on the page.
     * Aggregates the savings values from all card elements.
     *
     * @returns {Promise<number>} The total savings value from all cards.
     */
    async calculateTotalSavingsFromCards(): Promise<number> {
        const cardData = [
            {label: 'Abandoned Amazon S3 Buckets', locator: this.abandonedAmazonS3BucketsCardSavingsValue},
            {label: 'Abandoned Images', locator: this.abandonedImagesCardSavingsValue},
            {label: 'Abandoned Instances', locator: this.abandonedInstancesCardSavingsValue},
            {label: 'Abandoned Kinesis Streams', locator: this.abandonedKinesisStreamsCardSavingsValue},
            {label: 'Abandoned Load Balancers', locator: this.abandonedLoadBalancersCardSavingsValue},
            {
                label: 'Instances Eligible for Generation Upgrade',
                locator: this.instancesEligibleForGenerationUpgradeCardSavingsValue
            },
            {label: 'Instances for Shutdown', locator: this.instancesForShutdownCardSavingsValue},
            {
                label: 'Instances with Migration Opportunities',
                locator: this.instancesWithMigrationOpportunitiesCardSavingsValue
            },
            {
                label: 'Instances with Spot/Preemptible Opportunities',
                locator: this.instancesWithSpotPreemptibleOpportunitiesCardSavingsValue
            },
            {
                label: 'Instances with Subscription Opportunities',
                locator: this.instancesWithSubscriptionOpportunitiesCardSavingsValue
            },
            {label: 'Not Attached Volumes', locator: this.notAttachedVolumesCardSavingsValue},
            {label: 'Not Deallocated Instances', locator: this.notDeallocatedInstancesCardSavingsValue},
            {label: 'Obsolete Images', locator: this.obsoleteImagesCardSavingsValue},
            {label: 'Obsolete IPs', locator: this.obsoleteIPsCardSavingsValue},
            {label: 'Obsolete Snapshots', locator: this.obsoleteSnapshotsCardSavingsValue},
            {label: 'Obsolete Snapshot Chains', locator: this.obsoleteSnapshotChainsCardSavingsValue},
            {label: 'Reserved Instances Opportunities', locator: this.reservedInstancesOpportunitiesCardSavingsValue},
            {label: 'Underutilized Instances', locator: this.underutilizedInstancesCardSavingsValue},
            {label: 'Underutilized RDS Instances', locator: this.underutilzedRDSInstancesCardSavingsValue},
        ];

        let total = 0;

        for (const {label, locator} of cardData) {
            const value = await this.getSavingsValue(locator);
            console.log(`${label}: ${value}`);
            total += value;
        }

        const roundedTotal = parseFloat(total.toFixed(2));
        console.log(`Total savings from cards: ${roundedTotal}`);
        return roundedTotal;
    }

    /**
     * Retrieves the itemized savings from a modal.
     * Clicks the "See" button to open the modal, waits for the modal and the last column element to load,
     * sums the currency values in the specified column, and closes the modal.
     *
     * @param {Locator} seeAllLocator - The locator for the "See" button.
     * @param {Locator} columnLocator - The locator for the column containing the currency values.
     * @returns {Promise<number>} The total itemized savings calculated from the modal.
     */
    async getItemisedSavingsFromModal(seeAllLocator: Locator, columnLocator: Locator): Promise<number> {
        await seeAllLocator.click();
        await this.recommendationsModal.waitFor();
        await columnLocator.last().waitFor();
        const itemisedSavings = await this.sumCurrencyColumn(columnLocator, this.modalNextPageBtn);
        await this.recommendationsModalCloseBtn.click();
        await this.page.waitForLoadState('networkidle');
        console.log(`Itemised Savings: ${itemisedSavings}`);
        return itemisedSavings;
    }


    /**
     * Skips the test if the number of items in the modal exceeds 100.
     *
     * This method checks the text content of the "See All" button to determine the number of items.
     * If the button indicates a single item, the test proceeds normally.
     * If the button indicates multiple items, it parses the item count from the text.
     * If the item count exceeds 100, the test is skipped with a warning.
     *
     * @param {Locator} seeAllBtn - The locator for the "See All" button.
     * @returns {Promise<void>} Resolves when the check is complete or the test is skipped.
     */
    async skipTestIfMoreThan100Items(seeAllBtn: Locator) {
        // Retrieve the text content of the "See All" button and normalize it.
        const text = (await seeAllBtn.textContent())!.trim().toLowerCase();

        // If the button indicates a single item, log a message and proceed with the test.
        if (text === 'see item') {
            console.log("Single item detected — proceeding with test.");
            return;
        }

        // Match the text to extract the item count if it indicates multiple items.
        const match = text.match(/see all (\d+) items?/);
        if (match) {
            const itemCount = parseInt(match[1], 10); // Parse the item count as an integer.

            // If the item count exceeds 100, log a warning and skip the test.
            if (itemCount > 100) {
                console.warn(`Test skipped: modal limit exceeded (${itemCount} items > 100)`);
                test.skip();
            }
        }
    }
}

