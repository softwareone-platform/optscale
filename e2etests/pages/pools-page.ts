import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {IInterceptor, apiInterceptors} from "../utils/api-requests/interceptor";
import {AllowedActionsPoolResponse, PoolResponse} from "../mocks";
import {debugLog} from "../utils/debug-logging";

/**
 * Represents the Pools Page.
 * Extends the BasePage class.
 */
export class PoolsPage extends BasePage {
    readonly heading: Locator;
    readonly configureAssignmentRulesBtn: Locator;
    readonly exceededLimitCard: Locator;
    readonly exceededLimitValue: Locator;
    readonly exceededLimitCancelIcon: Locator;
    readonly spentOverLimitValue: Locator;
    readonly organizationLimitValue: Locator;
    readonly expensesCard: Locator;
    readonly expensesThisMonthValue: Locator;
    readonly expensesThisMonthCancelIcon: Locator;
    readonly expensesThisMonthWarningIcon: Locator;
    readonly expensesThisMonthCheckIcon: Locator;
    readonly forecastCard: Locator;
    readonly forecastThisMonthValue: Locator;
    readonly forecastThisMonthCancelIcon: Locator;
    readonly forecastThisMonthCheckIcon: Locator;
    readonly forecastThisMonthWarningIcon: Locator;
    readonly expandRequiringAttentionBtn: Locator;
    readonly columnSelectBtn: Locator;
    readonly columnBadge: Locator;
    readonly simplePopover: Locator;
    readonly clearAllColumnsToggle: Locator;
    readonly selectAllColumnsToggle: Locator;
    readonly monthlyLimitToggle: Locator;
    readonly expensesThisMonthToggle: Locator;
    readonly forecastToggle: Locator;
    readonly ownerToggle: Locator;

    readonly table: Locator;
    readonly nameTableHeading: Locator;
    readonly monthlyLimitTableHeading: Locator;
    readonly expensesThisMonthTableHeading: Locator;
    readonly forecastThisMonthTableHeading: Locator;
    readonly ownerTableHeading: Locator;
    readonly actionsTableHeading: Locator;

    readonly poolTableRow: Locator;
    readonly poolNameColumn: Locator;
    readonly poolColumn2: Locator;
    readonly poolColumn3: Locator;
    readonly column3TextSpan: Locator;
    readonly column3TextDiv: Locator;
    readonly poolColumn4: Locator;
    readonly column4TextSpan: Locator;
    readonly poolActionsColumn: Locator;
    readonly expandMoreIcon: Locator;

    readonly subPoolNameColumn: Locator;
    readonly subPoolColumn2: Locator;
    readonly subPoolColumn3: Locator;
    readonly subPoolColumn4: Locator;
    readonly subPoolActionsColumn: Locator;

    readonly navigateNextIcon: Locator;

    //Edit pools side modal
    readonly sideModal: Locator;
    readonly sideModalEditBtn: Locator;
    readonly sideModalDefaultResourceOwner: Locator;
    readonly sideModalMonthlyLimit: Locator;
    readonly extendParentPoolToggle: Locator;
    readonly sideModalSaveBtn: Locator;
    readonly sideModalCancelBtn: Locator;
    readonly sideModalMonthlyLimitWarningMessage: Locator;
    readonly sideModalCloseBtn: Locator;

