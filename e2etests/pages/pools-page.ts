import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";
import {IInterceptorConfig, interceptApiRequest} from "../utils/interceptor";
import {AllowedActionsPoolResponse, PoolResponse} from "../test-data/pools-data";

/**
 * Represents the Pools Page.
 * Extends the BasePage class.
 */
export class PoolsPage extends BasePage {
    readonly heading: Locator;
    readonly configureAssignmentRulesBtn: Locator;
    readonly exceededLimitCard: Locator;
    readonly exceededLimitCancelIcon: Locator;
    readonly organizationLimitValue: Locator;
    readonly expensesCard: Locator;
    readonly expensesThisMonthValue: Locator;
    readonly expensesThisMonthCancelIcon: Locator;
    readonly forecastCard: Locator;
    readonly forecastThisMonthValue: Locator;
    readonly forecastThisMonthCancelIcon: Locator;
    readonly expandRequiringAttentionBtn: Locator;
    readonly columnSelectBtn: Locator;
    readonly columnBadge: Locator;
    readonly clearAllColumnsToggle: Locator;
    readonly selectAllColumnsToggle: Locator;
    readonly monthlyLimitToggle: Locator;
    readonly expensesThisMonthToggle: Locator;
    readonly forecastToggle: Locator;
    readonly ownerToggle: Locator;


    readonly table: Locator;
    readonly poolTableRow: Locator;
    readonly nameColumn: Locator;
    readonly column2: Locator;
    readonly column3: Locator;
    readonly column4: Locator;
    readonly actionsColumn: Locator;
    readonly expandMoreIcon: Locator;
    readonly subpoolNameColumn: Locator;
    readonly subpoolColumn2: Locator;
    readonly subpoolColumn3: Locator;
    readonly subpoolColumn4: Locator;
    readonly subpoolActionsColumn: Locator;

    readonly navigateNextIcon: Locator;

    //Edit pools side modal
    readonly sideModal: Locator;
    readonly sideModalEditBtn: Locator;
    readonly sideModalDefaultResourceOwner: Locator;
    readonly sideModalMonthlyLimit: Locator;
    readonly sideModalSaveBtn: Locator;

    /**
     * Initializes a new instance of the PoolsPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/pools');

        this.heading = this.main.getByTestId('lbl_pool_name');
        this.configureAssignmentRulesBtn = this.main.getByTestId('btn_configure_assignment_rules');
        this.exceededLimitCard = this.getByAnyTestId('card_total_exp', this.main);
        this.organizationLimitValue = this.main.locator('//div[.="Organization limit"]/./following-sibling::div');
        this.expensesCard = this.getByAnyTestId('card_expenses', this.main);
        this.expensesThisMonthValue = this.expensesCard.locator('//div[.="Expenses this month"]/./following-sibling::div');
        this.expensesThisMonthCancelIcon = this.getByAnyTestId('CancelIcon', this.expensesCard);
        this.forecastCard = this.main.getByTestId('card_forecast');
        this.forecastThisMonthValue = this.forecastCard.locator('//div[.="Forecast this month"]/./following-sibling::div');
        this.forecastThisMonthCancelIcon = this.getByAnyTestId('CancelIcon', this.forecastCard);
        this.expandRequiringAttentionBtn = this.getByAnyTestId('expandRequiringAttention');
        this.columnSelectBtn = this.getByAnyTestId('ViewColumnIcon', this.main);
        this.columnBadge = this.main.locator('//span[contains(@class, "MuiBadge-badge")]');
        this.clearAllColumnsToggle = this.main.getByText('Clear all', {exact: true});
        this.selectAllColumnsToggle = this.main.getByText('Select all', {exact: true});
        this.monthlyLimitToggle = this.main.locator('li', {hasText: 'Monthly Limit'});
        this.expensesThisMonthToggle = this.main.locator('li', {hasText: 'Expenses this month'});
        this.forecastToggle = this.main.locator('li', {hasText: 'Forecast'});
        this.ownerToggle = this.main.locator('li', {hasText: 'Owner'});

        this.table = this.main.locator('table');
        this.poolTableRow = this.table.getByTestId('row_0');
        this.nameColumn = this.table.locator('//td').first();
        this.column2 = this.table.locator('//td[2]');
        this.column3 = this.table.locator('//td[3]');
        this.column4 = this.table.locator('//td[4]');
        this.actionsColumn = this.table.locator('//td').last();

        this.subpoolNameColumn = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td[1]');
        this.subpoolColumn2 = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td[2]');
        this.subpoolColumn3 = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td[3]');
        this.subpoolColumn4 = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td[4]');
        this.subpoolActionsColumn = this.table.locator('//tr[@data-test-id="row_0"]/following-sibling::tr/td').last();

        this.expandMoreIcon = this.getByAnyTestId('ExpandMoreIcon', this.table);
        this.navigateNextIcon = this.getByAnyTestId('NavigateNextIcon', this.main);

        //Edit pools side modal
        this.sideModal = this.page.getByTestId('smodal_edit_pool');
        this.sideModalEditBtn = this.sideModal.getByRole('button', {name: 'Edit'});
        this.sideModalDefaultResourceOwner = this.sideModal.getByTestId('pool-owner-selector-select');
        this.sideModalMonthlyLimit = this.sideModal.getByTestId('input_limit');
        this.sideModalSaveBtn = this.sideModal.getByRole('button', {name: 'Save'});
    }

    /**
     * Sets up API interceptions for the Pools page.
     * Intercepts API requests and provides mock responses.
     * @returns {Promise<void>}
     */
    async setupApiInterceptions(): Promise<void> {
        const apiInterceptions: IInterceptorConfig[] = [
            {page: this.page, urlPattern: `v2/pools/[^/]+?children=true&details=true`, mockResponse: PoolResponse},
            {
                page: this.page,
                urlPattern: `v2/allowed_actions\\?pool=[^&]+.*`,
                mockResponse: AllowedActionsPoolResponse
            },
        ];

        await Promise.all(apiInterceptions.map(interceptApiRequest));
    }

