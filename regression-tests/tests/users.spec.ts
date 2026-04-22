import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { usersInterceptions } from '../mocks';
import { captureScreenshot } from '../utils/screenshots';

test.use({ interceptAPI: { entries: usersInterceptions } });

test('FFC: Users', async ({ usersPage, usersInvitePage }) => {
  await usersPage.navigateToURL();

  await test.step('List page', async () => {
    await usersPage.fitViewportToFullPage();
    await captureScreenshot(usersPage.main, 'Users-Container.png', {
      hoverAnchor: usersPage.heading,
    });
  });

  await test.step('Invite page', async () => {
    await usersPage.clickInviteBtn();
    await expect(usersInvitePage.form).toBeAttached({ timeout: 10000 });
    await expect(usersInvitePage.form.locator('.MuiCircularProgress-root')).toHaveCount(0, { timeout: 10000 });
    await captureScreenshot(usersInvitePage.main, 'UsersInvite-Container.png', {
      fitViewport: usersPage,
    });
  });
});
