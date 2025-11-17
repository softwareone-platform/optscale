import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';

/**
 * Represents the Anomalies Page.
 * Extends the BasePage class.
 */
export class AnomaliesPage extends BasePage {
  readonly anomalyDetectionBreadcrumb: Locator;
  readonly heading: Locator;
  readonly anomalyDetectionPolicyHeading: Locator;
  readonly showResourcesBtn: Locator;
  readonly deleteBtn: Locator;
  readonly deleteSideModal: Locator;
  readonly sideModalDeleteBtn: Locator;
  readonly addBtn: Locator;
  readonly searchInput: Locator;
  readonly table: Locator;
  readonly defaultExpenseAnomalyLink: Locator;
  readonly defaultExpenseAnomalyCanvas: Locator;
  readonly defaultExpenseAnomalyDescription: Locator;
  readonly defaultExpenseAnomalyShowResourcesBtn: Locator;
  readonly defaultResourceCountAnomalyLink: Locator;
  readonly defaultResourceCountAnomalyCanvas: Locator;
  readonly defaultResourceCountAnomalyDescription: Locator;
  readonly defaultResourceCountAnomalyShowResourcesBtn: Locator;
  readonly policyDetailsDiv: Locator;
  readonly policyDetailsNameValue: Locator;
  readonly policyDetailsTypeValue: Locator;
  readonly policyDetailsEvaluationPeriodValue: Locator;
  readonly policyDetailsThresholdValue: Locator;
  readonly categorizeBySelect: Locator;
  readonly expensesSelect: Locator;
  readonly showLegend: Locator;
  readonly exportChartBtn: Locator;

  /**
   * Initializes a new instance of the AnomaliesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/anomalies');
    this.anomalyDetectionBreadcrumb = this.main.locator('[href="/anomalies"]');
    this.heading = this.main.getByTestId('lbl_constraints_detection');
    this.anomalyDetectionPolicyHeading = this.getByAnyTestId('lbl_anomaly_detection_policy', this.main);
    this.showResourcesBtn = this.main.getByTestId('btn_show_resources');
    this.deleteBtn = this.main.getByTestId('btn_delete');
    this.deleteSideModal = this.page.getByTestId('smodal_delete');
    this.sideModalDeleteBtn = this.deleteSideModal.getByTestId('btn_smodal_delete');
    this.addBtn = this.main.getByTestId('btn_add');
    this.searchInput = this.main.getByPlaceholder('Search');
    this.table = this.main.locator('table');
    this.defaultExpenseAnomalyLink = this.table.getByRole('link', { name: 'Default - expense anomaly' });
    this.defaultExpenseAnomalyCanvas = this.defaultExpenseAnomalyLink.locator('xpath=/ancestor::td[1]/following-sibling::td/canvas');
    this.defaultExpenseAnomalyDescription = this.defaultExpenseAnomalyLink.locator('xpath=/ancestor::td[1]/following-sibling::td[2]');
    this.defaultExpenseAnomalyShowResourcesBtn = this.defaultExpenseAnomalyLink.locator(
      'xpath=/ancestor::td[1]/following-sibling::td[4]//button'
    );
    this.defaultResourceCountAnomalyLink = this.table.getByRole('link', { name: 'Default - resource count anomaly' });
    this.defaultResourceCountAnomalyCanvas = this.defaultResourceCountAnomalyLink.locator(
      'xpath=/ancestor::td[1]/following-sibling::td/canvas'
    );
    this.defaultResourceCountAnomalyDescription = this.defaultResourceCountAnomalyLink.locator(
      'xpath=/ancestor::td[1]/following-sibling::td[2]'
    );
    this.defaultResourceCountAnomalyShowResourcesBtn = this.defaultResourceCountAnomalyLink.locator(
      'xpath=/ancestor::td[1]/following-sibling::td[4]//button'
    );
    this.policyDetailsDiv = this.main.locator('//div[contains(@class, "MTPBoxShadow")][1]');
    this.policyDetailsNameValue = this.policyDetailsDiv.locator('//span[contains(text(), "Name")]/../following-sibling::div');
    this.policyDetailsTypeValue = this.policyDetailsDiv.locator('//span[contains(text(), "Type")]/../following-sibling::div');
    this.policyDetailsEvaluationPeriodValue = this.policyDetailsDiv.locator(
      '//span[contains(text(), "Evaluation period")]/../following-sibling::div'
    );
    this.policyDetailsThresholdValue = this.policyDetailsDiv.locator('//span[contains(text(), "Threshold")]/../following-sibling::div');

    // Charts
    this.categorizeBySelect = this.main.getByTestId('resource-categorize-by-selector-select');
    this.expensesSelect = this.main.getByTestId('expenses-split-selector-select');
    this.showLegend = this.main.getByLabel('Show legend');
    this.exportChartBtn = this.main.getByTestId('btn_export_chart');
  }

  /**
   * Clicks the Add button on the Anomalies page.
   * @returns {Promise<void>}
   */
  async clickAddBtn(): Promise<void> {
    await this.addBtn.click();
  }

