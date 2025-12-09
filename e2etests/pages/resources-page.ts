import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';
import { debugLog } from '../utils/debug-logging';

/**
 * Represents the Resources Page.
 * Extends the BasePage class.
 */
export class ResourcesPage extends BasePage {
  // Header
  readonly heading: Locator;
  readonly perspectivesBtn: Locator;
  readonly savePerspectiveBtn: Locator;
  readonly configureClusterTypesBtn: Locator;

  // Resources and savings values
  readonly totalExpensesValue: Locator;
  readonly resourceCountValue: Locator;
  readonly possibleSavingsCard: Locator;
  readonly possibleMonthlySavingsValue: Locator;

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

  // Tabs
  readonly tabExpensesBtn: Locator;
  readonly tabResourceCountBtn: Locator;
  readonly tabTagsBtn: Locator;

  // Charts
  readonly categorizeBySelect: Locator;
  readonly expensesSelect: Locator;
  readonly showWeekendsCheckbox: Locator;
  readonly searchInput: Locator;
  readonly expensesBreakdownChart: Locator;
  readonly resourceCountBreakdownChart: Locator;
  readonly tagsBreakdownChart: Locator;
  readonly showLegend: Locator;
  readonly exportChartBtn: Locator;

  // Table grouping
  readonly simplePopover: Locator;
  readonly groupedByValue: Locator;
  readonly groupByPoolBtn: Locator;
  readonly groupByPoolCloseBtn: Locator;
  readonly groupByOwnerBtn: Locator;
  readonly groupByOwnerCloseBtn: Locator;
  readonly groupByTagSelect: Locator;

  //Column selection
  readonly columnsBtn: Locator;
  readonly selectClearAllColumnsToggle: Locator;
  readonly paidNetworkTrafficToggle: Locator;
  readonly metadataToggle: Locator;
  readonly poolOwnerToggle: Locator;
  readonly typeToggle: Locator;
  readonly locationToggle: Locator;
  readonly tagsToggle: Locator;

  // Table
  readonly table: Locator;

  readonly resourceTableHeading: Locator;
  readonly expensesTableHeading: Locator;
  readonly paidNetworkTrafficTableHeading: Locator;
  readonly metadataTableHeading: Locator;
  readonly poolOwnerTableHeading: Locator;
  readonly typeTableHeading: Locator;
  readonly locationTableHeading: Locator;
  readonly tagsTableHeading: Locator;
  readonly tableColumn3: Locator;
  readonly tableExpensesValue: Locator;
  readonly firstResourceItemInTable: Locator;
  readonly firstPoolGroup: Locator;
  readonly firstOwnerGroup: Locator;
  readonly firstTagGroup: Locator;
  readonly allTagGroups: Locator;
  readonly allGroups: Locator;
  readonly clearIcon: Locator;
  readonly navigateNextIcon: Locator;

