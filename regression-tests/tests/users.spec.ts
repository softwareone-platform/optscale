import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { usersInterceptions } from "../mocks/users-interceptions.mocks";


test.describe('FFC: Users', () => {
  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: usersInterceptions, failOnInterceptionMissing: true } });

  test('Users page matches screenshots', async ({ usersPage, usersInvitePage }) => {
    await test.step('Navigate to Users page', async () => {
      await usersPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await usersPage.heading.hover();
      await roundElementDimensions(usersPage.main);
      await usersPage.fitViewportToFullPage();
      await expect(usersPage.main).toHaveScreenshot('Users-screenshot.png');
    });

    await test.step('Invite user page', async () => {
      await usersPage.clickInviteBtn();
      await roundElementDimensions(usersInvitePage.main);
      await expect(usersInvitePage.form).toBeAttached({ timeout: 10000 });
      await expect(usersInvitePage.form.locator('.MuiCircularProgress-root')).toHaveCount(0, { timeout: 10000 });
      await usersPage.fitViewportToFullPage();
      await expect(usersInvitePage.main).toHaveScreenshot('Users-invite-screenshot.png');
    });
  })
})
