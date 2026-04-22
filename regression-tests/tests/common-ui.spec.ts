import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";

test.describe('FFC: Common UI', () => {

  test.use({ restoreSession: true, setFixedTime: true });

  test("Header and Main Menu matches screenshots", async ({ homePage, header, mainMenu }) => {
    await test.step('Set up test data', async () => {
      await homePage.navigateToURL();
      await homePage.waitForAllCanvases();
    });

    await test.step('Header widget', async () => {
      await roundElementDimensions(header.header);
      await expect(header.header).toHaveScreenshot('CommonUI-Header.png');
    });

    await test.step('Main Menu widget', async () => {
      await roundElementDimensions(mainMenu.menu);
      await expect(mainMenu.menu).toHaveScreenshot('CommonUI-MainMenu.png');
    });
  })
})
