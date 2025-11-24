import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';
import { roundElementDimensions } from '../regression-tests/utils/roundElementDimensions';
import { CloudAccountsPage } from './cloud-accounts-page';
import { EAWSAccountType } from '../types/enums';

/**
 * Represents the Cloud Accounts Connect Page.
 * Extends the BasePage class.
 */
export class CloudAccountsConnectPage extends BasePage {
  readonly heading: Locator;
  readonly awsRootBtn: Locator;
  readonly awsManagementBtn: Locator;
  readonly azureTenantBtn: Locator;
  readonly googleCloudBtn: Locator;
  readonly btnStandalone: Locator;
  readonly btnAssumedRole: Locator;
  readonly btnMember: Locator;
  readonly btnAccessKey: Locator;
  readonly googleCloudTenantBtn: Locator;
  readonly nameInput: Locator;
  readonly connectBtn: Locator;
  readonly cancelBtn: Locator;

  //#region AWS specific
  readonly awsAccountIDInput: Locator;
  readonly awsAccessKeyIDInput: Locator;
  readonly awsSecretAccessKeyInput: Locator;
  readonly awsAssumedRoleNameInput: Locator;
  readonly useAWSEDPCheckbox: Locator;
  readonly standardDataExportRadio: Locator;
  readonly legacyCostUsageReportsRadio: Locator;
  readonly automaticallyDetectExistingDataSourcesCheckbox: Locator;
  readonly createNewDataExportRadio: Locator;
  readonly connectOnlyToDataInBucketCheckbox: Locator;
  readonly exportNameInput: Locator;
  readonly exportAmazonS3BucketNameInput: Locator;
  readonly exportPathPrefixInput: Locator;
  readonly exportRegionNameInput: Locator;
  //#endregion

  //#region Azure specific
  readonly directoryTenantIDInput: Locator;
  readonly applicationClientIDInput: Locator;
  readonly secretInput: Locator;
  readonly subscriptionIDInput: Locator;
  //#endregion

  //#region Google Cloud specific
  readonly dropZone: Locator;
  readonly billingDataDatasetNameInput: Locator;
  readonly billingDataTableNameInput: Locator;
  readonly billingDatasetProjectIDInput: Locator;

  //#endregion

  /**
   * Initializes a new instance of the CloudAccountsConnectPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/cloud-accounts/connect');
    this.heading = this.main.locator('//h1[.="Connect data source"]');
    this.awsRootBtn = this.main.getByTestId('btn_aws_account');
    this.awsManagementBtn = this.main.getByTestId('btn_management');
    this.azureTenantBtn = this.main.getByTestId('btn_azure_account');
    this.googleCloudBtn = this.main.getByTestId('btn_gcp_account');
    this.btnAssumedRole = this.main.getByTestId('btn_assumedRole');
    this.btnAccessKey = this.main.getByTestId('btn_accessKey');
    this.btnMember = this.main.getByTestId('btn_member');
    this.btnStandalone = this.main.getByTestId('btn_standalone');
    this.googleCloudTenantBtn = this.main.getByTestId('btn_gcp_account');
    this.nameInput = this.main.getByTestId('input_cloud_account_name');
    this.awsAccountIDInput = this.main.getByTestId('input_assume_role_account_id');
    this.awsAccessKeyIDInput = this.main.getByTestId('input_aws_access_key_id');
    this.awsSecretAccessKeyInput = this.main.getByTestId('input_secret_key');
    this.awsAssumedRoleNameInput = this.main.getByTestId('input_assume_role_name');
    this.useAWSEDPCheckbox = this.main.getByTestId('useEdpDiscount-checkbox');
    this.standardDataExportRadio = this.main.getByLabel('Standard data export (CUR 2.0)');
    this.legacyCostUsageReportsRadio = this.main.getByLabel('Legacy Cost & Usage Reports (CUR) export');
    this.automaticallyDetectExistingDataSourcesCheckbox = this.main.getByLabel('Automatically detect existing Data Exports');
    this.createNewDataExportRadio = this.main.getByLabel('Create new Data Export');
    this.connectOnlyToDataInBucketCheckbox = this.main.getByLabel('Connect only to data in bucket');
    this.exportNameInput = this.main.getByTestId('input_export_name');
    this.exportAmazonS3BucketNameInput = this.main.getByTestId('input_s3_bucket_name');
    this.exportPathPrefixInput = this.main.getByTestId('input_export_path_prefix');
    this.exportRegionNameInput = this.main.getByTestId('input_region_name');
    this.connectBtn = this.main.getByTestId('btn_connect_cloud_account');
    this.cancelBtn = this.main.getByTestId('btn_cancel_cloud_account');
    this.directoryTenantIDInput = this.main.getByTestId('input_tenant_id');
    this.applicationClientIDInput = this.main.getByTestId('input_client_id');
    this.secretInput = this.main.getByTestId('input_azure_secret');
    this.subscriptionIDInput = this.main.getByTestId('input_subscription_id');
    this.dropZone = this.main.locator('div[class="tss-s95hh4-dropzone-content"]');
    this.billingDataDatasetNameInput = this.main.getByTestId('input_billing_data_dataset_name');
    this.billingDataTableNameInput = this.main.getByTestId('input_billing_data_table_name');
    this.billingDatasetProjectIDInput = this.main.getByTestId('input_billing_data_project_id');
  }

  async prepareConnectPageForScreenshot(cloudAccountsPage: CloudAccountsPage) {
    await cloudAccountsPage.navigateToURL();
    await cloudAccountsPage.clickAddBtn();

    await roundElementDimensions(this.main);
    await this.fitViewportToFullPage();
  }

  /**
   * Checks if a tile is active by evaluating its border color.
   * @param {Locator} tile - The locator for the tile element.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the tile is active.
   */
  async isTileActive(tile: Locator): Promise<boolean> {
    await tile.waitFor();
    const borderColor = await tile.evaluate(el => getComputedStyle(el).borderColor);
    return borderColor === 'rgb(71, 42, 255)';
  }

