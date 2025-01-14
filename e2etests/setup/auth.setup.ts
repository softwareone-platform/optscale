import {expect, test as setup} from "@playwright/test";
import {LoginPage} from "../pages/login-page";
import {Header} from "../pages/header";
import {getAccessTokenFromCookies, saveFile} from "../utils/auth-helpers";
import {EStorageState, EUserRole} from "../utils/enums";
import path from "path";
import {AuthResponse} from "../test-data/test-data-types";
import fs from "fs";

setup('API Login and save token', async ({ request }) => {
    const response = await request.post('https://cloudspend.velasuci.com/auth/v2/tokens', {
        data: {
            email: `${process.env.FINOPS_USER_EMAIL}`,
            password: `${process.env.FINOPS_USER_PASSWORD}`,
        },
    });

    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    console.log('Token:', responseBody.token);

    const tokenFilePath = path.resolve('e2etests/.auth/authToken.json');
    fs.writeFileSync(tokenFilePath, JSON.stringify({ token: responseBody.token }), 'utf8');
});
