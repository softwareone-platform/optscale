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
import { getCurrentUTCTimestamp, getTimestampWithVariance } from '../utils/date-range-utils';

test.describe('Cloud Accounts Tests', { tag: ['@ui', '@cloud-accounts'] }, () => {
  test.describe.configure({ mode: 'serial' });
  test.use({ restoreSession: true });

  //TODO: The first datasource has not been configured correctly in the environment. The test will need to be changed to use Marketplace (Dev) which is
  // the test datasource that we can configure without external dependencies.
  test.fixme(
    '[231860] A successful billing import should have been successful within the last 24 hours',
    { tag: '@p1' },
    async ({ page, cloudAccountsPage }) => {
      let dataSourceResponse: DataSourceBillingResponse;
      const now = Math.floor(Date.now() / 1000);
      const secondsIn24Hours = 86400;
      await cloudAccountsPage.navigateToCloudAccountsPage();

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
    await cloudAccountsPage.navigateToCloudAccountsPage();
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
      await cloudAccountsPage.navigateToCloudAccountsPage();
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
    await cloudAccountsPage.navigateToCloudAccountsPage();
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
      await cloudAccountsPage.navigateToCloudAccountsPage();
      await cloudAccountsPage.clickAddBtn();
      await cloudAccountsConnectPage.clickDataSourceTileIfNotActive(cloudAccountsConnectPage.awsRootBtn);
      await cloudAccountsConnectPage.clickAccessKey();
    });

    await test.step('Verify that recommendation message is displayed', async () => {
      await expect(cloudAccountsConnectPage.alertMessage).toBeVisible();
      await expect(cloudAccountsConnectPage.alertMessage).toHaveText(expectedMessage);
    });
  });

  test('[232862] Verify that the user can schedule a billing reimport, and see warning alert', async ({ cloudAccountsPage }) => {
    const expectedAlertMessage =
      'Reimporting billing starting from the selected import date will overwrite existing billing data. This action may cause discrepancies or breaks in the current billing records and can take some time to complete. The new billing data will be imported during the next billing import report processing. Please proceed with caution, as this process cannot be undone. Ensure that this action is necessary and that you are prepared for any potential data loss and inaccuracies in billing tracking.';

    await test.step('Navigate to the Billing reimport side modal', async () => {
      await cloudAccountsPage.navigateToCloudAccountsPage();
      await cloudAccountsPage.clickCloudAccountLinkByName('Marketplace (Dev)');
      await cloudAccountsPage.clickBillingReimportBtn();
      await cloudAccountsPage.billingReimportSideModal.waitFor();
    });

    await test.step('Verify that the warning alert is displayed with correct message', async () => {
      await expect(cloudAccountsPage.billingReimportAlert).toBeVisible();
      await expect(cloudAccountsPage.billingReimportAlert).toHaveText(expectedAlertMessage);
    });

    await test.step('Verify that API request is successfully made when scheduling a billing reimport with default date', async () => {
      let responseStatus: number;
      const [response] = await Promise.all([
        cloudAccountsPage.page.waitForResponse(
          resp => resp.request().postData().includes('operationName":"UpdateDataSource') && resp.request().method() === 'POST'
        ),
        cloudAccountsPage.scheduleImportWithDefaultDate(),
      ]);
      responseStatus = response.status();
      debugLog(`API Response status: ${responseStatus}`);
      expect(responseStatus).toBe(200);
    });
  });
});

test.describe('Mocked Cloud Accounts Tests', { tag: ['@ui', '@cloud-accounts'] }, () => {
  test.describe.configure({ mode: 'serial' });

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

    await test.step('Navigate to update credentials side modal for AWS Access Key account', async () => {
      await cloudAccountsPage.navigateToCloudAccountsPage();
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


test.describe(
  '[MPT-18378] Verify Cloud Account actions are recorded correctly in the events log',
  { tag: ['@ui', '@cloud-accounts', '@events'] },
  () => {
    test.describe.configure({ mode: 'serial' });
    test.use({ restoreSession: true });

    test('[232954] Verify that disconnecting and creating a cloud account is recorded in the events log', async ({
      cloudAccountsPage,
      cloudAccountsConnectPage,
      eventsPage,
    }) => {
      const awsAccountName = 'Marketplace (Dev)';
      let timestamp: string;

      await test.step('Login admin user and disconnect cloud account', async () => {
        await cloudAccountsPage.navigateToCloudAccountsPage();
        timestamp = getCurrentUTCTimestamp();
        await cloudAccountsPage.disconnectCloudAccountByName(awsAccountName);

        debugLog(`Timestamp: ${timestamp}`);
      });

      await test.step('Navigate to events page and verify disconnect event is recorded with correct time', async () => {
        await eventsPage.navigateToURL();
        await eventsPage.waitForAllProgressBarsToDisappear();

        const disconnectEvent = eventsPage.getEventByMultipleTexts([`Cloud account ${awsAccountName}`, 'deleted']);
        await expect.soft(disconnectEvent).toBeVisible();

        const eventText = await disconnectEvent.textContent();
        debugLog(`Disconnect event text: ${eventText}`);

        // Generate timestamps with ±1 minute variance
        const timestamps = getTimestampWithVariance(timestamp);
        debugLog(`Checking for timestamps: ${timestamps.join(', ')}`);

        // Assert that the event text contains at least one of the timestamps
        const hasMatchingTimestamp = timestamps.some(ts => eventText.includes(`${ts} UTC`));
        expect.soft(hasMatchingTimestamp, `Event should contain one of the timestamps: ${timestamps.join(', ')}`).toBe(true);
      });

      await test.step('Add new cloud account and ensure that the events log includes account and pool creation', async () => {
        await cloudAccountsPage.navigateToURL();
        await cloudAccountsPage.clickAddBtn();
        timestamp = getCurrentUTCTimestamp();
        debugLog(`Timestamp: ${timestamp}`);
        await cloudAccountsConnectPage.addAWSAssumedRoleAccount(awsAccountName, EAWSAccountType.management);

        await eventsPage.navigateToURL();
        await eventsPage.waitForAllProgressBarsToDisappear();

        const timestamps = getTimestampWithVariance(timestamp);
        debugLog(`Checking for timestamps: ${timestamps.join(', ')}`);

        const creationEvent = eventsPage.getEventByMultipleTexts([`Cloud account ${awsAccountName}`, 'created']);
        await expect.soft(creationEvent).toBeVisible();

        const eventText = await creationEvent.textContent();
        debugLog(`Creation event text: ${eventText}`);

        // Assert that the event text contains at least one of the timestamps
        const hasMatchingTimestamp = timestamps.some(ts => eventText.includes(`${ts} UTC`));
        expect.soft(hasMatchingTimestamp, `Event should contain one of the timestamps: ${timestamps.join(', ')}`).toBe(true);

        const poolCreationEvent = eventsPage.getEventByMultipleTexts([`Rule for ${awsAccountName}`, `created for pool ${awsAccountName}`]);
        await expect.soft(poolCreationEvent).toBeVisible();
        const poolEventText = await poolCreationEvent.textContent();
        debugLog(`Pool Creation event text: ${poolEventText}`);

        // Assert that the pool event text contains at least one of the timestamps (reusing same timestamps array)
        const hasMatchingPoolTimestamp = timestamps.some(ts => poolEventText.includes(`${ts} UTC`));
        expect.soft(hasMatchingPoolTimestamp, `Event should contain one of the timestamps: ${timestamps.join(', ')}`).toBe(true);
        expect.soft(poolEventText).toContain(process.env.DEFAULT_USER_EMAIL);
      });
    });
  }
);
