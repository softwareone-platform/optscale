import {expect} from '@playwright/test';
import test from "../fixtures/fixture";


test.beforeEach(async ({loginPage}) => {
    await test.step('Login as FinOps user', async () => {
        const email = process.env.DEFAULT_USER_EMAIL;
        const password = process.env.DEFAULT_USER_PASSWORD;
        await loginPage.login(email, password);
    });
});

test('Login as FinOps user and verify profile data', async ({header}) => {

    await test.step('Verify user name and email', async () => {
        await header.openProfileMenu();
        await expect(header.profileUserName).toHaveText('Test User');
        await expect(header.profileUserEmail).toHaveText('FinOpsTest1@outlook.com');
    });
});

test('Verify connect data banner displayed when no data source', async ({homePage, header}) => {

    await test.step('Verify user is logged as a member of the QA Test Org', async () => {
        // await homePage.navigateToURL(true);
        const organizationName = await header.organizationSelect.innerText();
        expect(organizationName).toContain('QA Test Organization');
    });

    await test.step('Verify no data source connected', async () => {
        await expect(homePage.connectDataSourceBanner).toBeVisible();
    });

    await test.step('Change to organization to Apple and confirm Data Source connected', async () => {
        await header.selectOrganization('Apple Inc');
        await expect(homePage.connectDataSourceBanner).not.toBeVisible();
    });
});

