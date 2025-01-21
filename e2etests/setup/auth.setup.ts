import {test as setup} from "../fixtures/api-fixture";
import {generateRandomEmail, generateRandomOrganizationName} from "../utils/random-data";
import {saveUserID} from "../utils/auth-helpers";
import {saveOrganizationId} from "../utils/organization-helpers";

setup.only('API Login and save token', async ({ authRequest, restAPIRequest }) => {
    const email = generateRandomEmail();
    const orgName = generateRandomOrganizationName();
    const user = (await authRequest.createUser(email, 'password#1234', 'Test User'));
    const userID = JSON.parse(user).id;
    const userToken = JSON.parse(user).token;
    saveUserID(userID);
    const organization = (await restAPIRequest.createOrganization(userToken, orgName));
    const orgID = JSON.parse(organization).id;
    saveOrganizationId(orgID);
});
