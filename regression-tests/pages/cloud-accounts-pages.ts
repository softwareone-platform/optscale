import { BasePage, HeadingWithAddButtonPage } from './base-page';
import { Locator, Page } from '@playwright/test';
import { fitViewportToFullPage } from '@/utils/viewport';

export class CloudAccountsPage extends HeadingWithAddButtonPage {
  constructor(page: Page) {
    super(page, '/cloud-accounts', main => main.locator('//h1[.="Data sources"]'));
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
    await cloudAccountsPage.addBtn.click();
    await fitViewportToFullPage(this.page);
  }
}
