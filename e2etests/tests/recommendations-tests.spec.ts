import {test} from "../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {restoreUserSessionInLocalForage} from "../utils/localforge-auth/localforage-service";
import {EStorageState} from "../utils/enums";

test.describe.only("Recommendations page tests", () => {
    if (process.env.USE_LIVE_DEMO === 'true') {
        test.use({storageState: EStorageState.liveDemoUser});
    }

    test.beforeEach(async ({loginPage, recommendationsPage, page}) => {
        await test.step('Login as FinOps user', async () => {
            const isLiveDemo = process.env.USE_LIVE_DEMO === 'true';
            if (!isLiveDemo) {
                await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
            } else {
                await restoreUserSessionInLocalForage(page);
            }
            await recommendationsPage.navigateToURL();
        });
    });

    test("Verify Card total savings match possible monthly savings", async ({recommendationsPage}) => {
        let possibleMonthlySavings: number;
        let cardTotalSavings: number;

        await test.step('Get possible monthly savings', async () => {
            possibleMonthlySavings = await recommendationsPage.getPossibleMonthlySavingsValue();
        })

        await test.step('Get card total savings', async () => {
            cardTotalSavings = await recommendationsPage.calculateTotalSavingsFromCards();
        });

        await test.step('Compare card total savings with possible monthly savings', async () => {
            console.log('Possible Monthly Savings:', possibleMonthlySavings);
            console.log('Card Total Savings:', cardTotalSavings);
            expect(cardTotalSavings).toBeCloseTo(possibleMonthlySavings, 0);
        });
    });

    // Interim solution to handle the where no duplicate checks have been run in this test is scenario encountered.
    // TODO - add a separate test with mocked data to test the scenario where no duplicate checks have been run.
    test("Verify S3 Duplicate Possible monthly savings matches that on S3 Duplicate Finder page", async ({
                                                                                                             recommendationsPage,
                                                                                                             s3DuplicateFinder
                                                                                                         }) => {
        let captionText: string;
        await test.step('Determine whether duplicate check run is completed', async () => {
            captionText = await recommendationsPage.s3DuplicatesCaption.textContent();
        });

        if (captionText === 'No successfully completed checks') {
            await test.step('Verify behaviour is correct if no completed duplicate checks', async () => {
                console.log('No successfully completed checks found.');

                await test.step('Verify S3 Duplicate Finder table shows no duplicate checks message', async () => {
                    await recommendationsPage.clickS3DuplicatesCard();
                    expect(await s3DuplicateFinder.tableFirstRow.textContent())
                        .toBe('No duplicate checks, create a new one using the "Run check" button.');
                });
            });
            return;
        }
        await test.step('Compare S3 Duplicates possible savings matches total of savings on s3 Duplicate finder table', async () => {
            const possibleMonthlySavings = await recommendationsPage.getS3DuplicateFinderPossibleMonthlySavingsValue();
            await recommendationsPage.clickS3DuplicatesCard();
            const s3DuplicateFinderPageSavings = await s3DuplicateFinder.getSavingsFromTable();

            console.log(`Possible Monthly Savings: ${possibleMonthlySavings}`);
            console.log(`S3 Duplicate Finder Page Savings: ${s3DuplicateFinderPageSavings}`);
            expect(s3DuplicateFinderPageSavings).toBeCloseTo(possibleMonthlySavings, 0);
        });
    });

    test("Verify Underutilized instances card and table savings totals match the sum of itemised items", async ({recommendationsPage}) => {
        let cardSavings: number;
        let itemisedSavings: number;

        await test.step('Get Underutilized Instances card possible savings', async () => {
            cardSavings = await recommendationsPage.getUnderutilizedInstancesCardSavingsValue();
            console.log(`Card Savings: ${cardSavings}`);
        });
        if (cardSavings === 0) {
            await test.step('When card possible savings is "0" assert that the table also matches', async () => {
                await expect(recommendationsPage.underutilizedInstancesSeeAllBtn).not.toBeVisible();
                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getUnderUtilizedInstancesTableSavingsValue()).toBe(0);
            });
        } else {
            await test.step('Get item count and skip of greater than 100', async () => {
                await recommendationsPage.skipTestIfMoreThan100Items(recommendationsPage.underutilizedInstancesSeeAllBtn)
            });
            await test.step('Get itemised savings from modal', async () => {
                itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(recommendationsPage.underutilizedInstancesSeeAllBtn, recommendationsPage.modalColumn7);
            });
            await test.step('Compare itemised savings with card possible savings and table', async () => {
                expect(itemisedSavings).toBeCloseTo(cardSavings, 0);

                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getUnderUtilizedInstancesTableSavingsValue()).toBe(itemisedSavings);
            });
        }
    })

    test("Verify Abandoned instances card and table savings totals match the sum of itemised items", async ({recommendationsPage}) => {
        let cardSavings: number;
        let itemisedSavings: number;

        await test.step('Get Abandoned Instances card possible savings', async () => {
            cardSavings = await recommendationsPage.getAbandonedInstancesCardSavingsValue();
            console.log(`Card Savings: ${cardSavings}`);
        });
        if (cardSavings === 0) {
            await test.step('When card possible savings is "0" assert that the table also matches', async () => {
                await expect(recommendationsPage.abandonedInstancesSeeAllBtn).not.toBeVisible();
                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getAbandonedInstancesTableSavingsValue()).toBe(0);
            });
        } else {
            await test.step('Get item count and skip if greater than 100', async () => {
                await recommendationsPage.skipTestIfMoreThan100Items(recommendationsPage.abandonedInstancesSeeAllBtn);
            });
            await test.step('Get itemised savings from modal', async () => {
                itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(recommendationsPage.abandonedInstancesSeeAllBtn, recommendationsPage.modalColumn5);
            });
            await test.step('Compare itemised savings with card possible savings and table', async () => {
                expect(itemisedSavings).toBeCloseTo(cardSavings, 0);

                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getAbandonedInstancesTableSavingsValue()).toBeCloseTo(itemisedSavings, 0);
            });
        }
    });

    test("Verify Instances for Shutdown card and table savings totals match the sum of itemised items", async ({recommendationsPage}) => {
        let cardSavings: number;
        let itemisedSavings: number;

        await test.step('Get Instances for Shutdown card possible savings', async () => {
            cardSavings = await recommendationsPage.getInstancesForShutdownCardSavingsValue();
            console.log(`Card Savings: ${cardSavings}`);
        });
        if (cardSavings === 0) {
            await test.step('When card possible savings is "0" assert that the table also matches', async () => {
                await expect(recommendationsPage.instancesForShutdownSeeAllBtn).not.toBeVisible();
                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getInstancesForShutdownTableSavingsValue()).toBe(0);
            });
        } else {
            await test.step('Get item count and skip if greater than 100', async () => {
                await recommendationsPage.skipTestIfMoreThan100Items(recommendationsPage.instancesForShutdownSeeAllBtn);
            });
            await test.step('Get itemised savings from modal', async () => {
                itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(recommendationsPage.instancesForShutdownSeeAllBtn, recommendationsPage.modalColumn5);
            });
            await test.step('Compare itemised savings with card possible savings and table', async () => {
                expect(itemisedSavings).toBeCloseTo(cardSavings, 0);

                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getInstancesForShutdownTableSavingsValue()).toBeCloseTo(itemisedSavings, 0);
            });
        }
    });

    test("Verify Obsolete images card and table savings totals match the sum of itemised items", async ({recommendationsPage}) => {
        let cardSavings: number;
        let itemisedSavings: number;

        await test.step('Get Obsolete Images card possible savings', async () => {
            cardSavings = await recommendationsPage.getObsoleteImagesCardSavingsValue();
            console.log(`Card Savings: ${cardSavings}`);
        });
        if (cardSavings === 0) {
            await test.step('When card possible savings is "0" assert that the table also matches', async () => {
                await expect(recommendationsPage.obsoleteImagesSeeAllBtn).not.toBeVisible();
                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getObsoleteImagesTableSavingsValue()).toBe(0);
            });
        } else {
            await test.step('Get item count and skip if greater than 100', async () => {
                await recommendationsPage.skipTestIfMoreThan100Items(recommendationsPage.obsoleteImagesSeeAllBtn);
            });
            await test.step('Get itemised savings from modal', async () => {
                itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(recommendationsPage.obsoleteImagesSeeAllBtn, recommendationsPage.modalColumn7);
            });
            await test.step('Compare itemised savings with card possible savings and table', async () => {
                expect(itemisedSavings).toBeCloseTo(cardSavings, 0);

                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getObsoleteImagesTableSavingsValue()).toBeCloseTo(itemisedSavings, 0);
            });
        }
    });

    test("Verify Obsolete snapshots card and table savings totals match the sum of itemised items", async ({recommendationsPage}) => {
        let cardSavings: number;
        let itemisedSavings: number;

        await test.step('Get Obsolete Snapshots card possible savings', async () => {
            cardSavings = await recommendationsPage.getObsoleteSnapshotsCardSavingsValue();
            console.log(`Card Savings: ${cardSavings}`);
        });
        if (cardSavings === 0) {
            await test.step('When card possible savings is "0" assert that the table also matches', async () => {
                await expect(recommendationsPage.obsoleteSnapshotsSeeAllBtn).not.toBeVisible();
                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getObsoleteSnapshotsTableSavingsValue()).toBe(0);
            });
        } else {
            await test.step('Get item count and skip if greater than 100', async () => {
                await recommendationsPage.skipTestIfMoreThan100Items(recommendationsPage.obsoleteSnapshotsSeeAllBtn);
            });
            await test.step('Get itemised savings from modal', async () => {
                itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(recommendationsPage.obsoleteSnapshotsSeeAllBtn, recommendationsPage.modalColumn6);
            });
            await test.step('Compare itemised savings with card possible savings and table', async () => {
                expect(itemisedSavings).toBeCloseTo(cardSavings, 0);

                await recommendationsPage.clickTableButton();
                expect(await recommendationsPage.getObsoleteSnapshotsTableSavingsValue()).toBeCloseTo(itemisedSavings, 0);
            });
        }
    });
})
