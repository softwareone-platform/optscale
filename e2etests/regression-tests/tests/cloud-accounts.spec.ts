import { test } from '../../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { roundElementDimensions } from '../utils/roundElementDimensions';
import { DataSourcesMock } from '../mocks/cloud-accounts.mocks';


test.describe('FFC: Cloud Account @swo_regression', () => {

  const interceptorList = [{ mock: DataSourcesMock, gql: 'DataSources' }];

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
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage, cloudAccountsConnectPage.awsRootBtn);
    await cloudAccountsConnectPage.toggleCheckbox(cloudAccountsConnectPage.automaticallyDetectExistingDataSourcesCheckbox);
    await cloudAccountsConnectPage.fitViewportToFullPage();
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-root-screenshot.png');
  });

  test('Page Connect - Azure Tenant matches screenshots', async ({
                                                                   cloudAccountsPage,
                                                                   cloudAccountsConnectPage,
                                                                 }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage, cloudAccountsConnectPage.azureTenantBtn);
    await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-azure-tenant-screenshot.png');
  });
  test('Page Connect - Google Cloud matches screenshots', async ({
                                                                   cloudAccountsPage,
                                                                   cloudAccountsConnectPage,
                                                                 }) => {
    await cloudAccountsConnectPage.prepareConnectPageForScreenshot(cloudAccountsPage, cloudAccountsConnectPage.googleCloudBtn);
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
