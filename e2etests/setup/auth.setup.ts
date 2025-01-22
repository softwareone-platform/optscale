import {test as setup} from "../fixtures/api-fixture";
import {generateRandomEmail, generateRandomOrganizationName} from "../utils/random-data";
import {saveUserID} from "../utils/auth-helpers";
import {saveOrganizationId} from "../utils/organization-helpers";
import path from "path";
import fs from "fs";

setup('Create user, organization and user auth token via API', async ({ authRequest, restAPIRequest }) => {
    let email: string;
    const password = process.env.DEFAULT_USER_PASSWORD;
    let userToken: string;



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
        const tokenFilePath = '.cache/authToken.txt';
        fs.writeFileSync(tokenFilePath, await authRequest.getAuthorizationToken(email, password), 'utf8');


    });
});

