import {test as base} from '@playwright/test';
import {AnomaliesCreatePage} from "../pages/anomalies-create-page";
import {AnomaliesPage} from "../pages/anomalies-page";
import {CloudAccountsConnectPage} from "../pages/cloud-accounts-connect page";
import {CloudAccountsPage} from "../pages/cloud-accounts-page";
import {EmailVerificationPage} from "../pages/email-verification-page";
import {EventsPage} from "../pages/events-page";
import {ExpensesPage} from "../pages/expenses-page";
import {Header} from '../pages/header';
import {HomePage} from '../pages/home-page';
import {LoginPage} from '../pages/login-page';
import {MainMenu} from '../pages/main-menu';
import {PendingInvitationsPage} from "../pages/pending-invitations-page";
import {PerspectivesPage} from "../pages/perspectives-page";
import {PoliciesCreatePage} from "../pages/policies-create-page";
import {PoliciesPage} from "../pages/policies-page";
import {PoolsPage} from "../pages/pools-page";
import {RecommendationsPage} from "../pages/recommendations-page";
import {RegisterPage} from "../pages/register-page";
import {ResourceDetailsPage} from "../pages/resource-details-page";
import {ResourcesPage} from '../pages/resources-page';
import {RiSpCoveragePage} from "../pages/ri-sp-coverage-page";
import {S3DuplicateFinderPage} from "../pages/s3-duplicate-finder-page";
import {SettingsPage} from "../pages/settings-page";
import {TaggingPoliciesCreatePage} from "../pages/tagging-policies-create-page";
import {TaggingPoliciesPage} from "../pages/tagging-policies-page";
import {UsersInvitePage} from "../pages/users-invite-page";
import {UsersPage} from "../pages/users-page";
import {ExpensesMapPage} from "../pages/expenses-map-page";
import {DatePickerPage} from "../pages/date-picker-page";

import {LiveDemoService} from "../utils/auth-storage/auth-helpers";

/**
 * Extends the base Playwright test fixture with additional page objects.
 *
 * This configuration adds custom fixtures for various pages in the application,
 * allowing tests to access and interact with specific page objects directly.
 * Each fixture initializes the corresponding page object and makes it available
 * for use within the test context.
 *
 * @type {import('@playwright/test').TestType<{
 *   anomaliesPage: AnomaliesPage;
 *   anomaliesCreatePage: AnomaliesCreatePage;
 *   cloudAccountsPage: CloudAccountsPage;
 *   cloudAccountsConnectPage: CloudAccountsConnectPage;
 *   datePicker: DatePickerPage;
 *   emailVerificationPage: EmailVerificationPage;
 *   eventsPage: EventsPage;
 *   expensesPage: ExpensesPage;
 *   header: Header;
 *   homePage: HomePage;
 *   loginPage: LoginPage;
 *   mainMenu: MainMenu;
 *   pendingInvitationsPage: PendingInvitationsPage;
 *   perspectivesPage: PerspectivesPage;
 *   policiesPage: PoliciesPage;
 *   policiesCreatePage: PoliciesCreatePage;
 *   poolsPage: PoolsPage;
 *   recommendationsPage: RecommendationsPage;
 *   registerPage: RegisterPage;
 *   resourcesPage: ResourcesPage;
 *   resourceDetailsPage: ResourceDetailsPage;
 *   riSpCoveragePage: RiSpCoveragePage;
 *   s3DuplicateFinder: S3DuplicateFinderPage;
 *   settingsPage: SettingsPage;
 *   taggingPoliciesPage: TaggingPoliciesPage;
 *   taggingPoliciesCreatePage: TaggingPoliciesCreatePage;
 *   usersPage: UsersPage;
 *   usersInvitePage: UsersInvitePage;
 * }>}.
 */
export const test = base.extend<{
    anomaliesPage: AnomaliesPage;
    anomaliesCreatePage: AnomaliesCreatePage;
    cloudAccountsPage: CloudAccountsPage;
    cloudAccountsConnectPage: CloudAccountsConnectPage;
    datePicker: DatePickerPage;
    emailVerificationPage: EmailVerificationPage;
    eventsPage: EventsPage;
    expensesPage: ExpensesPage;
    expansesMapPage: ExpensesMapPage;
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
    riSpCoveragePage: RiSpCoveragePage;
    s3DuplicateFinder: S3DuplicateFinderPage;
    settingsPage: SettingsPage;
    taggingPoliciesPage: TaggingPoliciesPage;
    taggingPoliciesCreatePage: TaggingPoliciesCreatePage;
    usersPage: UsersPage;
    usersInvitePage: UsersInvitePage;
}>({
    storageState: async ({}, use) => {
        await use(LiveDemoService.getDefaultUserStorageState());
    },
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
    datePicker: async ({page}, use) => {
        const datePicker = new DatePickerPage(page);
        await use(datePicker);
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
    expansesMapPage: async ({page}, use) => {
        const expensesMapPage = new ExpensesMapPage(page);
        await use(expensesMapPage);
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
    riSpCoveragePage: async ({page}, use) => {
        const riSpCoveragePage = new RiSpCoveragePage(page);
        await use(riSpCoveragePage);
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
