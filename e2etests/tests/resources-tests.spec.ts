import {test} from "../fixtures/page-fixture";
import {expect} from "@playwright/test";
import {expectWithinDrift} from "../utils/custom-assertions";

test.describe.only("[] Resources page tests", {tag: ["@ui", "@resources"]}, () => {
    test.skip(process.env.USE_LIVE_DEMO === 'true', "Live demo environment is not supported by these tests");

    let totalExpensesValue: number;
    let itemisedTotal: number;

    test.beforeEach('Login admin user', async ({loginPage, resourcesPage}) => {
        await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
        await resourcesPage.navigateToURL();
        await resourcesPage.waitForPageLoaderToDisappear();
        await resourcesPage.waitForCanvas();
        if(await resourcesPage.resetFiltersBtn.isVisible()) await resourcesPage.resetFilters();
    });

    test("[] Possible savings matches those on recommendations page", async ({resourcesPage, recommendationsPage}) => {
        const resourcesSavings = await resourcesPage.getPossibleMonthlySavingsValue();
        await resourcesPage.clickPossibleSavingsCard();
        const recommendationsSavings = await recommendationsPage.getPossibleMonthlySavingsValue();
        expect (resourcesSavings).toBe(recommendationsSavings);
    })

    test("[] Unfiltered Total expenses matches table itemised total", async ({resourcesPage}) => {
        test.slow();
        totalExpensesValue = await resourcesPage.getTotalExpensesValue();
        console.log(`Total expenses value: ${totalExpensesValue}`);
        itemisedTotal = await resourcesPage.sumTableCurrencyColumn(resourcesPage.tableExpensesValue, resourcesPage.navigateNextIcon);
        console.log(`Itemised total: ${itemisedTotal}`);

        // Allowable drift of 0.1% to account for rounding errors
        expectWithinDrift(totalExpensesValue, itemisedTotal, 0.001); // 0.1% tolerance
    });

    test("[] Filtered Total expenses matches table itemised total", async ({resourcesPage}) => {
        test.slow();
        await resourcesPage.filterByBillingOnly();
        totalExpensesValue = await resourcesPage.getTotalExpensesValue();
        console.log(`Total expenses value: ${totalExpensesValue}`);
        itemisedTotal = await resourcesPage.sumTableCurrencyColumn(resourcesPage.tableExpensesValue, resourcesPage.navigateNextIcon);
        console.log(`Itemised total: ${itemisedTotal}`);

        // Allowable drift of 0.1% to account for rounding errors
        expectWithinDrift(totalExpensesValue, itemisedTotal, 0.001); // 0.1% tolerance
    });

    test("[] Total expenses matches table itemised total for date range set to last 7 days", async ({resourcesPage}) => {
        test.slow();
        await resourcesPage.selectLast7DaysDateRange();
        totalExpensesValue = await resourcesPage.getTotalExpensesValue();
        console.log(`Total expenses value: ${totalExpensesValue}`);
        itemisedTotal = await resourcesPage.sumTableCurrencyColumn(resourcesPage.tableExpensesValue, resourcesPage.navigateNextIcon);
        console.log(`Itemised total: ${itemisedTotal}`);

        // Allowable drift of 0.1% to account for rounding errors
        expectWithinDrift(totalExpensesValue, itemisedTotal, 0.001); // 0.1% tolerance
    });


})