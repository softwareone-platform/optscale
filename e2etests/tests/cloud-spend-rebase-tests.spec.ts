import {test} from "../fixtures/fixture";
import {expect} from "@playwright/test";

test.describe.only('Cloud Spend Rebase Tests', () => {
    test.beforeAll(() =>{
      expect(process.env.BASE_URL).toBe('https://cloudspend.velasuci.com/');
    })

    test.beforeEach('Login to live-demo', async ({loginPage, homePage}) => {
        await loginPage.loginToLiveDemo(process.env.DEFAULT_USER_EMAIL);
        await homePage.liveDemoAlert.isVisible();
    })

    test.only('Verify Homepages matches screenshots', async ({header, mainMenu, homePage}) => {

        await test.step('Verify header', async () => {
             await expect(header.header).toHaveScreenshot('Header-screenshot.png');
        });

        await test.step('Verify Main Menu', async () => {
            await expect(mainMenu.menu).toHaveScreenshot('MainMenu-screenshot.png');


        });
    })



})