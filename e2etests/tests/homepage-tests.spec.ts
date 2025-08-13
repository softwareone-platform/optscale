import {test} from "../fixtures/page-fixture";
import {restoreUserSessionInLocalForage} from "../utils/auth-storage/localforage-service";
import {expect} from "@playwright/test";
import {expectWithinDrift} from "../utils/custom-assertions";

test.describe("[MPT-11464] Home Page Recommendations block tests", {tag: ["@ui", "@recommendations", "@homepage"]}, () => {
    test.beforeEach(async ({homePage, page}) => {
        await test.step('Login as FinOps user', async () => {
            await restoreUserSessionInLocalForage(page);
            await homePage.navigateToURL();
            await homePage.waitForLoadingPageImgToDisappear();
            await homePage.waitForPageLoaderToDisappear();
            await homePage.waitForAllCanvases();
        });
    });

    test('[230550] Compare possible savings on home page with those on recommendations page', async ({
                                                                                                         homePage,
                                                                                                         recommendationsPage
                                                                                                     }) => {
        const homePageValue = await homePage.getRecommendationsPossibleSavingsValue();
        await homePage.recommendationsBtn.click();
        const recommendationsPageValue = await recommendationsPage.getPossibleMonthlySavingsValue();
        expect(homePageValue).toBe(recommendationsPageValue);
    });

    test('[230551] Verify Cost items displayed in the recommendations block match the sum total of items displayed on cards with savings', async ({
                                                                                                                                                      homePage,
                                                                                                                                                      recommendationsPage
                                                                                                                                                  }) => {
        const homePageValue = await homePage.getRecommendationsCostValue();
        await homePage.recommendationsCostLink.click();
        expect(await recommendationsPage.selectedComboBoxOption(recommendationsPage.categoriesSelect)).toEqual('Savings');
        expect(await recommendationsPage.getTotalSumOfItemsFromSeeItemsButtons()).toBe(homePageValue);
    });

    test('[230552] Verify Security items displayed in the recommendations block match the sum total of items displayed on cards in the security category', async ({
                                                                                                                                                                      homePage,
                                                                                                                                                                      recommendationsPage
                                                                                                                                                                  }) => {
        const homePageValue = await homePage.getRecommendationsSecurityValue();
        await homePage.recommendationsSecurityLink.click();
        expect(await recommendationsPage.selectedComboBoxOption(recommendationsPage.categoriesSelect)).toEqual('Security');
        expect(await recommendationsPage.getTotalSumOfItemsFromSeeItemsButtons()).toBe(homePageValue);
    });

    // Test failing due to bug MPT-11558 The home page recommendations block not returning the real Critical item count
    test('[230553] Verify Critical items displayed in the recommendations block match the sum total of items displayed on cards with the critical status', async ({
                                                                                                                                                                      homePage,
                                                                                                                                                                      recommendationsPage
                                                                                                                                                                  }) => {
        const homePageValue = await homePage.getRecommendationsCriticalValue();
        await homePage.recommendationsCriticalLink.click();
        expect(await recommendationsPage.selectedComboBoxOption(recommendationsPage.categoriesSelect)).toEqual('Critical');
        expect(await recommendationsPage.getTotalSumOfItemsFromSeeItemsButtons()).toBe(homePageValue);
    });
})

test.describe('[MPT-11958] Home Page Resource block tests', {tag: ["@ui", "@resources", "@homepage"]}, () => {

    test.beforeEach(async ({homePage, page}) => {
        await test.step('Login as FinOps user', async () => {
            await restoreUserSessionInLocalForage(page);
            await homePage.navigateToURL();
            await homePage.waitForLoadingPageImgToDisappear();
            await homePage.waitForPageLoaderToDisappear();
            await homePage.waitForAllCanvases();
        });
    });

    test('[230838] Verify Top Resource block Resource link works correctly', async ({homePage, resourcesPage}) => {
        await test.step('Click on Top Resources button', async () => {
            await homePage.clickTopResourcesBtn();
            await expect(resourcesPage.heading).toBeVisible();
        });
    })

    test('[230839] Verify top Resource link navigates to the correct resource details page and last 30 days value match', async ({
                                                                                                                                     homePage,
                                                                                                                                     resourceDetailsPage,
                                                                                                                                     datePicker
                                                                                                                                 }) => {
        let homepageResourceTitle: string;
        let homePageExpenseValue: number;
        await test.step("Get first resource's homepage values", async () => {
            await homePage.topResourcesAllLinks.last().waitFor();
            homepageResourceTitle = await homePage.getFirstResourceTitle();
            homePageExpenseValue = await homePage.getFirstResourceValue();
            expect.soft(homepageResourceTitle).not.toBeNull();
            expect.soft(homepageResourceTitle).not.toBe('');
        });

        await test.step('Click on the first resource link and verify navigation', async () => {
            await homePage.clickFirstTopResourceLink();
            await expect(resourceDetailsPage.heading).toContainText(homepageResourceTitle);
        });

        await test.step('Click expenses tab and set date range to last 30 days', async () => {
            await resourceDetailsPage.clickExpensesTab();
            await datePicker.selectLast30DaysDateRange();
        });

        await test.step('Verify that the expenses column total matches the home page last 30 days expenses value', async () => {
            const expenseTotal = await resourceDetailsPage.sumCurrencyColumn(resourceDetailsPage.tableColumn2, resourceDetailsPage.navigateNextIcon);
            expectWithinDrift(homePageExpenseValue, expenseTotal, 0.0001) //0.01% drift is acceptable for the test
        });
    });

    test('[230842] Verify Top Resource Block displayed correctly', async ({homePage, resourcesPage}) => {

        await test.step('Verify that the Top Resources section is displayed with 6 or fewer resources and include names for each', async () => {
            const count = await homePage.topResourcesAllLinks.count();
            expect(count).toBeLessThanOrEqual(6);

            for (let i = 0; i < count; i++) {
                const resourceName = (await homePage.topResourcesAllLinks.nth(i).textContent()).replace(/\.{3}\//g, '').trim();
                expect.soft(resourceName).not.toBeNull();
                expect.soft(resourceName).not.toBe('');
            }
        });
    })
})