import { test } from '../../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { SettingsEmailNotificationsMock, SettingsOrganizationMock } from '../mocks/settings.mock';


test.describe('FFC: Settings page @swo_regression', () => {
  const apiInterceptions = [{ gql: 'Organizations', mock: SettingsOrganizationMock }, {gql: 'EmployeeEmails', mock: SettingsEmailNotificationsMock }];

  test.use({
    restoreSession: true,
    setFixedTime: true,
    interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: true },
  });

  test('Tabs check', async ({ settingsPage }) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();

    await test.step('Navigate to Users page', async () => {
      await settingsPage.navigateToURL();
    });

    await test.step('Organizations tab compare', async () => {
      await settingsPage.heading.hover();
      await settingsPage.screenshotUpdateDelay();
      await roundElementDimensions(settingsPage.main);
      await settingsPage.fitViewportToFullPage();
      await expect(settingsPage.main).toHaveScreenshot('Settings-Organization-screenshot.png');
    });

    await test.step('Invitation tab compare', async () => {
      await settingsPage.heading.hover();
      await settingsPage.invitationsTab.click();
      await settingsPage.screenshotUpdateDelay();
      await roundElementDimensions(settingsPage.main);
      await settingsPage.fitViewportToFullPage();
      await expect(settingsPage.main).toHaveScreenshot('Settings-Invitation-screenshot.png');
    });

    await test.step('Email Notifications tab compare', async () => {
      await settingsPage.heading.hover();
      await settingsPage.emailNotificationsTab.click();
      await settingsPage.emailNotificationSection.first().click();
      await settingsPage.screenshotUpdateDelay();
      await roundElementDimensions(settingsPage.main);
      await settingsPage.fitViewportToFullPage();
      await expect(settingsPage.main).toHaveScreenshot('Settings-Email-Notifications-screenshot.png');
    });
  });
});
