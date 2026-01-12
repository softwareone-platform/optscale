import { request } from '@playwright/test';
import { AuthRequest } from '../api-requests/auth-request';
import { RestAPIRequest } from '../api-requests/restapi-request';
import { cleanUpDirectoryIfEnabled, deletePolicies, deleteTestUsers } from '../utils/teardown-utils';

async function globalTeardown() {
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

  await apiRequestContext.dispose();
}

module.exports = globalTeardown;
