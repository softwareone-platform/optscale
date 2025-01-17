import {test as base} from "@playwright/test";
import {AuthRequest} from "../api-requests/auth-request";

export const test = base.extend<{
    authRequest: AuthRequest;
}>({
    authRequest: async ({request}, use) => {
        await use(new AuthRequest(request));
    },
});
