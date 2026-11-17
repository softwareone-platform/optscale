import { test } from '@/fixtures/page.fixture';
import { settingsInterceptions, settingsSnackbarInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe('Settings', () => {
  test.use({ interceptAPI: { entries: settingsInterceptions } });

  test('tabs', async ({ settingsPage }) => {
    await settingsPage.navigateToURL();
    await settingsPage.page.evaluate(() => {
      document.body.classList.add('e2e-hide-snackbar');
    });

    await test.step('Header', async () => {
      await captureScreenshot(settingsPage.header, 'Settings-Header.png', { skipHover: true });
    });

    const tabs: Array<{ label: string; open?: () => Promise<void>; snapshot: string }> = [
      { label: 'Organizations tab', snapshot: 'Settings-Container--Organization.png' },
      { label: 'Invitations tab', open: () => settingsPage.invitationsTab.click(), snapshot: 'Settings-Container--Invitations.png' },
      {
        label: 'Email Notifications tab',
        open: async () => {
          await settingsPage.emailNotificationsTab.click();
          await settingsPage.emailNotificationSection.first().click();
        },
        snapshot: 'Settings-Container--EmailNotifications.png',
      },
    ];

    for (const { label, open, snapshot } of tabs) {
      await test.step(label, async () => {
        if (open) await open();
        await captureScreenshot(settingsPage.pageContentWrapper, snapshot, {
          hoverAnchor: settingsPage.heading,
          fitViewport: true,
        });
      });
    }
  });
});

test.describe('Settings', () => {
  test.use({ interceptAPI: { entries: settingsSnackbarInterceptions } });

  test('snackbar — pending invitation', async ({ settingsPage }) => {
    await settingsPage.navigateToURL();
    await settingsPage.topRightSnackbar.waitFor({ state: 'visible' });
    await captureScreenshot(settingsPage.topRightSnackbar, 'Settings-Snackbar--PendingInvitation.png');
  });
});