  /**
   * Initializes a new instance of the ResourcesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/resources?breakdownBy=expenses&categorizedBy=service_name&expenses=daily&withLegend=true');

    // Header
    this.heading = this.main.getByTestId('lbl_resources');
    this.perspectivesBtn = this.main.getByRole('button', { name: 'Perspectives' });
    this.savePerspectiveBtn = this.main.getByRole('button', { name: 'Save perspective' });
    this.configureClusterTypesBtn = this.main.getByRole('button', { name: 'Configure cluster types' });

    // Resources and savings values
    this.totalExpensesValue = this.main.getByTestId('p_expenses_value');
    this.resourceCountValue = this.main.getByTestId('p_count_value');
    this.possibleSavingsCard = this.main.getByTestId('card_possible_savings');
    this.possibleMonthlySavingsValue = this.possibleSavingsCard.getByTestId('p_savings_value');

    //Filters
    this.filtersBox = this.main.locator('xpath=(//div[.="Filters:"])[1]/..');
    this.allFilterBoxButtons = this.filtersBox.locator('button');
    this.filterPopover = this.page.locator('//div[contains(@id, "filter-popover")]');

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

    this.billingOnlyOption = this.filterPopover.getByLabel('Billing only');
    this.filterApplyButton = this.filterPopover.getByRole('button', { name: 'Apply' });
    this.resetFiltersBtn = this.main.getByRole('button', { name: 'Reset filters' });
    this.showMoreFiltersBtn = this.main.getByRole('button', { name: 'Show more' });
    this.showLessFiltersBtn = this.main.getByRole('button', { name: 'Show less' });

    //tabs
    this.tabExpensesBtn = this.main.getByTestId('tab_expenses');
    this.tabResourceCountBtn = this.main.getByTestId('tab_counts');
    this.tabTagsBtn = this.main.getByTestId('tab_tags');

    // Charts
    this.categorizeBySelect = this.main.getByTestId('resource-categorize-by-selector-select');
    this.expensesSelect = this.main.getByTestId('expenses-split-selector-select');

    this.showWeekendsCheckbox = this.main.getByLabel('Show weekends');
    this.searchInput = this.main.getByPlaceholder('Search');
    this.expensesBreakdownChart = this.main.getByTestId('expenses_breakdown_chart');
    this.resourceCountBreakdownChart = this.main.getByTestId('resource_count_breakdown_chart');
    this.tagsBreakdownChart = this.main.getByTestId('tags_breakdown_chart');

    this.showLegend = this.main.getByLabel('Show legend');
    this.exportChartBtn = this.main.getByTestId('btn_export_chart');

    //Table grouping
    this.simplePopover = this.page.locator('[id="simple-popover"]');
    this.groupedByValue = this.main.getByTestId('ls_lbl_group').locator('xpath=/following-sibling::div/div/span');
    this.groupByPoolBtn = this.main.getByTestId('selector_pool');
    this.groupByPoolCloseBtn = this.main.getByTestId('btn_ls_item_pool_close');
    this.groupByOwnerBtn = this.main.getByTestId('selector_owner');
    this.groupByTagSelect = this.main.getByTestId('selector_tag');

    //Column selection
    this.columnsBtn = this.main.getByTestId('btn_columns');
    this.selectClearAllColumnsToggle = this.page.getByTestId('btn_select_clear_all');
    this.paidNetworkTrafficToggle = this.page.getByTestId('btn_toggle_paid_network_traffic');
    this.metadataToggle = this.page.getByTestId('btn_toggle_column_metadata');
    this.poolOwnerToggle = this.page.getByTestId('btn_toggle_column_pool_owner');
    this.typeToggle = this.page.getByTestId('btn_toggle_column_type');
    this.locationToggle = this.page.getByTestId('btn_toggle_column_location');
    this.tagsToggle = this.page.getByTestId('btn_toggle_column_tags');

    //Table
    this.table = this.main.locator('table');
    this.resourceTableHeading = this.table.getByTestId('lbl_resource_name');
    this.expensesTableHeading = this.table.getByTestId('lbl_expenses');
    this.paidNetworkTrafficTableHeading = this.table.getByTestId('lbl_paid_network_traffic');
    this.metadataTableHeading = this.table.getByTestId('lbl_metadata');
    this.poolOwnerTableHeading = this.table.getByTestId('lbl_pool_owner');
    this.typeTableHeading = this.table.getByTestId('lbl_type');
    this.locationTableHeading = this.table.getByTestId('lbl_cloud');
    this.tagsTableHeading = this.table.getByTestId('lbl_tags');
    this.tableColumn3 = this.table.locator('//td[3]');
    this.tableExpensesValue = this.tableColumn3.locator('//a[1]');
    this.firstResourceItemInTable = this.main.locator(
      '[data-test-id="CleanExpensesTable"] [data-test-id="row_0"] a[data-test-id^="resource_name_"]'
    );
    this.firstPoolGroup = this.main.getByTestId('group_pool_0');
    this.firstOwnerGroup = this.main.getByTestId('group_owner_0');
    this.firstTagGroup = this.main.getByTestId('group_tag_0');
    this.allTagGroups = this.main.locator('[data-test-id^="group_tag_"]');
    this.allGroups = this.main.locator('[data-test-id^="group_"]');
    this.clearIcon = this.getByAnyTestId('ClearIcon', this.main);
    this.navigateNextIcon = this.getByAnyTestId('NavigateNextIcon', this.main);
  }

  /**
   * Clicks the "Expenses" tab on the Resources page.
   * This method interacts with the `tabExpensesBtn` locator and waits for the canvas to update.
   *
   * @returns {Promise<void>} Resolves when the tab is clicked and the canvas is updated.
   */
  async clickExpensesTab(wait = true): Promise<void> {
    debugLog('Clicking ExpensesTab');
    await this.tabExpensesBtn.click();
    if (wait) await this.waitForCanvas();
  }

