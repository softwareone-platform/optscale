import { test } from '../fixtures/page.fixture';
import { debugLog } from '../utils/debug-logging';
import { fetchDataSourceResponse } from '../utils/api-helpers';
import { expect } from '@playwright/test';
import { DataSourceBillingResponse } from '../types/api-response.types';
import { EAWSAccountType } from '../types/enums';
import { InterceptionEntry } from '../types/interceptor.types';
import {
  AllowedActionsResponse,
  CurrentEmployeeResponse,
  DataSourcesResponse,
  MarketplaceProductionResponse,
  OrganizationFeaturesResponse,
  OrganizationPerspectivesResponse,
  OrganizationPoolsResponse,
  OrganizationsResponse,
  OrganizationThemeSettingsResponse,
} from '../mocks/cloud-accounts-page.mocks';

test.describe('Cloud Accounts Tests', { tag: ['@ui', '@cloudaccounts'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });

  test.beforeEach('Login admin user', async ({ cloudAccountsPage }) => {
    await test.step('Login admin user', async () => {
      await cloudAccountsPage.navigateToURL();
      await cloudAccountsPage.waitForAllProgressBarsToDisappear();
      await cloudAccountsPage.allCloudAccountLinks.last().waitFor();
    });
  });

  //TODO: The first datasource has not been configured correctly in the environment. The test will need to be changed to use Marketplace (Dev) which is
  // the test datasource that we can configure without external dependencies.
  test.fixme(
    '[231860] A successful billing import should have been successful within the last 24 hours',
    { tag: '@p1' },
    async ({ page, cloudAccountsPage }) => {
      let dataSourceResponse: DataSourceBillingResponse;
      const now = Math.floor(Date.now() / 1000);
      const secondsIn24Hours = 86400;

      await test.step('Fetch Data Source Response for first account', async () => {
        const [response] = await Promise.all([fetchDataSourceResponse(page), cloudAccountsPage.clickCloudAccountLink(1)]);
        dataSourceResponse = response;
      });

      debugLog(`Data Source Response: ${JSON.stringify(dataSourceResponse)}`);

      await test.step('Validate last successful billing import is less than 24 hours ago', async () => {
        const lastSuccessfulImport = dataSourceResponse.data.dataSource.last_import_attempt_at;
        const timeDifference = now - lastSuccessfulImport;
        debugLog(`Current Time: ${now}, Last Successful Import: ${lastSuccessfulImport}, Time Difference: ${timeDifference} seconds`);

        expect(timeDifference).toBeLessThan(secondsIn24Hours);
      });

      await test.step('Assert billing Import status is successful', async () => {
        await cloudAccountsPage.clickAdvancedTabBtn();
        await expect(cloudAccountsPage.billingStatusCompletedIcon).toBeVisible();
        expect(await cloudAccountsPage.lastBillingImportStatus.textContent()).toContain('Completed');
      });
    }
  );

  test('[231861] Verify adding a new AWS Assumed role - Management', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    test.fixme(); //'Skipping due to these tests possibly corrupting data due to orphaned sub-pools when disconnecting accounts'
    const awsAccountName = 'Marketplace (Dev)';
    await test.step(`Disconnect ${awsAccountName} if connected`, async () => {
      await cloudAccountsPage.disconnectIfConnectedCloudAccountByName(awsAccountName);
    });

    await test.step('Add AWS management account with assumed role', async () => {
      await cloudAccountsPage.clickAddBtn();
      await cloudAccountsConnectPage.addAWSAssumedRoleAccount(awsAccountName, EAWSAccountType.management);
    });

    await test.step(`Verify ${awsAccountName} is connected`, async () => {
      await cloudAccountsPage.allCloudAccountLinks.last().waitFor();
      const cloudAccountLink = cloudAccountsPage.getCloudAccountLinkByName(awsAccountName);
      await expect(cloudAccountLink).toBeVisible();
    });
  });

  test(
    '[231862] Verify adding a new AWS Assumed role - Member',
    { tag: '@p1' },
    async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
      test.fixme(); //'Skipping due to these tests possibly corrupting data due to orphaned sub-pools when disconnecting accounts'
      const awsAccountName = 'Marketplace (Dev)';
      await test.step(`Disconnect ${awsAccountName} if connected`, async () => {
        await cloudAccountsPage.disconnectIfConnectedCloudAccountByName(awsAccountName);
      });

      await test.step('Add AWS member account with assumed role', async () => {
        await cloudAccountsPage.clickAddBtn();
        await cloudAccountsConnectPage.addAWSAssumedRoleAccount(awsAccountName, EAWSAccountType.member);
      });

      await test.step(`Verify ${awsAccountName} is connected`, async () => {
        await cloudAccountsPage.allCloudAccountLinks.last().waitFor();
        const cloudAccountLink = cloudAccountsPage.getCloudAccountLinkByName(awsAccountName);
        await expect(cloudAccountLink).toBeVisible();
      });
    }
  );

  test('[231863] Verify adding a new AWS Assumed role - Standalone', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
    test.fixme(); //'Skipping due to these tests possibly corrupting data due to orphaned sub-pools when disconnecting accounts'
    const awsAccountName = 'Marketplace (Dev)';
    await test.step(`Disconnect ${awsAccountName} if connected`, async () => {
      await cloudAccountsPage.disconnectIfConnectedCloudAccountByName(awsAccountName);
    });

    await test.step('Add AWS standalone account with assumed role', async () => {
      await cloudAccountsPage.clickAddBtn();
      await cloudAccountsConnectPage.addAWSAssumedRoleAccount(awsAccountName, EAWSAccountType.management);
    });

    await test.step(`Verify ${awsAccountName} is connected`, async () => {
      await cloudAccountsPage.allCloudAccountLinks.last().waitFor();
      const cloudAccountLink = cloudAccountsPage.getCloudAccountLinkByName(awsAccountName);
      await expect(cloudAccountLink).toBeVisible();
    });
  });

  test('[232861] Verify that a message is displayed recommending the Assume role method for AWS accounts, when Access key method is selected', async ({
    cloudAccountsPage,
    cloudAccountsConnectPage,
  }) => {
    const expectedMessage =
      'We recommend using the Assume Role method to provide access to your AWS account. For more information, please see the documentation.';
    await test.step('Navigate to add cloud account page and select AWS Access key method', async () => {
      await cloudAccountsPage.clickAddBtn();
      await cloudAccountsConnectPage.clickDataSourceTileIfNotActive(cloudAccountsConnectPage.awsRootBtn);
      await cloudAccountsConnectPage.clickAccessKey();
    });

    await test.step('Verify that recommendation message is displayed', async () => {
      await expect(cloudAccountsConnectPage.alertMessage).toBeVisible();
      await expect(cloudAccountsConnectPage.alertMessage).toHaveText(expectedMessage);
    });
  });
});

