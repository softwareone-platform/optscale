import {test} from "../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {restoreUserSessionInLocalForage} from "../utils/localforge-auth/localforage-service";
import {EStorageState} from "../utils/enums";

test.describe("Recommendations page tests", () => {
    if (process.env.USE_LIVE_DEMO === 'true') {
        test.use({storageState: EStorageState.liveDemoUser});
    }

    test.beforeEach(async ({loginPage, recommendationsPage, page}) => {
        await test.step('Login as FinOps user', async () => {
            if (process.env.USE_LIVE_DEMO !== 'true') {
                const email = process.env.DEFAULT_USER_EMAIL;
                const password = process.env.DEFAULT_USER_PASSWORD;
                await loginPage.login(email, password);
            } else {
                await restoreUserSessionInLocalForage(page);
            }
            await recommendationsPage.navigateToURL();
        });
    });

    test("Verify Card total savings match possible monthly savings", async ({recommendationsPage}) => {
        const possibleMonthlySavings = await recommendationsPage.getPossibleMonthlySavingsValue();
        const cardTotalSavings = await recommendationsPage.calculateTotalSavingsFromCards();

        console.log(`Possible Monthly Savings: ${possibleMonthlySavings}`);
        console.log(`Card Total Savings: ${cardTotalSavings}`);
        expect(cardTotalSavings).toBeCloseTo(possibleMonthlySavings, 0);
    });

    test("Verify Underutilized instances card and table savings totals match the sum of itemised items", async ({recommendationsPage}) => {
        const cardSavings = await recommendationsPage.getUnderutilizedInstancesCardSavingsValue();
        console.log(`Card Savings: ${cardSavings}`);
        if (cardSavings === 0) { await expect(recommendationsPage.underutilizedInstancesSeeAllBtn).not.toBeVisible();
            await recommendationsPage.tableBtn.click();
            expect(await recommendationsPage.getUnderUtilizedInstancesTableSavingsValue()).toBe(0);
        } else {
            const itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(recommendationsPage.underutilizedInstancesSeeAllBtn, recommendationsPage.modalColumn7);
            expect(itemisedSavings).toBeCloseTo(cardSavings, 0);

            await recommendationsPage.tableBtn.click();
            expect(await recommendationsPage.getUnderUtilizedInstancesTableSavingsValue()).toBe(itemisedSavings);
        }
    })

    test.only("Verify Abandoned instances card and table savings totals match the sum of itemised items", async ({recommendationsPage}) => {
        const cardSavings = await recommendationsPage.getAbandonedInstancesCardSavingsValue();
        console.log(`Card Savings: ${cardSavings}`);
        if (cardSavings === 0) { await expect(recommendationsPage.abandonedInstancesSeeAllBtn).not.toBeVisible();
        } else {
            const itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(recommendationsPage.abandonedInstancesSeeAllBtn, recommendationsPage.modalColumn5);
            expect(itemisedSavings).toBeCloseTo(cardSavings, 0);

            await recommendationsPage.tableBtn.click();
            expect(await recommendationsPage.getAbandonedInstancesTableSavingsValue()).toBeCloseTo(itemisedSavings, 0);
        }
    })
});