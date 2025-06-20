import { test } from "../fixtures/page-fixture";
import { expect } from "@playwright/test";
import { restoreUserSessionInLocalForage } from "../utils/localforge-auth/localforage-service";
import { EStorageState } from "../utils/enums";
import type { RecommendationsPage } from "../pages/recommendations-page";

// List only the names and keys for deferred locator resolution
const cardsToTest = [
    { name: 'Abandoned Amazon S3 Buckets', key: 'abandonedAmazonS3Buckets', modalCol: 'modalColumn8' },
    { name: 'Abandoned Images', key: 'abandonedImages', modalCol: 'modalColumn5' },
    { name: 'Abandoned Instances', key: 'abandonedInstances', modalCol: 'modalColumn5' },
    { name: 'Abandoned Kinesis Streams', key: 'abandonedKinesisStreams', modalCol: 'modalColumn6' },
    { name: 'Abandoned Load Balancers', key: 'abandonedLoadBalancers', modalCol: 'modalColumn5' },
    { name: 'Instances Eligible for Generation Upgrade', key: 'instancesEligibleForGenerationUpgrade', modalCol: 'modalColumn6' },
    { name: 'Instances for Shutdown', key: 'instancesForShutdown', modalCol: 'modalColumn5' },
    { name: 'Instances with Migration Opportunities', key: 'instancesWithMigrationOpportunities', modalCol: 'modalColumn6' },
    { name: 'Instances with Spot Preemptible Opportunities', key: 'instancesWithSpotPreemptibleOpportunities', modalCol: 'modalColumn5' },
    { name: 'Instances with Subscription Opportunities', key: 'instancesWithSubscriptionOpportunities', modalCol: 'modalColumn6' },
    { name: 'Not Attached Volumes', key: 'notAttachedVolumes', modalCol: 'modalColumn6' },
    { name: 'Not Deallocated Instances', key: 'notDeallocatedInstances', modalCol: 'modalColumn6' },
    { name: 'Obsolete Images', key: 'obsoleteImages', modalCol: 'modalColumn6' },
    { name: 'Obsolete IPs', key: 'obsoleteIPs', modalCol: 'modalColumn6' },
    { name: 'Obsolete Snapshot Chains', key: 'obsoleteSnapshotChains', modalCol: 'modalColumn6' },
    { name: 'Obsolete Snapshots', key: 'obsoleteSnapshots', modalCol: 'modalColumn6' },
    { name: 'Reserved Instances Opportunities', key: 'reservedInstancesOpportunities', modalCol: 'modalColumn5' },
    { name: 'Under Utilized Instances', key: 'underutilizedInstances', modalCol: 'modalColumn7' },
    { name: 'Under Utilized RDS Instances', key: 'underutilzedRDSInstances', modalCol: 'modalColumn6' }
];

// Helper to resolve locators dynamically
const resolveLocators = (page: RecommendationsPage, key: string, modalCol: string) => ({
    cardLocator: page[`${key}CardSavingsValue`],
    seeAllBtn: page[`${key}SeeAllBtn`],
    tableLocator: page[`${key}TableSavingsValue`],
    modalColumnLocator: page[modalCol],
});

if (process.env.USE_LIVE_DEMO === 'true') {
    test.use({ storageState: EStorageState.liveDemoUser });
}

test.describe.only("Recommendations card savings verification (per card)", () => {
    for (const { name, key, modalCol } of cardsToTest) {
        test(`${name}: Card, table, and modal savings should match`, async ({ page, loginPage, recommendationsPage }) => {
            const isLiveDemo = process.env.USE_LIVE_DEMO === 'true';

            await test.step('Login and navigate to Recommendations page', async () => {
                if (!isLiveDemo) {
                    await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
                } else {
                    await restoreUserSessionInLocalForage(page);
                }
                await recommendationsPage.navigateToURL();
            });

            const { cardLocator, seeAllBtn, tableLocator, modalColumnLocator } = resolveLocators(recommendationsPage, key, modalCol);

            let cardSavings = await recommendationsPage.getSavingsValue(cardLocator);
            console.log(`${name} Card Savings: ${cardSavings}`);

            if (cardSavings === 0) {
                await test.step('If card savings is 0, assert see-all button is hidden and table value is 0', async () => {
                    await expect(seeAllBtn).not.toBeVisible();
                    await recommendationsPage.clickTableButton();
                    expect(await recommendationsPage.getSavingsValue(tableLocator)).toBe(0);
                });
            } else {
                await test.step('Optionally skip test if too many modal items', async () => {
                    await recommendationsPage.skipTestIfMoreThan100Items(seeAllBtn);
                });

                const itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(seeAllBtn, modalColumnLocator);

                await test.step('Compare itemised modal savings with card savings', async () => {
                    expect(itemisedSavings).toBeCloseTo(cardSavings, 0);
                });

                await test.step('Compare modal savings with table savings', async () => {
                    await recommendationsPage.clickTableButton();
                    const tableSavings = await recommendationsPage.getSavingsValue(tableLocator);
                    expect(tableSavings).toBeCloseTo(itemisedSavings, 0);
                });
            }
        });
    }
});
