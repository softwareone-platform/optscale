import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class RiSpCoveragePage extends BasePage {
  readonly heading: Locator;
  readonly targetTableRow: Locator;
  readonly targetSP_UsageTableCell: Locator;
  readonly targetRI_UsageTableCell: Locator;
  readonly targetTotalUsageTableCell: Locator;
  readonly targetSP_ExpensesTableCell: Locator;
  readonly targetRI_ExpensesTableCell: Locator;
  readonly targetSavingsTableCell: Locator;
  readonly targetTotalExpensesCell: Locator;

  constructor(page: Page) {
    super(page, '/recommendations/ri-sp-coverage');
    this.heading = this.main.locator('//h1[.="RI/SP coverage"]');
    this.targetTableRow = this.table.locator('//a[.="Marketplace (Dev)"]/ancestor::tr');
    this.targetSP_UsageTableCell = this.targetTableRow.locator('td').nth(1);
    this.targetRI_UsageTableCell = this.targetTableRow.locator('td').nth(2);
    this.targetTotalUsageTableCell = this.targetTableRow.locator('td').nth(3);
    this.targetSP_ExpensesTableCell = this.targetTableRow.locator('td').nth(4);
    this.targetRI_ExpensesTableCell = this.targetTableRow.locator('td').nth(5);
    this.targetSavingsTableCell = this.targetTableRow.locator('td').nth(6);
    this.targetTotalExpensesCell = this.targetTableRow.locator('td').nth(7);
  }
}

