import {test} from "../fixtures/fixture";
import {expect} from "@playwright/test";

test.describe.only('Cloud Spend Rebase Tests', () => {
    test.beforeAll(() =>{
      expect(process.env.BASE_URL).toBe('https://cloudspend.velasuci.com/');
    })

    test.beforeEach('Login to live-demo', async ({loginPage, homePage}) => {
        await loginPage.loginToLiveDemo(process.env.DEFAULT_USER_EMAIL);
        await homePage.liveDemoAlert.isVisible();
        await loginPage.page.waitForLoadState('networkidle');
    })

    test('Verify Homepages matches screenshots', async ({header, mainMenu, homePage}) => {
        await test.step('Verify header', async () => {
             await expect(header.header).toHaveScreenshot('Header-screenshot.png', {timeout: 5000});
        });

        await test.step('Verify Main Menu', async () => {
            await expect(mainMenu.menu).toHaveScreenshot('MainMenu-screenshot.png', {timeout: 5000});
        });

        await test.step('Verify Home Page content', async () => {
           await expect(homePage.organizationExpensesBlock).toHaveScreenshot('OrganizationExpensesBlock-screenshot.png', {timeout: 5000});
           await expect(homePage.topResourcesBlock).toHaveScreenshot('TopResourcesBlock-screenshot.png', {timeout: 5000});
           await expect(homePage.recommendationsBlock).toHaveScreenshot('RecommendationsBlock-screenshot.png', {timeout: 5000});

           // Although the data is fixed the display values for "Last check" values are dynamic so we can't match the screenshot 100%
           await expect(homePage.policyViolationsBlock).toHaveScreenshot('PolicyViolationsBlock-screenshot.png', {maxDiffPixelRatio: 0.2});
           await expect(homePage.poolsRequiringAttentionBlock).toHaveScreenshot('PoolsRequiringAttentionBlock-screenshot.png', {timeout: 5000});
        });
    })

    test('Verify Recommendations page matches screenshots', async ({mainMenu, recommendationsPage}) => {
        await test.step('Navigate to Recommendations page', async () => {
            await mainMenu.clickRecommendations();
        });

        await test.step('Verify Recommendations page content - cards', async () => {
            await recommendationsPage.clickCardsButtonIfNotActive();
            //Dynamic values check time data are not fixed so we can't match the screenshot 100%
            await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-cards-screenshot.png', {maxDiffPixelRatio: 0.1});
            await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-cards-savings-screenshot.png');
            await expect(recommendationsPage.firstCard).toHaveScreenshot('Recommendations-cards-first-card-screenshot.png');
        });

        await test.step('Verify Recommendations page content - table', async () => {
            await recommendationsPage.clickTableButton();
            //Dynamic values check time data are not fixed so we can't match the screenshot 100%
            await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-table-selected-screenshot.png', {maxDiffPixelRatio: 0.1});
            await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-cards-savings-screenshot.png');
            await expect(recommendationsPage.table).toHaveScreenshot('Recommendations-table--screenshot.png');
        });
    })


})