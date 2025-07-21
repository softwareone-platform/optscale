import {test} from "../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {expectWithinDrift} from "../utils/custom-assertions";
import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";
import {
    BreakdownExpensesByServiceResponse,
    SummaryExpensesResponse,
    AvailableFiltersResponse,
    BreakdownExpensesByRegionResponse,
    BreakdownExpensesByResourceTypeResponse,
    BreakdownExpensesByDataSourceResponse,
    BreakdownExpensesByOwnerResponse,
    BreakdownExpensesByPoolResponse,
    BreakdownExpensesByK8sNodeResponse, BreakdownExpensesByK8sNamespaceResponse, BreakdownExpensesByK8sServiceResponse
} from "../test-data/resources-page-data";
import {ResourcesPage} from "../pages/resources-page";
import {comparePngImages} from "../utils/image-comparison";
import {cleanUpDirectoryIfEnabled} from "../utils/test-after-all-utils";


test.describe("[] Resources page tests", {tag: ["@ui", "@resources"]}, () => {
    test.skip(process.env.USE_LIVE_DEMO === 'true', "Live demo environment is not supported by these tests");

    let totalExpensesValue: number;
    let itemisedTotal: number;

    test.beforeEach('Login admin user', async ({loginPage, resourcesPage}) => {
        await test.step('Login admin user', async () => {
            await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
            await resourcesPage.navigateToURL();
            await resourcesPage.waitForPageLoaderToDisappear();
            await resourcesPage.waitForCanvas();
            if (await resourcesPage.resetFiltersBtn.isVisible()) await resourcesPage.resetFilters();
        });
    });

    test("[] Possible savings matches those on recommendations page", async ({resourcesPage, recommendationsPage}) => {
        let resourcesSavings: number;
        let recommendationsSavings: number;

        await test.step('Get resources page possible savings value', async () => {
            resourcesSavings = await resourcesPage.getPossibleMonthlySavingsValue();
        });

        await test.step('Navigate to recommendations page using Possible Savings card', async () => {
            await resourcesPage.clickPossibleSavingsCard();
        });

        await test.step('Compare possible savings with recommendations page', async () => {
            recommendationsSavings = await recommendationsPage.getPossibleMonthlySavingsValue();
            expect(resourcesSavings).toBe(recommendationsSavings);
        });
    })

    test("[] All expected filters are displayed", async ({resourcesPage}) => {
        await test.step('Click Show more filters button', async () => {
            await resourcesPage.clickShowMoreFilters();
            await resourcesPage.showLessFiltersBtn.waitFor();
        });

        await test.step('Verify all filter buttons are displayed', async () => {
            await expect(resourcesPage.allFilterBoxButtons).toHaveCount(20);

            const expectedFilters = [
                resourcesPage.suggestionsFilter,
                resourcesPage.dataSourceFilter,
                resourcesPage.poolFilter,
                resourcesPage.ownerFilter,
                resourcesPage.regionFilter,
                resourcesPage.serviceFilter,
                resourcesPage.resourceTypeFilter,
                resourcesPage.activityFilter,
                resourcesPage.recommendationsFilter,
                resourcesPage.constraintViolationsFilter,
                resourcesPage.firstSeenFilter,
                resourcesPage.lastSeenFilter,
                resourcesPage.tagFilter,
                resourcesPage.withoutTagFilter,
                resourcesPage.paidNetworkTrafficFromFilter,
                resourcesPage.paidNetworkTrafficToFilter,
                resourcesPage.k8sNodeFilter,
                resourcesPage.k8sServiceFilter,
                resourcesPage.k8sNamespaceFilter,
            ];

            for (const filter of expectedFilters) {
                console.log(`Checking visibility of filter: ${filter}`);
                await expect.soft(filter).toBeVisible();
            }
        });
    })

    test("[] Unfiltered Total expenses matches table itemised total", {tag: '@slow'}, async ({resourcesPage}) => {
        test.setTimeout(90000);

        await test.step('Get total expenses value from resources page', async () => {
            totalExpensesValue = await resourcesPage.getTotalExpensesValue();
            console.log(`Total expenses value: ${totalExpensesValue}`);
        });
        await test.step('get the sum of itemised expenses from table', async () => {
            itemisedTotal = await resourcesPage.sumTableCurrencyColumn(resourcesPage.tableExpensesValue, resourcesPage.navigateNextIcon);
            console.log(`Itemised total: ${itemisedTotal}`);
        });

        await test.step('Compare total expenses with itemised total', async () => {
            // Allowable drift of 0.1% to account for rounding errors
            expectWithinDrift(totalExpensesValue, itemisedTotal, 0.001); // 0.1% tolerance
        });
    });

    test("[] Filtered Total expenses matches table itemised total", {tag: '@slow'}, async ({resourcesPage}) => {
        test.setTimeout(90000);
        let initialTotalExpensesValue: number;

        await test.step('Get unfiltered total expenses value', async () => {
            initialTotalExpensesValue = await resourcesPage.getTotalExpensesValue();
        });

        await test.step('Filter by Billing only', async () => {
            await resourcesPage.clickActivityFilterBillingOnlyOptionAndApply();
            await expect(resourcesPage.activityFilter).toContainText('(Billing only)');
        });

        await test.step('Get total expenses value after filtering', async () => {
            totalExpensesValue = await resourcesPage.getTotalExpensesValue();
            console.log(`Total expenses value after filtering: ${totalExpensesValue}`);
        });

        await test.step('Get itemised total from table after filtering', async () => {
            itemisedTotal = await resourcesPage.sumTableCurrencyColumn(resourcesPage.tableExpensesValue, resourcesPage.navigateNextIcon);
            console.log(`Itemised total: ${itemisedTotal}`);
        });

        await test.step('Compare filtered total expenses with itemised total', async () => {
            // Allowable drift of 0.1% to account for rounding errors
            expectWithinDrift(totalExpensesValue, itemisedTotal, 0.001); // 0.1% tolerance
        });

        await test.step('Reset filters to return to unfiltered state', async () => {
            await resourcesPage.resetFilters();
            await expect(resourcesPage.activityFilter).toContainText('(Any)');
        });

        await test.step('Verify total expenses value matches initial value', async () => {
            expect(await resourcesPage.getTotalExpensesValue()).toEqual(initialTotalExpensesValue);
        });
    });

    test("[] Total expenses matches table itemised total for date range set to last 7 days", {tag: '@slow'}, async ({resourcesPage}) => {
        test.setTimeout(90000);

        await test.step('Get total expenses value for last 7 days', async () => {
            await resourcesPage.selectLast7DaysDateRange();
            totalExpensesValue = await resourcesPage.getTotalExpensesValue();
            console.log(`Total expenses value for last 7 days: ${totalExpensesValue}`);
        });

        await test.step('Get itemised total from table for last 7 days', async () => {
            itemisedTotal = await resourcesPage.sumTableCurrencyColumn(resourcesPage.tableExpensesValue, resourcesPage.navigateNextIcon);
            console.log(`Itemised total for last 7 days: ${itemisedTotal}`);
        });

        await test.step('Compare total expenses with itemised total for last 7 days', async () => {
            // Allowable drift of 0.1% to account for rounding errors
            expectWithinDrift(totalExpensesValue, itemisedTotal, 0.001); // 0.1% tolerance
        });
    });
})

