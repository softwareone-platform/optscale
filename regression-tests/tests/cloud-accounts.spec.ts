import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { cloudAccountsInterceptions } from '../mocks/cloud-accounts.mocks';

test.describe('FFC: Cloud Account', () => {

  test.use({
    restoreSession: true,
    setFixedTime: true,
    interceptAPI: { entries: cloudAccountsInterceptions },
  });

  test('Page matches screenshots', async ({ cloudAccountsPage }) => {
    await test.step('Navigate to Cloud Accounts page', async () => {
      await cloudAccountsPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await cloudAccountsPage.heading.hover();
      await roundElementDimensions(cloudAccountsPage.main);
      await expect(cloudAccountsPage.main).toHaveScreenshot('CloudAccounts-Container.png');
    });
  });

  test('Page Connect - AWS Root matches screenshots', async ({
    cloudAccountsPage,
    cloudAccountsConnectPage,
  }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);

    await cloudAccountsConnectPage.clickAwsRootBtn();
    await cloudAccountsConnectPage.clickBtnAssumedRole(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts_ConnectAwsManagement--AssumedRole.png');
    await cloudAccountsConnectPage.clickBtnAccessKey();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts_ConnectAwsManagement--AccessKey.png');

    await cloudAccountsConnectPage.clickBtnMember();
    await cloudAccountsConnectPage.clickBtnAssumedRole(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsMember--AssumedRole.png');
    await cloudAccountsConnectPage.clickBtnAccessKey();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsMember--AccessKey.png');

    await cloudAccountsConnectPage.clickBtnStandalone();
    await cloudAccountsConnectPage.clickBtnAssumedRole(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsStandard--AssumedRole.png');
    await cloudAccountsConnectPage.clickBtnAccessKey();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAws--StandardAccessKey.png');
  });

  test('Page Connect - Azure Tenant matches screenshots', async ({
    cloudAccountsPage,
    cloudAccountsConnectPage,
  }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickAzureTenantBtn();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAzureTenant.png');
  });

  test('Page Connect - Google Cloud matches screenshots', async ({
    cloudAccountsPage,
    cloudAccountsConnectPage,
  }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickGoogleCloudBtn(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectGoogleCloud.png');
  });
});