    /**
     * Initializes a new instance of the PoolsPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/pools');

        this.heading = this.main.getByTestId('lbl_pool_name');
        this.configureAssignmentRulesBtn = this.main.getByTestId('btn_configure_assignment_rules');
        this.exceededLimitCard = this.getByAnyTestId('card_total_exp', this.main);
        this.spentOverLimitValue = this.exceededLimitCard.locator('//div[.="Spent over limit"]/./following-sibling::div');
        this.exceededLimitValue = this.exceededLimitCard.locator('//div[.="Exceeded limit"]/./following-sibling::div');
        this.exceededLimitCancelIcon = this.getByAnyTestId('CancelIcon', this.exceededLimitCard);
        this.organizationLimitValue = this.main.locator('//div[.="Organization limit"]/./following-sibling::div');
        this.expensesCard = this.getByAnyTestId('card_expenses', this.main);
        this.expensesThisMonthValue = this.expensesCard.locator('//div[.="Expenses this month"]/./following-sibling::div');
        this.expensesThisMonthCancelIcon = this.getByAnyTestId('CancelIcon', this.expensesCard);
        this.expensesThisMonthWarningIcon = this.getByAnyTestId('ErrorIcon', this.expensesCard);
        this.expensesThisMonthCheckIcon = this.getByAnyTestId('CheckCircleIcon', this.expensesCard);
        this.forecastCard = this.main.getByTestId('card_forecast');
        this.forecastThisMonthValue = this.forecastCard.locator('//div[.="Forecast this month"]/./following-sibling::div');
        this.forecastThisMonthCancelIcon = this.getByAnyTestId('CancelIcon', this.forecastCard);
        this.forecastThisMonthCheckIcon = this.getByAnyTestId('CheckCircleIcon', this.forecastCard);
        this.forecastThisMonthWarningIcon = this.getByAnyTestId('ErrorIcon', this.forecastCard);
        this.expandRequiringAttentionBtn = this.getByAnyTestId('expandRequiringAttention');
        this.columnSelectBtn = this.getByAnyTestId('ViewColumnIcon', this.main);
        this.columnBadge = this.main.locator('//span[contains(@class, "MuiBadge-badge")]');
        this.simplePopover = this.page.getByRole('presentation');
        this.clearAllColumnsToggle = this.simplePopover.getByText('Clear all', {exact: true});
        this.selectAllColumnsToggle = this.simplePopover.getByText('Select all', {exact: true});
        this.monthlyLimitToggle = this.simplePopover.locator('li', {hasText: 'Monthly Limit'});
        this.expensesThisMonthToggle = this.simplePopover.locator('li', {hasText: 'Expenses this month'});
        this.forecastToggle = this.simplePopover.locator('li', {hasText: 'Forecast'});
        this.ownerToggle = this.simplePopover.locator('li', {hasText: 'Owner'});

        this.table = this.main.locator('table');
        this.nameTableHeading = this.table.locator('th', {hasText: 'Name'});
        this.monthlyLimitTableHeading = this.table.locator('th', {hasText: 'Monthly Limit'});
        this.expensesThisMonthTableHeading = this.table.locator('th', {hasText: 'Expenses this month'});
        this.forecastThisMonthTableHeading = this.table.locator('th', {hasText: 'Forecast this month'});
        this.ownerTableHeading = this.table.locator('th', {hasText: 'Owner'});
        this.actionsTableHeading = this.table.locator('th', {hasText: 'Actions'});

        this.poolTableRow = this.table.getByTestId('row_0');
        this.poolNameColumn = this.poolTableRow.locator('//td').first();
        this.poolColumn2 = this.poolTableRow.locator('//td[2]');
        this.poolColumn3 = this.poolTableRow.locator('//td[3]');
        this.column3TextSpan = this.poolColumn3.locator('xpath=/span');
        this.column3TextDiv = this.poolColumn3.locator('xpath=/div/div');
        this.poolColumn4 = this.table.locator('//td[4]');
        this.column4TextSpan = this.poolColumn4.locator('xpath=/span');
        this.poolActionsColumn = this.table.locator('//td').last();

        this.subPoolNameColumn = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td[1]');
        this.subPoolColumn2 = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td[2]');
        this.subPoolColumn3 = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td[3]');
        this.subPoolColumn4 = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td[4]');
        this.subPoolActionsColumn = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td[5]');

        this.expandMoreIcon = this.table.locator('xpath=(//button[contains(@class, "rgw1hv-expand")] | //button[contains(@class, "u0ks9z-expand")])')
        this.navigateNextIcon = this.getByAnyTestId('NavigateNextIcon', this.main);

        //Edit pools side modal
        this.sideModal = this.page.getByTestId('smodal_edit_pool');
        this.sideModalEditBtn = this.sideModal.getByRole('button', {name: 'Edit'});
        this.sideModalDefaultResourceOwner = this.sideModal.getByTestId('pool-owner-selector-select');
        this.sideModalMonthlyLimit = this.sideModal.getByTestId('input_limit');
        this.extendParentPoolToggle = this.sideModal.getByLabel('Extend parent pools limits')
        this.sideModalSaveBtn = this.sideModal.getByRole('button', {name: 'Save'});
        this.sideModalCancelBtn = this.sideModal.getByRole('button', {name: 'Cancel'});
        this.sideModalMonthlyLimitWarningMessage = this.sideModal.getByText('Remaining budget: $0. Extend parent budget if necessary.');
        this.sideModalCloseBtn = this.sideModal.getByTestId('bnt_close');

    }

    /**
     * Sets up API interceptions for the Pools page.
     * Intercepts API requests and provides mock responses.
     * @returns {Promise<void>}
     */
    async setupApiInterceptions(): Promise<void> {
        const apiInterceptions: IInterceptor[] = [
            {urlPattern: `v2/pools/[^/]+?children=true&details=true`, mock: PoolResponse},
            {
                urlPattern: `v2/allowed_actions\\?pool=[^&]+.*`,
                mock: AllowedActionsPoolResponse
            },
        ];

        await apiInterceptors(this.page, apiInterceptions);
    }

