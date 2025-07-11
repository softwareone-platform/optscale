import {test as base} from "@playwright/test";
import {AuthRequest} from "../api-requests/auth-request";
import {RestAPIRequest} from "../api-requests/restapi-request";

/**
 * Extends the base test with custom fixtures for API requests.
 */
export const test = base.extend<{
    authRequest: AuthRequest;
    restAPIRequest: RestAPIRequest;
}>({
    /**
     * Provides an instance of AuthRequest.
     * @param {object} request - The request object.
     * @param {function} use - The use function to provide the fixture.
     */
    authRequest: async ({request}, use) => {
        await use(new AuthRequest(request));
    },
    /**
     * Provides an instance of RestAPIRequest.
     * @param {object} request - The request object.
     * @param {function} use - The use function to provide the fixture.
     */
    restAPIRequest: async ({request}, use) => {
        await use(new RestAPIRequest(request));
    },
});