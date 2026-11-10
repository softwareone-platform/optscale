import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class SettingsPage extends BasePage {
  readonly heading: Locator;
  readonly invitationsTab: Locator;
  readonly emailNotificationsTab: Locator;
  readonly emailNotificationSection: Locator;
  readonly topRightSnackbar: Locator;

  constructor(page: Page) {
    super(page, '/settings');
    this.heading = this.main.locator('//h1[.="Settings"]');
    this.invitationsTab = this.main.getByTestId('tab_invitations');
    this.emailNotificationsTab = this.main.getByTestId('tab_emailNotifications');
    this.emailNotificationSection = this.main.getByTestId('lbl_[object Object]_title');
    // Snackbar renders at document root (outside `main`); exclude `alert_error`
    // to target only neutral info banners (e.g. pending invitation).
    this.topRightSnackbar = page.locator('.MuiSnackbar-anchorOriginTopRight:not([data-test-id="alert_error"])');
  }
}
