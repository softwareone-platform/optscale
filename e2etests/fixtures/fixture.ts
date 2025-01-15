import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { Header } from '../pages/header';
import { HomePage } from '../pages/home-page';
import { MainMenu } from '../pages/main-menu';
import {RecommendationsPage} from "../pages/recommendations-page";
import { ResourcesPage } from '../pages/resources-page';
import {PoolsPage} from "../pages/pools-page";
import {ExpensesPage} from "../pages/expenses-page";
import {AnomaliesPage} from "../pages/anomalies-page";
import {PoliciesPage} from "../pages/policies-page";
import {TaggingPoliciesPage} from "../pages/tagging-policies-page";
import {UsersPage} from "../pages/users-page";
import {CloudAccountsPage} from "../pages/cloud-accounts-page";
import {EventsPage} from "../pages/events-page";
import {SettingsPage} from "../pages/settings-page";
import {PerspectivesPage} from "../pages/perspectives-page";

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

const test = base.extend<{
    anomaliesPage: AnomaliesPage;
    cloudAccountsPage: CloudAccountsPage;
    eventsPage: EventsPage;
    expensesPage: ExpensesPage;
    header: Header;
    homePage: HomePage;
    loginPage: LoginPage;
    mainMenu: MainMenu;
    perspectivesPage: PerspectivesPage;
    policiesPage: PoliciesPage;
    poolsPage: PoolsPage;
    recommendationsPage: RecommendationsPage;
    resourcesPage: ResourcesPage;
    settingsPage: SettingsPage;
    taggingPoliciesPage: TaggingPoliciesPage;
    usersPage: UsersPage;
    token: string; // Add token as a fixture
}>({
    // Token fixture
    token: async ({ request }, use) => {
        const token = await generateToken(request); // Dynamically generate the token
        await use(token);
    },
    anomaliesPage: async ({ page, token }, use) => {
        const anomaliesPage = new AnomaliesPage(page);
        await anomaliesPage.setupRouting(token);
        await use(anomaliesPage);
    },
    cloudAccountsPage: async ({ page, token }, use) => {
        const cloudAccountsPage = new CloudAccountsPage(page);
        await cloudAccountsPage.setupRouting(token);
        await use(cloudAccountsPage);
    },
    eventsPage: async ({ page, token }, use) => {
        const eventsPage = new EventsPage(page);
        await eventsPage.setupRouting(token);
        await use(eventsPage);
    },
    expensesPage: async ({ page, token }, use) => {
        const expensesPage = new ExpensesPage(page);
        await expensesPage.setupRouting(token);
        await use(expensesPage);
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
    loginPage: async ({ page, token }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.setupRouting(token); // Inject token into routing
        await use(loginPage);
    },
    mainMenu: async ({ page, token }, use) => {
        const mainMenu = new MainMenu(page);
        await mainMenu.setupRouting(token);
        await use(mainMenu);
    },
    perspectivesPage: async ({ page, token }, use) => {
        const perspectivesPage = new PerspectivesPage(page);
        await perspectivesPage.setupRouting(token);
        await use(perspectivesPage);
    },
    policiesPage: async ({ page, token }, use) => {
        const policiesPage = new PoliciesPage(page);
        await policiesPage.setupRouting(token);
        await use(policiesPage);
        },
    poolsPage: async ({ page, token }, use) => {
        const poolsPage = new PoolsPage(page);
        await poolsPage.setupRouting(token);
        await use(poolsPage);
    },
    recommendationsPage: async ({ page, token }, use) => {
        const recommendationsPage = new RecommendationsPage(page);
        await recommendationsPage.setupRouting(token);
        await use(recommendationsPage);
    },
    resourcesPage: async ({ page, token }, use) => {
        const resourcesPage = new ResourcesPage(page);
        await resourcesPage.setupRouting(token);
        await use(resourcesPage);
    },
    settingsPage: async ({ page, token }, use) => {
        const settingsPage = new SettingsPage(page);
        await settingsPage.setupRouting(token);
        await use(settingsPage);
    },
    taggingPoliciesPage: async ({ page, token }, use) => {
        const taggingPoliciesPage = new TaggingPoliciesPage(page);
        await taggingPoliciesPage.setupRouting(token);
        await use(taggingPoliciesPage);
    },
    usersPage: async ({ page, token }, use) => {
        const usersPage = new UsersPage(page);
        await usersPage.setupRouting(token);
        await use(usersPage);
    },
});

export default test;
