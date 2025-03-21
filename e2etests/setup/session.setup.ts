import {test as setup} from "../fixtures/page-fixture";
import {EStorageState} from "../utils/enums";

// E2E_TODO: why do we need this auth ?
// setup("authenticate-default-user", async ({loginPage}) => {
//     await setup.step('Login as FinOps user', async () => {
//         const email = process.env.DEFAULT_USER_EMAIL;
//         const password = process.env.DEFAULT_USER_PASSWORD;
//         await loginPage.login(email, password);
//         await loginPage.page.context().storageState({path: `${EStorageState.defaultUser}`});
//     })
// });
