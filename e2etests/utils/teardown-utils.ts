import fs from 'fs';
import path from 'path';
import { debugLog } from './debug-logging';
import {
  EmployeesResponse,
  PolicyBudgetAndQuotaResponse,
  PoolsResponse,
  TaggingPolicyResponse
} from '../types/api-response.types';
import { AuthRequest } from './api-requests/auth-request';
import { RestAPIRequest } from '../api-requests/restapi-request';
import { GetDatasourcesByOrganizationIDResponse } from '../types/GetDatasourcesByIDResponse';
import { getEnvironmentOpsAccountId, getEnvironmentOpsOrgId } from './environment-util';
import { getBearerTokenHeader } from './api-helpers';

/**
 * Deletes all files in a directory if process.env.CLEAN_UP === 'true'.
 * @param dirPath Path to the directory whose contents should be deleted.
 */
export async function cleanUpDirectoryIfEnabled(dirPath: string): Promise<void> {
  if (process.env.CLEAN_UP !== 'true') {
    return;
  }

  const resolvedPath = path.resolve(dirPath);

  try {
    const files = await fs.promises.readdir(resolvedPath);

    await Promise.all(
      files.map(async file => {
        const fullPath = path.join(resolvedPath, file);
        const stat = await fs.promises.stat(fullPath);
        if (stat.isFile()) {
          await fs.promises.unlink(fullPath);
        }
      })
    );

    debugLog(`[CLEANUP] Deleted ${files.length} files from ${resolvedPath}`);
  } catch (err) {
    console.error(`[CLEANUP ERROR] Failed to clean directory ${resolvedPath}:`, err);
  }
}

/**
 * Deletes test users from the organization if the CLEAN_UP environment variable is set to 'true'.
 *
 * This function retrieves a list of employees from the organization, identifies test users
 * based on their email and display name, and deletes them while reassigning their ownership
 * to a default user.
 *
 * @param {RestAPIRequest} restAPIRequest - An instance of the RestAPIRequest class used to interact with the REST API.
 * @param token
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function deleteTestUsers(restAPIRequest: RestAPIRequest, token: string): Promise<void> {
  if (process.env.CLEAN_UP !== 'true') {
    return;
  }
  const reassignToUserId = process.env.DEFAULT_USER_ID;
  const organisationId = process.env.DEFAULT_ORG_ID;
  const usersEndpoint = `/restapi/v2/organizations/${organisationId}/employees?exclude_myself=false&roles=true`;

  const headers = getBearerTokenHeader(token);

  const employeesResponse = await restAPIRequest.getGetResponse(usersEndpoint, headers);
  const employeesResponseBody = (await employeesResponse.json()) as EmployeesResponse;

  for (const employee of employeesResponseBody.employees) {
    if (employee.user_email.startsWith('mpt.qlt+execution') && employee.user_display_name === 'Test User') {
      debugLog(`Deleting user: ${employee.user_email} with ID: ${employee.id}`);
      await restAPIRequest.deleteUserAndReassign(employee.id, reassignToUserId, token);
    }
  }
}

/**
 * Deletes an anomaly policy by its ID if the CLEAN_UP environment variable is set to 'true'.
 *
 * This function authenticates using the provided `AuthRequest` instance, constructs the necessary
 * headers, and sends a DELETE request to remove the specified anomaly policy.
 *
 * @param {AuthRequest} authRequest - An instance of the AuthRequest class used to obtain an authorization token.
 * @param {RestAPIRequest} restAPIRequest - An instance of the RestAPIRequest class used to interact with the REST API.
 * @param {string} policyId - The ID of the anomaly policy to be deleted.
 * @returns {Promise<void>} A promise that resolves when the anomaly policy is successfully deleted.
 * @throws {Error} If the DELETE request fails with a status other than 204.
 */
export async function deleteAnomalyPolicy(authRequest: AuthRequest, restAPIRequest: RestAPIRequest, policyId: string): Promise<void> {
  if (process.env.CLEAN_UP !== 'true') {
    return;
  }
  const email = process.env.DEFAULT_USER_EMAIL;
  const password = process.env.DEFAULT_USER_PASSWORD;
  const token = await authRequest.getAuthorizationToken(email, password);
  await restAPIRequest.deletePolicy(policyId, token);
}

/**
 * Deletes all policies associated with the organization.
 *
 * This function retrieves a list of policies using the provided `RestAPIRequest` instance
 * and iterates through each policy in the `organization_constraints` array. For each policy,
 * it logs the policy name and ID, then sends a request to delete the policy.
 *
 * @param {RestAPIRequest} restAPIRequest - An instance of the `RestAPIRequest` class used to interact with the REST API.
 * @param {string} token - The authorization token used for API requests.
 * @returns {Promise<void>} A promise that resolves when all policies have been deleted.
 */
