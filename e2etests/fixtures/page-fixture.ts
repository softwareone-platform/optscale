import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/login-page';
import {Header} from '../pages/header';
import {HomePage} from '../pages/home-page';
import {MainMenu} from '../pages/main-menu';
import {RecommendationsPage} from "../pages/recommendations-page";
import {ResourcesPage} from '../pages/resources-page';
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
import {AnomaliesCreatePage} from "../pages/anomalies-create-page";
import {PoliciesCreatePage} from "../pages/policies-create-page";
import {TaggingPoliciesCreatePage} from "../pages/tagging-policies-create-page";
import {UsersInvitePage} from "../pages/users-invite-page";
import {CloudAccountsConnectPage} from "../pages/cloud-accounts-connect page";
import {RegisterPage} from "../pages/register-page";
import {PendingInvitationsPage} from "../pages/pending-invitations-page";
import {EmailVerificationPage} from "../pages/email-verification-page";
import {S3DuplicateFinderPage} from "../pages/s3-duplicate-finder-page";


export const test = base.extend<{
    anomaliesPage: AnomaliesPage;
    anomaliesCreatePage: AnomaliesCreatePage;
    cloudAccountsPage: CloudAccountsPage;
    cloudAccountsConnectPage: CloudAccountsConnectPage;
    emailVerificationPage: EmailVerificationPage;
    eventsPage: EventsPage;
    expensesPage: ExpensesPage;
    header: Header;
    homePage: HomePage;
    loginPage: LoginPage;
    mainMenu: MainMenu;
    pendingInvitationsPage: PendingInvitationsPage;
    perspectivesPage: PerspectivesPage;
    policiesPage: PoliciesPage;
    policiesCreatePage: PoliciesCreatePage;
    poolsPage: PoolsPage;
    recommendationsPage: RecommendationsPage;
    registerPage: RegisterPage;
    resourcesPage: ResourcesPage;
    resourceDetailsPage: ResourceDetailsPage;
    s3DuplicateFinder: S3DuplicateFinderPage;
    settingsPage: SettingsPage;
    taggingPoliciesPage: TaggingPoliciesPage;
    taggingPoliciesCreatePage: TaggingPoliciesCreatePage;
    usersPage: UsersPage;
    usersInvitePage: UsersInvitePage;
}>({
    anomaliesPage: async ({page}, use) => {
        const anomaliesPage = new AnomaliesPage(page);
        await use(anomaliesPage);
    },
    anomaliesCreatePage: async ({page}, use) => {
        const anomaliesCreatePage = new AnomaliesCreatePage(page);
        await use(anomaliesCreatePage);
    },
    cloudAccountsPage: async ({page}, use) => {
        const cloudAccountsPage = new CloudAccountsPage(page);
        await use(cloudAccountsPage);
    },
    cloudAccountsConnectPage: async ({page}, use) => {
        const cloudAccountsConnectPage = new CloudAccountsConnectPage(page);
        await use(cloudAccountsConnectPage);
    },
    emailVerificationPage: async ({page}, use) => {
        const emailVerificationPage = new EmailVerificationPage(page);
        await use(emailVerificationPage);
    },
    eventsPage: async ({page}, use) => {
        const eventsPage = new EventsPage(page);
        await use(eventsPage);
    },
    expensesPage: async ({page}, use) => {
        const expensesPage = new ExpensesPage(page);
        await use(expensesPage);
    },
    header: async ({page}, use) => {
        const header = new Header(page);
        await use(header);
    },
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    mainMenu: async ({page}, use) => {
        const mainMenu = new MainMenu(page);
        await use(mainMenu);
    },
    pendingInvitationsPage: async ({page}, use) => {
        const pendingInvitationsPage = new PendingInvitationsPage(page);
        await use(pendingInvitationsPage);
    },
    perspectivesPage: async ({page}, use) => {
        const perspectivesPage = new PerspectivesPage(page);
        await use(perspectivesPage);
    },
    policiesPage: async ({page}, use) => {
        const policiesPage = new PoliciesPage(page);
        await use(policiesPage);
    },
    policiesCreatePage: async ({page}, use) => {
        const policiesCreatePage = new PoliciesCreatePage(page);
        await use(policiesCreatePage);
    },
    poolsPage: async ({page}, use) => {
        const poolsPage = new PoolsPage(page);
        await use(poolsPage);
    },
    recommendationsPage: async ({page}, use) => {
        const recommendationsPage = new RecommendationsPage(page);
        await use(recommendationsPage);
    },
    registerPage: async ({page}, use) => {
        const registerPage = new RegisterPage(page);
        await use(registerPage);
    },
    resourcesPage: async ({page}, use) => {
        const resourcesPage = new ResourcesPage(page);
        await use(resourcesPage);
    },
    resourceDetailsPage: async ({page}, use) => {
        const resourceDetailsPage = new ResourceDetailsPage(page);
        await use(resourceDetailsPage);
    },
    s3DuplicateFinder: async ({page}, use) => {
        const s3DuplicateFinderPage = new S3DuplicateFinderPage(page);
        await use(s3DuplicateFinderPage);
    },
    settingsPage: async ({page}, use) => {
        const settingsPage = new SettingsPage(page);
        await use(settingsPage);
    },
    taggingPoliciesPage: async ({page}, use) => {
        const taggingPoliciesPage = new TaggingPoliciesPage(page);
        await use(taggingPoliciesPage);
    },
    taggingPoliciesCreatePage: async ({page}, use) => {
        const taggingPoliciesCreatePage = new TaggingPoliciesCreatePage(page);
        await use(taggingPoliciesCreatePage);
    },
    usersPage: async ({page}, use) => {
        const usersPage = new UsersPage(page);
        await use(usersPage);
    },
    usersInvitePage: async ({page}, use) => {
        const usersInvitePage = new UsersInvitePage(page);
        await use(usersInvitePage);
    },
});


