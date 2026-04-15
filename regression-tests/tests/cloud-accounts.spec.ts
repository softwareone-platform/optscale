import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { cloudAccountsInterceptions } from '../mocks/cloud-accounts.mocks';

test.describe('FFC: Cloud Account', () => {

  test.use({
    restoreSession: true,
    setFixedTime: true,
    interceptAPI: { entries: cloudAccountsInterceptions, failOnInterceptionMissing: true },
  });

  test('Page matches screenshots', async ({ cloudAccountsPage }) => {
    await test.step('Navigate to Cloud Accounts page', async () => {
      await cloudAccountsPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await cloudAccountsPage.heading.hover();
      await roundElementDimensions(cloudAccountsPage.main);
      await expect(cloudAccountsPage.main).toHaveScreenshot('CloudAccounts-screenshot.png');
    });
  });

  test('Page Connect - AWS Root matches screenshots', async ({
    cloudAccountsPage,
    cloudAccountsConnectPage,
  }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);

    await cloudAccountsConnectPage.clickAwsRootBtn();
    await cloudAccountsConnectPage.clickBtnAssumedRole(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-management-assumed-role-tenant-screenshot.png');
    await cloudAccountsConnectPage.clickBtnAccessKey();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-management-access-key-tenant-screenshot.png');

    await cloudAccountsConnectPage.clickBtnMember();
    await cloudAccountsConnectPage.clickBtnAssumedRole(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-member-assumed-role-tenant-screenshot.png');
    await cloudAccountsConnectPage.clickBtnAccessKey();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-member-access-key-tenant-screenshot.png');

    await cloudAccountsConnectPage.clickBtnStandalone();
    await cloudAccountsConnectPage.clickBtnAssumedRole(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-standard-assumed-role-tenant-screenshot.png');
    await cloudAccountsConnectPage.clickBtnAccessKey();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-standard-access-key-tenant-screenshot.png');
  });

  test('Page Connect - Azure Tenant matches screenshots', async ({
    cloudAccountsPage,
    cloudAccountsConnectPage,
  }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickAzureTenantBtn();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-azure-tenant-screenshot.png');
  });

  test('Page Connect - Google Cloud matches screenshots', async ({
    cloudAccountsPage,
    cloudAccountsConnectPage,
  }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickGoogleCloudBtn(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-screenshot.png');
  });

  test('Page Connect - Google Cloud Tenant matches screenshots', async ({
    cloudAccountsPage,
    cloudAccountsConnectPage,
  }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.clickGoogleCloudTenantBtn(true);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-tenant-screenshot.png');
  });
});
