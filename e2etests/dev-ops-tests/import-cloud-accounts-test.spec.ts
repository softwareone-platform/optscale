import {test} from "../fixtures/api-fixture";
import {debugLog} from "../utils/debug-logging";
import {CloudAccountsResponse, DataSourceResponse} from "../test-data/test-data-response-types";
import {expect} from "@playwright/test";
import {postData} from "../test-data/billing-import-post-data";

test.describe('Billing import API tests', {tag: ["@api", "@devops"]}, () => {

    test('Test all data sources for an Organization are imported within time period', async ({
                                                                                                        restAPIRequest,
                                                                                                        authRequest
                                                                                                    }) => {
        const now = Math.floor(Date.now() / 1000);
        const timeLimit = 3600;
        const organisationId = process.env.DEFAULT_ORG_ID;
        const cloudAccountsEndpoint = `/restapi/v2/organizations/${organisationId}/cloud_accounts`;

        const email = process.env.DEFAULT_USER_EMAIL as string;
        const password = process.env.DEFAULT_USER_PASSWORD as string;

        const token = await authRequest.getAuthorizationToken(email, password);
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }

        const cloudAccountsResponse = await restAPIRequest.getGetResponse(cloudAccountsEndpoint, headers);
        const cloudAccountsResponseBody = await cloudAccountsResponse.json() as CloudAccountsResponse;

            const filteredAccounts = cloudAccountsResponseBody.cloud_accounts
                .filter(account => account.type.endsWith('_cnr'))
                .map(account => ({
                    id: account.id,
                    last_import_at: account.last_import_at
                }));

            filteredAccounts.forEach(account => {
                const timeSinceLastImport = now - account.last_import_at;
                debugLog(`Cloud Account ID: ${account.id}, Time Since Last Import: ${timeSinceLastImport} seconds`);

                expect.soft(timeSinceLastImport).toBeLessThan(timeLimit);
            });
        });
});