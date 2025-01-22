import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class PoolsPage extends BasePage {
    readonly page: Page;
    readonly poolsHeading: Locator;
    readonly configureAssignmentRulesBtn: Locator;
    readonly organizationLimitValue: Locator;
    readonly expensesThisMonthValue: Locator;
    readonly forecastThisMonthValue: Locator;
    readonly expandRequiringAttentionBtn: Locator;
    readonly columnSelectBtn: Locator;

    constructor(page: Page) {
        super(page, '/pools');
        this.page = page;
        this.poolsHeading = this.page.getByTestId('lbl_pool_name');
        this.configureAssignmentRulesBtn = this.page.getByTestId('btn_configure_assignment_rules');
        this.organizationLimitValue = this.page.locator('//div[.="Organization limit"]/./following-sibling::div');
        this.expensesThisMonthValue = this.page.locator('//div[.="Expenses this month"]/./following-sibling::div');
        this.forecastThisMonthValue = this.page.locator('//div[.="Forecast this month"]/./following-sibling::div');
        this.expandRequiringAttentionBtn = this.page.getByTestId('expandRequiringAttention');
        this.columnSelectBtn = this.page.locator('[data-testid="ViewColumnIcon"]');
    }
}