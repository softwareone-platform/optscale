import { test } from "../fixtures/page-fixture";
import { expect } from "@playwright/test";
import { restoreUserSessionInLocalForage } from "../utils/localforge-auth/localforage-service";
import { EStorageState } from "../utils/enums";
import { getCardData, CardData } from "../test-data/recommendation-card-metadata";

if (process.env.USE_LIVE_DEMO === 'true') {
    test.use({ storageState: EStorageState.liveDemoUser });
}

test.describe.only("Recommendations card savings verification (per card)", () => {
    const cardEntries = [
        'Abandoned Amazon S3 Buckets',
        'Abandoned Images',
        'Abandoned Instances',
        'Abandoned Kinesis Streams',
        'Abandoned Load Balancers',
        'Instances Eligible for Generation Upgrade',
        'Instances for Shutdown',
        'Instances with Migration Opportunities',
        'Instances with Spot Preemptible Opportunities',
        'Instances with Subscription Opportunities',
        'Not Attached Volumes',
        'Not Deallocated Instances',
        'Obsolete Images',
        'Obsolete IPs',
        'Obsolete Snapshot Chains',
        'Obsolete Snapshots',
        'Reserved Instances Opportunities',
        'Under Utilized Instances',
        'Under Utilized RDS Instances'
    ];

    for (const cardName of cardEntries) {
        test(`${cardName}: Card, table, and modal savings should match`, async ({ page, loginPage, recommendationsPage }) => {
            const isLiveDemo = process.env.USE_LIVE_DEMO === 'true';

            await test.step('Login and navigate to Recommendations page', async () => {
                if (!isLiveDemo) {
                    await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
                } else {
                    await restoreUserSessionInLocalForage(page);
                }
                await recommendationsPage.navigateToURL();
            });

            // Find this card’s full metadata at runtime
            const allCardData = getCardData(recommendationsPage);
            const card = allCardData.find(c => c.name === cardName);
            if (!card) throw new Error(`Card data not found for: ${cardName}`);

            const { cardLocator, seeAllBtn, tableLocator, modalColumnLocator } = card;

            const cardSavings = await recommendationsPage.getSavingsValue(cardLocator);
            console.log(`${cardName} Card Savings: ${cardSavings}`);

            if (cardSavings === 0) {
                await test.step('Card savings is 0, check table and see-all button', async () => {
                    await expect(seeAllBtn).not.toBeVisible();
                    await recommendationsPage.clickTableButton();
                    expect(await recommendationsPage.getSavingsValue(tableLocator)).toBe(0);
                });
            } else {
                await recommendationsPage.skipTestIfMoreThan100Items(seeAllBtn);

                const itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(seeAllBtn, modalColumnLocator);

                await test.step('Compare modal and card savings', async () => {
                    expect(itemisedSavings).toBeCloseTo(cardSavings, 0);
                });

                await test.step('Compare modal and table savings', async () => {
                    await recommendationsPage.clickTableButton();
                    const tableSavings = await recommendationsPage.getSavingsValue(tableLocator);
                    expect(tableSavings).toBeCloseTo(itemisedSavings, 0);
                });
            }
        });
    }
});
