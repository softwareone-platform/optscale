import {test} from "../fixtures/page.fixture";
import {debugLog} from "../utils/debug-logging";
import {getExpectedDateRangeText, getThisMonthUnixDateRange} from "../utils/date-range-utils";
import {expect} from "@playwright/test";
import {ExpensesResponse} from "../types/api-response.types";

test.describe("Expenses Page Tests", { tag: ["@ui", "@expenses"] }, () => {
    test.describe.configure({mode: 'default'});
    test.use({restoreSession: true});

    const defaultDateRange = getExpectedDateRangeText('this month');
    let dateRangeReset = false;
    const name = 'SoftwareOne (Test Environment)';

    test.beforeEach('Navigate to Expenses Page', async ({expensesPage, datePicker}) => {
        await expensesPage.navigateToURL();
        await expensesPage.waitForPageLoaderToDisappear();
        await expensesPage.waitForCanvas();
        const dateRange = await datePicker.selectedDateText.textContent();
        debugLog(`Current date range on Expenses Page: ${dateRange}`);

        if (!dateRange.includes(defaultDateRange)) {
            await datePicker.selectThisMonthDateRange();
            dateRangeReset = true;
        }
    });

    test('Verify default Expenses Page layout', async ({expensesPage}) => {
        await expect(expensesPage.downloadButton).toBeVisible();
        expect(dateRangeReset).toBe(false);
        expect(await expensesPage.evaluateActiveButton(expensesPage.dailyBtn)).toBe(true);
        await expect(expensesPage.seeExpensesBreakdownGrid).toBeVisible();
        await expect(expensesPage.sourceBtn).toBeVisible();
        await expect(expensesPage.poolBtn).toBeVisible();
        await expect(expensesPage.ownerBtn).toBeVisible();
        await expect(expensesPage.geographyBtn).toBeVisible();
    });

    test.only('Validate API default chart data', async ({expensesPage}) => {
        const { startDate, endDate } = getThisMonthUnixDateRange();
        let expensesData: ExpensesResponse;

        await test.step('Load expenses data for the this month', async () => {
            const [expensesResponse] = await Promise.all([
                expensesPage.page.waitForResponse((resp) =>
                    resp.url().includes('/pools_expenses/' ) && resp.request().method() === 'GET'
                ),
                expensesPage.page.reload(),
            ]);

            expensesData = await expensesResponse.json();
        });

        await test.step('Validate expenses date range and breakdown type', async () => {
            expect.soft(expensesData.expenses.total).toBeGreaterThan(0);
            expect.soft(expensesData.expenses.name).toBe(name);

            const breakdown = expensesData.expenses.breakdown;
            const breakdownKeys = Object.keys(breakdown).map(Number).sort((a, b) => a - b);

            // Check first and last keys match startDate and endDate
            expect(breakdownKeys[0]).toBe(startDate);
            expect(breakdownKeys[breakdownKeys.length - 1]).toBe(endDate);

            // Check there is a breakdown for each day in the range
            expect(breakdownKeys.length).toBe((endDate - startDate) / 86400 + 1);

            // Check each breakdown value is a number (including 0)
            for (const key of breakdownKeys) {
                expect(typeof breakdown[key]).toBe('number');
            }
        });

    });

})