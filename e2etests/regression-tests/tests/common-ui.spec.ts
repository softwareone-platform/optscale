import {test} from "../../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";

test.use({restoreSession: true});
test.describe('FFC: Common UI @swo_regression', () => {

  test("UI consistency of Header and Main Menu", async ({homePage, header, mainMenu}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await homePage.setupApiInterceptions();
    await homePage.navigateToURL();
    await homePage.waitForAllCanvases();
    await test.step('Header widget', async () => {
      await homePage.screenshotUpdateDelay();
      await roundElementDimensions(header.header);
      await expect(header.header).toHaveScreenshot('Header-screenshot.png');
    });

    await test.step('Main Menu widget', async () => {
      await homePage.screenshotUpdateDelay();
      await roundElementDimensions(mainMenu.menu);
      await expect(mainMenu.menu).toHaveScreenshot('MainMenu-screenshot.png');
    });
  })
})
