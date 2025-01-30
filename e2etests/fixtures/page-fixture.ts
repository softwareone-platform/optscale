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
import {ResourceDetailsPage} from "../pages/resource-details-page";


export const test = base.extend<{
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
    resourceDetailsPage: ResourceDetailsPage;
    settingsPage: SettingsPage;
    taggingPoliciesPage: TaggingPoliciesPage;
    usersPage: UsersPage;
}>({
    anomaliesPage: async ({ page }, use) => {
        const anomaliesPage = new AnomaliesPage(page);
        await use(anomaliesPage);
    },
    cloudAccountsPage: async ({ page }, use) => {
        const cloudAccountsPage = new CloudAccountsPage(page);
        await use(cloudAccountsPage);
    },
    eventsPage: async ({ page }, use) => {
        const eventsPage = new EventsPage(page);
        await use(eventsPage);
    },
    expensesPage: async ({ page }, use) => {
        const expensesPage = new ExpensesPage(page);
        await use(expensesPage);
    },
    header: async ({ page }, use) => {
        const header = new Header(page);
        await use(header);
    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({ page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    mainMenu: async ({ page }, use) => {
        const mainMenu = new MainMenu(page);
        await use(mainMenu);
    },
    perspectivesPage: async ({ page }, use) => {
        const perspectivesPage = new PerspectivesPage(page);
        await use(perspectivesPage);
    },
    policiesPage: async ({ page}, use) => {
        const policiesPage = new PoliciesPage(page);
        await use(policiesPage);
        },
    poolsPage: async ({ page}, use) => {
        const poolsPage = new PoolsPage(page);
        await use(poolsPage);
    },
    recommendationsPage: async ({ page }, use) => {
        const recommendationsPage = new RecommendationsPage(page);
        await use(recommendationsPage);
    },
    resourcesPage: async ({ page}, use) => {
        const resourcesPage = new ResourcesPage(page);
        await use(resourcesPage);
    },
    resourceDetailsPage: async ({ page}, use) => {
        const resourceDetailsPage = new ResourceDetailsPage(page);
        await use(resourceDetailsPage);
    },
    settingsPage: async ({ page}, use) => {
        const settingsPage = new SettingsPage(page);
        await use(settingsPage);
    },
    taggingPoliciesPage: async ({ page}, use) => {
        const taggingPoliciesPage = new TaggingPoliciesPage(page);
        await use(taggingPoliciesPage);
    },
    usersPage: async ({ page}, use) => {
        const usersPage = new UsersPage(page);
        await use(usersPage);
    },
});


