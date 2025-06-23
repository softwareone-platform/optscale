import {test} from "../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {restoreUserSessionInLocalForage} from "../utils/localforge-auth/localforage-service";
import {EStorageState} from "../utils/enums";
import {getCardSavingsData} from "../test-data/recommendation-card-metadata";

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

    test("Verify all expected cards are present", async ({ recommendationsPage }) => {
        const expectedCardHeadings = [
            "Abandoned Amazon S3 buckets",
            "Abandoned images",
            "Abandoned instances",
            "Abandoned Kinesis Streams",
            "Abandoned Load Balancers",
            "IAM users with unused console access",
            "Inactive IAM users",
            "Instances eligible for generation upgrade",
            "Instances for shutdown",
            "Instances with insecure Security Groups settings",
            "Instances with migration opportunities",
            "Instances with Spot (Preemptible) opportunities",
            "Instances with Subscription opportunities",
            "Not attached Volumes",
            "Not deallocated Instances",
            "Obsolete images",
            "Obsolete IPs",
            "Obsolete snapshot chains",
            "Obsolete snapshots",
            "Public S3 buckets",
            "Reserved instances opportunities",
            "Underutilized instances",
            "Underutilized RDS Instances"
        ];

        await recommendationsPage.allCardHeadings.last().waitFor();

        const count = await recommendationsPage.allCardHeadings.count();
        console.log("Number of <h3> headings found:", count);

        const actualHeadings = await recommendationsPage.allCardHeadings.allTextContents();
        console.log("Actual heading texts:", actualHeadings);

        const expectedSorted = [...expectedCardHeadings].sort();
        const actualSorted = actualHeadings.map(t => t.trim()).sort();

        expect(actualSorted).toEqual(expectedSorted);
    });

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
        test(`${cardName}: Cards displaying possible savings, should match itemised modal total and table total`, async ({ page, loginPage, recommendationsPage }) => {

            // Find this card’s full metadata at runtime
            const allCardData = getCardSavingsData(recommendationsPage);
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

                await test.step('Compare modal itemised total and card savings', async () => {
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
})
