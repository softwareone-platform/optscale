import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

/**
 * Represents the Expenses Page.
 * Extends the BasePage class.
 */
export class ExpensesMapPage extends BasePage {
  readonly heading: Locator;
  readonly mapLegend: Locator;

  /**
   * Initializes a new instance of the ExpensesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/expenses-map');
    this.heading = this.main.locator('//h1[contains(text(), "Cost map")]');
    this.mapLegend = this.main.locator('[data-testid="map-legend"]');
  }
}
