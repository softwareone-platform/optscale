import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { usersInterceptions } from '../mocks/user.mocks';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { captureScreenshot, regressionOptions } from '../utils/test-helpers';

test.use(regressionOptions(usersInterceptions));

test('FFC: Users — list and invite pages match screenshots', async ({ usersPage, usersInvitePage }) => {
  await usersPage.navigateToURL();

  await test.step('Users list', async () => {
    await usersPage.fitViewportToFullPage();
    await captureScreenshot(usersPage.main, 'Users-List.png', usersPage.heading);
  });

  await test.step('Invite user page', async () => {
    await usersPage.clickInviteBtn();
    await expect(usersInvitePage.form).toBeAttached({ timeout: 10000 });
    await expect(usersInvitePage.form.locator('.MuiCircularProgress-root')).toHaveCount(0, { timeout: 10000 });
    await roundElementDimensions(usersInvitePage.main);
    await usersPage.fitViewportToFullPage();
    await expect(usersInvitePage.main).toHaveScreenshot('UsersInvite-Container.png');
  });
});
