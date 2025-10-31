import { test } from '../../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import {
  CurrentEmployee,
  DataSourcesMock,
  poolsMock,
} from '../mocks/cloud-accounts.mocks';
import { InterceptionEntry } from '../../types/interceptor.types';


test.describe('FFC: Cloud Account @swo_regression', () => {

  const interceptorList: InterceptionEntry[] = [
    { mock: CurrentEmployee, gql: 'CurrentEmployee' },
    { mock: DataSourcesMock, gql: 'DataSources' },
    { mock: poolsMock, url: `/v2/pools/` },
  ];

  test.use({
    restoreSession: true,
    setFixedTime: true,
    interceptAPI: { entries: interceptorList, failOnInterceptionMissing: true },
  });

  test('Page matches screenshots', async ({
                                            cloudAccountsPage,
                                          }) => {

    await test.step('Navigate to Cloud Accounts page', async () => {
      await cloudAccountsPage.navigateToURL();
    });

    await test.step('Page content', async () => {

      await cloudAccountsPage.heading.hover();
      await cloudAccountsPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsPage.main);
      await expect(cloudAccountsPage.main).toHaveScreenshot('CloudAccounts-screenshot.png');
    });
  });

  test('Page Connect - AWS Root matches screenshots', async ({
                                                               cloudAccountsPage,
                                                               cloudAccountsConnectPage,
                                                             }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);

    // AWS Management view
    await  cloudAccountsConnectPage.awsRootBtn.click();
    await cloudAccountsConnectPage.btnAssumedRole.click();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-management-assumed-role-tenant-screenshot.png');
    await cloudAccountsConnectPage.btnAccessKey.click();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-management-access-key-tenant-screenshot.png');

    // AWS Member view
    await cloudAccountsConnectPage.btnMember.click();
    await cloudAccountsConnectPage.btnAssumedRole.click();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-member-assumed-role-tenant-screenshot.png');
    await cloudAccountsConnectPage.btnAccessKey.click();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-member-access-key-tenant-screenshot.png');

    // AWS Standard view
    await cloudAccountsConnectPage.btnStandalone.click();
    await cloudAccountsConnectPage.btnAssumedRole.click();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-standard-assumed-role-tenant-screenshot.png');
    await cloudAccountsConnectPage.btnAccessKey.click();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-standard-access-key-tenant-screenshot.png');
  });

  test('Page Connect - Azure Tenant matches screenshots', async ({
                                                                   cloudAccountsPage,
                                                                   cloudAccountsConnectPage,
                                                                 }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.azureTenantBtn.click();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-azure-tenant-screenshot.png');
  });
  test('Page Connect - Google Cloud matches screenshots', async ({
                                                                   cloudAccountsPage,
                                                                   cloudAccountsConnectPage,
                                                                 }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage);
    await cloudAccountsConnectPage.googleCloudBtn.click();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-screenshot.png');
  });

  test('Page Connect - Google Cloud Tenant matches screenshots', async ({
                                                                          cloudAccountsPage,
                                                                          cloudAccountsConnectPage,
                                                                        }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage, cloudAccountsConnectPage.googleCloudTenantBtn);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-tenant-screenshot.png');
  });
});