export async function deletePolicies(restAPIRequest: RestAPIRequest, token: string): Promise<void> {
  const policyResponse = await restAPIRequest.getPolicies(token);
  const policyResponseBody = (await policyResponse.json()) as PolicyBudgetAndQuotaResponse;
  for (const policy of policyResponseBody.organization_constraints) {
    debugLog(`Deleting policy: ${policy.name} with ID: ${policy.id}`);
    await restAPIRequest.deletePolicy(policy.id, token);
  }
}

/**
 * Deletes all tagging policies associated with the organization.
 *
 * This function retrieves a list of tagging policies using the provided `RestAPIRequest` instance
 * and iterates through each policy in the `organization_constraints` array. For each policy,
 * it logs the policy name and ID, then sends a request to delete the policy.
 *
 * @param {RestAPIRequest} restAPIRequest - An instance of the `RestAPIRequest` class used to interact with the REST API.
 * @param {string} token - The authorization token used for API requests.
 * @returns {Promise<void>} A promise that resolves when all tagging policies have been deleted.
 */
export async function deleteTaggingPolicies(restAPIRequest: RestAPIRequest, token: string): Promise<void> {
  const taggingPolicyResponse = await restAPIRequest.getTaggingPolicies(token);
  const taggingPolicyResponseBody = (await taggingPolicyResponse.json()) as TaggingPolicyResponse;
  for (const policy of taggingPolicyResponseBody.organization_constraints) {
    debugLog(`Deleting tagging policy: ${policy.name} with ID: ${policy.id}`);
    await restAPIRequest.deletePolicy(policy.id, token);
  }
}

/**
 * Retrieves the IDs of sub-pools whose names start with the specified pool name.
 *
 * This function sends a request to fetch pool data, parses the response, and iterates
 * through the `children` array to find sub-pools whose names start with the given `poolName`.
 * The IDs of matching sub-pools are collected and returned.
 *
 * @param {RestAPIRequest} restAPIRequest - An instance of the `RestAPIRequest` class used to interact with the REST API.
 * @param {string} token - The authorization token used for API requests.
 * @param {string} poolName - The name prefix to match sub-pools against.
 * @returns {Promise<string[]>} A promise that resolves to an array of sub-pool IDs.
 */
export async function getSubPoolIdsContainingName(restAPIRequest: RestAPIRequest, token: string, poolName: string): Promise<string[]> {
  if (process.env.CLEAN_UP !== 'true') {
    return;
  }
  const poolsResponse = await restAPIRequest.getPoolsResponse(token);
  const poolsResponseBody = (await poolsResponse.json()) as PoolsResponse;
  let subPoolIds: string[] = [];
  for (const child of poolsResponseBody.children) {
    if (child.name.startsWith(poolName)) {
      subPoolIds.push(child.id);
    }
  }
  return subPoolIds;
}

/**
 * Disconnects a data source by its ID.
 *
 * This function sends a POST request to the API to delete a data source identified by its ID.
 * If the request fails (response status is not 200), an error is thrown.
 * Otherwise, a debug log is generated to confirm the successful disconnection.
 *
 * @param {RestAPIRequest} restAPIRequest - An instance of the `RestAPIRequest` class used to interact with the REST API.
 * @param {string} token - The authorization token used for API requests.
 * @param {string} id - The ID of the data source to be disconnected.
 * @returns {Promise<void>} A promise that resolves when the data source is successfully disconnected.
 * @throws {Error} If the POST request fails with a status other than 200.
 */
export async function disconnectDataSource(restAPIRequest: RestAPIRequest, token: string, id: string): Promise<void> {
  if (process.env.CLEAN_UP !== 'true') {
    return;
  }
  const endpoint = `${process.env.BASE_URL}/api`;
  const headers = getBearerTokenHeader(token);
  const data = {
    operationName: 'DeleteDataSource',
    variables: { dataSourceId: id },
    query: 'mutation DeleteDataSource($dataSourceId: ID!) { deleteDataSource(dataSourceId: $dataSourceId) }',
  };

  const response = await restAPIRequest.request.post(`${endpoint}`, { headers, data });
  if (response.status() !== 200) {
    throw new Error(`Failed to disconnect data source with ID: ${id}`);
  }
  debugLog(`Disconnected data source with ID: ${id}`);
}

/**
 * Deletes sub-pools whose names start with the specified pool name.
 *
 * This function first retrieves the IDs of sub-pools matching the given `poolName` by
 * calling `getSubPoolIdsContainingName`. It then iterates through the IDs and sends
 * requests to delete each sub-pool.
 *
 * @param {RestAPIRequest} restAPIRequest - An instance of the `RestAPIRequest` class used to interact with the REST API.
 * @param {string} token - The authorization token used for API requests.
 * @param {string} poolName - The name prefix to match sub-pools against.
 * @returns {Promise<void>} A promise that resolves when all matching sub-pools have been deleted.
 */
