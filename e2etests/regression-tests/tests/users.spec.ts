import {test} from "../../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";

test.use({restoreSession: true});

test.describe('FFC: Users @swo_regression', () => {
 test('Users page matches screenshots', async ({usersPage, usersInvitePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await usersPage.setupApiInterceptions();
    });

    await test.step('Navigate to Users page', async () => {
      await usersPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await usersPage.heading.hover();
      await usersPage.screenshotUpdateDelay();
      await roundElementDimensions(usersPage.main);
      await expect(usersPage.main).toHaveScreenshot('Users-screenshot.png');
    });

    await test.step('Invite user page', async () => {
      await usersPage.clickInviteBtn();
      await usersPage.screenshotUpdateDelay();
      await roundElementDimensions(usersInvitePage.main);
      await expect(usersInvitePage.main).toHaveScreenshot('Users-invite-screenshot.png');
    });
  })
})
