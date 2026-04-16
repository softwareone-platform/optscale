import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class S3DuplicateFinderPage extends BasePage {

    readonly table: Locator;
    readonly savingsColumn: Locator;
    readonly tableFirstRow: Locator;

    constructor(page: Page) {
        super(page, '/recommendations/s3-duplicate-finder');
        this.table = this.main.locator('table');
        this.savingsColumn = this.table.locator('//tr/td[4]')
        this.tableFirstRow = this.table.locator('xpath=/tbody/tr[1]');
    }

    /**
     * Retrieves the total savings value from the table.
     * Waits for the last element in the savings column to load, extracts text content from all cells,
     * parses the text into numeric values, and calculates the total sum.
     *
     * @returns {Promise<number>} The total savings value from the table, rounded to two decimal places.
     */
    async getSavingsFromTable(): Promise<number> {
        await this.savingsColumn.last().waitFor();
        const texts = await this.savingsColumn.allTextContents();
        const values = texts.map(text => {
            return this.parseCurrencyValue(text);
        });

        const totalSum = values.reduce((sum, val) => sum + val, 0);
        return parseFloat(totalSum.toFixed(2));
    }
}