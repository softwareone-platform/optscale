import {test as base} from "@playwright/test";
import {LoginPage} from "../pages/login-page";
import {Header} from "../pages/header";

const test = base.extend<{
    loginPage: LoginPage;
    header: Header;
}>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    header: async ({page}, use) => {
        await use(new Header(page));
    },
});

export default test;