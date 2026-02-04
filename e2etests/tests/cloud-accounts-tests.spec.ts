import { test } from '../fixtures/page.fixture';
import { debugLog } from '../utils/debug-logging';
import { fetchDataSourceResponse } from '../utils/api-helpers';
import { expect } from '@playwright/test';
import { DataSourceBillingResponse } from '../types/api-response.types';
import { EAWSAccountType } from '../types/enums';

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

  test('[231862] Verify adding a new AWS Assumed role - Member', { tag: '@p1' }, async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
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
  });

  test('[231863] Verify adding a new AWS Assumed role - Standalone', async ({ cloudAccountsPage, cloudAccountsConnectPage }) => {
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
});
