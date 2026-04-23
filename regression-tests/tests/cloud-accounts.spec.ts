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
    const connect = cloudAccountsConnectPage;
    await connect.prepareConnectPageForScreenshot(cloudAccountsPage);
    await connect.awsRootBtn.click();

    await test.step('Management — Assumed role', async () => {
      await connect.btnAssumedRole.click();
      await connect.fitViewportToFullPage();
      await expect(connect.main).toHaveScreenshot('CloudAccounts-ConnectAwsManagement--AssumedRole.png');
    });

    await test.step('Management — Access key', async () => {
      await connect.btnAccessKey.click();
      await expect(connect.main).toHaveScreenshot('CloudAccounts-ConnectAwsManagement--AccessKey.png');
    });

    await connect.btnMember.click();

    await test.step('Member — Assumed role', async () => {
      await connect.btnAssumedRole.click();
      await connect.fitViewportToFullPage();
      await expect(connect.main).toHaveScreenshot('CloudAccounts-ConnectAwsMember--AssumedRole.png');
    });

    await test.step('Member — Access key', async () => {
      await connect.btnAccessKey.click();
      await expect(connect.main).toHaveScreenshot('CloudAccounts-ConnectAwsMember--AccessKey.png');
    });

    await connect.btnStandalone.click();

    await test.step('Standalone — Assumed role', async () => {
      await connect.btnAssumedRole.click();
      await connect.fitViewportToFullPage();
      await expect(connect.main).toHaveScreenshot('CloudAccounts-ConnectAwsStandard--AssumedRole.png');
    });

    await test.step('Standalone — Access key', async () => {
      await connect.btnAccessKey.click();
      await expect(connect.main).toHaveScreenshot('CloudAccounts-ConnectAwsStandard--AccessKey.png');
    });
  });

  test('Connect — Azure Tenant', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.azureTenantBtn.click();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectAzureTenant.png');
  });

  test('Connect — Google Cloud', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.googleCloudBtn.click();
    await cloudAccountsConnectPage.fitViewportToFullPage();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-ConnectGoogleCloud.png');
  });
});
