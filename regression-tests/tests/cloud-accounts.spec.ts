import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { cloudAccountsInterceptions } from '../mocks/cloud-accounts.mocks';
import { captureScreenshot, regressionOptions } from '../utils/test-helpers';

test.describe('FFC: Cloud Account', () => {
  test.use(regressionOptions(cloudAccountsInterceptions));

  test('List page matches screenshots', async ({ cloudAccountsPage }) => {
    await cloudAccountsPage.navigateToURL();
    await captureScreenshot(cloudAccountsPage.main, 'CloudAccounts-Container.png', cloudAccountsPage.heading);
  });

  test('Connect — AWS Root matches screenshots', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);

    await cloudAccountsConnectPage.clickAwsRootBtn();
    await cloudAccountsConnectPage.clickBtnAssumedRole(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsManagement--AssumedRole.png');
    await cloudAccountsConnectPage.clickBtnAccessKey();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsManagement--AccessKey.png');

    await cloudAccountsConnectPage.clickBtnMember();
    await cloudAccountsConnectPage.clickBtnAssumedRole(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsMember--AssumedRole.png');
    await cloudAccountsConnectPage.clickBtnAccessKey();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsMember--AccessKey.png');

    await cloudAccountsConnectPage.clickBtnStandalone();
    await cloudAccountsConnectPage.clickBtnAssumedRole(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsStandard--AssumedRole.png');
    await cloudAccountsConnectPage.clickBtnAccessKey();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsStandard--AccessKey.png');
  });

  test('Connect — Azure Tenant matches screenshots', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickAzureTenantBtn();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAzureTenant.png');
  });

  test('Connect — Google Cloud matches screenshots', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickGoogleCloudBtn(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectGoogleCloud.png');
  });
});