  /**
   * Searches for an anomaly by clearing the search input, entering the provided search string,
   * and triggering the search by pressing the Enter key.
   *
   * @param {string} searchString - The string to search for in the anomalies table.
   * @returns {Promise<void>} A promise that resolves when the search operation is complete.
   */
  async searchAnomaly(searchString: string): Promise<void> {
    await this.searchInput.clear();
    await this.searchInput.fill(searchString);
    await this.searchInput.press('Enter');
  }

  /**
   * Retrieves the username based on the current environment.
   *
   * @returns {Promise<string>} A promise that resolves to the username for the current environment.
   * @throws {Error} If the environment is unknown.
   */
  async getUserNameByEnvironment(): Promise<string> {
    const env = process.env.ENVIRONMENT;
    switch (env) {
      case 'staging':
      case 'dev':
        return 'Admin User';
      case 'test':
        return 'FinOpsTestUser@outlook.com';
      default:
        throw new Error(`Unknown TEST_ENVIRONMENT: ${env}`);
    }
  }

  /**
   * Retrieves a Locator for a policy link based on the policy name.
   *
   * @param {string} name - The name of the policy to locate.
   * @returns {Locator} A Locator object for the policy link.
   */
  policyLinkByName(name: string): Locator {
    return this.table.getByLabel(name);
  }

  /**
   * Retrieves a Locator for the description of a policy based on the policy name.
   *
   * @param {string} name - The name of the policy whose description is to be located.
   * @returns {Locator} A Locator object for the policy description.
   */
  policyDescriptionByName(name: string): Locator {
    const policyLink = this.policyLinkByName(name);
    return policyLink.locator('//ancestor::td[1]/following-sibling::td[2]');
  }

  /**
   * Retrieves a Locator for the filter of a policy based on the policy name.
   *
   * @param {string} name - The name of the policy whose filter is to be located.
   * @returns {Locator} A Locator object for the policy filter.
   */
  policyFilterByName(name: string): Locator {
    const policyLink = this.policyLinkByName(name);
    return policyLink.locator('//ancestor::td[1]/following-sibling::td[3]');
  }

  /**
   * Deletes an anomaly detection policy by its name.
   *
   * @param {string} name - The name of the anomaly policy to delete.
   * @returns {Promise<void>} A promise that resolves when the anomaly policy is successfully deleted.
   */
  async deleteAnomalyPolicy(name: string): Promise<void> {
    await this.policyLinkByName(name).click();
    await this.deleteBtn.click();
    await this.waitForTextContent(this.deleteSideModal, name);
    await this.sideModalDeleteBtn.click();
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
   * Toggles the visibility of the legend on the Resources page.
   * This method interacts with the `showLegend` locator and logs the action.
   *
   * @returns {Promise<void>} Resolves when the legend visibility is toggled.
   */
  async clickShowLegend(): Promise<void> {
    await this.showLegend.click();
  }

  /**
   * Retrieves the text content of the "Violated At" column for a specific row in the table.
   *
   * @param {number} index - The index of the row to retrieve the text from (1-based index).
   * @returns {Promise<string>} A promise that resolves to the text content of the "Violated At" column.
   */
  async getViolatedAtTextByIndex(index: number): Promise<string> {
    return this.table.locator(`//tr[${index}]/td[1]`).innerText();
  }

  /**
   * Retrieves the text content of the "Average Expenses -> Actual Expenses" column for a specific row in the table.
   *
   * @param {number} index - The index of the row to retrieve the text from (1-based index).
   * @returns {Promise<string>} A promise that resolves to the text content of the "Average Expenses -> Actual Expenses" column.
   */
  async getAverageActualExpensesByIndex(index: number): Promise<string> {
    return await this.table.locator(`//tr[${index}]/td[3]`).innerText();
  }
}
