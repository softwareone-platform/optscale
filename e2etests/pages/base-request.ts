import {type APIRequestContext} from "@playwright/test";
import {APIResponse} from "playwright";

export class BaseRequest {
    request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async getPostResponseStatus(
        endpoint: string,
        headers: { [key: string]: string },
        data: unknown,
    ): Promise<number> {
        const response = await this.request.post(endpoint, {headers, data});
        return response.status();
    }

    async getGetResponseStatus(
        endpoint: string,
        headers: { [key: string]: string },
    ): Promise<number> {
        const response = await this.request.get(endpoint, {
            headers,
        });
        await response.text();
        return response.status();
    }

    async getGetResponseDuration(
        endpoint: string,
        headers: { [key: string]: string },
    ): Promise<number> {
        const start = Date.now();
        const response = await this.request.get(endpoint, {
            headers
        });
        await response.body();
        const end = Date.now();
        const duration = end - start;
        if (response.status() !== 200) {
            throw new Error(`Request failed with status ${response.status()}`);
        }
        console.log(`Request duration for ${endpoint}: ${duration} ms`);
        return duration;
    };

    async getPostResponse(
        endpoint: string,
        headers: { [key: string]: string },
        data: unknown,
    ): Promise<APIResponse> {
        return await this.request.post(endpoint, {headers, data});
    };

    async getGetResponse(
        endpoint: string,
        headers: { [key: string]: string },
    ): Promise<APIResponse> {
        return await this.request.get(endpoint, {
            headers,
        });
    };
}
