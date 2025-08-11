import {test} from "../fixtures/page-fixture";
import {restoreUserSessionInLocalForage} from "../utils/auth-storage/localforage-service";
import {expect} from "@playwright/test";

test.describe("[MPT-11464] Home Page Recommendations block tests", {tag: ["@ui", "@recommendations", "@homepage"]}, () => {
  test.beforeEach(async ({homePage, page}) => {
    await test.step('Login as FinOps user', async () => {
      await restoreUserSessionInLocalForage(page);
      await homePage.navigateToURL();
      await homePage.waitForPageLoaderToDisappear();
      await homePage.waitForCanvas();
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
