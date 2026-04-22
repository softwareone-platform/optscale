import { test } from '@/fixtures/page.fixture';
import { expect } from '@playwright/test';
import { cloudAccountsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe('FFC: Cloud Accounts', () => {
  test.use({ interceptAPI: { entries: cloudAccountsInterceptions } });

  test('List page', async ({ cloudAccountsPage }) => {
    await cloudAccountsPage.navigateToURL();
    await captureScreenshot(cloudAccountsPage.main, 'CloudAccounts-Container.png', {
      hoverAnchor: cloudAccountsPage.heading,
    });
  });

  test('Connect — AWS', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickAwsRootBtn();

    await test.step('Management — Assumed role', async () => {
      await cloudAccountsConnectPage.clickBtnAssumedRole(true);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsManagement--AssumedRole.png');
    });

    await test.step('Management — Access key', async () => {
      await cloudAccountsConnectPage.clickBtnAccessKey();
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsManagement--AccessKey.png');
    });

    await cloudAccountsConnectPage.clickBtnMember();

    await test.step('Member — Assumed role', async () => {
      await cloudAccountsConnectPage.clickBtnAssumedRole(true);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsMember--AssumedRole.png');
    });

    await test.step('Member — Access key', async () => {
      await cloudAccountsConnectPage.clickBtnAccessKey();
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsMember--AccessKey.png');
    });

    await cloudAccountsConnectPage.clickBtnStandalone();

    await test.step('Standalone — Assumed role', async () => {
      await cloudAccountsConnectPage.clickBtnAssumedRole(true);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsStandard--AssumedRole.png');
    });

    await test.step('Standalone — Access key', async () => {
      await cloudAccountsConnectPage.clickBtnAccessKey();
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAwsStandard--AccessKey.png');
    });
  });

  test('Connect — Azure Tenant', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickAzureTenantBtn();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAzureTenant.png');
  });

  test('Connect — Google Cloud', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickGoogleCloudBtn(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectGoogleCloud.png');
  });
});
