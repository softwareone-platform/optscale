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

  // Filters
  readonly filtersBox: Locator;
  readonly allFilterBoxButtons: Locator;
  readonly filterPopover: Locator;
  readonly suggestionsFilter: Locator;
  readonly dataSourceFilter: Locator;
  readonly poolFilter: Locator;
  readonly ownerFilter: Locator;
  readonly regionFilter: Locator;
  readonly serviceFilter: Locator;
  readonly resourceTypeFilter: Locator;
  readonly activityFilter: Locator;
  readonly recommendationsFilter: Locator;
  readonly constraintViolationsFilter: Locator;
  readonly firstSeenFilter: Locator;
  readonly lastSeenFilter: Locator;
  readonly tagFilter: Locator;
  readonly withoutTagFilter: Locator;
  readonly metaFilter: Locator;
  readonly paidNetworkTrafficFromFilter: Locator;
  readonly paidNetworkTrafficToFilter: Locator;
  readonly k8sNodeFilter: Locator;
  readonly k8sServiceFilter: Locator;
  readonly k8sNamespaceFilter: Locator;
  readonly billingOnlyOption: Locator;
  readonly filterApplyButton: Locator;
  readonly resetFiltersBtn: Locator;
  readonly showMoreFiltersBtn: Locator;
  readonly showLessFiltersBtn: Locator;
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

    //Filters
    this.filtersBox = this.main.locator('xpath=(//div[.="Filters:"])[1]/..');
    this.allFilterBoxButtons = this.filtersBox.locator('button');
    this.filterPopover = this.page.locator('//div[contains(@id, "filter-popover")]');
    this.filterApplyButton = this.filterPopover.getByRole('button', { name: 'Apply' });

    this.suggestionsFilter = this.filtersBox.getByRole('button', { name: 'Suggestions' });
    this.dataSourceFilter = this.filtersBox.getByRole('button', { name: 'Data source (' });
    this.poolFilter = this.filtersBox.getByRole('button', { name: 'Pool (' });
    this.ownerFilter = this.filtersBox.getByRole('button', { name: 'Owner (' });
    this.regionFilter = this.filtersBox.getByRole('button', { name: 'Region (' });
    this.serviceFilter = this.filtersBox.getByRole('button', { name: /^Service \(/ });
    this.resourceTypeFilter = this.filtersBox.getByRole('button', { name: 'Resource type (' });
    this.activityFilter = this.filtersBox.getByRole('button', { name: 'Activity (' });
    this.recommendationsFilter = this.filtersBox.getByRole('button', { name: 'Recommendations (' });
    this.constraintViolationsFilter = this.filtersBox.getByRole('button', { name: 'Constraint violations (' });
    this.firstSeenFilter = this.filtersBox.getByRole('button', { name: 'First seen (' });
    this.lastSeenFilter = this.filtersBox.getByRole('button', { name: 'Last seen (' });
    this.tagFilter = this.filtersBox.getByRole('button', { name: /^Tag \(/ });
    this.withoutTagFilter = this.filtersBox.getByRole('button', { name: 'Without tag (' });
    this.metaFilter = this.filtersBox.getByRole('button', { name: 'Meta (' });
    this.paidNetworkTrafficFromFilter = this.filtersBox.getByRole('button', { name: 'Paid network traffic from (' });
    this.paidNetworkTrafficToFilter = this.filtersBox.getByRole('button', { name: 'Paid network traffic to (' });
    this.k8sNodeFilter = this.filtersBox.getByRole('button', { name: 'K8s node (' });
    this.k8sServiceFilter = this.filtersBox.getByRole('button', { name: 'K8s service (' });
    this.k8sNamespaceFilter = this.filtersBox.getByRole('button', { name: 'K8s namespace (' });

    this.showMoreFiltersBtn = this.main.getByRole('button', { name: 'Show more' });
    this.showLessFiltersBtn = this.main.getByRole('button', { name: 'Show less' });
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

  /**
   * Selects a filter and applies the specified filter option.
   *
   * @param {Locator} filter - The filter locator to select.
   * @param {string} filterOption - The specific filter option to apply.
   * @throws {Error} Throws an error if `filterOption` is not provided when `filter` is specified.
   * @returns {Promise<void>} A promise that resolves when the filter is applied.
   */
  protected async selectFilter(filter: Locator, filterOption: string): Promise<void> {
    if (filter) {
      if (!filterOption) {
        throw new Error('filterOption must be provided when filter is specified');
      }
      if (!(await filter.isVisible())) await this.showMoreFiltersBtn.click();
      await filter.click();

      await this.filterPopover.getByLabel(filterOption).click();
      await this.filterApplyButton.click();
    }
  }

  /**
   * Selects a filter by its text and applies the specified filter option.
   *
   * This method locates a filter button within the filters box by matching its name
   * with the provided `filter` parameter. It then applies the specified `filterOption`
   * to the selected filter.
   *
   * @param {string} filter - The name of the filter to select.
   * @param {string} filterOption - The specific filter option to apply.
   * @returns {Promise<void>} A promise that resolves when the filter is applied.
   */
  async selectFilterByText(filter: string, filterOption: string): Promise<void> {
    const filterLocator = this.filtersBox.getByRole('button', { name: new RegExp(`^${filter}`) });
    await this.selectFilter(filterLocator, filterOption);
  }
}
