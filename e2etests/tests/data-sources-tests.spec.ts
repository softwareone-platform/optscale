import {test} from "../fixtures/page-fixture";
import {debugLog} from "../utils/debug-logging";
import {fetchDataSourceResponse} from "../utils/api-helpers";
import {restoreUserSessionInLocalForage} from "../utils/auth-storage/localforage-service";
import {DataSourceResponse} from "../test-data/test-data-response-types";
import {expect} from "@playwright/test";

test.describe('Cloud Accounts Tests', {tag: ["@ui", "@cloudaccounts"]},() => {

    test.beforeEach('Login admin user', async ({page, cloudAccountsPage}) => {
        await test.step('Login admin user', async () => {
            await restoreUserSessionInLocalForage(page);
            await cloudAccountsPage.navigateToURL();
            await cloudAccountsPage.waitForPageLoaderToDisappear();
            await cloudAccountsPage.allCloudAccountLinks.last().waitFor();
        });
    });

    test.only('A successful billing import should have been successful within the last 24 hours', {tag: "@p1"}, async ({page, cloudAccountsPage}) => {
        let dataSourceResponse: DataSourceResponse;
        const now = Math.floor(Date.now() / 1000);
        const secondsIn24Hours = 24 * 60 * 60;

        await test.step('Fetch Data Source Response for first account', async () => {
            const [response] = await Promise.all([
                fetchDataSourceResponse(page),
                cloudAccountsPage.clickCloudAccountLink(1)
            ]);
            dataSourceResponse = response;
        });
        debugLog(`Data Source Response: ${JSON.stringify(dataSourceResponse)}`);
        await test.step('Validate last successful billing import is less than 24 hours ago', async () => {
            const lastSuccessfulImport = dataSourceResponse.data.dataSource.last_import_attempt_at;


            const timeDifference = now - lastSuccessfulImport;
            debugLog(`Current Time (s): ${now}, Last Successful Import (s): ${lastSuccessfulImport}, Time Difference (s): ${timeDifference} seconds`);

            expect(timeDifference).toBeLessThan(secondsIn24Hours);
        });

        await test.step('Assert billing Import status is successful', async () => {
            await cloudAccountsPage.clickAdvancedTabBtn();
            await expect(cloudAccountsPage.billingStatusCompletedIcon).toBeVisible();
            expect(await cloudAccountsPage.lastBillingImportStatus.textContent()).toContain('Completed');
        });

    });

})