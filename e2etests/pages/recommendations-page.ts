import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class RecommendationsPage extends BasePage {
    readonly page: Page;
    readonly recommendationsHeading: Locator;
    readonly archiveBtn: Locator;
    readonly forceCheckBtn: Locator;
    readonly dataSourcesSelect: Locator;
    readonly possibleMonthlySavingsValue: Locator;
    readonly lastCheckTimeValue: Locator;
    readonly nextCheckTimeValue: Locator;
    readonly s3DuplicatesBtn: Locator;
    readonly s3DuplicatesValue: Locator;
    readonly categoriesSelect: Locator;
    readonly applicableServices: Locator;
    readonly cardsBtn: Locator;
    readonly tableBtn: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        super(page, '/recommendations');
        this.page = page;
        this.recommendationsHeading = this.page.getByTestId('lbl_recommendations');
        this.archiveBtn = this.page.getByTestId('btn_archive');
        this.forceCheckBtn = this.page.getByTestId('btn_force_check');
        this.dataSourcesSelect = this.page.locator('//div[@id="select-data-source"]');
        this.possibleMonthlySavingsValue = this.page.getByTestId('p_saving_value');
        this.lastCheckTimeValue = this.page.getByTestId('p_last_time');
        this.nextCheckTimeValue = this.page.locator('//span[.="Next check time"]/../following-sibling::div');
        this.s3DuplicatesBtn = this.page.getByTestId('btn_s3_duplicates');
        this.s3DuplicatesValue = this.page.getByTestId('p_s3_duplicates_value');
        this.categoriesSelect = this.page.locator('//label[.="Categories"]/../div');
        this.applicableServices = this.page.locator('//label[.="Applicable services"]/../div')
        this.cardsBtn = this.page.getByRole('button', {name: 'Cards'});
        this.tableBtn = this.page.getByRole('button', {name: 'Table'});
        this.searchInput = this.page.getByPlaceholder('Search');
    }

    async selectDataSource(dataSource: string) {
        await this.selectFromComboBox(this.dataSourcesSelect, dataSource, true);
    }

    async selectCategory(category: string) {
        await this.selectFromComboBox(this.categoriesSelect, category);
    }

    async selectApplicableService(service: string) {
        await this.selectFromComboBox(this.applicableServices, service);
    }
}