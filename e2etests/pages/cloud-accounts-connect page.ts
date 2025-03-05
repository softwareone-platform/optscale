import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class CloudAccountsConnectPage extends BasePage {
    readonly heading: Locator;
    readonly awsRootBtn: Locator;
    readonly awsLinkedBtn: Locator;
    readonly azureTenantBtn: Locator;
    readonly azureSubscriptionBtn: Locator;
    readonly googleCloudBtn: Locator;
    readonly googleCloudTenantBtn: Locator;
    readonly nameInput: Locator;
    readonly connectBtn: Locator;
    readonly cancelBtn: Locator;

    //#region AWS specific
    readonly awsAccessKeyIDInput: Locator;
    readonly awsSecretAccessKeyInput: Locator;
    readonly useAWSEDPCheckbox: Locator;
    readonly standardDataExportRadio: Locator;
    readonly legacyCostUsageReportsRadio: Locator;
    readonly automaticallyDetectExistingDataSourcesCheckbox: Locator;
    readonly createNewDataExportRadio: Locator;
    readonly connectOnlyToDataInBucketCheckbox: Locator;
    readonly exportNameInput: Locator;
    readonly exportAmazonS3BucketNameInput: Locator;
    readonly exportPathPrefixInput: Locator;
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

    constructor(page: Page) {
        super(page, '/cloud-accounts/connect');
        this.heading = this.main.locator('//h1[.="Connect Data Source"]');
        this.awsRootBtn = this.main.getByTestId('btn_aws_root_account');
        this.awsLinkedBtn = this.main.getByTestId('btn_aws_linked_account');
        this.azureTenantBtn = this.main.getByTestId('btn_azure_tenant');
        this.azureSubscriptionBtn = this.main.getByTestId('btn_azure_subscription');
        this.googleCloudBtn = this.main.getByTestId('btn_gcp_account');
        this.googleCloudTenantBtn = this.main.getByTestId('btn_gcp_tenant_account');
        this.nameInput = this.main.getByTestId('input_cloud_account_name');
        this.awsAccessKeyIDInput = this.main.getByTestId('input_aws_access_key_id');
        this.awsSecretAccessKeyInput = this.main.getByTestId('input_secret_key');
        this.useAWSEDPCheckbox = this.main.getByTestId('useEdpDiscount-checkbox');
        this.standardDataExportRadio = this.main.getByLabel('Standard data export (CUR 2.0)');
        this.legacyCostUsageReportsRadio = this.main.getByLabel('Legacy Cost & Usage Reports (CUR) export');
        this.automaticallyDetectExistingDataSourcesCheckbox = this.main.getByLabel('Automatically detect existing Data Exports');
        this.createNewDataExportRadio = this.main.getByLabel('Create new Data Export');
        this.connectOnlyToDataInBucketCheckbox = this.main.getByLabel('Connect only to data in bucket');
        this.exportNameInput = this.main.getByTestId('input_export_name');
        this.exportAmazonS3BucketNameInput = this.main.getByTestId('input_s3_bucket_name');
        this.exportPathPrefixInput = this.main.getByTestId('input_export_path_prefix');
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

    async isTileActive(tile: Locator): Promise<boolean> {
        const borderColor = await tile.evaluate((el) => getComputedStyle(el).borderColor);
        return borderColor === 'rgb(71, 42, 255)';
    }

    async clickDataSourceTileIfNotActive(tile: Locator): Promise<void> {
        if (!await this.isTileActive(tile)) {
            await tile.click();
        }
    }

    async clickAWSLinkedAccount(): Promise<void> {
        await this.awsLinkedBtn.click();
    }

    async clickAzureTenant(): Promise<void> {
        await this.azureTenantBtn.click();
    }

    async clickAzureSubscription(): Promise<void> {
        await this.azureSubscriptionBtn.click();
    }

    async clickGoogleCloudTenant(): Promise<void> {
        await this.googleCloudTenantBtn.click();
    }

    async clickGoogleCloud(): Promise<void> {
        await this.googleCloudBtn.click();
    }

    async toggleCheckbox(checkbox: Locator): Promise<void> {
        const isChecked = await checkbox.isChecked();
        if (isChecked) {
            await checkbox.uncheck();
        } else {
            await checkbox.check();
        }
    }
}