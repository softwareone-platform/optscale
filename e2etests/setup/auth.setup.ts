// import { test as setup } from "../fixtures/api-fixture";
// import {saveAuthResponseData, saveUserID} from "../utils/auth-helpers";
// import {EUserRole} from "../utils/enums";
// import {generateRandomEmail, generateRandomOrganizationName} from "../utils/random-data";
// import {saveOrganizationId} from "../utils/organization-helpers";
//
// setup('Create user, organization and user auth token via API', async ({ authRequest, restAPIRequest }) => {
//     // const email = process.env.DEFAULT_USER_EMAIL;
//     const email = generateRandomEmail();
//     const password = process.env.DEFAULT_USER_PASSWORD;
//     let userToken: string;
//
//     await setup.step('Create User', async () => {
//             const user = await authRequest.createUser(email, password, 'Test User');
//             const body = await user.json();
//             const userID = body.id;
//             userToken = body.token;
//         });
//
//     await setup.step('Create Organization', async () => {
//         const orgName = generateRandomOrganizationName();
//         const organization = (await restAPIRequest.createOrganization(userToken, orgName));
//         const orgID = JSON.parse(organization).id;
//         saveOrganizationId(orgID);
//     });
//
//     await setup.step('Login to save user data', async () => {
//         const response = await authRequest.authorization(email, password);
//         const body = await response.json();
//         await saveAuthResponseData(body, EUserRole.tempUser );
//     });
// });