export async function deleteSubPoolsByName(restAPIRequest: RestAPIRequest, token: string, poolName: string): Promise<void> {
  if (process.env.CLEAN_UP !== 'true') {
    return;
  }

  const subPoolIds = await getSubPoolIdsContainingName(restAPIRequest, token, poolName);
  for (const subPoolId of subPoolIds) {
    debugLog(`Deleting sub-pool with ID: ${subPoolId}`);
    await restAPIRequest.deletePool(subPoolId, token);
  }
}

/**
 * Retrieves the ID of a data source by its name using the Ops API.
 *
 * This function authenticates with the Ops API using the provided `RestAPIRequest` instance
 * and retrieves the access token. It then fetches the list of data sources for the organization
 * and searches for a data source with the specified name. If found, the function returns the ID
 * of the data source. If no matching data source is found, an error is thrown.
 *
 * @param {RestAPIRequest} request - An instance of the `RestAPIRequest` class used to interact with the Ops API.
 * @param {string} name - The name of the data source to search for.
 * @returns {Promise<string>} A promise that resolves to the ID of the data source with the specified name.
 * @throws {Error} If the token generation fails or the data source with the specified name is not found.
 */
export async function getDatasourceIdByNameViaOpsAPI(request: RestAPIRequest, name: string): Promise<string> {
  if (process.env.CLEAN_UP !== 'true') {
    return;
  }
  const tokensEndpoint = `${process.env.BASE_URL}/ops/v1/auth/tokens`;
  const email = process.env.DEFAULT_USER_EMAIL;
  const password = process.env.DEFAULT_USER_PASSWORD;
  const accountId = getEnvironmentOpsAccountId();
  const data = {
    email: email,
    password: password,
    account: {
      id: accountId,
    },
  };
  const response = await request.request.post(tokensEndpoint, { data });
  if (response.status() !== 200) {
    throw new Error('Failed to generate token');
  }
  const { access_token } = await response.json();
  debugLog(`Ops Token: ${access_token}`);

  const opsOrgID = getEnvironmentOpsOrgId();
  const datasourceEndpoint = `${process.env.BASE_URL}/ops/v1/organizations/${opsOrgID}/datasources`;

  let headers = getBearerTokenHeader(access_token);

  const dsResponse = await request.request.get(datasourceEndpoint, { headers });
  const responseBody = (await dsResponse.json()) as GetDatasourcesByOrganizationIDResponse;
  const dataSource = responseBody.find(ds => ds.name === name);
  if (!dataSource) {
    throw new Error(`Data source with name ${name} not found`);
  }
  debugLog(dataSource.id);
  return dataSource.id;
}

/**
 * Connects a data source by its name.
 *
 * This function sends a POST request to the API to create a data source with the specified name.
 * The data source is configured with predefined parameters, including the organization ID and AWS configuration.
 * If the request fails (response status is not 200), an error is thrown.
 * Otherwise, a debug log is generated to confirm the successful connection.
 *
 * @param {RestAPIRequest} restAPIRequest - An instance of the `RestAPIRequest` class used to interact with the REST API.
 * @param {string} token - The authorization token used for API requests.
 * @param {string} name - The name of the data source to be connected.
 * @returns {Promise<void>} A promise that resolves when the data source is successfully connected.
 * @throws {Error} If the POST request fails with a status other than 200.
 */
export async function connectDataSource(restAPIRequest: RestAPIRequest, token: string, name: string): Promise<void> {
  if (process.env.CLEAN_UP !== 'true') {
    return;
  }
  const endpoint = `${process.env.BASE_URL}/api`;
  const headers = getBearerTokenHeader(token);
  const data = {
    operationName: 'CreateDataSource',
    variables: { organizationId: process.env.DEFAULT_ORG_ID },
    query:
      'mutation CreateDataSource($organizationId: ID!, $params: CreateDataSourceInput!) {createDataSource(organizationId: $organizationId, params: $params) {\n    id\n    name\n    __typename\n  }\n}',
    params: {
      name: name,
      type: 'aws_cnr',
      awsAssumedRoleConfig: {
        assume_role_account_id: process.env.DEFAULT_AWS_ACCOUNT_ID,
        assume_role_name: 'FinOpsForCloudOperations',
        bucket_name: 'swofinopsdevcur',
        bucket_prefix: 'reports',
        config_scheme: 'bucket_only',
        cur_version: 2,
        report_name: 'FinopsTest',
        use_edp_discount: false,
      },
    },
  };
  const response = await restAPIRequest.request.post(`${endpoint}`, { headers, data });
  if (response.status() !== 200) {
    throw new Error(`Failed to connect data source with name: ${name}`);
  }
  debugLog(`Connected data source with name: ${name}`);
}
