import {test} from "../fixtures/page-fixture";
import {expect} from "@playwright/test";

test.describe.only('Cloud Spend Rebase Tests @cloudspend', () => {
    test.beforeAll(() => {
        expect(process.env.BASE_URL).toBe('https://cloudspend.velasuci.com/');
    })

    test.beforeEach('Login to live-demo', async ({loginPage, header, homePage}) => {
        await loginPage.page.clock.setFixedTime(new Date('2025-01-31T12:00:00Z'));
        await loginPage.loginToLiveDemo(process.env.DEFAULT_USER_EMAIL);
        await header.liveDemoAlert.waitFor();
        await homePage.page.waitForLoadState('networkidle');
    })

    test("Verify Header and Main Menu", async ({header, mainMenu}) => {
        await test.step('Verify header', async () => {
            await expect(header.header).toHaveScreenshot('Header-screenshot.png');
        });

        await test.step('Verify Main Menu', async () => {
            await expect(mainMenu.menu).toHaveScreenshot('MainMenu-screenshot.png');
        });
    })

    test('Verify Homepage matches screenshots', async ({homePage}) => {
        await test.step('Verify Home Page content', async () => {

            //Organization Expenses forecast column seems to be recalculated daily so
            await expect(homePage.organizationExpensesBlock).toHaveScreenshot('OrganizationExpensesBlock-screenshot.png');
            await expect(homePage.topResourcesBlock).toHaveScreenshot('TopResourcesBlock-screenshot.png');
            await expect(homePage.recommendationsBlock).toHaveScreenshot('RecommendationsBlock-screenshot.png');

            // Although the data is fixed the display values for "Last check" values are dynamic so we can't match the screenshot 100%
            await expect(homePage.policyViolationsBlock).toHaveScreenshot('PolicyViolationsBlock-screenshot.png');
            await expect(homePage.poolsRequiringAttentionBlock).toHaveScreenshot('PoolsRequiringAttentionBlock-screenshot.png');
        });
    })

    test('Verify Recommendations page matches screenshots', async ({mainMenu, recommendationsPage}) => {
        await test.step('Navigate to Recommendations page', async () => {
            await mainMenu.clickRecommendations();
        });

        await test.step('Verify Recommendations page content - cards', async () => {
            await recommendationsPage.clickCardsButtonIfNotActive();

            //Dynamic values check time data are not fixed so we can't match the screenshot 100%
            await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-cards-screenshot.png');
            await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-cards-savings-screenshot.png');
            await expect(recommendationsPage.firstCard).toHaveScreenshot('Recommendations-cards-first-card-screenshot.png');
        });

        await test.step('Verify Recommendations page content - table', async () => {
            await recommendationsPage.clickTableButton();
            //Dynamic values check time data are not fixed so we can't match the screenshot 100%
            await expect(recommendationsPage.main).toHaveScreenshot('Recommendations-table-selected-screenshot.png');
            await expect(recommendationsPage.possibleMonthlySavingsDiv).toHaveScreenshot('Recommendations-cards-savings-screenshot.png');
            await expect(recommendationsPage.table).toHaveScreenshot('Recommendations-table--screenshot.png');
        });
    })

    test('Verify Resources page matches screenshots', async ({mainMenu, resourcesPage}) => {
        await test.step('Navigate to Resources page', async () => {
            await mainMenu.clickResources();
        });
        await test.step('Set date range', async () => {
            await resourcesPage.selectPreviousDateRange('Dec', '2024', '1', '31');
        });

        await test.step('Verify Resources page on landing', async () => {
            await resourcesPage.waitForCanvas();
            await resourcesPage.searchInput.waitFor();
            await resourcesPage.resourcesHeading.hover();
            await expect(resourcesPage.main).toHaveScreenshot('Resources-landing-screenshot.png');
        });

        await test.step('Verify Resources page breakdown by expenses', async () => {
            await resourcesPage.clickCardsExpensesIfNotActive();
            await resourcesPage.resourcesHeading.hover();
            await resourcesPage.expensesBreakdownChart.waitFor();
            await resourcesPage.waitForCanvas();
            await expect(resourcesPage.expensesBreakdownChart).toHaveScreenshot('Resources-expenses-chart-screenshot.png');
        });

        await test.step('Verify Resources page breakdown by resource count', async () => {
            await resourcesPage.resourceCountBtn.click();
            await resourcesPage.resourcesHeading.hover();
            await resourcesPage.resourceCountBreakdownChart.waitFor();
            await resourcesPage.waitForCanvas();
            await expect(resourcesPage.resourceCountBreakdownChart).toHaveScreenshot('Resources-resource-count-chart-screenshot.png');
        });

        await test.step('Verify Resources page breakdown by tags', async () => {
            await resourcesPage.tagsBtn.click();
            await resourcesPage.resourcesHeading.hover();
            await resourcesPage.tagsBreakdownChart.waitFor();
            await resourcesPage.waitForCanvas();
            await expect(resourcesPage.tagsBreakdownChart).toHaveScreenshot('Resources-tags-chart-screenshot.png');
        });
    })

    test('Verify Resource details page matches screenshots', async ({
                                                                        mainMenu,
                                                                        resourcesPage,
                                                                        resourceDetailsPage
                                                                    }) => {
        await test.step('Navigate to Resource details page for Sunflower EU Fra', async () => {
            await mainMenu.clickResources();
            await resourcesPage.waitForCanvas();
            await resourcesPage.sunflowerEuFraLinkToDetails.click();
            await resourceDetailsPage.waitForTextContent(resourceDetailsPage.heading, 'Details of sunflower-eu-fra');
        });

        await test.step('Verify Resource details page content - Details tab', async () => {
            if (!await resourceDetailsPage.isTabSelected(resourceDetailsPage.detailsTab)) await resourceDetailsPage.clickDetailsTab();
            await resourceDetailsPage.heading.hover();
            await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-details-tab-screenshot.png', {maxDiffPixelRatio: 0.01});
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
            await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-detailed-screenshot.png', {maxDiffPixelRatio: 0.01});
            // await resourceDetailsPage.clickExpensesPaidNetworkTrafficButton();
            // await resourceDetailsPage.heading.hover();
            // await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-expenses-tab-paid-network-traffic-screenshot.png');
        });

        await test.step('Verify Resource details page content - Recommendations tab', async () => {
            await resourceDetailsPage.clickRecommendationsTab();
            await resourceDetailsPage.heading.hover();
            await expect(resourceDetailsPage.main).toHaveScreenshot('ResourceDetails-recommendations-tab-screenshot.png');
        });
    })

    test('Verify Pools page matches screenshots', async ({poolsPage}) => {
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
        await test.step('Navigate to Expenses page', async () => {
            await expensesPage.navigateToURL(true);
        });

        await test.step('Verify Expenses page content - daily selected', async () => {
            await expensesPage.clickDailyBtnIfNotSelected();
            await expensesPage.expensesHeading.hover();
            await expensesPage.waitForCanvas();
            await expect(expensesPage.main).toHaveScreenshot('Expenses-daily-screenshot.png');
        });

        await test.step('Verify Expenses page content - weekly selected', async () => {
            await expensesPage.clickWeeklyBtn();
            await expensesPage.expensesHeading.hover();
            await expensesPage.waitForCanvas();
            await expect(expensesPage.main).toHaveScreenshot('Expenses-weekly-screenshot.png');
        });

        await test.step('Verify Expenses page content - monthly selected', async () => {
           await expensesPage.clickMonthlyBtn();
           await expensesPage.expensesHeading.hover();
           await expensesPage.waitForCanvas();
           await expect(expensesPage.main).toHaveScreenshot('Expenses-monthly-screenshot.png');
        });
    });

    test('Verify Expenses page breakdowns matches screenshots', async ({expensesPage}) => {
        await test.step('Navigate to Expenses page', async () => {
            await expensesPage.navigateToURL(true);
        });

        await test.step('Verify Expenses page breakdowns - source', async () => {
            await expensesPage.clickSourceBtn();
            await expensesPage.costExploreBreadcrumb.hover();
            await expensesPage.waitForCanvas();
            await expect(expensesPage.main).toHaveScreenshot('Expenses-source-screenshot.png');
        });

        await test.step('Verify Expenses page breakdowns - pool', async () => {
            await expensesPage.clickCostExploreBreadcrumb();
            await expensesPage.clickPoolBtn();
            await expensesPage.costExploreBreadcrumb.hover();
            await expensesPage.waitForCanvas();
            await expect(expensesPage.main).toHaveScreenshot('Expenses-pool-screenshot.png');
        });

        await test.step('Verify Expenses page breakdowns - owner', async () => {
            await expensesPage.clickCostExploreBreadcrumb();
            await expensesPage.clickOwnerBtn();
            await expensesPage.costExploreBreadcrumb.hover();
            await expensesPage.waitForCanvas();
            await expect(expensesPage.main).toHaveScreenshot('Expenses-owner-screenshot.png');
        });
    });
})