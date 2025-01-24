import { test as setup } from "../fixtures/api-fixture";
import {saveToken} from "../utils/auth-helpers";
import {EUserRole} from "../utils/enums";

setup('Create user, organization and user auth token via API', async ({ authRequest, restAPIRequest }) => {
    const email = process.env.DEFAULT_USER_EMAIL;
    const password = process.env.DEFAULT_USER_PASSWORD;
    // let userToken: string;
    //
    // await setup.step('Create User', async () => {
    //     // email = generateRandomEmail();
    //     const user = (await authRequest.createUser(email, password, 'Test User'));
    //     userToken = JSON.parse(user).token;
    // });
    //
    // await setup.step('Create Organization', async () => {
    //     const orgName = generateRandomOrganizationName();
    //     const organization = (await restAPIRequest.createOrganization(userToken, orgName));
    //     const orgID = JSON.parse(organization).id;
    //     saveOrganizationId(orgID);
    // });

    await setup.step('Login to generate token', async () => {
        saveToken(await authRequest.getAuthorizationToken(email, password), EUserRole.defaultUser);
    });
});