  /**
   * Clicks a data source tile if it is not already active.
   * @param {Locator} tile - The locator for the tile element.
   * @returns {Promise<void>} A promise that resolves when the tile is clicked if it was not active.
   */
  async clickDataSourceTileIfNotActive(tile: Locator): Promise<void> {
    if (!(await this.isTileActive(tile))) {
      await tile.click();
    }
  }

  /**
   * Clicks the AWS Linked Account button.
   * @returns {Promise<void>} A promise that resolves when the button is clicked.
   */
  async clickAWSLinkedAccount(): Promise<void> {
    await this.awsManagementBtn.click();
  }

  /**
   * Clicks the Azure Tenant button.
   * @returns {Promise<void>} A promise that resolves when the button is clicked.
   */
  async clickAzureTenant(): Promise<void> {
    await this.azureTenantBtn.click();
  }

  /**
   * Clicks the Google Cloud Tenant button.
   * @returns {Promise<void>} A promise that resolves when the button is clicked.
   */
  async clickGoogleCloudTenant(): Promise<void> {
    await this.googleCloudTenantBtn.click();
  }

  /**
   * Clicks the Google Cloud button.
   * @returns {Promise<void>} A promise that resolves when the button is clicked.
   */
  async clickGoogleCloud(): Promise<void> {
    await this.googleCloudBtn.click();
  }

  /**
   * Adds an AWS Assumed Role account by filling in the required details and connecting it.
   *
   * This method retrieves the AWS account ID from the environment variables and performs
   * the necessary steps to configure and connect an AWS Assumed Role account. It selects
   * the appropriate account type, fills in the account name and ID, and enters additional
   * details based on the account type.
   *
   * @param {string} accountName - The name of the AWS account to be added.
   * @param {EAWSAccountType} accountType - The type of AWS account (e.g., member, management, standalone).
   * @throws {Error} Throws an error if the `DEFAULT_AWS_ACCOUNT_ID` environment variable is not set.
   * @returns {Promise<void>} A promise that resolves when the account is successfully added.
   */
  async addAWSAssumedRoleAccount(accountName: string, accountType: EAWSAccountType): Promise<void> {
    const accountId = process.env.DEFAULT_AWS_ACCOUNT_ID;
    if (!accountId) throw new Error('DEFAULT_AWS_ACCOUNT_ID is not set in environment variables');
    await this.clickDataSourceTileIfNotActive(this.awsRootBtn);
    await this.clickAWSAccountTypeButton(accountType);
    await this.btnAssumedRole.click();
    await this.nameInput.fill(accountName);
    await this.awsAccountIDInput.fill(accountId);
    await this.enterAWSAssumedRoleDetails(accountType);
    await this.connectBtn.click();
    await this.waitForAllProgressBarsToDisappear();
  }

  /**
   * Clicks the appropriate AWS account type button based on the provided account type.
   *
   * This method determines which AWS account type button to click by evaluating
   * the `accountType` parameter. If the account type is not supported, an error is thrown.
   *
   * @param {EAWSAccountType} accountType - The type of AWS account to select.
   * @throws {Error} Throws an error if the provided account type is unsupported.
   * @returns {Promise<void>} A promise that resolves when the appropriate button is clicked.
   */
  async clickAWSAccountTypeButton(accountType: EAWSAccountType): Promise<void> {
    switch (accountType) {
      case EAWSAccountType.management:
        await this.clickButtonIfNotActive(this.awsManagementBtn);
        break;
      case EAWSAccountType.member:
        await this.clickButtonIfNotActive(this.btnMember);
        break;
      case EAWSAccountType.standalone:
        await this.clickButtonIfNotActive(this.btnStandalone);
        break;
      default:
        throw new Error(`Unsupported AWS account type: ${accountType}`);
    }
  }

  /**
   * Enters the details required for an AWS Assumed Role account based on the account type.
   *
   * This method fills in the necessary fields for configuring an AWS Assumed Role account.
   * Depending on the account type, it sets specific values for the role name, toggles checkboxes,
   * and fills in additional input fields such as export name, bucket name, and region.
   *
   * @param {EAWSAccountType} accountType - The type of AWS account (e.g., member, management, standalone).
   * @throws {Error} Throws an error if the provided account type is unsupported.
   * @returns {Promise<void>} A promise that resolves when all details are entered.
   */
  async enterAWSAssumedRoleDetails(accountType: EAWSAccountType): Promise<void> {
    switch (accountType) {
      case EAWSAccountType.member:
        await this.awsAssumedRoleNameInput.fill('FinOpsForCloudAssumeRole');
        break;
      case EAWSAccountType.management:
      case EAWSAccountType.standalone:
        await this.awsAssumedRoleNameInput.fill('FinOpsForCloudOperations');
        await this.uncheckCheckbox(this.useAWSEDPCheckbox);
        await this.checkCheckbox(this.standardDataExportRadio);
        await this.exportNameInput.fill('FinopsTest');
        await this.exportAmazonS3BucketNameInput.fill('swofinopsdevcur');
        await this.fillInputIfDifferent(this.exportPathPrefixInput, 'reports');
        await this.exportRegionNameInput.fill('eu-west-1');
        break;
      default:
        throw new Error(`Unsupported AWS account type: ${accountType}`);
    }
  }
}
