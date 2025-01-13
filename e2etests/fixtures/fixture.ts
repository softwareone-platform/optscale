import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { Header } from '../pages/header';
import { HomePage } from '../pages/home-page';
import { MainMenu } from '../pages/main-menu';

// Helper to dynamically generate a token
async function generateToken(request: any): Promise<string> {
    const response = await request.post('https://cloudspend.velasuci.com/auth/v2/tokens', {
        data: {
            email: `${process.env.FINOPS_USER_EMAIL}`,
            password: `${process.env.FINOPS_USER_PASSWORD}`,
        },
    });

    if (response.status() !== 201) {
        throw new Error('Failed to generate token');
    }

    const { token } = await response.json();
    return token;
}

// Extend the base test
const test = base.extend<{
    loginPage: LoginPage;
    header: Header;
    homePage: HomePage;
    mainMenu: MainMenu;
    token: string; // Add token as a fixture
}>({
    // Token fixture
    token: async ({ request }, use) => {
        const token = await generateToken(request); // Dynamically generate the token
        await use(token);
    },
    loginPage: async ({ page, token }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.setupRouting(token); // Inject token into routing
        await use(loginPage);
    },
    header: async ({ page, token }, use) => {
        const header = new Header(page);
        await header.setupRouting(token);
        await use(header);
    },
    homePage: async ({ page, token }, use) => {
        const homePage = new HomePage(page);
        await homePage.setupRouting(token);
        await use(homePage);
    },
    mainMenu: async ({ page, token }, use) => {
        const mainMenu = new MainMenu(page);
        await mainMenu.setupRouting(token);
        await use(mainMenu);
    },
});

export default test;
