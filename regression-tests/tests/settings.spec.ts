import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { settingsInterceptions } from '../mocks/settings.mock';


test.describe('FFC: Settings page', () => {
  test.use({
    restoreSession: true,
    setFixedTime: true,
    interceptAPI: { entries: settingsInterceptions },
  });

  test.beforeEach(async ({ page }) => {
    // Hide the top-right MUI snackbar (e.g. "pending invitation" banner)
    // so it doesn't flicker into screenshots on this page.
    await page.addInitScript(() => {
      const style = document.createElement('style');
      style.textContent = `.MuiSnackbar-anchorOriginTopRight { display: none !important; }`;
      document.documentElement.appendChild(style);
    });
  });

  test('Tabs check', async ({ settingsPage }) => {
    await test.step('Navigate to Settings page', async () => {
      await settingsPage.navigateToURL();
    });

    await test.step('Organizations tab compare', async () => {
      await settingsPage.heading.hover();
      await roundElementDimensions(settingsPage.main);
      await settingsPage.fitViewportToFullPage();
      await expect(settingsPage.main).toHaveScreenshot('Settings-Container--Organization.png');
    });

    await test.step('Invitation tab compare', async () => {
      await settingsPage.heading.hover();
      await settingsPage.invitationsTab.click();
      await roundElementDimensions(settingsPage.main);
      await settingsPage.fitViewportToFullPage();
      await expect(settingsPage.main).toHaveScreenshot('Settings-Container--Invitation.png');
    });

    await test.step('Email Notifications tab compare', async () => {
      await settingsPage.heading.hover();
      await settingsPage.emailNotificationsTab.click();
      await settingsPage.emailNotificationSection.first().click();
      await roundElementDimensions(settingsPage.main);
      await settingsPage.fitViewportToFullPage();
      await expect(settingsPage.main).toHaveScreenshot('Settings-Container--EmailNotifications.png');
    });
  });
});

test.describe('FFC: Settings page - Snackbar notification', () => {
  test.use({
    restoreSession: true,
    setFixedTime: true,
    interceptAPI: { entries: settingsInterceptions },
  });

  test('Pending invitation snackbar matches screenshot', async ({ settingsPage }) => {
    await test.step('Navigate to Settings page', async () => {
      await settingsPage.navigateToURL();
    });

    await test.step('Top-right snackbar compare', async () => {
      await settingsPage.topRightSnackbar.waitFor({ state: 'visible' });
      await roundElementDimensions(settingsPage.topRightSnackbar);
      await expect(settingsPage.topRightSnackbar).toHaveScreenshot(
        'Settings-Snackbar--Pending-Invitation.png',
      );
    });
  });
});
