import {test} from "../../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {restoreUserSessionInLocalForage} from "../../utils/localforge-auth/localforage-service";
import {EStorageState} from "../../utils/enums";
import {roundElementDimensions} from "../utils/roundElementDimensions";

test.describe('FinOps UI Visual Regression @swo_regression', () => {
  test.use({storageState: EStorageState.liveDemoUser});

  test.beforeEach('Restore live-demo user session', async ({page}) => {
    await restoreUserSessionInLocalForage(page);
  })

  test("UI consistency of Header and Main Menu", async ({homePage, header, mainMenu}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await homePage.setupApiInterceptions();
    await homePage.navigateToURL();
    await homePage.waitForAllCanvases();
    await test.step('Header widget', async () => {
      await homePage.screenshotUpdateDelay();
      await roundElementDimensions(header.header);
      await expect(header.header).toHaveScreenshot('Header-screenshot.png');
    });

    await test.step('Main Menu widget', async () => {
      await homePage.screenshotUpdateDelay();
      await roundElementDimensions(mainMenu.menu);
      await expect(mainMenu.menu).toHaveScreenshot('MainMenu-screenshot.png');
    });
  })

  test('Homepage blocks against baseline screenshots', async ({homePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await homePage.setupApiInterceptions();
      await homePage.navigateToURL();
      await homePage.waitForAllCanvases();
      await homePage.screenshotUpdateDelay();
    });
    await test.step('Organization Expenses Block', async () => {
      await roundElementDimensions(homePage.organizationExpensesBlock);
      await expect(homePage.organizationExpensesBlock).toHaveScreenshot('OrganizationExpensesBlock-screenshot.png');
    });
    await test.step('TopResources Block', async () => {
      await roundElementDimensions(homePage.topResourcesBlock);
      await expect(homePage.topResourcesBlock).toHaveScreenshot('TopResourcesBlock-screenshot.png');
    });

    await test.step('Recommendations Block', async () => {
      await roundElementDimensions(homePage.recommendationsBlock);
      await expect(homePage.recommendationsBlock).toHaveScreenshot('RecommendationsBlock-screenshot.png');
    });

    await test.step('PolicyViolations Block', async () => {
      await roundElementDimensions(homePage.policyViolationsBlock);
      await expect(homePage.policyViolationsBlock).toHaveScreenshot('PolicyViolationsBlock-screenshot.png');
    });

    await test.step('Pools Requiring Attention Block', async () => {
      await roundElementDimensions(homePage.poolsRequiringAttentionBlock);
      await expect(homePage.poolsRequiringAttentionBlock).toHaveScreenshot('PoolsRequiringAttentionBlock-screenshot.png');
    });
  });


  test('Recommendations page matches screenshots', async ({recommendationsPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await recommendationsPage.setupApiInterceptions();
      await recommendationsPage.navigateToURL();
    });

    await test.step('Page view cards', async () => {
      await recommendationsPage.clickCardsButtonIfNotActive();
      await recommendationsPage.screenshotUpdateDelay();
      await roundElementDimensions(recommendationsPage.main);
      await roundElementDimensions(recommendationsPage.possibleMonthlySavingsDiv);
      await roundElementDimensions(recommendationsPage.firstCard);
      await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-cards-screenshot.png');
    });

    await test.step('Page view table', async () => {
      await recommendationsPage.clickTableButton();
      await recommendationsPage.screenshotUpdateDelay();
      await roundElementDimensions(recommendationsPage.main);
      await roundElementDimensions(recommendationsPage.possibleMonthlySavingsDiv);
      await roundElementDimensions(recommendationsPage.table);
      await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-table-selected-screenshot.png');
      await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-cards-savings-screenshot.png');
      await expect(recommendationsPage.table).toHaveScreenshot('Recommendations-table--screenshot.png');
    });
  })

  test('Resources page matches screenshots', async ({resourcesPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await resourcesPage.setupApiInterceptions();
      await resourcesPage.navigateToURL();
    });

    await test.step('View type - Default', async () => {
      await resourcesPage.waitForCanvas();
      await resourcesPage.searchInput.waitFor();
      await resourcesPage.heading.hover();
      await resourcesPage.screenshotUpdateDelay();
      await roundElementDimensions(resourcesPage.main);
      await expect(resourcesPage.main).toHaveScreenshot('Resources-landing-screenshot.png');
    });

    await test.step('View type - breakdown by expenses', async () => {
      await resourcesPage.clickCardsExpensesIfNotActive();
      await resourcesPage.heading.hover();
      await resourcesPage.expensesBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await resourcesPage.screenshotUpdateDelay();
      await roundElementDimensions(resourcesPage.expensesBreakdownChart);
      await expect(resourcesPage.expensesBreakdownChart).toHaveScreenshot('Resources-expenses-chart-screenshot.png');
    });

    await test.step('View type - breakdown by tags', async () => {
      await resourcesPage.tagsBtn.click();
      await resourcesPage.heading.hover();
      await resourcesPage.tagsBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await resourcesPage.screenshotUpdateDelay();
      await roundElementDimensions(resourcesPage.tagsBreakdownChart);
      await expect(resourcesPage.tagsBreakdownChart).toHaveScreenshot('Resources-tags-chart-screenshot.png');
    });

    await test.step('View type - breakdown by resource count', async () => {
      await resourcesPage.resourceCountBtn.click();
      await resourcesPage.heading.hover();
      await resourcesPage.resourceCountBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await resourcesPage.screenshotUpdateDelay();
      await roundElementDimensions(resourcesPage.resourceCountBreakdownChart);
      await expect(resourcesPage.resourceCountBreakdownChart).toHaveScreenshot('Resources-resource-count-chart-screenshot.png');
    });
  })

  test('Resource details page matches screenshots', async ({
                                                                             resourcesPage,
                                                                             resourceDetailsPage
                                                                           }) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await resourcesPage.setupApiInterceptions();
      await resourceDetailsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Resource details page for Sunflower EU Fra', async () => {
      await resourcesPage.navigateToURL('/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true');
      await resourcesPage.waitForCanvas();

      // Click on the resource name link in the first row to ensure it exists in the live database before navigating
      await resourcesPage.firstResourceItemInTable.click();
      await roundElementDimensions(resourceDetailsPage.heading);
      await resourceDetailsPage.waitForTextContent(resourceDetailsPage.heading, 'Details of sunflower-eu-fra');
    });

    await test.step('View type - Details tab', async () => {
      if (!await resourceDetailsPage.isTabSelected(resourceDetailsPage.detailsTab)) await resourceDetailsPage.clickDetailsTab();
      await resourceDetailsPage.heading.hover();
      await resourceDetailsPage.screenshotUpdateDelay();
      await roundElementDimensions(resourceDetailsPage.main);
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-details-tab-screenshot.png');
    });

    await test.step('View type - Constraints tab', async () => {
      await resourceDetailsPage.clickConstraintsTab();
      await resourceDetailsPage.heading.hover();
      await resourceDetailsPage.constraintsTable.waitFor();
      await resourceDetailsPage.screenshotUpdateDelay();
      await roundElementDimensions(resourceDetailsPage.main);
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-constraints-tab-screenshot.png');
    });

    await test.step('View type - Expenses tab', async () => {
      await resourceDetailsPage.clickExpensesTab();
      await resourceDetailsPage.clickExpensesGroupedButtonIfNotActive();
      await resourceDetailsPage.heading.hover();
      await resourceDetailsPage.waitForCanvas();
      await resourceDetailsPage.screenshotUpdateDelay();
      await roundElementDimensions(resourceDetailsPage.main);
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-grouped-screenshot.png');
      await resourceDetailsPage.clickExpensesDetailedButton();
      await resourceDetailsPage.heading.hover();
      await resourceDetailsPage.waitForCanvas();
      await resourceDetailsPage.screenshotUpdateDelay();
      await roundElementDimensions(resourceDetailsPage.main);
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-detailed-screenshot.png');
    });

    await test.step('View type - Recommendations tab', async () => {
      await resourceDetailsPage.clickRecommendationsTab();
      await resourceDetailsPage.heading.hover();
      await resourceDetailsPage.screenshotUpdateDelay();
      await roundElementDimensions(resourceDetailsPage.main);
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-recommendations-tab-screenshot.png');
    });
  })

  test('Pools page matches screenshots', async ({poolsPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await poolsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Pools page', async () => {
      await poolsPage.navigateToURL();
    });

    await test.step('View type - Default', async () => {
      await poolsPage.heading.hover();
      await poolsPage.screenshotUpdateDelay();
      await roundElementDimensions(poolsPage.main);
      await expect(poolsPage.main).toHaveScreenshot('Pools-landing-screenshot.png');
    });

    await test.step('View type - with expanded requiring attention', async () => {
      await poolsPage.clickExpandRequiringAttentionBtn();
      await poolsPage.heading.hover();
      await poolsPage.screenshotUpdateDelay();
      await roundElementDimensions(poolsPage.main);
      await expect(poolsPage.main).toHaveScreenshot('Pools-requiring-attention-expanded-screenshot.png');
    });
  });

  test('Expenses page matches screenshots', async ({expensesPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await expensesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Expenses page', async () => {
      await expensesPage.navigateToURL();
    });

    await test.step('View type - daily selected', async () => {
      await expensesPage.clickDailyBtnIfNotSelected();
      await expensesPage.heading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-daily-screenshot.png');
    });

    await test.step('View type - weekly selected', async () => {
      await expensesPage.clickWeeklyBtn();
      await expensesPage.heading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-weekly-screenshot.png');
    });

    await test.step('View type - monthly selected', async () => {
      await expensesPage.clickMonthlyBtn();
      await expensesPage.heading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-monthly-screenshot.png');
    });
  });

  test("Expenses Map page matches screenshots", async ({expansesMapPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await expansesMapPage.setupApiInterceptions();
    await expansesMapPage.navigateToURL();
    await expansesMapPage.heading.hover();
    await expect(expansesMapPage.main).toHaveScreenshot('ExpansesMapPage-screenshot.png');
  })

  test('Expenses page breakdowns matches screenshots', async ({expensesPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await expensesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Expenses page', async () => {
      await expensesPage.navigateToURL();
    });

    await test.step('View type - breakdown by source', async () => {
      await expensesPage.clickSourceBtn();

      await expensesPage.dataSourceHeading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-source-screenshot.png', {threshold: 0.9});

    });

    await test.step('View type- breakdown by pool', async () => {
      await expensesPage.clickCostExploreBreadcrumb();
      await expensesPage.clickPoolBtn();
      await expensesPage.poolHeading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-pool-screenshot.png');
    });

    await test.step('View type - breakdown by owner', async () => {
      await expensesPage.clickCostExploreBreadcrumb();
      await expensesPage.clickOwnerBtn();
      await expensesPage.ownerHeading.hover();
      await expensesPage.waitForCanvas();
      await expensesPage.screenshotUpdateDelay();
      await roundElementDimensions(expensesPage.main);
      await expect(expensesPage.main).toHaveScreenshot('Expenses-owner-screenshot.png');
    });
  });

  test('Anomalies page matches screenshots', async ({anomaliesPage, anomaliesCreatePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await anomaliesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Anomalies page', async () => {
      await anomaliesPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await anomaliesPage.heading.hover();
      await anomaliesPage.waitForCanvas();
      await anomaliesPage.screenshotUpdateDelay();
      await roundElementDimensions(anomaliesPage.main);
      await expect(anomaliesPage.main).toHaveScreenshot('Anomalies-screenshot.png');
    });

    await test.step('Create anomaly page', async () => {
      await anomaliesPage.clickAddBtn();
      await anomaliesPage.page.waitForSelector('[data-testid="btn_suggestion_filter"]', { state: 'visible', timeout: 20000 });
      await anomaliesPage.screenshotUpdateDelay();
      await roundElementDimensions(anomaliesCreatePage.main);
      await expect(anomaliesCreatePage.main).toHaveScreenshot('Anomalies-create-screenshot.png');
    });
  })

  test('Policies page matches screenshots', async ({policiesPage, policiesCreatePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await policiesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Policies page', async () => {
      await policiesPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await policiesPage.heading.hover();
      await policiesPage.screenshotUpdateDelay();
      await roundElementDimensions(policiesPage.main);
      await expect(policiesPage.main).toHaveScreenshot('Policies-screenshot.png');
    });

    await test.step('Create policy page', async () => {
      await policiesPage.clickAddBtn();
      await policiesCreatePage.heading.hover();
      await policiesCreatePage.page.waitForSelector('[data-testid="btn_suggestion_filter"]', { state: 'visible', timeout: 20000 });
      await policiesPage.screenshotUpdateDelay();
      await roundElementDimensions(policiesCreatePage.main);
      await expect(policiesCreatePage.main).toHaveScreenshot('Policies-create-screenshot.png');
    });
  })

  test('Tagging Policies page matches screenshots', async ({
                                                                             taggingPoliciesPage,
                                                                             taggingPoliciesCreatePage
                                                                           }) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await taggingPoliciesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Tagging Policies page', async () => {
      await taggingPoliciesPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await taggingPoliciesPage.heading.hover();
      await taggingPoliciesPage.screenshotUpdateDelay();
      await roundElementDimensions(taggingPoliciesPage.main);
      await expect(taggingPoliciesPage.main).toHaveScreenshot('TaggingPolicies-screenshot.png');
    });

    await test.step('Create tagging policy page', async () => {
      await taggingPoliciesPage.clickAddBtn();
      await taggingPoliciesCreatePage.page.waitForSelector('[data-testid="btn_suggestion_filter"]', { state: 'visible', timeout: 20000 });
      await taggingPoliciesCreatePage.heading.hover();
      await taggingPoliciesPage.screenshotUpdateDelay();
      await roundElementDimensions(taggingPoliciesCreatePage.main);
      await expect(taggingPoliciesCreatePage.main).toHaveScreenshot('TaggingPolicies-create-screenshot.png');
    });
  })

  test('Users page matches screenshots', async ({usersPage, usersInvitePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await usersPage.setupApiInterceptions();
    });

    await test.step('Navigate to Users page', async () => {
      await usersPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await usersPage.heading.hover();
      await usersPage.screenshotUpdateDelay();
      await roundElementDimensions(usersPage.main);
      await expect(usersPage.main).toHaveScreenshot('Users-screenshot.png');
    });

    await test.step('Invite user page', async () => {
      await usersPage.clickInviteBtn();
      await usersPage.screenshotUpdateDelay();
      await roundElementDimensions(usersInvitePage.main);
      await expect(usersInvitePage.main).toHaveScreenshot('Users-invite-screenshot.png');
    });
  })

  test('Cloud Account page matches screenshots', async ({
                                                                          cloudAccountsPage,
                                                                          cloudAccountsConnectPage
                                                                        }) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await cloudAccountsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Cloud Accounts page', async () => {
      await cloudAccountsPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await cloudAccountsPage.heading.hover();
      await cloudAccountsPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsPage.main);
      await expect(cloudAccountsPage.main).toHaveScreenshot('CloudAccounts-screenshot.png');
    });

    await test.step('Connect page - AWS Root', async () => {
      await cloudAccountsPage.clickAddBtn();
      await cloudAccountsConnectPage.clickDataSourceTileIfNotActive(cloudAccountsConnectPage.awsRootBtn);
      await cloudAccountsConnectPage.toggleCheckbox(cloudAccountsConnectPage.automaticallyDetectExistingDataSourcesCheckbox);
      await cloudAccountsConnectPage.heading.hover();
      await cloudAccountsConnectPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsConnectPage.main);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-root-screenshot.png');
    });

    await test.step('Connect page - Azure Tenant', async () => {
      await cloudAccountsConnectPage.clickAzureTenant();
      await cloudAccountsConnectPage.heading.hover();
      await cloudAccountsConnectPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsConnectPage.main);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-azure-tenant-screenshot.png');
    });

    await test.step('Connect page - Google Cloud', async () => {
      await cloudAccountsConnectPage.clickGoogleCloud();
      await cloudAccountsConnectPage.heading.hover();
      await cloudAccountsConnectPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsConnectPage.main);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-screenshot.png');
    });

    await test.step('Connect page - Google Cloud Tenant', async () => {
      await cloudAccountsConnectPage.clickGoogleCloudTenant();
      await cloudAccountsConnectPage.heading.hover();
      await cloudAccountsConnectPage.screenshotUpdateDelay();
      await roundElementDimensions(cloudAccountsConnectPage.main);
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-tenant-screenshot.png');
    });
  })

  test('Events page matches screenshots', async ({eventsPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();
    await test.step('Set up test data', async () => {
      await eventsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Events page', async () => {
      await eventsPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await eventsPage.heading.hover();
      await eventsPage.screenshotUpdateDelay();
      await roundElementDimensions(eventsPage.main);
      await expect(eventsPage.main).toHaveScreenshot('Events-screenshot.png');
    });
  })
})
