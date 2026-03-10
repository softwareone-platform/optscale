import {BasePage} from './base-page';
import {Locator, Page} from '@playwright/test';
import {debugLog} from '../utils/debug-logging';

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

  readonly perspectivesSideModal: Locator;
  readonly perspectivesSeeAllPerspectivesLink: Locator;
  readonly perspectivesApplyBtn: Locator;

  // Save perspective modal
  readonly savePerspectiveSideModal: Locator;
  readonly savePerspectiveSaveAsInput: Locator;
  readonly savePerspectiveBreakDownByValue: Locator;
  readonly savePerspectiveCategorizeByValue: Locator;
  readonly savePerspectiveGroupByTypeValue: Locator;
  readonly savePerspectiveGroupByValue: Locator;
  readonly savePerspectiveFiltersValue: Locator;
  readonly savePerspectiveFiltersOptionValue: Locator;
  readonly savePerspectiveNoFiltersValue: Locator;
  readonly savePerspectiveSaveBtn: Locator;

  // Tabs
  readonly tabExpensesBtn: Locator;
  readonly tabResourceCountBtn: Locator;
  readonly tabTagsBtn: Locator;
  readonly tabMetaBtn: Locator;

  // Charts
  readonly categorizeBySelect: Locator;
  readonly metaCategorizeBySelect: Locator;
  readonly expensesSelect: Locator;
  readonly breakdownTypeSelect: Locator;
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
  readonly selectedGroupByTagItem: Locator;
  readonly selectedGroupByTagKey: Locator;
  readonly selectedGroupByTagValue: Locator;

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

    // Perspectives side modal
    this.perspectivesSideModal = this.page.getByTestId('smodal_perspective');
    this.perspectivesSeeAllPerspectivesLink = this.perspectivesSideModal.getByRole('link', { name: 'See all Perspectives' });
    this.perspectivesApplyBtn = this.perspectivesSideModal.getByRole('button', { name: 'Apply' });

    // Save perspective modal
    this.savePerspectiveSideModal = this.page.getByTestId('smodal_save_perspective');
    this.savePerspectiveSaveAsInput = this.savePerspectiveSideModal.getByTestId('input_save_as');
    this.savePerspectiveBreakDownByValue = this.savePerspectiveSideModal.locator(
      '//div[contains(text(), "Breakdown by")]/following-sibling::div'
    );
    this.savePerspectiveCategorizeByValue = this.savePerspectiveSideModal.locator(
      '//div[contains(text(), "Categorize by")]/following-sibling::div'
    );
    this.savePerspectiveGroupByTypeValue = this.savePerspectiveSideModal.locator(
      '//div[contains(text(), "Group by")]/following-sibling::div//div[1]/div[1]'
    );
    this.savePerspectiveGroupByValue = this.savePerspectiveSideModal.locator(
      '//div[contains(text(), "Group by")]/following-sibling::div//div[1]/div[2]'
    );
    this.savePerspectiveFiltersValue = this.savePerspectiveSideModal.locator('//h4[.="Filters"]/../div/div[1]');
    this.savePerspectiveFiltersOptionValue = this.savePerspectiveSideModal.locator('//h4[.="Filters"]/../div/div[2]');
    this.savePerspectiveNoFiltersValue = this.savePerspectiveSideModal.locator('//div[contains(text(), "Filters")]/following-sibling::div');
    this.savePerspectiveSaveBtn = this.savePerspectiveSideModal.getByRole('button', { name: 'Save' });

    //tabs
    this.tabExpensesBtn = this.main.getByTestId('tab_expenses');
    this.tabResourceCountBtn = this.main.getByTestId('tab_counts');
    this.tabTagsBtn = this.main.getByTestId('tab_tags');
    this.tabMetaBtn = this.main.getByTestId('tab_meta');

    // Charts
    this.categorizeBySelect = this.main.getByTestId('resource-categorize-by-selector-select');
    this.metaCategorizeBySelect = this.main.getByTestId('resources-meta-categorize-by-selector-select');
    this.expensesSelect = this.main.getByTestId('expenses-split-selector-select');
    this.breakdownTypeSelect = this.main.getByTestId('resources-meta-breakdown-type-selector-select');

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
    this.selectedGroupByTagItem = this.main.getByTestId('chip_ls_item_tag');
    this.selectedGroupByTagKey = this.selectedGroupByTagItem.getByTestId('chip_ls_item_tag_key');
    this.selectedGroupByTagValue = this.selectedGroupByTagItem.getByTestId('chip_ls_item_tag_value');

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
    this.clearIcon = this.getByAnyTestId('btn_ls_item_tag_close', this.main);
    this.navigateNextIcon = this.getByAnyTestId('NavigateNextIcon', this.main);
  }

  /**
   * Navigates to the Resources page and resets all active filters.
   *
   * This method navigates to `/resources`, waits for all progress bars to disappear,
   * waits for the canvas to finish rendering, resets any active filters, waits for the
   * page to fully load, and finally waits for the first resource item in the table to
   * be present. This ensures the page is in a clean, fully loaded state before any
   * test interactions begin.
   *
   * @returns {Promise<void>} Resolves when the page is loaded, filters are reset, and
   *   the first resource table item is visible.
   *
   * @example
   * // Use in a beforeEach to ensure a clean state before each test
   * test.beforeEach(async ({ resourcesPage }) => {
   *   await resourcesPage.navigateToResourcesPageAndResetFilters();
   * });
   *
   * @remarks
   * - Prefer this method over a bare `navigateToURL()` call when tests require a
   *   filter-free state and a populated resource table before proceeding.
   * - The `firstResourceItemInTable` wait uses a 15 second timeout to account for
   *   slow data loading on the Resources page.
   */
  async navigateToResourcesPageAndResetFilters(): Promise<void> {
    await this.navigateToURL('/resources');
    await this.waitForAllProgressBarsToDisappear();
    await this.waitForCanvas();
    await this.resetFilters();
    await this.waitForPageLoad();
    await this.firstResourceItemInTable.waitFor({ timeout: 15000 });
  }

  /**
   * Clicks the "Expenses" tab on the Resources page.
   * This method interacts with the `tabExpensesBtn` locator and waits for the canvas to update.
   *
   * @returns {Promise<void>} Resolves when the tab is clicked and the canvas is updated.
   */
  async clickExpensesTab(wait = true): Promise<void> {
    debugLog('Clicking ExpensesTab');
    if ((await this.tabExpensesBtn.getAttribute('aria-selected')) !== 'true') {
      await this.tabExpensesBtn.click();
    }
    if (wait) {
      await this.waitForCanvas();
      await this.waitForAllProgressBarsToDisappear();
    }
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
    if (wait) {
      await this.waitForCanvas();
      await this.waitForAllProgressBarsToDisappear();
    }
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
    if (wait) {
      await this.waitForCanvas();
      await this.waitForAllProgressBarsToDisappear();
    }
  }

  /**
   * Clicks the "Meta" tab on the Resources page.
   *
   * This method interacts with the `tabMetaBtn` locator and optionally waits for
   * the canvas to finish rendering and all progress bars to disappear after the tab
   * is clicked.
   *
   * @param {boolean} [wait=true] - Whether to wait for the canvas and progress bars after clicking.
   *   Set to `false` when chaining multiple tab interactions without needing to wait between them.
   * @returns {Promise<void>} Resolves when the tab is clicked and the optional wait is complete.
   *
   * @example
   * // Click the Meta tab and wait for the chart to render
   * await resourcesPage.clickMetaTab();
   *
   * @example
   * // Click without waiting, e.g. when chaining with a subsequent selection
   * await resourcesPage.clickMetaTab(false);
   * await resourcesPage.selectMetaCategorizeBy('Region');
   */
  async clickMetaTab(wait = true): Promise<void> {
    debugLog('Clicking Meta Tab');
    await this.tabMetaBtn.click();
    if (wait) {
      await this.waitForCanvas();
      await this.waitForAllProgressBarsToDisappear();
    }
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
      await this.waitForCanvas();
      await this.waitForAllProgressBarsToDisappear();
    }
  }

  /**
   * Selects an option from the "Categorize By" dropdown on the Meta tab of the Resources page.
   *
   * This method uses the `metaCategorizeBySelect` locator to select the specified option
   * and optionally waits for the canvas to update and all progress bars to disappear
   * after the selection.
   *
   * @param {string} option - The option to select from the Meta Categorize By dropdown.
   * @param {boolean} [wait=true] - Whether to wait for the canvas and progress bars after selection.
   * @returns {Promise<void>} Resolves when the option is selected and the optional wait is complete.
   *
   * @example
   * // Select a meta categorize by option and wait for the chart to update
   * await resourcesPage.selectMetaCategorizeBy('Service name');
   *
   * @example
   * // Select without waiting, e.g. when chaining multiple selections
   * await resourcesPage.selectMetaCategorizeBy('Region', false);
   */
  async selectMetaCategorizeBy(option: string, wait: boolean = true): Promise<void> {
    await this.selectFromComboBox(this.metaCategorizeBySelect, option);
    if (wait) {
      await this.waitForCanvas();
      await this.waitForAllProgressBarsToDisappear();
    }
  }

  /**
   * Selects an option from the "Breakdown Type" dropdown on the Meta tab of the Resources page.
   *
   * This method uses the `breakdownTypeSelect` locator to select the specified option
   * and optionally waits for the canvas to update and all progress bars to disappear
   * after the selection.
   *
   * @param {string} option - The option to select from the Breakdown Type dropdown.
   * @param {boolean} [wait=true] - Whether to wait for the canvas and progress bars after selection.
   * @returns {Promise<void>} Resolves when the option is selected and the optional wait is complete.
   *
   * @example
   * // Select a breakdown type and wait for the chart to update
   * await resourcesPage.selectBreakdownType('Daily');
   *
   * @example
   * // Select without waiting, e.g. when chaining multiple selections
   * await resourcesPage.selectBreakdownType('Weekly', false);
   */
  async selectBreakdownType(option: string, wait: boolean = true): Promise<void> {
    await this.selectFromComboBox(this.breakdownTypeSelect, option);
    if (wait) {
      await this.waitForCanvas();
      await this.waitForAllProgressBarsToDisappear();
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
    await this.waitForAllProgressBarsToDisappear();
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
   * Clicks the "Group by Owner" button on the Resources page.
   * This method interacts with the `groupByOwnerBtn` locator.
   *
   * @returns {Promise<void>} Resolves when the button is clicked.
   */
  async clickGroupByOwner(): Promise<void> {
    await this.groupByOwnerBtn.click();
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
   * Toggles the visibility of the legend on the Resources page.
   * This method interacts with the `showLegend` locator and logs the action.
   *
   * @returns {Promise<void>} Resolves when the legend visibility is toggled.
   */
  async toggleShowLegend(): Promise<void> {
    await this.showLegend.click();
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
    await this.clearIcon.waitFor({ state: 'hidden' });
  }

  /**
   * Retrieves the total resource count value displayed on the Resources page.
   * The value is extracted from the `resourceCountValue` locator and parsed into a numeric format.
   *
   * @returns {Promise<number>} A promise that resolves to the resource count value as a number.
   */
  async getResourceCountValue(): Promise<number> {
    const value = await this.resourceCountValue.textContent(); // Get the text content of the resource count element
    return parseInt(value); // Parse the text content into an integer and return it
  }

  /**
   * Fills in the perspective name in the save perspective modal.
   *
   * This method types the given name into the "Save as" input field and then clicks
   * the modal background to close any open dropdowns and ensure the Save button
   * becomes enabled before proceeding.
   *
   * @param {string} perspectiveName - The name to enter into the "Save as" input field.
   * @returns {Promise<void>} Resolves when the name has been filled and the modal has been clicked.
   *
   * @example
   * // Fill in the perspective name without immediately saving
   * await resourcesPage.fillSavePerspectiveName('My Perspective');
   * await expect(resourcesPage.savePerspectiveSaveBtn).toBeEnabled();
   *
   * @remarks
   * - This method is called internally by `savePerspective` as part of the full save workflow.
   * - The modal click after filling is required to dismiss any open combo box dropdowns
   *   and trigger validation, which enables the Save button.
   */
  async fillSavePerspectiveName(perspectiveName: string): Promise<void> {
    await this.savePerspectiveSaveAsInput.fill(perspectiveName);
    // Click the modal to close the dropdowns and ensure the Save button is enabled
    await this.savePerspectiveSideModal.click();
  }

  /**
   * Saves a new perspective with the specified name.
   *
   * This method performs the save perspective workflow:
   * 1. Fills in the perspective name in the "Save as" input field
   * 2. Clicks the save perspective side modal to ensure focus
   * 3. Clicks the Save button to complete the save operation
   *
   * @param {string} perspectiveName - The name to give the new perspective.
   * @returns {Promise<void>} A promise that resolves when the perspective is saved.
   *
   * @example
   * // Save a new perspective named "Development Resources"
   * await resourcesPage.savePerspective("Development Resources");
   *
   * @remarks
   * This method assumes the save perspective modal is already open. Make sure to
   * open the modal (e.g., by clicking the "Save perspective" button) before calling this method.
   */
  async savePerspective(perspectiveName: string): Promise<void> {
    await this.fillSavePerspectiveName(perspectiveName);
    await this.savePerspectiveSaveBtn.click();
  }

  /**
   * Retrieves a perspective button locator by its name from the perspectives side modal.
   *
   * This method searches for a button with the specified name within the perspectives
   * side modal and returns a Playwright locator that can be used to interact with it.
   *
   * @param {string} name - The name of the perspective button to find.
   * @returns {Promise<Locator>} A promise that resolves to the locator for the perspective button.
   *
   * @example
   * // Get a perspective button by name
   * const perspectiveBtn = await resourcesPage.getPerspectivesButtonByName("Q1 Resources");
   * await perspectiveBtn.click();
   *
   * @example
   * // Use with applyPerspective method
   * const perspectiveBtn = await resourcesPage.getPerspectivesButtonByName("Production View");
   * await resourcesPage.applyPerspective(perspectiveBtn);
   *
   * @remarks
   * This method returns a locator, not an element handle. The locator can be used
   * for assertions or interactions with the perspective button.
   */
  async getPerspectivesButtonByName(name: string): Promise<Locator> {
    return this.perspectivesSideModal.getByRole('button', { name: name });
  }

  /**
   * Applies a perspective by clicking its button and confirming the application.
   *
   * This method performs the complete perspective application workflow:
   * 1. Opens the perspectives side modal by clicking the Perspectives button
   * 2. Clicks the specified perspective button to select it
   * 3. Clicks the Apply button to apply the perspective
   * 4. Waits for the Apply button to be hidden (modal closes)
   * 5. Waits for the canvas to re-render with the new perspective
   * 6. Waits for all progress bars to disappear
   *
   * @param {Locator} perspectiveButton - The Playwright locator for the perspective button to apply.
   * @returns {Promise<void>} A promise that resolves when the perspective is fully applied and the page is loaded.
   *
   * @example
   * // Apply a perspective by name
   * const perspectiveBtn = await resourcesPage.getPerspectivesButtonByName("My Perspective");
   * await resourcesPage.applyPerspective(perspectiveBtn);
   *
   * @example
   * // Apply and verify the perspective was applied
   * const perspectiveBtn = await resourcesPage.getPerspectivesButtonByName("Cost Overview");
   * await resourcesPage.applyPerspective(perspectiveBtn);
   * await expect(resourcesPage.expensesBreakdownChart).toBeVisible();
   *
   * @remarks
   * This method includes waits to ensure the perspective is fully loaded before
   * proceeding. It waits for both the canvas rendering and any progress indicators
   * to complete, ensuring the page is in a stable state for subsequent interactions.
   */
  async applyPerspective(perspectiveButton: Locator): Promise<void> {
    await this.perspectivesBtn.click();
    await perspectiveButton.click();
    await this.perspectivesApplyBtn.click();
    await this.perspectivesApplyBtn.waitFor({ state: 'hidden' });
    await this.waitForCanvas();
    await this.waitForAllProgressBarsToDisappear();
  }

  /**
   * Returns a locator for the overwrite confirmation message in the save perspective modal.
   *
   * This message is displayed when a perspective with the given name already exists,
   * warning the user that the existing perspective will be overwritten with the new options.
   *
   * @param {string} perspectiveName - The name of the perspective that will be overwritten.
   * @returns {Locator} A Playwright locator for the overwrite warning message element.
   *
   * @example
   * // Assert the overwrite warning is visible before saving
   * await expect(resourcesPage.getPerspectiveOverwriteMessage('My Perspective')).toBeVisible();
   *
   * @remarks
   * Uses exact text matching, so the perspective name must match precisely
   * (case-sensitive) the name of the existing perspective shown in the modal.
   */
  getPerspectiveOverwriteMessage(perspectiveName: string): Locator {
    return this.savePerspectiveSideModal.getByText(`The existing perspective (${perspectiveName}) will be overwritten with new options.`, { exact: true });
  }
}
