import { expect } from '@playwright/test';
import test from "../fixtures/fixture";



test.beforeEach(async ({ loginPage }) => {
  await test.step('Login as FinOps user', async () => {
    const email = process.env.FINOPS_USER_EMAIL;
    const password = process.env.FINOPS_USER_PASSWORD;
    await loginPage.login(email, password);
  });
});

test('Login as FinOps user', async ({ homePage, header }) => {

  await test.step('Verify user is logged as a member of the QA Test Org', async () => {
    // await homePage.navigateToURL(true);
    const organizationName = await header.organizationSelect.innerText();
    expect(organizationName).toContain('QA Test Organization');
  } );
});

test('Verify Main Menu', async ({ mainMenu }) => {
  await test.step('Expand Main Menu', async () => {
    await mainMenu.expandMenu();
  });

  await test.step('Verify Main Menu items', async () => {
    // await mainMenu.navigateToURL(true);
    await expect(mainMenu.homeBtn).toBeVisible();
    await expect(mainMenu.recommendationsBtn).toBeVisible();
    await expect(mainMenu.resourcesBtn).toBeVisible();
    await expect(mainMenu.poolsBtn).toBeVisible();
  } );
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

