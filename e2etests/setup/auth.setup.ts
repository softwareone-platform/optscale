import {expect} from "@playwright/test";
import {test as setup} from "../fixtures/api-fixture";
import path from "path";
import fs from "fs";
import {AuthRequest} from "../api-requests/auth-request";
import {generateRandomEmail} from "../utils/random-data";

let userToken: string;
let userID: string;

setup.only('API Login and save token', async ({ authRequest }) => {
    const email = generateRandomEmail();
    // const tokenFilePath = path.resolve('e2etests/.auth/authToken.txt');
    // fs.writeFileSync(tokenFilePath, await authRequest.getAuthorizationToken(`${process.env.STEVE_EMAIL}`, `${process.env.STEVE_PASSWORD}`), 'utf8');
    // const token = await authRequest.getAuthorizationToken(`${process.env.DEFAULT_USER_EMAIL}`, `${process.env.DEFAULT_USER_PASSWORD}`);
    const user = (await authRequest.createUser(email, 'password#1234', 'Test User'));
    userID = JSON.parse(user).id;
    userToken = JSON.parse(user).token;
    await authRequest.deleteUser(userID);
});
