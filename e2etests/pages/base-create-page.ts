import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

/**
 * Abstract class representing the base structure for create pages.
 * Extends the BasePage class.
 */
export abstract class BaseCreatePage extends BasePage {
  readonly url: string;
  readonly nameInput: Locator;
  readonly typeSelect: Locator;
  readonly saveBtn: Locator;
  readonly cancelBtn: Locator;

  readonly setDateBtn: Locator;
  readonly timePicker: Locator;
  readonly amButton: Locator;
  readonly pmButton: Locator;
  readonly setButton: Locator;

  /**
   * Initializes a new instance of the BaseCreatePage class.
   * @param {Page} page - The Playwright page object.
   * @param {string} url - The URL of the page.
   */
  protected constructor(page: Page, url: string) {
    super(page, '');
    this.url = url;
    this.nameInput = this.main.getByTestId('input_name');
    this.typeSelect = this.main.getByTestId('type-selector-select');

    this.saveBtn = this.main.getByTestId('btn_create');
    this.cancelBtn = this.main.getByTestId('btn_cancel');

    this.setDateBtn = this.main.getByTestId('btn_select_date');
    this.timePicker = this.page.locator('//input[@data-test-id="half-hour-time-selector"]/..');
    this.amButton = this.page.getByRole('button', { name: 'AM' });
    this.pmButton = this.page.getByRole('button', { name: 'PM' });
    this.setButton = this.page.getByRole('button', { name: 'Set' });
  }

  /**
   * Sets the time for the policy.
   *
   * @param {string} [time='12:00'] - The time to set in the format 'hh:mm'.
   * @param {boolean} [am=true] - Whether to set the time as AM (true) or PM (false).
   * @returns {Promise<void>} A promise that resolves when the time is set.
   */
  protected async setTime(time: string = '12:00', am: boolean = true): Promise<void> {
    await this.setDateBtn.click();
    await this.selectFromComboBox(this.timePicker, time);
    if (am) {
      await this.amButton.click();
    } else {
      await this.pmButton.click();
    }
    await this.setButton.click();
  }
}
