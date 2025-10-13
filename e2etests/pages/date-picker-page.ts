import { Locator, Page } from '@playwright/test';
import { BasePage } from './base-page';
import { debugLog } from '../utils/debug-logging';

export class DatePickerPage extends BasePage {
  // Date range selectors
  readonly selectedDateText: Locator;
  readonly selectDateBtn: Locator;
  readonly dateRangePopup: Locator;
  readonly thisMonthBtn: Locator;
  readonly lastMonthBtn: Locator;
  readonly last7DaysBtn: Locator;
  readonly last30DaysBtn: Locator;
  readonly previousMonthSelect: Locator;
  readonly previousYearSelect: Locator;
  readonly applyDateBtn: Locator;

  constructor(page: Page) {
    super(page, '');

    // Date range selectors
    this.selectedDateText = this.main.getByTestId('text_selected_dates');
    this.selectDateBtn = this.main.getByTestId('btn_select_date');
    this.dateRangePopup = this.page.getByTestId('window_date_range');
    this.thisMonthBtn = this.page.getByTestId('btn_this_month');
    this.lastMonthBtn = this.page.getByTestId('btn_last_month');
    this.last7DaysBtn = this.getByAnyTestId('btn_last_7_days', this.dateRangePopup);
    this.last30DaysBtn = this.getByAnyTestId('btn_last_30_days', this.dateRangePopup);
    this.previousMonthSelect = this.dateRangePopup.getByTestId('selector_previous_month');
    this.previousYearSelect = this.dateRangePopup.getByTestId('selector_previous_year');
    this.applyDateBtn = this.dateRangePopup.getByTestId('btn_apply_date');
  }

  /**
   * Selects a previous date range.
   * @param {string} month - The month to select.
   * @param {string} year - The year to select.
   * @param {string} startDay - The start day to select.
   * @param {string} endDay - The end day to select.
   * @param wait
   * @returns {Promise<void>}
   */
  async selectPreviousDateRange(month: string, year: string, startDay: string, endDay: string, wait?: boolean): Promise<void> {
    await this.selectDateBtn.click();
    await this.previousMonthSelect.click();
    await this.page.getByRole('option', { name: month }).click();
    await this.previousYearSelect.click();
    await this.page.getByRole('option', { name: year }).click();
    await this.page.getByRole('button', { name: startDay, exact: true }).first().click();
    await this.page.getByRole('button', { name: endDay }).first().click();
    await this.applyDateBtn.click();
    if (wait) {
      await this.waitForPageLoaderToDisappear();
      await this.waitForCanvas();
    }
  }

  async selectLast7DaysDateRange(wait = true): Promise<void> {
    await this.selectDateBtn.click();
    await this.last7DaysBtn.click();
    await this.applyDateBtn.click();
    debugLog('Selected Last 7 Days date range');
    if (wait) {
      await this.waitForPageLoaderToDisappear();
      await this.waitForCanvas();
    }
  }

  /**
   * Selects the "Last 30 Days" date range from the date picker.
   * This method interacts with the date range selector, clicks the "Last 30 Days" button,
   * applies the selection, and waits for the canvas to update.
   *
   * @returns {Promise<void>} Resolves when the date range is selected and the canvas is updated.
   */
  async selectLast30DaysDateRange(wait = true): Promise<void> {
    await this.selectDateBtn.click();
    await this.last30DaysBtn.click();
    await this.applyDateBtn.click();
    debugLog('Selected Last 30 Days date range');
    if (wait) {
      await this.waitForPageLoaderToDisappear();
      await this.waitForCanvas();
    }
  }

  async selectLastMonthDateRange(wait = true): Promise<void> {
    await this.selectDateBtn.click();
    await this.lastMonthBtn.click();
    await this.applyDateBtn.click();
    debugLog('Selected Last Month date range');
    if (wait) {
      await this.waitForPageLoaderToDisappear();
      await this.waitForCanvas();
    }
  }

  /**
   * Selects the "This Month" date range from the date picker.
   * This method interacts with the date range selector, clicks the "This Month" button,
   * applies the selection, and waits for the canvas to update.
   *
   * @returns {Promise<void>} Resolves when the date range is selected and the canvas is updated.
   */
  async selectThisMonthDateRange(wait = true): Promise<void> {
    await this.selectDateBtn.click();
    await this.thisMonthBtn.click();
    await this.applyDateBtn.click();
    debugLog('Selected This Month date range');
    if (wait) {
      await this.waitForPageLoaderToDisappear();
      await this.waitForCanvas();
    }
  }
}
