import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class CloudAccountsPage extends BasePage {
  readonly heading: Locator;
  readonly addBtn: Locator;

  constructor(page: Page) {
    super(page, '/cloud-accounts');
    this.heading = this.main.locator('//h1[.="Data sources"]');
    this.addBtn = this.main.getByTestId('btn_add');
  }

  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }
}

export class CloudAccountsConnectPage extends BasePage {
  readonly awsRootBtn: Locator;
  readonly azureTenantBtn: Locator;
  readonly googleCloudBtn: Locator;
  readonly btnStandalone: Locator;
  readonly btnAssumedRole: Locator;
  readonly btnMember: Locator;
  readonly btnAccessKey: Locator;

  constructor(page: Page) {
    super(page, '/cloud-accounts/connect');
    this.awsRootBtn = this.main.getByTestId('btn_aws_account');
    this.azureTenantBtn = this.main.getByTestId('btn_azure_account');
    this.googleCloudBtn = this.main.getByTestId('btn_gcp_account');
    this.btnAssumedRole = this.main.getByTestId('btn_assumedRole');
    this.btnAccessKey = this.main.getByTestId('btn_accessKey');
    this.btnMember = this.main.getByTestId('btn_member');
    this.btnStandalone = this.main.getByTestId('btn_standalone');
  }

  async prepareConnectPageForScreenshot(cloudAccountsPage: CloudAccountsPage): Promise<void> {
    await cloudAccountsPage.navigateToURL();
    await cloudAccountsPage.clickAddBtn();
    await this.fitViewportToFullPage();
  }
}
