import { test } from '@/fixtures/page.fixture';
import { settingsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe(() => {
  test.use({ interceptAPI: { entries: settingsInterceptions } });

  test('FFC: Settings', async ({ settingsPage }) => {
    await settingsPage.navigateToURL();
    await settingsPage.page.evaluate(() => {
      document.body.classList.add('e2e-hide-snackbar');
    });

    const tabs: Array<{ label: string; open?: () => Promise<void>; snapshot: string }> = [
      { label: 'Organizations tab', snapshot: 'Settings-Container--Organization.png' },
      { label: 'Invitations tab', open: () => settingsPage.invitationsTab.click(), snapshot: 'Settings-Container--Invitation.png' },
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
        await captureScreenshot(settingsPage.main, snapshot, {
          hoverAnchor: settingsPage.heading,
          fitViewport: true,
        });
      });
    }
  });
});

test.describe(() => {
  test.use({ interceptAPI: { entries: settingsInterceptions } });

  test('FFC: Settings Snackbar — pending invitation', async ({ settingsPage }) => {
    await settingsPage.navigateToURL();
    await settingsPage.topRightSnackbar.waitFor({ state: 'visible' });
    await captureScreenshot(settingsPage.topRightSnackbar, 'Settings-Snackbar--PendingInvitation.png');
  });
});