test('Verify Home page objects when data source connected', async ({homePage, header}) => {

    await test.step('Verify user is logged as a member of the Apple Inc Org', async () => {
        const organizationName = await header.organizationSelect.innerText();
        if (!organizationName.includes('Apple Inc')) {
            await header.selectOrganization('Apple Inc');
        }
    });

    await test.step('Verify data source connected', async () => {
        await expect(homePage.connectDataSourceBanner).not.toBeVisible();
    });

    await test.step('Verify Home page elements', async () => {
        await expect(homePage.organizationExpensesBlock).toBeVisible();
        await expect(homePage.recommendationsBlock).toBeVisible();
        await expect(homePage.topResourcesBlock).toBeVisible();
        await expect(homePage.policyViolationsBlock).toBeVisible();
        await expect(homePage.poolsRequiringAttentionBlock).toBeVisible();
    });
});

    test('Verify Main Menu for QA Test Org', async ({mainMenu, header}) => {

        await test.step('Change Organization to QA Test if not set', async () => {
            const organizationName = await header.organizationSelect.innerText();
            if (!organizationName.includes('QA Test Organization')) {
                await header.selectOrganization('QA Test Organization');
            }
        });

        await test.step('Expand Main Menu', async () => {
            await mainMenu.expandMenu();
        });

        await test.step('Verify Main Menu items', async () => {
            // await mainMenu.navigateToURL(true);
            await expect(mainMenu.homeBtn).toBeVisible();
            await expect(mainMenu.recommendationsBtn).toBeVisible();
            await expect(mainMenu.resourcesBtn).toBeVisible();
            await expect(mainMenu.poolsBtn).toBeVisible();
        });

        await test.step('Verify FinOps Menu items', async () => {
            await expect(mainMenu.finOpsBtn).toBeVisible();
            await expect(mainMenu.costExplorerBtn).toBeVisible();
        });

        await test.step('Verify MLOps Menu items', async () => {
            await expect(mainMenu.mlOpsBtn).toBeVisible();
            await expect(mainMenu.tasksBtn).toBeVisible();
            await expect(mainMenu.modelsBtn).toBeVisible();
            await expect(mainMenu.datasetsBtn).toBeVisible();
            await expect(mainMenu.artifactsBtn).toBeVisible();
            await expect(mainMenu.hypertuningBtn).toBeVisible();
            await expect(mainMenu.metricsBtn).toBeVisible();
        });

        await test.step('Verify Policies Menu items', async () => {
            await expect(mainMenu.policiesBtn).toBeVisible();
            await expect(mainMenu.anomaliesBtn).toBeVisible();
            await expect(mainMenu.quotasAndBudgetsBtn).toBeVisible();
            await expect(mainMenu.taggingBtn).toBeVisible();
        });

        await test.step('Verify System Menu items', async () => {
            await expect(mainMenu.systemBtn).toBeVisible();
            await expect(mainMenu.userManagementBtn).toBeVisible();
            await expect(mainMenu.dataSourcesBtn).toBeVisible();
            await expect(mainMenu.eventsBtn).toBeVisible();
            await expect(mainMenu.settingsBtn).toBeVisible();
        });
    });

    test('Verify Main Menu for Apple Inc', async ({mainMenu, header}) => {
        await test.step('Change organization to Apple Inc', async () => {
            await header.selectOrganization('Apple Inc');
        });

        await test.step('Expand Main Menu', async () => {
            await mainMenu.expandMenu();
        });

        await test.step('Verify Main Menu items', async () => {
            // await mainMenu.navigateToURL(true);
            await expect(mainMenu.homeBtn).toBeVisible();
            await expect(mainMenu.recommendationsBtn).toBeVisible();
            await expect(mainMenu.resourcesBtn).toBeVisible();
            await expect(mainMenu.poolsBtn).toBeVisible();
        });
        await test.step('Verify FinOps Menu items', async () => {
            await expect(mainMenu.finOpsBtn).toBeVisible();
            await expect(mainMenu.costExplorerBtn).toBeVisible();
        });
        await test.step('Verify MLOps Menu items not visible', async () => {
            await expect(mainMenu.mlOpsBtn).not.toBeVisible();
            await expect(mainMenu.tasksBtn).not.toBeVisible();
            await expect(mainMenu.modelsBtn).not.toBeVisible();
            await expect(mainMenu.datasetsBtn).not.toBeVisible();
            await expect(mainMenu.artifactsBtn).not.toBeVisible();
            await expect(mainMenu.hypertuningBtn).not.toBeVisible();
            await expect(mainMenu.metricsBtn).not.toBeVisible();
        });
        await test.step('Verify Policies Menu items', async () => {
            await expect(mainMenu.policiesBtn).toBeVisible();
            await expect(mainMenu.anomaliesBtn).toBeVisible();
            await expect(mainMenu.quotasAndBudgetsBtn).toBeVisible();
            await expect(mainMenu.taggingBtn).toBeVisible();
        });
        await test.step('Verify System Menu items', async () => {
            await expect(mainMenu.systemBtn).toBeVisible();
            await expect(mainMenu.userManagementBtn).toBeVisible();
            await expect(mainMenu.dataSourcesBtn).toBeVisible();
            await expect(mainMenu.eventsBtn).toBeVisible();
            await expect(mainMenu.settingsBtn).toBeVisible();
        });
    });

    test('Main menu navigation', async ({homePage, mainMenu, header, poolsPage,
                                                 recommendationsPage, resourcesPage, expensesPage,
                                                 anomaliesPage, policiesPage, taggingPoliciesPage, usersPage,
                                                 cloudAccountsPage, eventsPage, settingsPage}) => {
        await test.step('Select organization Apple Inc', async () => {
            const organizationName = await header.organizationSelect.innerText();
            if (!organizationName.includes('Apple Inc')) {
                await header.selectOrganization('Apple Inc');
            }
        });

        await test.step('Expand Main Menu', async () => {
            await homePage.connectDataSourceBanner.isHidden();
            await mainMenu.expandMenu();
        });

        await test.step('Navigate to Recommendations from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.recommendationsBtn, recommendationsPage.url);
        });

        await test.step('Navigate to Resources from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.resourcesBtn, resourcesPage.url);
        });

        await test.step('Navigate to Pools from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.poolsBtn, poolsPage.url);
        });

        await test.step('Navigate to Expenses from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.costExplorerBtn, expensesPage.url);
        });

        await test.step('Navigate to Anomalies from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.anomaliesBtn, anomaliesPage.url);
        });

        await test.step('Navigate to Policies from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.policiesBtn, policiesPage.url);
        });

        await test.step('Navigate to Tagging Policies from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.taggingBtn, taggingPoliciesPage.url);
        });

        await test.step('Navigate to Users from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.userManagementBtn, usersPage.url);
        });

        await test.step('Navigate to Cloud Accounts from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.dataSourcesBtn, cloudAccountsPage.url);
        });

        await test.step('Navigate to Events from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.eventsBtn, eventsPage.url);
        });

        await test.step('Navigate to Settings from main menu', async () => {
            await mainMenu.assertMenuNavigation(mainMenu.settingsBtn, settingsPage.url);
        });
    });

    test('Select data source, category and applicable service in recommendations', async ({header, homePage, recommendationsPage}) => {
        await test.step('Navigate to recommendations page for Apple Inc', async () => {
            const organizationName = await header.organizationSelect.innerText();
            if (!organizationName.includes('Apple Inc')) {
                await header.selectOrganization('Apple Inc');
            }
            await homePage.recommendationsBtn.click();
        });
    await test.step('Select data source', async () => {
        await recommendationsPage.selectDataSource('swotest02');
    });
    await test.step('Select category', async () => {
        await recommendationsPage.selectCategory('Critical');
    });
    await test.step('Select applicable service', async () => {
            await recommendationsPage.selectApplicableService('Compute');
        });
    });

    test('See all perspectives', async ({homePage, header, perspectivesPage}) => {
        await test.step('Select organization Apple Inc', async () => {
            await header.selectOrganization('Apple Inc');
        });
        await test.step('Select all perspectives', async () => {
            await homePage.selectPerspectives('See all perspectives');
        });
        await test.step('Verify perspectives page', async () => {
            await expect(perspectivesPage.page).toHaveURL(perspectivesPage.url);
            await expect(perspectivesPage.perspectivesHeading).toBeVisible();
        });
    });
