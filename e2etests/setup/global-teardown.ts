
import fs from "fs";
import { chromium, APIRequestContext } from "@playwright/test";
import { AuthRequest } from "../api-requests/auth-request";

async function globalTeardown() {
    const userFilePath = "e2etests/utils/userID.txt";

    if (fs.existsSync(userFilePath)) {
        // Create a browser and context
        const browser = await chromium.launch();
        const baseUrl = process.env.BASE_URL;
        const context = await browser.newContext({
            baseURL: baseUrl, // Pass baseURL to the context
            ignoreHTTPSErrors: true,
        });

        // Get the APIRequestContext
        const requestContext: APIRequestContext = context.request;

        // Recreate authRequest
        const authRequest = new AuthRequest(requestContext);

        const userID = fs.readFileSync(userFilePath, "utf8");

        try {
            await authRequest.deleteUser(userID);
        } catch (err) {
            console.error(`Failed to delete user: ${err}`);
        } finally {
            await browser.close();
        }
    }
}

export default globalTeardown;