import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

export class RecommendationsPage extends BasePage {
  readonly heading: Locator;
  readonly summaryGrid: Locator;
  readonly actionBar: Locator;
  readonly possibleMonthlySavingsDiv: Locator;
  readonly cardsBtn: Locator;
  readonly tableBtn: Locator;
  readonly cardsGrid: Locator;
  readonly cards: Locator;
  readonly table: Locator;

  constructor(page: Page) {
    super(page, '/recommendations');
    this.heading = this.main.getByTestId('lbl_recommendations');
    // Summary totals section (SummaryGrid → `summaryGridWrapper` rule). Match the
    // tss rule-name token anywhere in the class list — MUI prepends its own classes.
    this.summaryGrid = this.main.locator('[class*="summaryGridWrapper"]');
    // Category / service / view / search toolbar (the `actionBar` rule; exclude `actionBarPart`).
    this.actionBar = this.main.locator('[class*="actionBar"]:not([class*="actionBarPart"])');
    this.possibleMonthlySavingsDiv = this.main.getByTestId('card_saving');
    this.cardsBtn = this.main.getByRole('button', { name: 'Cards' });
    this.tableBtn = this.main.getByRole('button', { name: 'Table' });
    this.cardsGrid = this.main.locator('[class*="cardsGrid"]');
    this.cards = this.cardsGrid.locator('.MuiCard-root');
    this.table = this.main.locator('table');
  }

  async clickCardsButtonIfNotActive(): Promise<void> {
    if (!(await this.isButtonActive(this.cardsBtn))) {
      await this.cardsBtn.click();
    }
  }
}
