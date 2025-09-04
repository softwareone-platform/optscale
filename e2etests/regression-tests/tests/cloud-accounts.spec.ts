import {test} from "../../fixtures/page-object-fixtures";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {IInterceptor} from "../../utils/api-requests/interceptor";
import {CloudAccountsResponse, DataSourcesResponse} from "../../mocks";

const interceptorList: IInterceptor[] = [
  {
    urlPattern: `v2/pools/[^/]+?children=false&details=false`,
    mock: CloudAccountsResponse,
  },
  {
    mock: DataSourcesResponse,
    graphQlOperationName: "DataSources",
  },
];

test.use({restoreSession: true, interceptAPI: { list: interceptorList }});


test.describe('FFC: Cloud Account @swo_regression', () => {
  test('Cloud Account page matches screenshots', async ({
                                                                          cloudAccountsPage,
                                                                          cloudAccountsConnectPage
                                                                        }) => {

    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();

    await test.step('Navigate to Cloud Accounts page', async () => {
      await cloudAccountsPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await cloudAccountsPage.heading.hover();
      await cloudAccountsPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsPage.main);
      await expect(cloudAccountsPage.main).toHaveScreenshot('CloudAccounts-screenshot.png');
    });

    await test.step('Connect page - AWS Root', async () => {
      await cloudAccountsPage.clickAddBtn();
      await cloudAccountsConnectPage.clickDataSourceTileIfNotActive(cloudAccountsConnectPage.awsRootBtn);
      await cloudAccountsConnectPage.toggleCheckbox(cloudAccountsConnectPage.automaticallyDetectExistingDataSourcesCheckbox);
      await cloudAccountsConnectPage.heading.hover();
      await cloudAccountsConnectPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsConnectPage.main);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-root-screenshot.png');
    });

    await test.step('Connect page - Azure Tenant', async () => {
      await cloudAccountsConnectPage.clickAzureTenant();
      await cloudAccountsConnectPage.heading.hover();
      await cloudAccountsConnectPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsConnectPage.main);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-azure-tenant-screenshot.png');
    });

    await test.step('Connect page - Google Cloud', async () => {
      await cloudAccountsConnectPage.clickGoogleCloud();
      await cloudAccountsConnectPage.heading.hover();
      await cloudAccountsConnectPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsConnectPage.main);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-screenshot.png');
    });

    await test.step('Connect page - Google Cloud Tenant', async () => {
      await cloudAccountsConnectPage.clickGoogleCloudTenant();
      await cloudAccountsConnectPage.heading.hover();
      await cloudAccountsConnectPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsConnectPage.main);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-tenant-screenshot.png');
    });
  })
})
