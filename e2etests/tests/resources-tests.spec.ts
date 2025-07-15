import {test} from "../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {expectWithinDrift} from "../utils/custom-assertions";
import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";
import {
    BreakdownExpensesResponse,
    SummaryExpensesResponse,
    AvailableFiltersResponse
} from "../test-data/resources-page-data";
import {ResourcesPage} from "../pages/resources-page";
import path from "path";
import fs from "fs";
import {comparePngImages} from "../utils/image-comparison";


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
            urlPattern: `/v2/organizations/[^/]+/breakdown_expenses`,
            mockResponse: BreakdownExpensesResponse
        },
        // {
        //     page: this.page,
        //     urlPattern: `/v2/organizations/[^/]+/clean_expenses`,
        //     mockResponse: CleanExpensesResponse
        // },
        {
            page: resourcesPage.page,
            urlPattern: `/v2/organizations/[^/]+/available_filters`,
            mockResponse: AvailableFiltersResponse
        }
        // {
        //     page: this.page,
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

test.describe.only("[] Resources page mocked tests", {tag: ["@ui", "@resources"]}, () => {
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

    test('[] Verify chart export', async ({resourcesPage}) => {
        const actualPath = 'tests/downloads/service-chart-export.png';
        const expectedPath = 'tests/expected/expected-service-chart-export.png';
        const diffPath = 'tests/downloads/diff-service-chart-export.png';

        await resourcesPage.downloadFile(resourcesPage.exportChartBtn, actualPath);

        const match = await comparePngImages(expectedPath, actualPath, diffPath);
        expect(match).toBe(true);

    });


})