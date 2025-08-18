import {test} from "../fixtures/page-fixture";
import {restoreUserSessionInLocalForage} from "../utils/auth-storage/localforage-service";
import {expect} from "@playwright/test";
import {expectWithinDrift} from "../utils/custom-assertions";

const neutralColor = 'rgb(0, 0, 0)'; // Default color for neutral state
const warningColor = 'rgb(232, 125, 30)'; // Default color for warning state
const errorColor = 'rgb(187, 20, 37)'; // Default color for error state
const successColor = 'rgb(0, 120, 77)'; // Default color for success state

test.describe('[MPT-12743] Pools Tests', {tag: ["@ui", "@pool"]}, () => {
    test.describe.configure({mode: 'serial'}); // Ensure tests run in serial to avoid state conflicts

    test.beforeEach(async ({page, poolsPage}) => {
        await restoreUserSessionInLocalForage(page);
        await poolsPage.navigateToURL();
        await poolsPage.waitForPageLoaderToDisappear();
        if(await poolsPage.getColumnBadgeText() !== 'All') await poolsPage.selectAllColumns();
        await poolsPage.expandMoreIcon.waitFor();
        await poolsPage.waitForPageLoaderToDisappear();
    });

    test('[] Verify Organization limit, Pools Expenses and Forecast this month match totals in the table', async ({poolsPage}) => {
        test.fail(await poolsPage.getPoolCount() !== 1, `Expected 1 pool, but found ${await poolsPage.getPoolCount()}`);

        let organizationLimitValue: number;
        let expensesThisMonthValue: number;
        let forecastThisMonthValue: number;

        await test.step('Get Organization Limit, Expenses This Month, and Forecast This Month values', async () => {
            organizationLimitValue = await poolsPage.getOrganizationLimitValue();
            expensesThisMonthValue = await poolsPage.getExpensesThisMonth();
            forecastThisMonthValue = await poolsPage.getForecastThisMonth();
            console.log (`Organization Limit: ${organizationLimitValue}, Expenses This Month: ${expensesThisMonthValue}, Forecast This Month: ${forecastThisMonthValue}`);
        })

        await test.step('Verify Organisation Limit matches the table', async () => {
            if (organizationLimitValue === 0) {
                const limit = await poolsPage.column2.textContent();
                console.log('No organization limit set');
                expect(limit).toBe('-');
            } else {
                const limit = await poolsPage.getPoolLimitFromTable();
                console.log(`Organization Limit: ${organizationLimitValue}`);
                expect(limit).toEqual(organizationLimitValue);
            }
        });

        await test.step('Verify Expenses This Month matches the table', async () => {
            const expenses = await poolsPage.getExpensesThisMonthFromTable();
            expect (expenses).toEqual(expensesThisMonthValue);
        });

        await test.step('Verify Forecast This Month matches the table', async () => {
            const forecast = await poolsPage.getForecastThisMonthFromTable();
            expect(forecast).toEqual(forecastThisMonthValue);
        });

        await test.step('Verify sub-pools expenses match total pool expenses', async () => {
            const subPoolsExpenses = await poolsPage.sumSubPoolTotals('expenses this month');
            console.log(`Sub-pools expenses: ${subPoolsExpenses}`);
            expectWithinDrift(subPoolsExpenses, expensesThisMonthValue, 0.0001);
        });

        await test.step('Verify sub-pools forecast match total pool forecast', async () => {
            const subPoolsForecast = await poolsPage.sumSubPoolTotals('forecast this month');
            console.log(`Sub-pools forecast: ${subPoolsForecast}`);
            expectWithinDrift(subPoolsForecast, forecastThisMonthValue, 0.0001);
        });
    });

    test('[] Verify Organisation Limit functionality - limit not set', async ({poolsPage}) => {
        test.skip(await poolsPage.getExpensesThisMonth() <= 1, 'Skipping test as it requires expenses to be greater than 1');
        let organizationLimitValue = await poolsPage.getOrganizationLimitValue();

        await test.step('Remove organisation limit is it is set.', async () => {
            if (organizationLimitValue !== 0) {
                await poolsPage.editMonthlyLimit(0);
                organizationLimitValue = 0;
                console.log('Removed organization limit');
            }
        });

        await test.step('Assert Pools page elements displayed correctly when limit not set', async () => {
            await expect(poolsPage.exceededLimitCard).not.toBeVisible();
            expect(await poolsPage.getColorFromElement(poolsPage.expensesCard)).toBe(errorColor);
            await expect(poolsPage.expensesThisMonthCancelIcon).toBeVisible();
            expect(await poolsPage.getColorFromElement(poolsPage.forecastCard)).toBe(errorColor);
            await expect(poolsPage.forecastThisMonthCancelIcon).toBeVisible();
            expect (await poolsPage.poolTableRow.getAttribute('style')).toContain('border-left: 4px solid transparent;');
            expect (await poolsPage.column2.textContent()).toBe('-');
            expect (await poolsPage.getColorFromElement(poolsPage.column3)).toBe(neutralColor);
            expect (await poolsPage.getColorFromElement(poolsPage.column4)).toBe(neutralColor);
        });
    });

});