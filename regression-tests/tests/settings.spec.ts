import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { settingsInterceptions } from '../mocks/settings.mock';
import { captureScreenshot, regressionOptions } from '../utils/test-helpers';
import { roundElementDimensions } from '../utils/roundElementDimensions';

test.describe('FFC: Settings page', () => {
  test.use(regressionOptions(settingsInterceptions));

  test.beforeEach(async ({ page }) => {
    // Hide the top-right MUI snackbar (e.g. "pending invitation" banner) so it
    // doesn't flicker into screenshots on this page.
    await page.addInitScript(() => {
      const style = document.createElement('style');
      style.textContent = `.MuiSnackbar-anchorOriginTopRight { display: none !important; }`;
      document.documentElement.appendChild(style);
    });
  });

  test('Tabs check', async ({ settingsPage }) => {
    await settingsPage.navigateToURL();

    const tabs: Array<{ label: string; open?: () => Promise<void>; snapshot: string }> = [
      { label: 'Organizations', snapshot: 'Settings-Container--Organization.png' },
      { label: 'Invitations',   open: () => settingsPage.invitationsTab.click(), snapshot: 'Settings-Container--Invitation.png' },
      { label: 'Email Notifications', open: async () => {
          await settingsPage.emailNotificationsTab.click();
          await settingsPage.emailNotificationSection.first().click();
        }, snapshot: 'Settings-Container--EmailNotifications.png' },
    ];

    for (const { label, open, snapshot } of tabs) {
      await test.step(`${label} tab`, async () => {
        if (open) await open();
        await settingsPage.fitViewportToFullPage();
        await captureScreenshot(settingsPage.main, snapshot, settingsPage.heading);
      });
    }
  });
});

test.describe('FFC: Settings page — Snackbar notification', () => {
  test.use(regressionOptions(settingsInterceptions));

  test('Pending invitation snackbar matches screenshot', async ({ settingsPage }) => {
    await settingsPage.navigateToURL();
    await settingsPage.topRightSnackbar.waitFor({ state: 'visible' });
    await roundElementDimensions(settingsPage.topRightSnackbar);
    await expect(settingsPage.topRightSnackbar).toHaveScreenshot('Settings-Snackbar--PendingInvitation.png');
  });
});
