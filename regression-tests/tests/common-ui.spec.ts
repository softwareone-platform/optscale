import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { roundElementDimensions } from '../utils/roundElementDimensions';

test.use({ restoreSession: true, setFixedTime: true });

test('FFC: Common UI — header and main menu match screenshots', async ({ homePage, header, mainMenu }) => {
  await homePage.navigateToURL();
  await homePage.waitForAllCanvases();

  await test.step('Header widget', async () => {
    await roundElementDimensions(header.header);
    await expect(header.header).toHaveScreenshot('CommonUI-Header.png');
  });

  await test.step('Main menu widget', async () => {
    await roundElementDimensions(mainMenu.menu);
    await expect(mainMenu.menu).toHaveScreenshot('CommonUI-MainMenu.png');
  });
});