async function setupApiInterceptions(resourcesPage: ResourcesPage): Promise<void> {
    const apiInterceptions: IInterceptorConfig[] = [
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/summary_expenses`,
            mockResponse: SummaryExpensesResponse
        },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses\\?.*breakdown_by=service_name`,
            mockResponse: BreakdownExpensesByServiceResponse
        },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses\\?.*breakdown_by=region`,
            mockResponse: BreakdownExpensesByRegionResponse
        },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses\\?.*breakdown_by=resource_type`,
            mockResponse: BreakdownExpensesByResourceTypeResponse
        },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses\\?.*breakdown_by=cloud_account_id`,
            mockResponse: BreakdownExpensesByDataSourceResponse
        },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses\\?.*breakdown_by=employee_id`,
            mockResponse: BreakdownExpensesByOwnerResponse
        },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses\\?.*breakdown_by=pool_id`,
            mockResponse: BreakdownExpensesByPoolResponse
        },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses\\?.*breakdown_by=k8s_node`,
            mockResponse: BreakdownExpensesByK8sNodeResponse
        },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses\\?.*breakdown_by=k8s_namespace`,
            mockResponse: BreakdownExpensesByK8sNamespaceResponse
        },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses\\?.*breakdown_by=k8s_service`,
            mockResponse: BreakdownExpensesByK8sServiceResponse
        },
        // {
        //     page: resourcesPage.page,
        //     urlPattern: `/api$`,
        //     mockResponse: CleanExpensesResponse,
        //     graphQlOperationName: 'CleanExpenses'
        // },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/available_filters`,
            mockResponse: AvailableFiltersResponse
        },
        // {
        //     page: resourcesPage.page,
        //     urlPattern: `/v2/organizations/[^/]+/resources_count`,
        //     mockResponse: ResourcesCountResponse
        // },
        // {
        //     page: this.page,
        //     urlPattern: `/v2/organizations/[^/]+/breakdown_tags`,
        //     mockResponse: BreakdownTagsResponse
        // },
    ];

    await Promise.all(apiInterceptions.map(interceptApiRequest));
}

