import { chromium, APIRequestContext } from "@playwright/test";
import { AuthRequest } from "../api-requests/auth-request";
import * as fs from 'fs';
import * as path from 'path';

async function globalTeardown() {
    const cacheDir = path.resolve(__dirname, '../.cache');
    const authResponseFiles = fs.readdirSync(cacheDir).filter(file => file.startsWith('auth-response'));

    console.log(`Global teardown started. Auth response files: ${authResponseFiles}`);

    if (authResponseFiles.length > 0) {
        // Create a browser and context
        const browser = await chromium.launch();
        const baseUrl = process.env.BASE_URL;
        const context = await browser.newContext({
            baseURL: baseUrl, // Pass baseURL to the context
            ignoreHTTPSErrors: process.env.IGNORE_HTTPS_ERRORS === 'true',
        });

        // Get the APIRequestContext
        const requestContext: APIRequestContext = context.request;

        // Recreate authRequest
        const authRequest = new AuthRequest(requestContext);

        try {
            for (const file of authResponseFiles) {
                const filePath = path.join(cacheDir, file);
                const authResponse = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                const userID = authResponse.user_id;

                await authRequest.deleteUser(userID);
                console.log(`User with ID ${userID} deleted`);

                // Delete the auth response file
                fs.unlinkSync(filePath);
                console.log(`Auth response file ${file} deleted`);
            }
        } catch (err) {
            console.error(`Failed to delete user or auth response file: ${err}`);
        } finally {
            await browser.close();
        }
    }
}

export default globalTeardown;