  /**
   * Clicks the "Resource Count" tab on the Resources page.
   * This method interacts with the `tabResourceCountBtn` locator and waits for the canvas to update.
   *
   * @returns {Promise<void>} Resolves when the tab is clicked and the canvas is updated.
   */
  async clickResourceCountTab(wait = true): Promise<void> {
    debugLog('Clicking Resource Count tab');
    await this.tabResourceCountBtn.click();
    if (wait) await this.waitForCanvas();
  }

  /**
   * Clicks the "Tags" tab on the Resources page.
   * This method interacts with the `tabTagsBtn` locator and waits for the canvas to update.
   *
   * @returns {Promise<void>} Resolves when the tab is clicked and the canvas is updated.
   */
  async clickTagsTab(wait = true): Promise<void> {
    debugLog('Clicking Tags Tab');
    await this.tabTagsBtn.click();
    if (wait) await this.waitForCanvas();
  }

  /**
   * Retrieves the total expenses value displayed on the Resources page.
   * The value is extracted from the `totalExpensesValue` locator and parsed into a numeric format.
   *
   * @returns {Promise<number>} A promise that resolves to the total expenses value as a number.
   */
  async getTotalExpensesValue(): Promise<number> {
    const value = await this.totalExpensesValue.textContent();
    return this.parseCurrencyValue(value);
  }

  /**
   * Resets all filters on the Resources page.
   *
   * This method checks if the "Reset Filters" button is visible, clicks it to reset all filters,
   * and optionally waits for the page loader to disappear and the canvas to update.
   *
   * @param {boolean} [wait=true] - Whether to wait for the page loader to disappear and the canvas to load after resetting the filters.
   * @returns {Promise<void>} Resolves when the filters are reset and the optional wait is complete.
   */
  async resetFilters(wait: boolean = true): Promise<void> {
    if (await this.resetFiltersBtn.isVisible()) {
      debugLog('Resetting all filters');
      await this.resetFiltersBtn.click();
      if (wait) {
        await this.waitForAllProgressBarsToDisappear();
        await this.waitForCanvas();
      }
    }
  }

  /**
   * Applies the "Billing only" filter on the Resources page.
   * This method clicks the activity filter, selects the "Billing only" option, and applies the filter.
   * It logs the action and waits for the canvas to update.
   *
   * @returns {Promise<void>} Resolves when the filter is applied and the canvas is updated.
   */
  async clickActivityFilterBillingOnlyOptionAndApply(): Promise<void> {
    await this.activityFilter.click();
    await this.billingOnlyOption.click();
    await this.filterApplyButton.click();
    await this.waitForCanvas();
  }

  /**
   * Retrieves the possible monthly savings value displayed on the Resources page.
   * The value is extracted from the `possibleMonthlySavingsValue` locator and parsed into a numeric format.
   *
   * @returns {Promise<number>} A promise that resolves to the possible monthly savings value as a number.
   */
  async getPossibleMonthlySavingsValue(): Promise<number> {
    const value = await this.possibleMonthlySavingsValue.textContent();
    return this.parseCurrencyValue(value);
  }

