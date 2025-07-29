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
import {getExpectedDateRangeText, getLast7DaysUnixRange, unixToDateString} from "../utils/date-range-utils";
import {
    DataSourceExpensesResponse,
    K8sNamespaceExpensesResponse,
    K8sNodeExpensesResponse, K8sServiceExpensesResponse,
    OwnerExpensesResponse,
    PoolExpensesResponse,
    RegionExpensesResponse,
    ResourceTypeExpensesResponse,
    ServiceNameExpensesResponse,
    ServiceNameResourceResponse,
    TagsResponse
} from "../test-data/test-data-response-types";
import {fetchBreakdownExpenses} from "../utils/api-helpers";


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

    test("[230776] Possible savings matches those on recommendations page", async ({resourcesPage, recommendationsPage}) => {
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

    test("[230778] All expected filters are displayed", async ({resourcesPage}) => {
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
                await expect.soft(filter).toBeVisible();
            }
        });
    })

    test("[230779] Verify table column selection", async ({resourcesPage}) => {
        const defaultColumns = [
            resourcesPage.resourceTableHeading, resourcesPage.expensesTableHeading, resourcesPage.paidNetworkTrafficTableHeading,
            resourcesPage.metadataTableHeading, resourcesPage.poolOwnerTableHeading, resourcesPage.typeTableHeading, resourcesPage.tagsTableHeading
        ];

        await test.step('Verify default column selection is all', async () => {
            await resourcesPage.table.waitFor();
            await resourcesPage.table.scrollIntoViewIfNeeded();
            await expect(resourcesPage.columnsBtn).toHaveText('All');

            for (const column of defaultColumns) {
                await expect.soft(column).toBeVisible();
            }
        });

        await test.step('Clear all columns and verify only Resource and expenses columns are visible', async () => {
            await resourcesPage.clickColumnsButton();
            await resourcesPage.clickColumnToggle('select clear all');
            await expect.soft(resourcesPage.resourceTableHeading && resourcesPage.expensesTableHeading).toBeVisible();
            for (const column of defaultColumns) {
                if (column !== resourcesPage.resourceTableHeading && column !== resourcesPage.expensesTableHeading) {
                    await expect.soft(column).not.toBeVisible();
                }
            }
        });

        await test.step('Select specific columns and verify visibility', async () => {
            await resourcesPage.clickColumnToggle('paid network traffic');
            await expect(resourcesPage.paidNetworkTrafficTableHeading).toBeVisible();

            await resourcesPage.clickColumnToggle('metadata');
            await expect(resourcesPage.metadataTableHeading).toBeVisible();

            await resourcesPage.clickColumnToggle('pool owner');
            await expect(resourcesPage.poolOwnerTableHeading).toBeVisible();

            await resourcesPage.clickColumnToggle('type');
            await expect(resourcesPage.typeTableHeading).toBeVisible();

            await resourcesPage.clickColumnToggle('location');
            await expect(resourcesPage.locationToggle).toBeVisible();

            await resourcesPage.clickColumnToggle('tags');
            await expect(resourcesPage.tagsTableHeading).toBeVisible();
        });

        await test.step('Verify select all toggle shows all columns', async () => {
            await resourcesPage.clickColumnToggle('select clear all');
            for (const column of defaultColumns) {
                if (column !== resourcesPage.resourceTableHeading && column !== resourcesPage.expensesTableHeading) {
                    await expect.soft(column).not.toBeVisible();
                }
            }

            await resourcesPage.clickColumnToggle('select clear all');
            for (const column of defaultColumns) {
                await expect.soft(column).toBeVisible();
            }
        });
    });

    test("[230780] Unfiltered Total expenses matches table itemised total", {tag: '@slow'}, async ({resourcesPage}) => {
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

    test("[230788] Filtered Total expenses matches table itemised total", {tag: '@slow'}, async ({resourcesPage}) => {
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

    test("[230781] Total expenses matches table itemised total for date range set to last 7 days", {tag: '@slow'}, async ({resourcesPage}) => {
        test.setTimeout(90000);

        await test.step('Get total expenses value for last 7 days', async () => {
            await resourcesPage.selectLast7DaysDateRange();
            await expect(resourcesPage.selectedDateText).toHaveText(getExpectedDateRangeText('Last 7 days'));
            totalExpensesValue = await resourcesPage.getTotalExpensesValue();
            console.log(`Total expenses value for last 7 days: ${totalExpensesValue}`);
        });

        await test.step('Get itemised total from table for last 7 days', async () => {
            await expect(resourcesPage.expensesTableHeading).toContainText(getExpectedDateRangeText('Last 7 days'));
            itemisedTotal = await resourcesPage.sumTableCurrencyColumn(resourcesPage.tableExpensesValue, resourcesPage.navigateNextIcon);
            console.log(`Itemised total for last 7 days: ${itemisedTotal}`);
        });

        await test.step('Compare total expenses with itemised total for last 7 days', async () => {
            // Allowable drift of 0.1% to account for rounding errors
            expectWithinDrift(totalExpensesValue, itemisedTotal, 0.001); // 0.1% tolerance
        });
    });

    test('[230782] Validate API default chart/table data for 7 days', async ({resourcesPage}) => {
        const {startDate, endDate} = getLast7DaysUnixRange();

        let expensesData: ServiceNameExpensesResponse;
        await test.step('Load expenses data for the last 7 days', async () => {
            const [expensesResponse] = await Promise.all([
                resourcesPage.page.waitForResponse((resp) =>
                    resp.url().includes('/breakdown_expenses')
                ),
                resourcesPage.selectLast7DaysDateRange(),
            ]);

            expensesData = await expensesResponse.json();
        });

        await test.step('Validate expenses date range and breakdown type', async () => {
            expect.soft(expensesData.start_date).toBe(startDate);
            expect.soft(expensesData.end_date).toBe(endDate);
            expect.soft(expensesData.breakdown_by).toBe('service_name');
            expect.soft(expensesData.breakdown).not.toBeNull();
        });

        await test.step('Validate expenses breakdown covers correct 7-day range', async () => {
            const expectedDates = Array.from({length: 7}, (_, i) => startDate + i * 86400);
            const responseDates = Object.keys(expensesData.breakdown).map(Number);
            expect.soft(responseDates.sort()).toEqual(expectedDates.sort());
        });

        await test.step('Validate structure of expenses counts', async () => {
            for (const summary of Object.values(expensesData.counts)) {
                expect.soft(typeof summary.total).toBe('number');
                expect.soft(typeof summary.previous_total).toBe('number');
            }
        });

        let resourceData: ServiceNameResourceResponse;
        await test.step('Load resources data from resources_count endpoint', async () => {
            const [resourceResponse] = await Promise.all([
                resourcesPage.page.waitForResponse((resp) =>
                    resp.url().includes('/resources_count') && resp.status() === 200
                ),
                resourcesPage.clickResourceCountTab(),
            ]);

            resourceData = await resourceResponse.json();
        });

        await test.step('Validate resource chart metadata and breakdown type', async () => {
            expect.soft(resourceData.start_date).toBe(startDate);
            expect.soft(resourceData.end_date).toBe(endDate);
            expect.soft(resourceData.breakdown_by).toBe('service_name');
            expect.soft(resourceData.breakdown).not.toBeNull();
        });

        await test.step('Validate structure of resource counts', async () => {
            for (const summary of Object.values(resourceData.counts)) {
                expect.soft(typeof summary.total).toBe('number');
                expect.soft(typeof summary.average).toBe('number');
            }
        });

        let tagsData: TagsResponse;
        await test.step('Load tags data from breakdown_tags endpoint', async () => {
            const [tagResponse] = await Promise.all([
                resourcesPage.page.waitForResponse((resp) =>
                    resp.url().includes('/breakdown_tags') && resp.status() === 200
                ),
                resourcesPage.clickTagsTab(),
            ]);

            tagsData = await tagResponse.json();
        });

        await test.step('Validate structure of tag breakdown items', async () => {
            expect.soft(Array.isArray(tagsData.breakdown)).toBe(true);

            tagsData.breakdown.forEach((item) => {
                expect.soft(typeof item.count).toBe('number');
                expect.soft(typeof item.cost).toBe('number');
                expect.soft(typeof item.tag === 'string' || item.tag === null).toBe(true);
            });
        });
    });

    test('[230783] Validate API data for the daily expenses chart by breakdown for 7 days', async ({resourcesPage}) => {
        test.setTimeout(60000);
        const {startDate, endDate} = getLast7DaysUnixRange();

        await test.step('Set last 7 days date range', async () => {
            await resourcesPage.selectLast7DaysDateRange();
        });

        let regionExpensesData: RegionExpensesResponse;
        await test.step('Load region expenses data', async () => {
            regionExpensesData = await fetchBreakdownExpenses<RegionExpensesResponse>(
                resourcesPage.page,
                'region',
                resourcesPage.selectCategorizeBy.bind(resourcesPage),
                'Region'
            );
        });

        await test.step('Validate region expenses data', async () => {
            expect.soft(regionExpensesData.start_date).toBe(startDate);
            expect.soft(regionExpensesData.end_date).toBe(endDate);
            expect.soft(regionExpensesData.breakdown_by).toBe('region');
            expect.soft(regionExpensesData.breakdown).not.toBeNull();
            expect.soft(regionExpensesData.previous_range_start).not.toBeNull();
            expect.soft(regionExpensesData.total).toBeGreaterThan(0);
        });

        await test.step('Validate that breakdown covers exactly 7 days', async () => {
            const breakdownDays = Object.keys(regionExpensesData.breakdown);
            expect.soft(breakdownDays.length).toBe(7);

            const expectedDays = Array.from({length: 7}, (_, i) => (startDate + i * 86400).toString());
            expect.soft(breakdownDays.sort()).toEqual(expectedDays.sort());
        });

        await test.step('Validate regional breakdown structure for each day', async () => {
            for (const [timestamp, regions] of Object.entries(regionExpensesData.breakdown)) {
                expect.soft(typeof regions).toBe('object');

                for (const [region, entry] of Object.entries(regions)) {
                    expect.soft(typeof entry.cost).toBe('number');
                    expect.soft(entry.cost).not.toBeNaN();
                    expect.soft(entry.cost).toBeGreaterThanOrEqual(0);
                }
            }
        });

        let resourceTypeExpensesData: ResourceTypeExpensesResponse;
        await test.step('Load resource type expenses data', async () => {
            resourceTypeExpensesData = await fetchBreakdownExpenses<ResourceTypeExpensesResponse>(
                resourcesPage.page,
                'resource_type',
                resourcesPage.selectCategorizeBy.bind(resourcesPage),
                'Resource type'
            );
        });

        await test.step('Validate resource type expenses top-level data', async () => {
            expect.soft(resourceTypeExpensesData.start_date).toBe(startDate);
            expect.soft(resourceTypeExpensesData.end_date).toBe(endDate);
            expect.soft(resourceTypeExpensesData.breakdown_by).toBe('resource_type');
            expect.soft(resourceTypeExpensesData.breakdown).not.toBeNull();
            expect.soft(resourceTypeExpensesData.previous_range_start).not.toBeNull();
            expect.soft(resourceTypeExpensesData.total).toBeGreaterThan(0);
        });

        await test.step('Validate resource type counts structure', async () => {
            for (const summary of Object.values(resourceTypeExpensesData.counts)) {
                expect.soft(typeof summary.total).toBe('number');
                expect.soft(typeof summary.previous_total).toBe('number');
            }
        });

        await test.step('Validate resource type daily breakdown structure', async () => {
            const breakdown = resourceTypeExpensesData.breakdown;
            const responseDates = Object.keys(breakdown).map(Number);
            const expectedDates = Array.from({length: 7}, (_, i) => startDate + i * 86400);
            expect.soft(responseDates.sort()).toEqual(expectedDates.sort());

            for (const [day, typeMap] of Object.entries(breakdown)) {
                for (const [resourceType, data] of Object.entries(typeMap)) {
                    expect.soft(data).toHaveProperty('cost');
                    expect.soft(typeof data.cost).toBe('number');
                }
            }
        });

        let dataSourceExpensesData: DataSourceExpensesResponse;
        await test.step('Load data source expenses data', async () => {
            dataSourceExpensesData = await fetchBreakdownExpenses<DataSourceExpensesResponse>(
                resourcesPage.page,
                'cloud_account_id',
                resourcesPage.selectCategorizeBy.bind(resourcesPage),
                'Data source'
            );
        });

        await test.step('Validate data source expenses top-level fields', async () => {
            expect.soft(dataSourceExpensesData.start_date).toBe(startDate);
            expect.soft(dataSourceExpensesData.end_date).toBe(endDate);
            expect.soft(dataSourceExpensesData.breakdown_by).toBe('cloud_account_id');
            expect.soft(dataSourceExpensesData.previous_range_start).not.toBeNull();
            expect.soft(dataSourceExpensesData.total).toBeGreaterThan(0);
            expect.soft(dataSourceExpensesData.counts).not.toBeNull();
            expect.soft(dataSourceExpensesData.breakdown).not.toBeNull();
        });

        await test.step('Validate data source counts structure', async () => {
            for (const summary of Object.values(dataSourceExpensesData.counts)) {
                expect.soft(typeof summary.total).toBe('number');
                expect.soft(typeof summary.previous_total).toBe('number');
                expect.soft(typeof summary.id).toBe('string');
                expect.soft(typeof summary.name).toBe('string');
                expect.soft(typeof summary.type).toBe('string');
            }
        });

        await test.step('Validate data source breakdown structure for each day', async () => {
            const breakdown = dataSourceExpensesData.breakdown;
            const responseDates = Object.keys(breakdown).map(Number);
            const expectedDates = Array.from({length: 7}, (_, i) => startDate + i * 86400);
            expect.soft(responseDates.sort()).toEqual(expectedDates.sort());

            for (const [day, sourceMap] of Object.entries(breakdown)) {
                for (const [sourceId, item] of Object.entries(sourceMap)) {
                    expect.soft(typeof item.cost).toBe('number');
                    expect.soft(typeof item.id).toBe('string');
                    expect.soft(typeof item.name).toBe('string');
                    expect.soft(typeof item.type).toBe('string');
                }
            }
        });

        let ownerExpensesData: OwnerExpensesResponse;
        await test.step('Load owner expenses data', async () => {
            ownerExpensesData = await fetchBreakdownExpenses<OwnerExpensesResponse>(
                resourcesPage.page,
                'employee_id',
                resourcesPage.selectCategorizeBy.bind(resourcesPage),
                'Owner'
            );
        });

        await test.step('Validate owner expenses top-level fields', async () => {
            expect.soft(ownerExpensesData.start_date).toBe(startDate);
            expect.soft(ownerExpensesData.end_date).toBe(endDate);
            expect.soft(ownerExpensesData.breakdown_by).toBe('employee_id');
            expect.soft(ownerExpensesData.previous_range_start).not.toBeNull();
            expect.soft(ownerExpensesData.total).toBeGreaterThan(0);
            expect.soft(ownerExpensesData.previous_total).toBeGreaterThanOrEqual(0);
            expect.soft(ownerExpensesData.counts).not.toBeNull();
            expect.soft(ownerExpensesData.breakdown).not.toBeNull();
        });

        await test.step('Validate owner counts structure', async () => {
            for (const summary of Object.values(ownerExpensesData.counts)) {
                expect.soft(typeof summary.total).toBe('number');
                expect.soft(typeof summary.previous_total).toBe('number');
                expect.soft(typeof summary.id).toBe('string');
                expect.soft(typeof summary.name).toBe('string');
            }
        });

        await test.step('Validate owner breakdown structure for each day', async () => {
            const breakdown = ownerExpensesData.breakdown;
            const responseDates = Object.keys(breakdown).map(Number);
            const expectedDates = Array.from({ length: 7 }, (_, i) => startDate + i * 86400);
            expect.soft(responseDates.sort()).toEqual(expectedDates.sort());

            for (const [day, ownerMap] of Object.entries(breakdown)) {
                for (const [ownerId, item] of Object.entries(ownerMap)) {
                    expect.soft(typeof item.cost).toBe('number');
                    expect.soft(typeof item.id).toBe('string');
                    expect.soft(typeof item.name).toBe('string');
                }
            }
        });

        let poolExpensesData: PoolExpensesResponse;
        await test.step('Load pool expenses data', async () => {
            poolExpensesData = await fetchBreakdownExpenses<PoolExpensesResponse>(
                resourcesPage.page,
                'pool_id',
                resourcesPage.selectCategorizeBy.bind(resourcesPage),
                'Pool'
            );
        });

        await test.step('Validate pool expenses top-level fields', async () => {
            expect.soft(poolExpensesData.start_date).toBe(startDate);
            expect.soft(poolExpensesData.end_date).toBe(endDate);
            expect.soft(poolExpensesData.breakdown_by).toBe('pool_id');
            expect.soft(poolExpensesData.previous_range_start).not.toBeNull();
            expect.soft(poolExpensesData.total).toBeGreaterThan(0);
            expect.soft(poolExpensesData.counts).not.toBeNull();
            expect.soft(poolExpensesData.breakdown).not.toBeNull();
        });

        await test.step('Validate pool counts structure', async () => {
            for (const summary of Object.values(poolExpensesData.counts)) {
                expect.soft(typeof summary.total).toBe('number');
                expect.soft(typeof summary.previous_total).toBe('number');
                expect.soft(typeof summary.id).toBe('string');
                expect.soft(typeof summary.name).toBe('string');
                expect.soft(typeof summary.purpose).toBe('string');
            }
        });

        await test.step('Validate pool breakdown structure for each day', async () => {
            const breakdown = poolExpensesData.breakdown;
            const responseDates = Object.keys(breakdown).map(Number);
            const expectedDates = Array.from({ length: 7 }, (_, i) => startDate + i * 86400);
            expect.soft(responseDates.sort()).toEqual(expectedDates.sort());

            for (const [day, poolMap] of Object.entries(breakdown)) {
                for (const [poolId, item] of Object.entries(poolMap)) {
                    expect.soft(typeof item.cost).toBe('number');
                    expect.soft(typeof item.id).toBe('string');
                    expect.soft(typeof item.name).toBe('string');
                    expect.soft(typeof item.purpose).toBe('string');
                }
            }
        });

        let k8sNodeExpensesData: K8sNodeExpensesResponse;
        await test.step('Load K8s node expenses data', async () => {
            k8sNodeExpensesData = await fetchBreakdownExpenses<K8sNodeExpensesResponse>(
                resourcesPage.page,
                'k8s_node',
                resourcesPage.selectCategorizeBy.bind(resourcesPage),
                'K8s node'
            );
        });

        await test.step('Validate K8s Node expenses top-level fields', async () => {
            expect.soft(k8sNodeExpensesData.start_date).toBe(startDate);
            expect.soft(k8sNodeExpensesData.end_date).toBe(endDate);
            expect.soft(k8sNodeExpensesData.previous_range_start).not.toBeNull();
            expect.soft(k8sNodeExpensesData.total).toBeGreaterThan(0);
            expect.soft(k8sNodeExpensesData.previous_total).toBeGreaterThanOrEqual(0);
            expect.soft(k8sNodeExpensesData.breakdown_by).toBe('k8s_node');
            expect.soft(k8sNodeExpensesData.counts).not.toBeNull();
            expect.soft(k8sNodeExpensesData.breakdown).not.toBeNull();
        });

        await test.step('Validate K8s Node counts structure', async () => {
            for (const summary of Object.values(k8sNodeExpensesData.counts)) {
                expect.soft(typeof summary.total).toBe('number');
                expect.soft(typeof summary.previous_total).toBe('number');
            }
        });

        await test.step('Validate K8s Node breakdown structure for each day', async () => {
            const breakdown = k8sNodeExpensesData.breakdown;
            const responseDates = Object.keys(breakdown).map(Number);
            const expectedDates = Array.from({ length: 7 }, (_, i) => startDate + i * 86400);
            expect.soft(responseDates.sort()).toEqual(expectedDates.sort());

            for (const [day, nodeMap] of Object.entries(breakdown)) {
                for (const [nodeKey, data] of Object.entries(nodeMap)) {
                    expect.soft(data).toHaveProperty('cost');
                    expect.soft(typeof data.cost).toBe('number');
                    expect.soft(data.cost).toBeGreaterThanOrEqual(0);
                }
            }
        });

        let k8sNamespaceExpensesData: K8sNamespaceExpensesResponse;
        await test.step('Load K8s namespace expenses data', async () => {
            k8sNamespaceExpensesData = await fetchBreakdownExpenses<K8sNamespaceExpensesResponse>(
                resourcesPage.page,
                'k8s_namespace',
                resourcesPage.selectCategorizeBy.bind(resourcesPage),
                'K8s namespace'
            );
        });

        await test.step('Validate K8s namespace expenses top-level fields', async () => {
            expect.soft(k8sNamespaceExpensesData.start_date).toBe(startDate);
            expect.soft(k8sNamespaceExpensesData.end_date).toBe(endDate);
            expect.soft(k8sNamespaceExpensesData.breakdown_by).toBe('k8s_namespace');
            expect.soft(k8sNamespaceExpensesData.total).toBeGreaterThan(0);
            expect.soft(k8sNamespaceExpensesData.previous_range_start).toBeGreaterThan(0);
            expect.soft(k8sNamespaceExpensesData.previous_total).toBeGreaterThanOrEqual(0);
            expect.soft(k8sNamespaceExpensesData.counts).not.toBeNull();
            expect.soft(k8sNamespaceExpensesData.breakdown).not.toBeNull();
        });

        await test.step('Validate K8s namespace counts structure', async () => {
            for (const [ns, summary] of Object.entries(k8sNamespaceExpensesData.counts)) {
                expect.soft(typeof summary.total).toBe('number');
                expect.soft(typeof summary.previous_total).toBe('number');
            }
        });

        await test.step('Validate K8s namespace breakdown structure for each day', async () => {
            const breakdown = k8sNamespaceExpensesData.breakdown;
            const responseDates = Object.keys(breakdown).map(Number);
            const expectedDates = Array.from({length: 7}, (_, i) => startDate + i * 86400);
            expect.soft(responseDates.sort()).toEqual(expectedDates.sort());

            for (const [day, namespaceMap] of Object.entries(breakdown)) {
                for (const [ns, item] of Object.entries(namespaceMap)) {
                    expect.soft(typeof item.cost).toBe('number');
                    expect.soft(item.cost).toBeGreaterThanOrEqual(0);
                }
            }
        });

        let k8sServiceExpensesData: K8sServiceExpensesResponse;
        await test.step('Load K8s service expenses data', async () => {
            k8sServiceExpensesData = await fetchBreakdownExpenses<K8sServiceExpensesResponse>(
                resourcesPage.page,
                'k8s_service',
                resourcesPage.selectCategorizeBy.bind(resourcesPage),
                'K8s service'
            );
        });

        await test.step('Validate K8s service expenses top-level fields', async () => {
            expect.soft(k8sServiceExpensesData.start_date).toBe(startDate);
            expect.soft(k8sServiceExpensesData.end_date).toBe(endDate);
            expect.soft(k8sServiceExpensesData.breakdown_by).toBe('k8s_service');
            expect.soft(k8sServiceExpensesData.previous_range_start).not.toBeNull();
            expect.soft(k8sServiceExpensesData.total).toBeGreaterThan(0);
            expect.soft(k8sServiceExpensesData.previous_total).toBeGreaterThanOrEqual(0);
            expect.soft(k8sServiceExpensesData.counts).not.toBeNull();
            expect.soft(k8sServiceExpensesData.breakdown).not.toBeNull();
        });

        await test.step('Validate K8s service counts structure', async () => {
            for (const summary of Object.values(k8sServiceExpensesData.counts)) {
                expect.soft(typeof summary.total).toBe('number');
                expect.soft(typeof summary.previous_total).toBe('number');
            }
        });

        await test.step('Validate K8s service breakdown structure for each day', async () => {
            const breakdown = k8sServiceExpensesData.breakdown;
            const responseDates = Object.keys(breakdown).map(Number);
            const expectedDates = Array.from({ length: 7 }, (_, i) => startDate + i * 86400);
            expect.soft(responseDates.sort()).toEqual(expectedDates.sort());

            for (const [day, serviceMap] of Object.entries(breakdown)) {
                for (const [serviceId, item] of Object.entries(serviceMap)) {
                    expect.soft(typeof item.cost).toBe('number');
                    expect.soft(item.cost).toBeGreaterThanOrEqual(0);
                }
            }
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
            await resourcesPage.navigateToURL('/resources');
            await resourcesPage.waitForPageLoaderToDisappear();
            await resourcesPage.waitForCanvas();
            if (await resourcesPage.resetFiltersBtn.isVisible()) await resourcesPage.resetFilters();
        });
    });

    test('[230784] Verify default service daily expenses chart export with and without legend', {tag: "@p1"}, async ({resourcesPage}) => {
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

    test('[230785] Verify weekly and monthly expenses chart export', async ({resourcesPage}) => {
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

    test('[230786] Verify expenses chart export with different categories', async ({resourcesPage}) => {
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

    test("[230787] Verify table grouping", async ({resourcesPage}) => {
        await test.step('Verify default grouping is None', async () => {
            await resourcesPage.table.waitFor();
            await resourcesPage.table.scrollIntoViewIfNeeded();
            await expect(resourcesPage.groupedByValue).toHaveText('None');
        });

        await test.step('Group by Pool and verify grouping', async () => {
            await resourcesPage.groupBy('Pool');
            await expect(resourcesPage.firstPoolGroup).toBeVisible();
            await expect(resourcesPage.firstPoolGroup).toContainText('CPA (QA and Production)');
        });

        await test.step('Group by Owner and verify grouping', async () => {
            await resourcesPage.groupBy('Owner');
            await expect(resourcesPage.firstOwnerGroup).toBeVisible();
            await expect(resourcesPage.firstOwnerGroup).toContainText('Francesco Faraone');
        });

        await test.step('Group by Tag and verify grouping', async () => {
            await resourcesPage.groupBy('Tag', 'Environment');
            await expect(resourcesPage.firstTagGroup).toBeVisible();
            await expect.soft(resourcesPage.allTagGroups.first()).toContainText('Other');
            await expect.soft(resourcesPage.allTagGroups.nth(1)).toContainText('Production');
            await expect.soft(resourcesPage.allTagGroups.nth(2)).toContainText('QA');
            await expect.soft(resourcesPage.allTagGroups.nth(3)).toContainText('PROD');
        });

        await test.step('Clear grouping and verify no grouping', async () => {
            await resourcesPage.clearGrouping();
            await expect(resourcesPage.groupedByValue).toHaveText('None');
            await expect(resourcesPage.allGroups).not.toBeVisible();
        });
    });

    test.afterAll(async () => {
        await cleanUpDirectoryIfEnabled('tests/downloads');
    });
})