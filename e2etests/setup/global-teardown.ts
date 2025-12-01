import { request } from '@playwright/test';
import { AuthRequest } from '../api-requests/auth-request';
import { RestAPIRequest } from '../api-requests/restapi-request';
import { cleanUpDirectoryIfEnabled, deleteTestUsers } from '../utils/teardown-utils';

async function globalTeardown() {
  const apiRequestContext = await request.newContext({
    ignoreHTTPSErrors: true,
    baseURL: process.env.BASE_URL,
  });
  const authRequest = new AuthRequest(apiRequestContext);
  const restAPIRequest = new RestAPIRequest(apiRequestContext);

  await cleanUpDirectoryIfEnabled('./tests/downloads');
  await deleteTestUsers(authRequest, restAPIRequest);

  await apiRequestContext.dispose();
}

module.exports = globalTeardown;
