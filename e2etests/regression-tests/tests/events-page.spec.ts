import {test} from "../../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {restoreUserSessionInLocalForage} from "../../utils/auth-session-storage/localforage-service";
import {roundElementDimensions} from "../utils/roundElementDimensions";

test.use({restoreSession: true});

test.describe('FFC: Events @swo_regression', () => {

  test('Events page matches screenshots', async ({eventsPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await eventsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Events page', async () => {
      await eventsPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await eventsPage.heading.hover();
      await eventsPage.screenshotUpdateDelay();
      await roundElementDimensions(eventsPage.main);
      await expect(eventsPage.main).toHaveScreenshot('Events-screenshot.png');
    });
  })
})
