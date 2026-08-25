import { test } from '@/fixtures/page.fixture';
import { expect } from '@playwright/test';
import { usersInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

const FORM_READY_TIMEOUT = 10_000;

test.describe('Users', () => {
  test.use({ interceptAPI: { entries: usersInterceptions } });

  test('list and invite', async ({ usersPage, usersInvitePage }) => {
    await usersPage.navigateToURL();

    await test.step('List page', async () => {
      await captureScreenshot(usersPage.header, 'Users-Header.png', { skipHover: true });
      await captureScreenshot(usersPage.pageContentWrapper, 'Users-Container.png', {
        hoverAnchor: usersPage.heading,
      });
    });

    await test.step('Invite page', async () => {
      await usersPage.inviteBtn.click();
      await expect(usersInvitePage.form).toBeAttached({ timeout: FORM_READY_TIMEOUT });
      await expect(usersInvitePage.form.locator('.MuiCircularProgress-root')).toHaveCount(0, { timeout: FORM_READY_TIMEOUT });
      await captureScreenshot(usersInvitePage.header, 'UsersInvite-Header.png', { skipHover: true });
      await captureScreenshot(usersInvitePage.pageContentWrapper, 'UsersInvite-Container.png');
    });
  });
});
