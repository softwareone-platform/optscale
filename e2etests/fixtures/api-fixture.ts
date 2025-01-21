import {test as base} from "@playwright/test";
import {AuthRequest} from "../api-requests/auth-request";
import {RestAPIRequest} from "../api-requests/restapi-request";

export const test = base.extend<{
    authRequest: AuthRequest;
    restAPIRequest: RestAPIRequest;
}>({
    authRequest: async ({request}, use) => {
        await use(new AuthRequest(request));
    },
    restAPIRequest: async ({request}, use) => {
        await use(new RestAPIRequest(request));
    },
});
