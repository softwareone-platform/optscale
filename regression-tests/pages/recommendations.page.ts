import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class RecommendationsPage extends BasePage {
  readonly heading: Locator;
  readonly possibleMonthlySavingsDiv: Locator;
  readonly cardsBtn: Locator;
  readonly tableBtn: Locator;
  readonly cardsGrid: Locator;
  readonly firstCard: Locator;
  readonly table: Locator;

  constructor(page: Page) {
    super(page, '/recommendations');
    this.heading = this.main.getByTestId('lbl_recommendations');
    this.possibleMonthlySavingsDiv = this.main.getByTestId('card_saving');
    this.cardsBtn = this.main.getByRole('button', { name: 'Cards' });
    this.tableBtn = this.main.getByRole('button', { name: 'Table' });
    this.cardsGrid = this.main.locator('//div[contains(@class, "cardsGrid MuiBox-root")]');
    this.firstCard = this.cardsGrid.locator('//div[contains(@class, "MuiCard-root")]').first();
    this.table = this.main.locator('table');
  }

  async clickCardsButtonIfNotActive(): Promise<void> {
    if (!(await this.evaluateActiveButton(this.cardsBtn))) {
      await this.cardsBtn.click();
    }
  }

  async clickTableButton(): Promise<void> {
    await this.tableBtn.click();
  }
}
