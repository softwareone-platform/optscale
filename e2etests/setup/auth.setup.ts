import {expect} from "@playwright/test";
import {test as setup} from "../fixtures/api-fixture";
import path from "path";
import fs from "fs";
import {AuthRequest} from "../api-requests/auth-request";

setup('API Login and save token', async ({ authRequest }) => {
    // const tokenFilePath = path.resolve('e2etests/.auth/authToken.txt');
    // fs.writeFileSync(tokenFilePath, await authRequest.getAuthorizationToken(`${process.env.STEVE_EMAIL}`, `${process.env.STEVE_PASSWORD}`), 'utf8');
    const token = await authRequest.getAuthorizationToken(`${process.env.DEFAULT_USER_EMAIL}`, `${process.env.DEFAULT_USER_PASSWORD}`);
    // console.log(await authRequest.createUser('testuser1@testemail.com', 'password#1234', 'Test User1'));
    // console.log(await authRequest.deleteUser('b9174fcf-3ec3-4c2c-8cb7-50152ed211b3'));
});