  /**
   * Clicks the possible savings card on the Resources page.
   * This method interacts with the `possibleSavingsCard` locator and waits for the page to load after the click.
   *
   * @returns {Promise<void>} Resolves when the card is clicked and the page load state is complete.
   */
  async clickPossibleSavingsCard(): Promise<void> {
    await this.possibleSavingsCard.click();
    await this.waitForPageLoad();
  }

  /**
   * Clicks the "Show More Filters" button on the Resources page.
   * This method interacts with the `showMoreFiltersBtn` locator to expand the filters section.
   *
   * @returns {Promise<void>} Resolves when the button is clicked.
   */
  async clickShowMoreFilters(): Promise<void> {
    await this.showMoreFiltersBtn.click();
  }

  /**
   * Toggles the visibility of the legend on the Resources page.
   * This method interacts with the `showLegend` locator and logs the action.
   *
   * @returns {Promise<void>} Resolves when the legend visibility is toggled.
   */
  async clickShowLegend(): Promise<void> {
    await this.showLegend.click();
  }

  /**
   * Selects an option from the "Categorize By" dropdown on the Resources page.
   * This method uses the `categorizeBySelect` locator to select the specified option
   * and optionally waits for the page to load and the canvas to update after the selection.
   *
   * @param {string} option - The option to select from the dropdown.
   * @param {boolean} [wait=true] - Whether to wait for the page to load and the canvas to update after the selection.
   * @returns {Promise<void>} Resolves when the option is selected and the optional wait is complete.
   */
  async selectCategorizeBy(option: string, wait: boolean = true): Promise<void> {
    await this.selectFromComboBox(this.categorizeBySelect, option);
    if (wait) {
      await this.waitForPageLoad();
      await this.waitForCanvas();
    }
  }

  /**
   * Selects an option from the "Expenses" dropdown on the Resources page.
   * This method uses the `expensesSelect` locator to select the specified option
   * and waits for the canvas to update after the selection.
   *
   * @param {string} option - The option to select from the dropdown.
   * @returns {Promise<void>} Resolves when the option is selected and the canvas is updated.
   */
  async selectExpenses(option: string): Promise<void> {
    await this.selectFromComboBox(this.expensesSelect, option);
    await this.waitForCanvas();
  }

  /**
   * Clicks the "Group by Pool" button on the Resources page.
   * This method interacts with the `groupByPoolBtn` locator.
   *
   * @returns {Promise<void>} Resolves when the button is clicked.
   */
  async clickGroupByPool(): Promise<void> {
    await this.groupByPoolBtn.click();
  }

  /**
   * Closes the "Group by Pool" section on the Resources page.
   * This method interacts with the `groupByPoolCloseBtn` locator.
   *
   * @returns {Promise<void>} Resolves when the section is closed.
   */
  async clickGroupByPoolClose(): Promise<void> {
    await this.groupByPoolCloseBtn.click();
  }

  /**
   * Clicks the "Group by Owner" button on the Resources page.
   * This method interacts with the `groupByOwnerBtn` locator.
   *
   * @returns {Promise<void>} Resolves when the button is clicked.
   */
  async clickGroupByOwner(): Promise<void> {
    await this.groupByOwnerBtn.click();
  }

  /**
   * Closes the "Group by Owner" section on the Resources page.
   * This method interacts with the `groupByOwnerCloseBtn` locator.
   *
   * @returns {Promise<void>} Resolves when the section is closed.
   */
  async clickGroupByOwnerClose(): Promise<void> {
    await this.groupByOwnerCloseBtn.click();
  }

  /**
   * Selects a tag from the "Group by Tag" dropdown on the Resources page.
   * This method interacts with the `groupByTagSelect` locator and selects the specified tag.
   *
   * @param {string} tag - The tag to select from the dropdown.
   * @returns {Promise<void>} Resolves when the tag is selected.
   * @throws {Error} Throws an error if the tag is not provided.
   */
  async selectGroupByTag(tag: string): Promise<void> {
    if (!tag) {
      throw new Error('Tag must be provided');
    }
    await this.groupByTagSelect.click();
    await this.simplePopover.getByText(tag, { exact: true }).click();
  }

