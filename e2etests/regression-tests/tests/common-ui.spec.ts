import { test } from "../../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";

test.describe('FFC: Common UI @swo_regression', () => {

  test.use({ restoreSession: true, setFixedTime: true });

  test("Header and Main Menu matches screenshots", async ({ homePage, header, mainMenu }) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await homePage.navigateToURL();
      await homePage.waitForAllCanvases();
    });

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
