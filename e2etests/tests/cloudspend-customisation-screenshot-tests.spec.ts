import {test} from "../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {setLocalforageRoot} from "../utils/localforage-auth";
import {EStorageState} from "../utils/enums";

/**
 * These tests are designed as regression tests to ensure the SWO Finops UI customisation is not broken by merges
 * with Hystax code.
 */

test.use({storageState: EStorageState.liveDemoUser});

test.describe('MPT-7367 Cloudspend screenshot tests @swo_customisation @ui', () => {

  test.beforeEach('Restore live-demo user session', async ({page}) => {
    await setLocalforageRoot(page);
  })

  test("Verify Header and Main Menu", async ({homePage, header, mainMenu}) => {
    await homePage.navigateToURL(true);
    await test.step('Verify header', async () => {
      await expect(header.header).toHaveScreenshot('Header-screenshot.png');
    });

    await test.step('Verify Main Menu', async () => {
      await expect(mainMenu.menu).toHaveScreenshot('MainMenu-screenshot.png');
    });
  })

  test('Verify Homepage matches screenshots', async ({homePage}) => {
    await test.step('Set up test data', async () => {
      await homePage.setupApiInterceptions();
      await homePage.navigateToURL(true);
    });
    await test.step('Verify Home Page content', async () => {
      await expect(homePage.organizationExpensesBlock).toHaveScreenshot('OrganizationExpensesBlock-screenshot.png');
      await expect(homePage.topResourcesBlock).toHaveScreenshot('TopResourcesBlock-screenshot.png');
      await expect(homePage.recommendationsBlock).toHaveScreenshot('RecommendationsBlock-screenshot.png');
      await expect(homePage.policyViolationsBlock).toHaveScreenshot('PolicyViolationsBlock-screenshot.png');
      await expect(homePage.poolsRequiringAttentionBlock).toHaveScreenshot('PoolsRequiringAttentionBlock-screenshot.png');
    });
  })

  test('Verify Recommendations page matches screenshots', async ({recommendationsPage}) => {
    await test.step('Set up test data', async () => {
      await recommendationsPage.setupApiInterceptions();
      await recommendationsPage.navigateToURL(true);
    });

    await test.step('Verify Recommendations page content - cards', async () => {
      await recommendationsPage.clickCardsButtonIfNotActive();
      await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-cards-screenshot.png');
      await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-cards-savings-screenshot.png');
      await expect(recommendationsPage.firstCard).toHaveScreenshot('Recommendations-cards-first-card-screenshot.png');
    });

    await test.step('Verify Recommendations page content - table', async () => {
      await recommendationsPage.clickTableButton();
      await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-table-selected-screenshot.png');
      await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-cards-savings-screenshot.png');
      await expect(recommendationsPage.table).toHaveScreenshot('Recommendations-table--screenshot.png');
    });
  })

  test('Verify Resources page matches screenshots', async ({resourcesPage}) => {
    await test.step('Set up test data', async () => {
      await resourcesPage.setupApiInterceptions();
      await resourcesPage.page.goto('/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true')
    });

    await test.step('Verify Resources page on landing', async () => {
      await resourcesPage.waitForCanvas();
      await resourcesPage.searchInput.waitFor();
      await resourcesPage.heading.hover();
      await expect(resourcesPage.main).toHaveScreenshot('Resources-landing-screenshot.png');
    });

    await test.step('Verify Resources page breakdown by expenses', async () => {
      await resourcesPage.clickCardsExpensesIfNotActive();
      await resourcesPage.heading.hover();
      await resourcesPage.expensesBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await expect(resourcesPage.expensesBreakdownChart).toHaveScreenshot('Resources-expenses-chart-screenshot.png');
    });
    await test.step('Verify Resources page breakdown by tags', async () => {
      await resourcesPage.tagsBtn.click();
      await resourcesPage.heading.hover();
      await resourcesPage.tagsBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await expect(resourcesPage.tagsBreakdownChart).toHaveScreenshot('Resources-tags-chart-screenshot.png');
    });

    await test.step('Verify Resources page breakdown by resource count', async () => {
      await resourcesPage.resourceCountBtn.click();
      await resourcesPage.heading.hover();
      await resourcesPage.resourceCountBreakdownChart.waitFor();
      await resourcesPage.waitForCanvas();
      await expect(resourcesPage.resourceCountBreakdownChart).toHaveScreenshot('Resources-resource-count-chart-screenshot.png');
    });
  })

  test('Verify Resource details page matches screenshots', async ({
                                                                    resourcesPage,
                                                                    resourceDetailsPage
                                                                  }) => {
    await test.step('Set up test data', async () => {
      await resourcesPage.setupApiInterceptions();
      await resourceDetailsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Resource details page for Sunflower EU Fra', async () => {
      await resourcesPage.page.goto('/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true')
      await resourcesPage.waitForCanvas();
      await resourcesPage.sunflowerEuFraLinkToDetails.click();
      await resourceDetailsPage.waitForTextContent(resourceDetailsPage.heading, 'Details of sunflower-eu-fra');
    });

    await test.step('Verify Resource details page content - Details tab', async () => {
      if (!await resourceDetailsPage.isTabSelected(resourceDetailsPage.detailsTab)) await resourceDetailsPage.clickDetailsTab();
      await resourceDetailsPage.heading.hover();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-details-tab-screenshot.png');
    });

    await test.step('Verify Resource details page content - Constraints tab', async () => {
      await resourceDetailsPage.clickConstraintsTab();
      await resourceDetailsPage.heading.hover();
      await resourceDetailsPage.constraintsTable.waitFor();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-constraints-tab-screenshot.png');
    });

    await test.step('Verify Resource details page content - Expenses tab', async () => {
      await resourceDetailsPage.clickExpensesTab();
      await resourceDetailsPage.clickExpensesGroupedButtonIfNotActive();
      await resourceDetailsPage.heading.hover();
      await resourceDetailsPage.waitForCanvas();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-grouped-screenshot.png');
      await resourceDetailsPage.clickExpensesDetailedButton();
      await resourceDetailsPage.heading.hover();
      await resourceDetailsPage.waitForCanvas();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-detailed-screenshot.png');
    });

    await test.step('Verify Resource details page content - Recommendations tab', async () => {
      await resourceDetailsPage.clickRecommendationsTab();
      await resourceDetailsPage.heading.hover();
      await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-recommendations-tab-screenshot.png');
    });
  })

  test('Verify Pools page matches screenshots', async ({poolsPage}) => {
    await test.step('Set up test data', async () => {
      await poolsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Pools page', async () => {
      await poolsPage.navigateToURL(true);
    });

    await test.step('Verify Pools page content', async () => {
      await expect(poolsPage.main).toHaveScreenshot('Pools-landing-screenshot.png');
    });

    await test.step('Verify Pools page with expanded requiring attention', async () => {
      await poolsPage.clickExpandRequiringAttentionBtn();
      await expect(poolsPage.main).toHaveScreenshot('Pools-requiring-attention-expanded-screenshot.png');
    });
  });

  test('Verify Expenses page matches screenshots', async ({expensesPage}) => {
    await test.step('Set up test data', async () => {
      await expensesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Expenses page', async () => {
      await expensesPage.navigateToURL(true);
    });

    await test.step('Verify Expenses page content - daily selected', async () => {
      await expensesPage.clickDailyBtnIfNotSelected();
      await expensesPage.heading.hover();
      await expensesPage.waitForCanvas();
      await expect(expensesPage.main).toHaveScreenshot('Expenses-daily-screenshot.png');
    });

    await test.step('Verify Expenses page content - weekly selected', async () => {
      await expensesPage.clickWeeklyBtn();
      await expensesPage.heading.hover();
      await expensesPage.waitForCanvas();
      await expect(expensesPage.main).toHaveScreenshot('Expenses-weekly-screenshot.png');
    });

    await test.step('Verify Expenses page content - monthly selected', async () => {
      await expensesPage.clickMonthlyBtn();
      await expensesPage.heading.hover();
      await expensesPage.waitForCanvas();
      await expect(expensesPage.main).toHaveScreenshot('Expenses-monthly-screenshot.png');
    });
  });

  test('Verify Expenses page breakdowns matches screenshots', async ({expensesPage}) => {
    await test.step('Set up test data', async () => {
      await expensesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Expenses page', async () => {
      await expensesPage.navigateToURL(true);
    });

    await test.step('Verify Expenses page breakdowns - source', async () => {
      await expensesPage.clickSourceBtn();

      await expensesPage.dataSourceHeading.hover();
      await expensesPage.waitForCanvas();

      await expect(expensesPage.main).toHaveScreenshot('Expenses-source-screenshot.png');

    });

    await test.step('Verify Expenses page breakdowns - pool', async () => {
      await expensesPage.clickCostExploreBreadcrumb();
      await expensesPage.clickPoolBtn();
      await expensesPage.poolHeading.hover();
      await expensesPage.waitForCanvas();
      await expect(expensesPage.main).toHaveScreenshot('Expenses-pool-screenshot.png');
    });

    await test.step('Verify Expenses page breakdowns - owner', async () => {
      await expensesPage.clickCostExploreBreadcrumb();
      await expensesPage.clickOwnerBtn();
      await expensesPage.ownerHeading.hover();
      await expensesPage.waitForCanvas();
      await expect(expensesPage.main).toHaveScreenshot('Expenses-owner-screenshot.png');
    });
  });

  test('Verify Anomalies page matches screenshots', async ({anomaliesPage, anomaliesCreatePage}) => {
    await test.step('Set up test data', async () => {
      await anomaliesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Anomalies page', async () => {
      await anomaliesPage.navigateToURL(true);
    });

    await test.step('Verify Anomalies page content', async () => {
      await anomaliesPage.heading.hover();
      await anomaliesPage.waitForCanvas();
      await expect(anomaliesPage.main).toHaveScreenshot('Anomalies-screenshot.png');
    });

    await test.step('Verify create anomaly page', async () => {
      await anomaliesPage.clickAddBtn();
      await anomaliesCreatePage.withoutTagFilter.waitFor();
      await expect(anomaliesCreatePage.main).toHaveScreenshot('Anomalies-create-screenshot.png');
    });
  })

  test('Verify Policies page matches screenshots', async ({policiesPage, policiesCreatePage}) => {
    await test.step('Set up test data', async () => {
      await policiesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Policies page', async () => {
      await policiesPage.navigateToURL(true);
    });

    await test.step('Verify Policies page content', async () => {
      await policiesPage.heading.hover();
      await expect(policiesPage.main).toHaveScreenshot('Policies-screenshot.png');
    });

    await test.step('Verify create policy page', async () => {
      await policiesPage.clickAddBtn();
      await policiesCreatePage.heading.hover();
      await policiesCreatePage.withoutTagFilter.waitFor();
      await expect(policiesCreatePage.main).toHaveScreenshot('Policies-create-screenshot.png');
    });
  })

  test('Verify Tagging Policies page matches screenshots', async ({
                                                                    taggingPoliciesPage,
                                                                    taggingPoliciesCreatePage
                                                                  }) => {
    await test.step('Set up test data', async () => {
      await taggingPoliciesPage.setupApiInterceptions();
    });

    await test.step('Navigate to Tagging Policies page', async () => {
      await taggingPoliciesPage.navigateToURL(true);
    });

    await test.step('Verify Tagging Policies page content', async () => {
      await taggingPoliciesPage.heading.hover();
      await expect(taggingPoliciesPage.main).toHaveScreenshot('TaggingPolicies-screenshot.png');
    });

    await test.step('Verify create tagging policy page', async () => {
      await taggingPoliciesPage.clickAddBtn();
      await taggingPoliciesCreatePage.k8ServiceFilter.waitFor();
      await taggingPoliciesCreatePage.heading.hover();
      await expect(taggingPoliciesCreatePage.main).toHaveScreenshot('TaggingPolicies-create-screenshot.png');
    });
  })

  test('Verify Users page matches screenshots', async ({usersPage, usersInvitePage}) => {
    await test.step('Set up test data', async () => {
      await usersPage.setupApiInterceptions();
    });

    await test.step('Navigate to Users page', async () => {
      await usersPage.navigateToURL(true);
    });

    await test.step('Verify Users page content', async () => {
      await usersPage.heading.hover();
      await expect(usersPage.main).toHaveScreenshot('Users-screenshot.png');
    });

    await test.step('Verify invite user page', async () => {
      await usersPage.clickInviteBtn();
      await usersInvitePage.heading.hover();
      await expect(usersInvitePage.main).toHaveScreenshot('Users-invite-screenshot.png');
    });
  })

  test('Verify Cloud Account page matches screenshots', async ({cloudAccountsPage, cloudAccountsConnectPage}) => {
    await test.step('Set up test data', async () => {
      await cloudAccountsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Cloud Accounts page', async () => {
      await cloudAccountsPage.navigateToURL(true);
    });

    await test.step('Verify Cloud Accounts page content', async () => {
      await cloudAccountsPage.heading.hover();
      await expect(cloudAccountsPage.main).toHaveScreenshot('CloudAccounts-screenshot.png');
    });

    await test.step('Verify Cloud Accounts connect page - AWS Root', async () => {
      await cloudAccountsPage.clickAddBtn();
      await cloudAccountsConnectPage.clickDataSourceTileIfNotActive(cloudAccountsConnectPage.awsRootBtn);
      await cloudAccountsConnectPage.toggleCheckbox(cloudAccountsConnectPage.automaticallyDetectExistingDataSourcesCheckbox);
      await cloudAccountsConnectPage.heading.hover();

      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-root-screenshot.png');
    });

    await test.step('Verify Cloud Accounts connect page - AWS Linked', async () => {
      await cloudAccountsConnectPage.clickAWSLinkedAccount();
      await cloudAccountsConnectPage.heading.hover();
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-aws-linked-screenshot.png');
    });

    await test.step('Verify Cloud Accounts connect page - Azure Tenant', async () => {
      await cloudAccountsConnectPage.clickAzureTenant();
      await cloudAccountsConnectPage.heading.hover();
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-azure-tenant-screenshot.png');
    });

    await test.step('Verify Cloud Accounts connect page - Azure Subscription', async () => {
      await cloudAccountsConnectPage.clickAzureSubscription();
      await cloudAccountsConnectPage.heading.hover();
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-azure-subscription-screenshot.png');
    });

    await test.step('Verify Cloud Accounts connect page - Google Cloud', async () => {
      await cloudAccountsConnectPage.clickGoogleCloud();
      await cloudAccountsConnectPage.heading.hover();
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-screenshot.png');
    });

    await test.step('Verify Cloud Accounts connect page - Google Cloud Tenant', async () => {
      await cloudAccountsConnectPage.clickGoogleCloudTenant();
      await cloudAccountsConnectPage.heading.hover();
      await expect(cloudAccountsConnectPage.main).toHaveScreenshot('CloudAccounts-connect-google-cloud-tenant-screenshot.png');
    });
  })

  test('Verify Events page matches screenshots', async ({eventsPage}) => {
    await test.step('Set up test data', async () => {
      await eventsPage.setupApiInterceptions();
    });

    await test.step('Navigate to Events page', async () => {
      await eventsPage.navigateToURL(true);
    });

    await test.step('Verify Events page content', async () => {
      await eventsPage.heading.hover();
      await eventsPage.page.waitForTimeout(5000);
      await expect(eventsPage.main).toHaveScreenshot('Events-screenshot.png');
    });
  })
})
