import {APIResponse} from "playwright";
import {BaseRequest} from "./base-request";
import {APIRequestContext} from "@playwright/test";
import fs from "fs";
import {debugLog} from "../utils/debug-logging";

export class AuthRequest extends BaseRequest {
    readonly request: APIRequestContext;
    readonly userEndpoint: string;
    readonly tokenEndpoint: string;
    readonly verificationCodesEndpoint: string;

    /**
     * Constructs an instance of AuthRequest.
     * @param {APIRequestContext} request - The API request context.
     */
    constructor(request: APIRequestContext) {
        super(request);
        this.request = request;
    const baseUrl = process.env.API_BASE_URL || "";
    this.userEndpoint = `${baseUrl}/auth/v2/users`;
    this.tokenEndpoint = `${baseUrl}/auth/v2/tokens`;
    this.verificationCodesEndpoint = `${baseUrl}/auth/v2/verification_codes`;
    }

    /**
     * Authorizes a user with the provided email and password.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<APIResponse>} A promise that resolves to the API response.
     */
    async authorization(email: string, password: string): Promise<APIResponse> {
        return await this.request.post(this.tokenEndpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email: email,
                password: password,
            },
        });
    }

    /**
     * Gets an authorization token for the provided email and password.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<string>} A promise that resolves to the authorization token.
     * @throws Will throw an error if the token generation fails.
     */
    async getAuthorizationToken(email: string, password: string): Promise<string> {
        const response = await this.authorization(email, password);
        if (response.status() !== 201) {
            throw new Error('Failed to generate token');
        }
        const body = await response.json();
        const {token} = await response.json();
        debugLog(`Token: ${token}`);
        return token;
    }

    /**
     * Saves the authorization response to a file.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @param {string} [user] - Optional user identifier.
     * @returns {Promise<void>} A promise that resolves when the response is saved.
     * @throws Will throw an error if the authorization fails.
     */
    async saveAuthorizationResponse(email: string, password: string, user?: string): Promise<void> {
        const response = await this.authorization(email, password);
        if (response.status() !== 201) {
            throw new Error('Failed to authorize user');
        }
        const responseBody = await response.json();
        const userID = responseBody.user_id; // Assuming the response contains a user object with an id

        const filePath = `.cache/auth-response-${userID}.json`;
        fs.writeFileSync(filePath, JSON.stringify(responseBody, null, 2));
        console.log(`Response saved to ${filePath}`);
    }

    /**
     * Gets users with the cluster secret.
     * @param {string} [userID] - Optional user identifier.
     * @returns {Promise<APIResponse>} A promise that resolves to the API response.
     */
    async getUsersWithClusterSecret(userID?: string): Promise<APIResponse> {
        let endpoint = this.userEndpoint;
        if (userID) {
            endpoint += `?user_id=${userID}`;
        }
        console.log(endpoint);
        const response = await this.request.get(endpoint, {
            headers: {
                "Content-Type": "application/json",
                Secret: `${process.env.CLUSTER_SECRET}`
            },
        });
        return response;
    }

    /**
     * Gets users with a bad cluster secret.
     * @param {string} userID - The user identifier.
     * @returns {Promise<APIResponse>} A promise that resolves to the API response.
     */
    async getUsersWithBadClusterSecret(userID: string): Promise<APIResponse> {
        const response = await this.request.get(`${this.userEndpoint}/${userID}`, {
            headers: {
                "Content-Type": "application/json",
                Secret: 'bad-secret'
            },
        });
        return response;
    }

    /**
     * Creates a new user with the provided email, password, and display name.
     * @param {string} email - The email address of the user.
     * @param {string} password - The password of the user.
     * @param {string} displayName - The display name of the user.
     * @returns {Promise<APIResponse>} A promise that resolves to the API response.
     * @throws Will throw an error if the user creation fails.
     */
    async createUser(email: string, password: string, displayName: string): Promise<APIResponse> {
        const response = await this.request.post(this.userEndpoint, {
            headers: {
                "Content-Type": "application/json",
                Secret: process.env.CLUSTER_SECRET
            },
            data: {
                email,
                display_name: displayName,
                password,
                verified: true
            }
        });

        if (response.status() !== 201) {
            throw new Error(`Failed to create user: Status ${response.status()}`);
        }
        return response;
    }

    /**
     * Sets a verification code for a user.
     * This method sends a POST request to the verification codes endpoint with the provided email and code.
     * It validates the presence of the `CLUSTER_SECRET` environment variable and handles errors if the request fails.
     *
     * @param {string} email - The email address of the user.
     * @param {string} code - The verification code to be set for the user.
     * @returns {Promise<APIResponse>} A promise that resolves to the API response.
     * @throws Will throw an error if the `CLUSTER_SECRET` is not defined or if the request fails.
     */
    async setVerificationCode(email: string, code: string): Promise<APIResponse> {
        if (!process.env.CLUSTER_SECRET) {
            throw new Error("CLUSTER_SECRET is not defined in the environment variables.");
        }

        const response = await this.request.post(this.verificationCodesEndpoint, {
            headers: {
                "Content-Type": "application/json",
                Secret: process.env.CLUSTER_SECRET
            },
            data: {
                email,
                code
            }
        });
        const payload = JSON.parse(await response.text());
        if (response.status() !== 201) {
            const reason = payload.error?.reason || "Unknown error";
            throw new Error(`Failed to create verification code: Status ${response.status()} - Reason: ${reason}`);
        }
        return response;
    }

    /**
     * Deletes a user with the provided user ID.
     * @param {string} userID - The user identifier.
     * @returns {Promise<void>} A promise that resolves when the user is deleted.
     * @throws Will throw an error if the user deletion fails.
     */
    async deleteUser(userID: string): Promise<void> {
        const response = await this.request.delete(`${this.userEndpoint}/${userID}`, {
            headers: {
                "Content-Type": "application/json",
                Secret: `${process.env.CLUSTER_SECRET}`
            }
        });
        if (response.status() !== 204) {
            throw new Error(`Failed to delete userID ${userID}`);
        }
        console.log(`UserID ${userID} deleted`);
    }
}