import {test} from "../fixtures/api.fixture";
import {debugLog} from "../utils/debug-logging";
import {expect} from "@playwright/test";
import {CloudAccountsResponse} from "../types/api-response.types";

test.describe('Billing import API test', {tag: ["@api", "@devops"]}, () => {

    test('Test all data sources for an Organization are imported within time period', async ({
                                                                                                        restAPIRequest,
                                                                                                        authRequest
                                                                                                    }) => {
        const now = Math.floor(Date.now() / 1000);
        const timeLimit = 3600;
        const organisationId = process.env.DEFAULT_ORG_ID;
        const cloudAccountsEndpoint = `/restapi/v2/organizations/${organisationId}/cloud_accounts`;
        const email = process.env.DEFAULT_USER_EMAIL;
        const password = process.env.DEFAULT_USER_PASSWORD;

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