test.describe('Mocked Cloud Accounts Tests', { tag: ['@ui', '@cloudaccounts'] }, () => {
  test.describe.configure({ mode: 'default' });

  const apiInterceptions: InterceptionEntry[] = [
    {
      gql: 'DataSources',
      mock: DataSourcesResponse,
      variableMatch: { organizationId: '3d0fe384-b1cf-4929-ad5e-1aa544f93dd5' },
    },
    {
      gql: 'DataSource',
      mock: MarketplaceProductionResponse,
      variableMatch: { dataSourceId: '3f584d10-4293-4599-8ad5-413acc72fd45' },
    },
    {
      gql: 'Organizations',
      mock: OrganizationsResponse,
    },
    {
      gql: 'OrganizationAllowedActions',
      mock: AllowedActionsResponse,
    },
    {
      gql: 'CurrentEmployee',
      mock: CurrentEmployeeResponse,
    },
    {
      gql: 'OrganizationFeatures',
      mock: OrganizationFeaturesResponse,
    },
    {
      gql: 'OrganizationThemeSettings',
      mock: OrganizationThemeSettingsResponse,
    },
    {
      gql: 'OrganizationPerspectives',
      mock: OrganizationPerspectivesResponse,
    },
    {
      url: `/v2/pools`,
      mock: OrganizationPoolsResponse,
    },
  ];
  test.use({ restoreSession: true, interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: true } });

  test('[232859] Verify the correct messages are displayed when updating an AWS Access Key account', async ({ cloudAccountsPage }) => {
    const accessKeyMessage =
      'Access keys are a set of permanent credentials. This authentication type is not recommended by SoftwareOne or AWS - use an assumed role where possible.More information';
    const permissionsMessage =
      'Please make sure that updated credentials have enough permissions to perform billing import and resource discovery to avoid interruptions in data source processing.';
    const assumeRoleMessage =
      'Switching from an access key to an assumed role is permanent. After you make this change, you can’t switch back to using an access key for this data source.If you later want to use an access key again, you’ll need to delete this data source and recreate it with access key credentials. This will delete all existing data for this data source and require a full reimport of the resource and billing data.';

    await test.step('Login admin user', async () => {
      await cloudAccountsPage.navigateToURL();
      await cloudAccountsPage.waitForAllProgressBarsToDisappear();
      await cloudAccountsPage.allCloudAccountLinks.last().waitFor();
    });

    await test.step('Navigate to update credentials side modal for AWS Access Key account', async () => {
      await cloudAccountsPage.clickCloudAccountLinkByName('Marketplace (Production)');
      await cloudAccountsPage.clickUpdateCredentialsBtn();
    });

    await test.step('Verify that the correct messages are displayed for Access Key selected', async () => {
      await cloudAccountsPage.clickButtonIfNotActive(cloudAccountsPage.sideModalAccessKeyButton);
      await expect.soft(cloudAccountsPage.sideModalPrimaryAlert).toBeVisible();
      await expect.soft(cloudAccountsPage.sideModalPrimaryAlert).toHaveText(accessKeyMessage);
      await expect.soft(cloudAccountsPage.sideModalSecondaryAlert).toBeVisible();
      await expect.soft(cloudAccountsPage.sideModalSecondaryAlert).toHaveText(permissionsMessage);
    });

    await test.step('Verify that the correct messages are displayed for Assume Role selected', async () => {
      await cloudAccountsPage.clickButtonIfNotActive(cloudAccountsPage.sideModalAssumedRoleButton);
      await expect.soft(cloudAccountsPage.sideModalPrimaryAlert).toBeVisible();
      await expect.soft(cloudAccountsPage.sideModalPrimaryAlert).toHaveText(assumeRoleMessage);
      await expect.soft(cloudAccountsPage.sideModalSecondaryAlert).toBeVisible();
      await expect.soft(cloudAccountsPage.sideModalSecondaryAlert).toHaveText(permissionsMessage);
    });
  });
});
