import { test } from '@/fixtures/page.fixture';
import { captureScreenshot } from '@/utils/screenshots';

test('FFC: Common UI', async ({ homePage, header, mainMenu }) => {
  await homePage.navigateToURL();
  await homePage.waitForAllCanvases();

  await test.step('Header widget', async () => {
    await captureScreenshot(header.header, 'CommonUI-Header.png', { skipHover: true });
  });

  await test.step('Main menu widget', async () => {
    await captureScreenshot(mainMenu.menu, 'CommonUI-MainMenu.png', { skipHover: true });
  });
});
