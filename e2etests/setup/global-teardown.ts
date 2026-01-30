import { request } from '@playwright/test';
import { AuthRequest } from '../api-requests/auth-request';
import { RestAPIRequest } from '../api-requests/restapi-request';
import {
  cleanUpDirectoryIfEnabled,
  connectDataSource,
  deletePolicies,
  deleteSubPoolsByName,
  deleteTaggingPolicies,
  deleteTestUsers,
  disconnectDataSource,
  getDatasourceIdByNameViaOpsAPI,
} from '../utils/teardown-utils';

async function globalTeardown() {

  if (process.env.CLEAN_UP === 'true') {
    const apiRequestContext = await request.newContext({
      ignoreHTTPSErrors: true,
      baseURL: process.env.BASE_URL,
    });
    const email = process.env.DEFAULT_USER_EMAIL;
    const password = process.env.DEFAULT_USER_PASSWORD;
    const authRequest = new AuthRequest(apiRequestContext);
    const restAPIRequest = new RestAPIRequest(apiRequestContext);
    const token = await authRequest.getAuthorizationToken(email, password);

    await cleanUpDirectoryIfEnabled('./tests/downloads');
    await deleteTestUsers(restAPIRequest, token);
    await deletePolicies(restAPIRequest, token);
    await deleteTaggingPolicies(restAPIRequest, token);

    // clear down orphaned Marketplace (Dev) Sub-pools and reconnect data source
    const dataSourceName = 'Marketplace (Dev)';
    const marketplaceDevId = await getDatasourceIdByNameViaOpsAPI(restAPIRequest, dataSourceName);
    await disconnectDataSource(restAPIRequest, token, marketplaceDevId);
    await deleteSubPoolsByName(restAPIRequest, token, dataSourceName);
    await connectDataSource(restAPIRequest, token, dataSourceName);

    await apiRequestContext.dispose();
  }
}

module.exports = globalTeardown;
