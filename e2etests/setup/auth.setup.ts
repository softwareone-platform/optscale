import {expect} from "@playwright/test";
import {test as setup} from "../fixtures/api-fixture";
import path from "path";
import fs from "fs";

setup.only('API Login and save token', async ({ authRequest }) => {
    const tokenFilePath = path.resolve('e2etests/.auth/authToken.json');
    fs.writeFileSync(tokenFilePath, await authRequest.getAuthorizationToken(`${process.env.FINOPS_USER_EMAIL}`, `${process.env.FINOPS_USER_PASSWORD}`), 'utf8');
});
