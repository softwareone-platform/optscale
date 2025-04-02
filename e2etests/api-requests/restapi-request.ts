import {BaseRequest} from "./base-request";
import {APIRequestContext} from "@playwright/test";

export class RestAPIRequest extends BaseRequest {
    readonly request: APIRequestContext;
    readonly organizationsEndpoint: string;

    constructor(request: APIRequestContext) {
        super(request);
        this.request = request;
        this.organizationsEndpoint = "/restapi/v2/organizations";
    }

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
