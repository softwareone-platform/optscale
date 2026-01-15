import { BaseRequest } from './base-request';
import { APIRequestContext } from '@playwright/test';
import { debugLog } from '../utils/debug-logging';
import { APIResponse } from 'playwright';
import { EEnvironment } from '../types/enums';

export class RestAPIRequest extends BaseRequest {
  readonly request: APIRequestContext;
  readonly organizationsEndpoint: string;
  readonly employeesEndpoint: string;
  readonly organizationConstraintsEndpoint: string;
  readonly policiesEndpoint: string;
  readonly poolsEndpoint: string;
  private poolId: string;

  /**
   * Constructs an instance of RestAPIRequest.
   * @param {APIRequestContext} request - The API request context.
   */
  constructor(request: APIRequestContext) {
    super(request);
    this.request = request;
    const baseUrl = process.env.API_BASE_URL || '';
    this.organizationsEndpoint = `${baseUrl}/restapi/v2/organizations`;
    this.employeesEndpoint = `${baseUrl}/restapi/v2/employees`;
    this.organizationConstraintsEndpoint = `${baseUrl}/restapi/v2/organization_constraints`;
    this.policiesEndpoint = `${this.organizationsEndpoint}/${process.env.DEFAULT_ORG_ID}/organization_constraints?hit_days=3&type=resource_quota&type=recurring_budget&type=expiring_budget`;
    this.poolsEndpoint = `${baseUrl}/restapi/v2/pools`;
    this.poolId = '';
  }

  /**
   * Creates an organization with the provided name and currency.
   * @param {string} token - The authorization token.
   * @param {string} name - The name of the organization.
   * @param {string} [currency='USD'] - The currency of the organization.
   * @returns {Promise<string>} A promise that resolves to the response body as a string.
   * @throws Will throw an error if the organization creation fails.
   */
  async createOrganization(token: string, name: string, currency: string = 'USD'): Promise<string> {
    const response = await this.request.post(this.organizationsEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        name: name,
        currency: currency,
      },
    });

    if (response.status() !== 201) {
      throw new Error('Failed to create organization');
    }
    const responseBody = await response.json();
    debugLog(JSON.stringify(responseBody));
    return JSON.stringify(responseBody);
  }

  /**
   * Deletes an organization with the provided organization ID.
   * @param {string} organizationId - The ID of the organization to delete.
   * @returns {Promise<string>} A promise that resolves to a confirmation message.
   * @throws Will throw an error if the organization deletion fails.
   */
  async deleteOrganization(organizationId: string): Promise<string> {
    const response = await this.request.delete(`${this.organizationsEndpoint}/${organizationId}`, {
      headers: {
        'Content-Type': 'application/json',
        Secret: `${process.env.CLUSTER_SECRET}`,
      },
    });
    debugLog(JSON.stringify(response));
    if (response.status() !== 204) {
      throw new Error(`Failed to delete organization: ${organizationId}`);
    }
    return `Organization ${organizationId} deleted`;
  }

  /**
   * Deletes a user and reassigns their ownership to another user.
   *
   * @param {string} userID - The ID of the user to delete.
   * @param {string} reassignUserID - The ID of the user to whom ownership will be reassigned.
   * @param {string} token - The authorization token for the API request.
   * @returns {Promise<string>} A promise that resolves to a confirmation message upon successful deletion.
   * @throws Will throw an error if the deletion fails (non-204 response status).
   */
  async deleteUserAndReassign(userID: string, reassignUserID: string, token: string): Promise<string> {
    const endpoint = `${this.employeesEndpoint}/${userID}?new_owner_id=${reassignUserID}`;
    debugLog(`Deleting user ${userID} and reassigning to ${reassignUserID}`);
    const response = await this.request.delete(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        new_owner_id: reassignUserID,
      },
    });
    if (response.status() !== 204) {
      throw new Error(`[ERROR] Failed to delete userID: ${userID}`);
    }
    return `User ${userID} deleted`;
  }

  /**
   * Deletes an anomaly detection policy by its ID.
   *
   * @param {string} policyID - The ID of the anomaly policy to delete.
   * @param {string} token - The authorization token required for the API request.
   * @returns {Promise<void>} A promise that resolves when the anomaly policy is successfully deleted.
   * @throws {Error} If the deletion fails with a status other than 204.
   */
  async deletePolicy(policyID: string, token: string): Promise<void> {
    const endpoint = `${this.organizationConstraintsEndpoint}/${policyID}`;
    debugLog(`Deleting anomaly policy ${policyID}`);
    const response = await this.request.delete(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status() !== 204) {
      throw new Error(`[ERROR] Failed to delete anomaly policy ID: ${policyID}`);
    }
    debugLog(`Anomaly policy ${policyID} deleted`);
  }

  /**
   * Retrieves the policies associated with the current organization.
   *
   * @param {string} token - The authorization token required for the API request.
   * @returns {Promise<APIResponse>} A promise that resolves to the API response containing the policies.
   */
  async getPolicies(token: string): Promise<APIResponse> {
    const endpoint = this.policiesEndpoint;

    return await this.request.get(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  setPoolId() {
    const env = process.env.ENVIRONMENT;
    switch (env) {
      case EEnvironment.DEV:
        return this.poolId = 'ccaceadf-6878-4ab4-9fd8-3f6177d0b9d3';
      case EEnvironment.STAGING:
        return this.poolId = '624abd3c-0d70-4859-964a-e14aafb96c7b';
      case EEnvironment.TEST:
        return this.poolId = 'f648bd92-b53e-4fa7-aebb-cb02bcbf160d';

    }
  }

  async getPoolsResponse(token: string): Promise<APIResponse> {
    this.setPoolId();
    const endpoint = `${this.poolsEndpoint}/${this.poolId}?children=true&details=true`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    return await this.request.get(endpoint, { headers });
  }

  async deletePool(poolId: string, token: string): Promise<void> {
    const endpoint = `${this.poolsEndpoint}/${poolId}`;
    debugLog(`Deleting pool ${poolId}`);
    const response = await this.request.delete(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status() !== 204) {
      throw new Error(`[ERROR] Failed to delete pool ID: ${poolId}, status code: ${response.status()}`);
    }
    debugLog(`Pool ${poolId} deleted`);
  }
}