  /**
   * Clicks the "Columns" button on the Resources page.
   * This method interacts with the `columnsBtn` locator.
   *
   * @returns {Promise<void>} Resolves when the button is clicked.
   */
  async clickColumnsButton(): Promise<void> {
    await this.columnsBtn.click();
  }

  /**
   * Toggles a specific column in the table on the Resources page.
   * This method interacts with various column toggle locators based on the provided toggle name.
   *
   * @param {string} toggle - The name of the column toggle to interact with.
   *                          Valid options are: "select clear all", "paid network traffic",
   *                          "metadata", "pool owner", "type", "location", "tags".
   * @returns {Promise<void>} Resolves when the specified column toggle is clicked.
   * @throws {Error} Throws an error if an unknown toggle name is provided.
   */
  async clickColumnToggle(toggle: string): Promise<void> {
    toggle = toggle.toLowerCase();
    switch (toggle) {
      case 'select clear all':
        await this.selectClearAllColumnsToggle.click();
        break;
      case 'paid network traffic':
        await this.paidNetworkTrafficToggle.click();
        break;
      case 'metadata':
        await this.metadataToggle.click();
        break;
      case 'pool owner':
        await this.poolOwnerToggle.click();
        break;
      case 'type':
        await this.typeToggle.click();
        break;
      case 'location':
        await this.locationToggle.click();
        break;
      case 'tags':
        await this.tagsToggle.click();
        break;
      default:
        throw new Error('Unknown toggle');
    }
  }

  /**
   * Groups resources on the Resources page based on the specified criteria.
   * This method interacts with different group-by options (pool, owner, or tag)
   * and performs the corresponding action.
   *
   * @param {string} groupBy - The grouping criteria. Valid options are: "pool", "owner", "tag".
   * @param {string} [tag] - The tag to select when grouping by "tag". Optional.
   * @returns {Promise<void>} Resolves when the grouping action is completed.
   * @throws {Error} Throws an error if an unknown grouping option is provided.
   */
  async groupBy(groupBy: string, tag?: string): Promise<void> {
    groupBy = groupBy.toLowerCase();
    switch (groupBy) {
      case 'pool':
        await this.clickGroupByPool();
        break;
      case 'owner':
        await this.clickGroupByOwner();
        break;
      case 'tag':
        if (!tag) {
          throw new Error('Tag must be provided when grouping by tag');
        }
        await this.selectGroupByTag(tag);
        break;
      default:
        throw new Error('Unknown group by option');
    }
  }

  /**
   * Clears the current grouping applied on the Resources page.
   * This method interacts with the `clearIcon` locator to remove any active grouping.
   *
   * @returns {Promise<void>} Resolves when the grouping is cleared.
   */
  async clearGrouping(): Promise<void> {
    await this.clearIcon.click();
  }

  /**
   * Retrieves the pool name based on the current environment.
   * The environment is determined by the `ENVIRONMENT` variable in the process environment.
   *
   * @returns {string} The name of the pool corresponding to the current environment.
   *                   - 'Marketplace Platform Team' for 'staging'
   *                   - 'CPA (QA and Production)' for 'test'
   *                   - 'QA & Prod' for 'dev'
   * @throws {Error} If the environment is unknown or not set.
   */
  getPoolNameForEnvironment(): string {
    const env = process.env.ENVIRONMENT;
    switch (env) {
      case 'staging':
        return 'Marketplace Platform Team';
      case 'test':
        return 'CPA (QA and Production)';
      case 'dev':
        return 'QA & Prod';
      default:
        throw new Error(`Unknown environment: ${env}`);
    }
  }

  getPoolOwnerForEnvironment(): string {
    const env = process.env.ENVIRONMENT;
    switch (env) {
      case 'staging':
        return 'Stuart';
      case 'test':
      case 'dev':
        return 'Francesco';
      default:
        throw new Error(`Unknown environment: ${env}`);
    }
  }
}
