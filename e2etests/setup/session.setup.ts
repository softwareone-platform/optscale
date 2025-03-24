import {test as setup} from "../fixtures/page-fixture";
import {EStorageState} from "../utils/enums";

setup("authenticate-default-user", async ({loginPage}) => {
    await setup.step('Login as FinOps user', async () => {
        const email = process.env.DEFAULT_USER_EMAIL;
        const password = process.env.DEFAULT_USER_PASSWORD;
        await loginPage.login(email, password);
        await loginPage.page.context().storageState({path: `${EStorageState.defaultUser}`});
    })
});