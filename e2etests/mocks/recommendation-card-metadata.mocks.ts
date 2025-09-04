import {RecommendationsPage} from "../pages";
import {CardSavingsData} from "../types/api-response.types";



export const getCardSavingsData = (recommendationsPage: RecommendationsPage): CardSavingsData[] => [
    {
        name: 'Abandoned Amazon S3 Buckets',
        cardLocator: recommendationsPage.abandonedAmazonS3BucketsCardSavingsValue,
        seeAllBtn: recommendationsPage.abandonedAmazonS3BucketsSeeAllBtn,
        tableLocator: recommendationsPage.abandonedAmazonS3BucketsTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn8
    },
    {
        name: 'Abandoned Images',
        cardLocator: recommendationsPage.abandonedImagesCardSavingsValue,
        seeAllBtn: recommendationsPage.abandonedImagesSeeAllBtn,
        tableLocator: recommendationsPage.abandonedImagesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn5
    },
    {
        name: 'Abandoned Instances',
        cardLocator: recommendationsPage.abandonedInstancesCardSavingsValue,
        seeAllBtn: recommendationsPage.abandonedInstancesSeeAllBtn,
        tableLocator: recommendationsPage.abandonedInstancesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn5
    },
    {
        name: 'Abandoned Kinesis Streams',
        cardLocator: recommendationsPage.abandonedKinesisStreamsCardSavingsValue,
        seeAllBtn: recommendationsPage.abandonedKinesisStreamsSeeAllBtn,
        tableLocator: recommendationsPage.abandonedKinesisStreamsTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Abandoned Load Balancers',
        cardLocator: recommendationsPage.abandonedLoadBalancersCardSavingsValue,
        seeAllBtn: recommendationsPage.abandonedLoadBalancersSeeAllBtn,
        tableLocator: recommendationsPage.abandonedLoadBalancersTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn5
    },
    {
        name: 'Instances Eligible for Generation Upgrade',
        cardLocator: recommendationsPage.instancesEligibleForGenerationUpgradeCardSavingsValue,
        seeAllBtn: recommendationsPage.instancesEligibleForGenerationUpgradeSeeAllBtn,
        tableLocator: recommendationsPage.instancesEligibleForGenerationUpgradeTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Instances for Shutdown',
        cardLocator: recommendationsPage.instancesForShutdownCardSavingsValue,
        seeAllBtn: recommendationsPage.instancesForShutdownSeeAllBtn,
        tableLocator: recommendationsPage.instancesForShutdownTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn5
    },
    {
        name: 'Instances with Migration Opportunities',
        cardLocator: recommendationsPage.instancesWithMigrationOpportunitiesCardSavingsValue,
        seeAllBtn: recommendationsPage.instancesWithMigrationOpportunitiesSeeAllBtn,
        tableLocator: recommendationsPage.instancesWithMigrationOpportunitiesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Instances with Spot Preemptible Opportunities',
        cardLocator: recommendationsPage.instancesWithSpotPreemptibleOpportunitiesCardSavingsValue,
        seeAllBtn: recommendationsPage.instancesWithSpotPreemptibleOpportunitiesSeeAllBtn,
        tableLocator: recommendationsPage.instancesWithSpotPreemptibleOpportunitiesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn5
    },
    {
        name: 'Instances with Subscription Opportunities',
        cardLocator: recommendationsPage.instancesWithSubscriptionOpportunitiesCardSavingsValue,
        seeAllBtn: recommendationsPage.instancesWithSubscriptionOpportunitiesSeeAllBtn,
        tableLocator: recommendationsPage.instancesWithSubscriptionOpportunitiesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Not Attached Volumes',
        cardLocator: recommendationsPage.notAttachedVolumesCardSavingsValue,
        seeAllBtn: recommendationsPage.notAttachedVolumesSeeAllBtn,
        tableLocator: recommendationsPage.notAttachedVolumesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Not Deallocated Instances',
        cardLocator: recommendationsPage.notDeallocatedInstancesCardSavingsValue,
        seeAllBtn: recommendationsPage.notDeallocatedInstancesSeeAllBtn,
        tableLocator: recommendationsPage.notDeallocatedInstancesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Obsolete Images',
        cardLocator: recommendationsPage.obsoleteImagesCardSavingsValue,
        seeAllBtn: recommendationsPage.obsoleteImagesSeeAllBtn,
        tableLocator: recommendationsPage.obsoleteImagesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Obsolete IPs',
        cardLocator: recommendationsPage.obsoleteIPsCardSavingsValue,
        seeAllBtn: recommendationsPage.obsoleteIPsSeeAllBtn,
        tableLocator: recommendationsPage.obsoleteIPsTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Obsolete Snapshot Chains',
        cardLocator: recommendationsPage.obsoleteSnapshotChainsCardSavingsValue,
        seeAllBtn: recommendationsPage.obsoleteSnapshotChainsSeeAllBtn,
        tableLocator: recommendationsPage.obsoleteSnapshotChainsTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Obsolete Snapshots',
        cardLocator: recommendationsPage.obsoleteSnapshotsCardSavingsValue,
        seeAllBtn: recommendationsPage.obsoleteSnapshotsSeeAllBtn,
        tableLocator: recommendationsPage.obsoleteSnapshotsTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    },
    {
        name: 'Reserved Instances Opportunities',
        cardLocator: recommendationsPage.reservedInstancesOpportunitiesCardSavingsValue,
        seeAllBtn: recommendationsPage.reservedInstancesOpportunitiesSeeAllBtn,
        tableLocator: recommendationsPage.reservedInstancesOpportunitiesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn5
    },
    {
        name: 'Under Utilized Instances',
        cardLocator: recommendationsPage.underutilizedInstancesCardSavingsValue,
        seeAllBtn: recommendationsPage.underutilizedInstancesSeeAllBtn,
        tableLocator: recommendationsPage.underutilizedInstancesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn7
    },
    {
        name: 'Under Utilized RDS Instances',
        cardLocator: recommendationsPage.underutilizedRDSInstancesCardSavingsValue,
        seeAllBtn: recommendationsPage.underutilizedRDSInstancesSeeAllBtn,
        tableLocator: recommendationsPage.underutilizedRDSInstancesTableSavingsValue,
        modalColumnLocator: recommendationsPage.modalColumn6
    }
];
