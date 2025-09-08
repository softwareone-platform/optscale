import {test} from "../fixtures/api-fixture";
import {debugLog} from "../utils/debug-logging";
import {CloudAccount, CloudAccountsResponse, DataSourceResponse} from "../test-data/test-data-response-types";
import {expect} from "@playwright/test";
import {postData} from "../test-data/billing-import-post-data";
import {debug} from "node:util";

test.describe('Billing import API tests', {tag: ["@api", "@p1"]}, () => {

    test('A successful billing import should have been successful within the last 24 hours', async ({
                                                                                                             restAPIRequest,
                                                                                                             authRequest
                                                                                                         }) => {
        const endpoint = '/api';
        const email = process.env.DEFAULT_USER_EMAIL as string;
        const password = process.env.DEFAULT_USER_PASSWORD as string;

        const token = await authRequest.getAuthorizationToken(email, password);
        console.log(token);
        const headers = {
            "Content-Type": "application/json",
            "X-Optscale-token": token
        }

        const response = await restAPIRequest.getPostResponse(endpoint, headers, postData);
        const json = await response.json() as DataSourceResponse;
        debugLog(`Status: ${response.status().toString()}`);

        const payload = JSON.parse(await response.text());
        debugLog(`Data Source Response: ${JSON.stringify(payload)}`);

        const lastSuccessfulImport = json.data.dataSource.last_import_at;
        const now = Math.floor(Date.now() / 1000);
        const secondsIn24Hours = 86400;

        const timeDifference = now - lastSuccessfulImport;
        debugLog(`Current Time: ${now}, Last Successful Import: ${lastSuccessfulImport}, Time Difference: ${timeDifference} seconds`);

        expect(timeDifference).toBeLessThan(secondsIn24Hours);
    });

    test('Test all data sources are imported within time period', async ({
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