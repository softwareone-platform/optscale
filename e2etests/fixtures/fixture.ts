import {test as base} from "@playwright/test";
import {LoginPage} from "../pages/login-page";
import {Header} from "../pages/header";
import {getToken} from "../utils/auth-helpers";
import {HomePage} from "../pages/home-page";
import {MainMenu} from "../pages/main-menu";

const token = getToken();

const test = base.extend<{
    loginPage: LoginPage;
    header: Header;
    homePage: HomePage;
    mainMenu: MainMenu;

}>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.setupRouting(token);
        await use(loginPage);
    },
    header: async ({page}, use) => {
        const header = new Header(page);
        await header.setupRouting(token);
        await use(header);
    },
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await homePage.setupRouting(token);
        await use(homePage);
    },
    mainMenu: async ({page}, use) => {
        const mainMenu = new MainMenu(page);
        await mainMenu.setupRouting(token);
        await use(mainMenu);
    },
});

export default test;