import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { settingsInterceptions } from '../mocks/settings.mock';


test.describe('FFC: Settings page', () => {
  test.use({
    restoreSession: true,
    setFixedTime: true,
    interceptAPI: { entries: settingsInterceptions, failOnInterceptionMissing: true },
  });

  test('Tabs check', async ({ settingsPage }) => {
    await test.step('Navigate to Settings page', async () => {
      await settingsPage.navigateToURL();
    });

    await test.step('Organizations tab compare', async () => {
      await settingsPage.heading.hover();
      await roundElementDimensions(settingsPage.main);
      await settingsPage.fitViewportToFullPage();
      await expect(settingsPage.main).toHaveScreenshot('Settings-Organization-screenshot.png');
    });

    await test.step('Invitation tab compare', async () => {
      await settingsPage.heading.hover();
      await settingsPage.invitationsTab.click();
      await roundElementDimensions(settingsPage.main);
      await settingsPage.fitViewportToFullPage();
      await expect(settingsPage.main).toHaveScreenshot('Settings-Invitation-screenshot.png');
    });

    await test.step('Email Notifications tab compare', async () => {
      await settingsPage.heading.hover();
      await settingsPage.emailNotificationsTab.click();
      await settingsPage.emailNotificationSection.first().click();
      await roundElementDimensions(settingsPage.main);
      await settingsPage.fitViewportToFullPage();
      await expect(settingsPage.main).toHaveScreenshot('Settings-Email-Notifications-screenshot.png');
    });
  });
});