test.describe("[] Resources page mocked tests", {tag: ["@ui", "@resources"]}, () => {
    test.skip(process.env.USE_LIVE_DEMO === 'true', "Live demo environment is not supported by these tests");

    test.beforeEach('Login admin user', async ({loginPage, resourcesPage}) => {
        await test.step('Login admin user', async () => {
            await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
            await resourcesPage.page.clock.setFixedTime(new Date('2025-07-15T14:40:00Z'));
            await setupApiInterceptions(resourcesPage);
            await resourcesPage.navigateToURL();
            await resourcesPage.waitForPageLoaderToDisappear();
            await resourcesPage.waitForCanvas();
            if (await resourcesPage.resetFiltersBtn.isVisible()) await resourcesPage.resetFilters();
        });
    });

    test('[] Verify default service daily expenses chart export with and without legend', {tag: "@p1"}, async ({resourcesPage}) => {
        let actualPath = 'tests/downloads/expenses-chart-export.png';
        let expectedPath = 'tests/expected/expected-expenses-chart-export.png';
        let diffPath = 'tests/downloads/diff-expenses-chart-export.png';
        let match: boolean;

        await test.step('Verify the default chart is Service Daily Expenses with legend displayed', async () => {
            expect(await resourcesPage.selectedComboBoxOption(resourcesPage.categorizeBySelect)).toBe('Service');
            expect(await resourcesPage.selectedComboBoxOption(resourcesPage.expensesSelect)).toBe('Daily');
            await expect(resourcesPage.showLegend).toBeChecked();
        });

        await test.step('Download the chart with legend and compare with expected chart png', async () => {
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect(match).toBe(true);
        });

        actualPath = 'tests/downloads/expenses-chart-export-without-legend.png';
        expectedPath = 'tests/expected/expected-expenses-chart-export-without-legend.png';
        diffPath = 'tests/downloads/diff-expenses-chart-export-without-legend.png';

        await test.step('Toggle Show Legend and verify the chart without legend', async () => {
            await resourcesPage.clickShowLegend();
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect(match).toBe(true);
        });
    });

    test('[] Verify weekly and monthly expenses chart export', async ({resourcesPage}) => {
        let actualPath = 'tests/downloads/weekly-expenses-chart-export.png';
        let expectedPath = 'tests/expected/expected-weekly-expenses-chart-export.png';
        let diffPath = 'tests/downloads/diff-weekly-expenses-chart-export.png';
        let match: boolean;

        await test.step('Change expenses to Weekly and verify the chart', async () => {
            await resourcesPage.selectExpenses('Weekly');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect(match).toBe(true);
        });

        actualPath = 'tests/downloads/monthly-expenses-chart-export.png';
        expectedPath = 'tests/expected/expected-monthly-expenses-chart-export.png';
        diffPath = 'tests/downloads/diff-monthly-expenses-chart-export.png';

        await test.step('Change expenses to Monthly and verify the chart', async () => {
            await resourcesPage.selectExpenses('Monthly');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect(match).toBe(true);
        });
    })

    test.only('[] Verify expenses chart export with different categories', async ({resourcesPage}) => {
        let actualPath = 'tests/downloads/region-expenses-chart-export.png';
        let expectedPath = 'tests/expected/expected-region-expenses-chart-export.png';
        let diffPath = 'tests/downloads/diff-region-expenses-chart-export.png';
        let match: boolean;

        await test.step('Change categorization to Resource Type and verify the chart', async () => {
            await resourcesPage.selectCategorizeBy('Region');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect.soft(match).toBe(true);
        });

        actualPath = 'tests/downloads/resource-expenses-chart-export.png';
        expectedPath = 'tests/expected/expected-resource-expenses-chart-export.png';
        diffPath = 'tests/downloads/diff-resource-expenses-chart-export.png';

        await test.step('Change categorization to Resource Type and verify the chart', async () => {
            await resourcesPage.selectCategorizeBy('Resource type');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect.soft(match).toBe(true);
        });

        actualPath = 'tests/downloads/data-expenses-chart-export.png';
        expectedPath = 'tests/expected/expected-data-expenses-chart-export.png';
        diffPath = 'tests/downloads/diff-data-expenses-chart-export.png';

        await test.step('Change categorization to Resource Type and verify the chart', async () => {
            await resourcesPage.selectCategorizeBy('Data source');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect.soft(match).toBe(true);
        });

        actualPath = 'tests/downloads/owner-expenses-chart-export.png';
        expectedPath = 'tests/expected/expected-owner-expenses-chart-export.png';
        diffPath = 'tests/downloads/diff-owner-expenses-chart-export.png';

        await test.step('Change categorization to Owner and verify the chart', async () => {
            await resourcesPage.selectCategorizeBy('Owner');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect.soft(match).toBe(true);
        });

        actualPath = 'tests/downloads/pool-expenses-chart-export.png';
        expectedPath = 'tests/expected/expected-pool-expenses-chart-export.png';
        diffPath = 'tests/downloads/diff-pool-expenses-chart-export.png';

        await test.step('Change categorization to Pool and verify the chart', async () => {
            await resourcesPage.selectCategorizeBy('Pool');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect.soft(match).toBe(true);
        });

        actualPath = 'tests/downloads/k8node-expenses-chart-export.png';
        expectedPath = 'tests/expected/expected-k8node-expenses-chart-export.png';
        diffPath = 'tests/downloads/diff-k8node-expenses-chart-export.png';

        await test.step('Change categorization to K8s node and verify the chart', async () => {
            await resourcesPage.selectCategorizeBy('K8s node');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect.soft(match).toBe(true);
        });

        actualPath = 'tests/downloads/k8sservice-expenses-chart-export.png';
        expectedPath = 'tests/expected/expected-k8sservice-expenses-chart-export.png';
        diffPath = 'tests/downloads/diff-k8sservice-expenses-chart-export.png';

        await test.step('Change categorization to K8s service and verify the chart', async () => {
            await resourcesPage.selectCategorizeBy('K8s service');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect.soft(match).toBe(true);
        });

        actualPath = 'tests/downloads/k8snamespace-expenses-chart-export.png';
        expectedPath = 'tests/expected/expected-k8snamespace-expenses-chart-export.png';
        diffPath = 'tests/downloads/diff-k8snamespace-expenses-chart-export.png';

        await test.step('Change categorization to K8s namespace and verify the chart', async () => {
            await resourcesPage.selectCategorizeBy('K8s namespace');
            await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);
            match = await comparePngImages(expectedPath, actualPath, diffPath);
            expect.soft(match).toBe(true);
        });
    });

    test.afterAll(async () => {
        await cleanUpDirectoryIfEnabled('tests/downloads');
    });
})