    /**
     * Retrieves the value of "Spent Over Limit" from the UI and parses it as a number.
     * @returns {Promise<number>} The parsed "Spent Over Limit" value.
     */
    async getSpentOverLimitValue(): Promise<number> {
        const value = await this.spentOverLimitValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the value of "Exceeded Limit" from the UI and parses it as an integer.
     * @returns {Promise<number>} The parsed "Exceeded Limit" value.
     */
    async getExceededLimitValue(): Promise<number> {
        const value = await this.exceededLimitValue.textContent();
        return parseInt(value);
    }

    /**
     * Retrieves the value of "Organization Limit" from the UI and parses it as a number.
     * @returns {Promise<number>} The parsed "Organization Limit" value.
     */
    async getOrganizationLimitValue(): Promise<number> {
        const value = await this.organizationLimitValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the value of "Expenses This Month" from the UI and parses it as a number.
     * @returns {Promise<number>} The parsed "Expenses This Month" value.
     */
    async getExpensesThisMonth(): Promise<number> {
        const value = await this.expensesThisMonthValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the value of "Forecast This Month" from the UI and parses it as a number.
     * @returns {Promise<number>} The parsed "Forecast This Month" value.
     */
    async getForecastThisMonth(): Promise<number> {
        const value = await this.forecastThisMonthValue.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Clicks the "Expand Requiring Attention" button on the UI.
     * @returns {Promise<void>}
     */
    async clickExpandRequiringAttentionBtn(): Promise<void> {
        await this.expandRequiringAttentionBtn.click();
    }

    /**
     * Retrieves the count of pools displayed on the page.
     * Throws an error if no pools are found.
     * @returns {Promise<number>} The count of pools.
     * @throws {Error} If no pools are found on the page.
     */
    async getPoolCount(): Promise<number> {
        const count = await this.expandMoreIcon.count();
        if (count === 0) {
            throw new Error('No pools found on the page.');
        }
        return count;
    }

    /**
     * Retrieves the text content of the column badge and trims it.
     * Throws an error if the badge text is empty or not found.
     * @returns {Promise<string>} The trimmed column badge text.
     * @throws {Error} If the column badge text is empty or not found.
     */
    async getColumnBadgeText(): Promise<string> {
        const badgeText = await this.columnBadge.textContent();
        if (!badgeText) {
            throw new Error('Column badge text is empty or not found.');
        }
        return badgeText.trim();
    }

    /**
     * Clicks the "Column Select" button on the UI.
     * @returns {Promise<void>}
     */
    async clickColumnSelectButton(): Promise<void> {
        await this.columnSelectBtn.click();
    }

    /**
     * Toggles a specific column option in the UI based on the provided toggle name.
     * @param {string} toggle - The name of the toggle to click (e.g., "clear all", "select all").
     * @returns {Promise<void>}
     * @throws {Error} If the toggle name is unknown.
     */
    async clickColumnToggle(toggle: string): Promise<void> {
        toggle = toggle.toLowerCase();
        switch (toggle) {
            case 'clear all':
                await this.clearAllColumnsToggle.click();
                break;
            case 'select all':
                await this.selectAllColumnsToggle.click();
                break;
            case 'monthly limit':
                await this.monthlyLimitToggle.click();
                break;
            case 'expenses':
                await this.expensesThisMonthToggle.click();
                break;
            case 'forecast':
                await this.forecastToggle.click();
                break;
            case 'owner':
                await this.ownerToggle.click();
                break;
            default:
                throw new Error('Unknown toggle');
        }
    }

    /**
     * Selects all columns by clicking the "Select All" toggle in the column selection menu.
     * @returns {Promise<void>}
     */
    async selectAllColumns(): Promise<void> {
        await this.clickColumnSelectButton();
        await this.clickColumnToggle('select all');
    }

    /**
     * Edits the monthly limit for a pool by opening the side modal, updating the value, and saving the changes.
     * @param {number} newLimit - The new monthly limit to set.
     * @returns {Promise<void>}
     */
    async editPoolMonthlyLimit(newLimit: number): Promise<void> {
        await this.poolColumn2.click();
        await this.sideModalEditBtn.click();
        await this.sideModalMonthlyLimit.clear();
        await this.sideModalMonthlyLimit.fill(newLimit.toString());
        await this.sideModalSaveBtn.click();
        await this.waitForElementDetached(this.sideModal);
        await this.waitForPageLoaderToDisappear();
    }

    /**
     * Edits the monthly limit for a specific sub-pool.
     * Opens the side modal, updates the monthly limit, and optionally waits for the page loader to disappear.
     *
     * @param {number} newLimit - The new monthly limit to set for the sub-pool.
     * @param {boolean} extendParentPool - Whether to extend the parent pool's limits.
     * @param {number} [index=1] - The 1-based index of the sub-pool to edit (default is 1).
     * @param {boolean} [wait=true] - Whether to wait for the page loader to disappear after saving (default is true).
     * @returns {Promise<void>}
     */
    async editSubPoolMonthlyLimit(newLimit: number, extendParentPool: boolean, index: number = 1, wait: boolean = true): Promise<void> {
        index = index - 1; // Adjust index to be zero-based
        const locator = this.subPoolNameColumn.nth(index);
        const subPool = await locator.textContent();
        debugLog(`Editing monthly limit for sub-pool: ${subPool}`);
        await locator.click();
        await this.sideModalEditBtn.click();
        await this.sideModalMonthlyLimit.clear();
        await this.sideModalMonthlyLimit.fill(newLimit.toString());
        if (extendParentPool) await this.extendParentPoolToggle.click();
        await this.sideModalSaveBtn.click();
        if (wait) {
            await this.waitForPageLoaderToDisappear();
            await this.waitForElementDetached(this.sideModal);
            await this.waitForPageLoaderToDisappear();
        }
    }

    /**
     * Retrieves the monthly limit for a specific sub-pool from the table.
     * Adjusts the index to be zero-based, retrieves the sub-pool name for logging,
     * and parses the monthly limit value as a number.
     *
     * @param {number} [index=1] - The 1-based index of the sub-pool to retrieve the monthly limit for (default is 1).
     * @returns {Promise<number>} The parsed monthly limit value for the sub-pool.
     */
    async getSubPoolMonthlyLimit(index: number = 1): Promise<number> {
        index = index - 1; // Adjust index to be zero-based
        const subPoolName = await this.subPoolNameColumn.nth(index).textContent();
        debugLog(`Retrieving monthly limit for sub-pool: ${subPoolName}`);
        const locator = this.subPoolColumn2.nth(index);
        const value = await locator.textContent();
        if (value === '-') {
            debugLog(`Monthly limit for sub-pool "${subPoolName}" is not set.`);
            return 0; // Return 0 if the monthly limit is not set
        }
        return this.parseCurrencyValue(value);
    }

    async getSubPoolExpensesThisMonth(index: number = 1): Promise<number> {
        index = index - 1; // Adjust index to be zero-based
        const subPoolName = await this.subPoolNameColumn.nth(index).textContent();
        debugLog(`Retrieving monthly limit for sub-pool: ${subPoolName}`);
        const locator = this.subPoolColumn3.nth(index);
        const value = await locator.textContent();
        return this.parseCurrencyValue(value);
    }
    async getSubPoolForecastThisMonth(index: number = 1): Promise<number> {
        index = index - 1; // Adjust index to be zero-based
        const subPoolName = await this.subPoolNameColumn.nth(index).textContent();
        debugLog(`Retrieving monthly limit for sub-pool: ${subPoolName}`);
        const locator = this.subPoolColumn4.nth(index);
        const value = await locator.textContent();
        return this.parseCurrencyValue(value);
    }

    async removeAllSubPoolMonthlyLimits(): Promise<void> {
        const subPools = await this.subPoolColumn2.all();
        for (const subPool of subPools) {
            const value = await subPool.textContent();
            if (value !== '-') {
                debugLog(`Removing monthly limit for sub-pool: ${value}`);
                await subPool.click();
                await this.sideModalEditBtn.click();
                await this.sideModalMonthlyLimit.clear();
                await this.sideModalMonthlyLimit.fill('0');
                await this.sideModalSaveBtn.click();
                await this.waitForPageLoaderToDisappear();
                await this.waitForElementDetached(this.sideModal);
            }
        }
    }

    /**
     * Clicks the "Cancel" button in the side modal.
     * Closes the modal without saving any changes.
     *
     * @returns {Promise<void>}
     */
    async clickSideModalCancelBtn(): Promise<void> {
        await this.sideModalCancelBtn.click();
    }

    async clickSideModalCloseBtn(): Promise<void> {
        await this.sideModalCloseBtn.click();
    }

    /**
     * Retrieves the pool limit value from the table and parses it as a number.
     * @returns {Promise<number>} The parsed pool limit value.
     */
    async getPoolLimitFromTable(): Promise<number> {
        const value = await this.poolColumn2.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the "Expenses This Month" value from the table and parses it as a number.
     * @returns {Promise<number>} The parsed "Expenses This Month" value.
     */
    async getExpensesThisMonthFromTable(): Promise<number> {
        const value = await this.poolColumn3.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Retrieves the "Forecast This Month" value from the table and parses it as a number.
     * @returns {Promise<number>} The parsed "Forecast This Month" value.
     */
    async getForecastThisMonthFromTable(): Promise<number> {
        const value = await this.poolColumn4.textContent();
        return this.parseCurrencyValue(value);
    }

    /**
     * Expands the pool row in the table by clicking the "Expand More" icon.
     * @returns {Promise<void>}
     */
    async toggleExpandPool(): Promise<void> {
        await this.expandMoreIcon.click();
    }

    /**
     * Sums the totals of a specific column for all sub-pools.
     * Expands the pool if the column is hidden.
     * @param {string} column - The name of the column to sum (e.g., "expenses this month").
     * @returns {Promise<number>} The sum of the column values.
     * @throws {Error} If the column name is unknown.
     */
    async sumSubPoolTotals(column: string): Promise<number> {
        let columnLocator: Locator;

        switch (column.toLowerCase()) {
            case 'expenses this month':
                columnLocator = this.subPoolColumn3;
                break;
            case 'forecast this month':
                columnLocator = this.subPoolColumn4;
                break;
            default:
                throw new Error(`Unknown column: ${column}`);
        }
        if (await columnLocator.first().isHidden()) await this.toggleExpandPool();
        return await this.sumCurrencyColumnWithoutPagination(columnLocator);
    }
}
