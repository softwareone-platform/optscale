import {test} from "../../fixtures/page-fixture";
import {expect} from "@playwright/test";

test.describe.only("Recommendations page tests", () => {
    test.beforeEach(async ({loginPage, recommendationsPage}) => {
        await test.step('Login as FinOps user', async () => {
            const email = process.env.DEFAULT_USER_EMAIL;
            const password = process.env.DEFAULT_USER_PASSWORD;
            await loginPage.login(email, password);
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

    test("Verify Underutilized instances card savings total matches the sum of itemised items", async ({recommendationsPage}) => {
        const cardSavings = await recommendationsPage.getUnderutilizedInstancesCardSavingsValue();
        console.log(`Card Savings: ${cardSavings}`);

        await recommendationsPage.underutilizedInstancesSeeAllBtn.click();
        await recommendationsPage.recommendationsModal.waitFor();
        await recommendationsPage.modalColumn7.last().waitFor();
        const itemisedSavings = await recommendationsPage.sumCurrencyColumn(recommendationsPage.modalColumn7);
        console.log(`Itemised Savings: ${itemisedSavings}`);

        expect(itemisedSavings).toBeCloseTo(cardSavings, 0);
    })



});