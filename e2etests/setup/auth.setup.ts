import {test as setup} from "../fixtures/api-fixture";
import {generateRandomEmail, generateRandomOrganizationName} from "../utils/random-data";
import {saveUserID} from "../utils/auth-helpers";
import {saveOrganizationId} from "../utils/organization-helpers";
import path from "path";
import fs from "fs";

let email: string;
const password = 'password#1234';
let userToken: string;

setup.only('Create user and organization via API login with user to generate token', async ({ authRequest, restAPIRequest }) => {
    await setup.step('Create User', async () => {
        email = generateRandomEmail();
        const user = (await authRequest.createUser(email, password, 'Test User'));
        const userID = JSON.parse(user).id;
        userToken = JSON.parse(user).token;
        saveUserID(userID);
    });
    await setup.step('Create Organization', async () => {
        const orgName = generateRandomOrganizationName();
        const organization = (await restAPIRequest.createOrganization(userToken, orgName));
        const orgID = JSON.parse(organization).id;
        saveOrganizationId(orgID);
    })
    await setup.step('Login to generate token', async () => {
        const tokenFilePath = path.resolve('e2etests/.auth/authToken.txt');
        fs.writeFileSync(tokenFilePath, await authRequest.getAuthorizationToken(email, password), 'utf8');
    });

});

