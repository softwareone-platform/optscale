import fs from 'fs';
import path from 'path';
import { debugLog } from './debug-logging';
import { EmployeesResponse } from '../types/api-response.types';
import { AuthRequest } from './api-requests/auth-request';
import { RestAPIRequest } from '../api-requests/restapi-request';

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
 * @param {AuthRequest} authRequest - An instance of the AuthRequest class used to obtain an authorization token.
 * @param {RestAPIRequest} restAPIRequest - An instance of the RestAPIRequest class used to interact with the REST API.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function deleteTestUsers(authRequest: AuthRequest, restAPIRequest: RestAPIRequest): Promise<void> {
  if (process.env.CLEAN_UP !== 'true') {
    return;
  }

  const email = process.env.DEFAULT_USER_EMAIL;
  const password = process.env.DEFAULT_USER_PASSWORD;
  const reassignToUserId = process.env.DEFAULT_USER_ID;
  const organisationId = process.env.DEFAULT_ORG_ID;
  const usersEndpoint = `/restapi/v2/organizations/${organisationId}/employees?exclude_myself=false&roles=true`;

  const token = await authRequest.getAuthorizationToken(email, password);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

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
  await restAPIRequest.deleteAnomalyPolicy(policyId, token);
}