    async getOrganizationLimitValue(): Promise<number> {
        const value = await this.organizationLimitValue.textContent();
        return this.parseCurrencyValue(value);
    }

    async getExpensesThisMonth(): Promise<number> {
        const value = await this.expensesThisMonthValue.textContent();
        return this.parseCurrencyValue(value);
    }

    async getForecastThisMonth(): Promise<number> {
        const value = await this.forecastThisMonthValue.textContent();
        return this.parseCurrencyValue(value);
    }


    /**
     * Clicks the Expand Requiring Attention button.
     * @returns {Promise<void>}
     */
    async clickExpandRequiringAttentionBtn(): Promise<void> {
        await this.expandRequiringAttentionBtn.click();
    }

    async getPoolCount(): Promise<number> {
        const count = await this.expandMoreIcon.count();
        if (count === 0) {
            throw new Error('No pools found on the page.');
        }
        return count;
    }

    async getColumnBadgeText(): Promise<string> {
        const badgeText = await this.columnBadge.textContent();
        if (!badgeText) {
            throw new Error('Column badge text is empty or not found.');
        }
        return badgeText.trim();
    }

    async clickColumnSelectButton(): Promise<void> {
        await this.columnSelectBtn.click();
    }

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
            case 'expenses this month':
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

    async selectAllColumns(): Promise<void> {
        await this.clickColumnSelectButton();
        await this.clickColumnToggle('select all');
    }

    async editMonthlyLimit(newLimit: number): Promise<void> {
        await this.column2.click();
        await this.sideModalEditBtn.click();
        await this.sideModalMonthlyLimit.clear();
        await this.sideModalMonthlyLimit.fill(newLimit.toString());
        await this.sideModalSaveBtn.click();
        await this.waitForPageLoaderToDisappear();
    }

    async getPoolLimitFromTable(): Promise<number> {
        const value = await this.column2.textContent();
        return this.parseCurrencyValue(value);
    }

    async getExpensesThisMonthFromTable(): Promise<number> {
        const value = await this.column3.textContent();
        return this.parseCurrencyValue(value);
    }

    async getForecastThisMonthFromTable(): Promise<number> {
        const value = await this.column4.textContent();
        return this.parseCurrencyValue(value);
    }

    async expandPool(): Promise<void> {
        await this.expandMoreIcon.click();
    }

    async sumSubPoolTotals(column: string): Promise<number> {
        let columnLocator: Locator;

        switch (column.toLowerCase()) {
            case 'expenses this month':
                columnLocator = this.subpoolColumn3;
                break;
            case 'forecast this month':
                columnLocator = this.subpoolColumn4;
                break;
            default:
                throw new Error(`Unknown column: ${column}`);
        }
        if (await columnLocator.first().isHidden()) await this.expandPool();
        return await this.sumCurrencyColumnWithoutPagination(columnLocator);
    }

}
