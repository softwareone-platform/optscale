import {APIResponse} from "playwright";
import {BaseRequest} from "./base-request";
import {APIRequestContext} from "@playwright/test";

export class RestAPIRequest extends BaseRequest {
    readonly request: APIRequestContext;
    readonly organizationsEndpoint: string;

    /**
     * Constructs an instance of RestAPIRequest.
     * @param {APIRequestContext} request - The API request context.
     */
    constructor(request: APIRequestContext) {
        super(request);
        this.request = request;
        const baseUrl = process.env.API_BASE_URL || "";
        this.organizationsEndpoint = `${baseUrl}/restapi/v2/organizations`;
    }

    /**
     * Creates an organization with the provided name and currency.
     * @param {string} token - The authorization token.
     * @param {string} name - The name of the organization.
     * @param {string} [currency='USD'] - The currency of the organization.
     * @returns {Promise<string>} A promise that resolves to the response body as a string.
     * @throws Will throw an error if the organization creation fails.
     */
    async createOrganization(token: string, name: string, currency = 'USD'): Promise<string> {
        const response = await this.request.post(this.organizationsEndpoint, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            data: {
                name: name,
                currency: currency
            }
        });

        if (response.status() !== 201) {
            throw new Error('Failed to create organization');
        }
        const responseBody = await response.json();
        console.log(JSON.stringify(responseBody));
        return (JSON.stringify(responseBody));
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
                "Content-Type": "application/json",
                Secret: `${process.env.CLUSTER_SECRET}`
            }
        });
        console.log(JSON.stringify(response));
        if (response.status() !== 204) {
            throw new Error(`Failed to delete organization: ${organizationId}`);
        }
        return `Organization ${organizationId} deleted`;
    }
}