import { BasePage } from './base-page';
import { expect, Locator, Page } from '@playwright/test';

/**
 * Represents the Main Menu component of the page.
 * Extends the BasePage class.
 */
export class MainMenu extends BasePage {
  readonly menu: Locator;
  readonly homeBtn: Locator;
  readonly recommendationsBtn: Locator;
  readonly resourcesBtn: Locator;
  readonly poolsBtn: Locator;
  readonly finOpsBtn: Locator;
  readonly costExplorerBtn: Locator;
  readonly mlOpsBtn: Locator;
  readonly tasksBtn: Locator;
  readonly modelsBtn: Locator;
  readonly datasetsBtn: Locator;
  readonly artifactsBtn: Locator;
  readonly hypertuningBtn: Locator;
  readonly metricsBtn: Locator;
  readonly policiesBtn: Locator;
  readonly anomaliesBtn: Locator;
  readonly quotasAndBudgetsBtn: Locator;
  readonly taggingBtn: Locator;
  readonly systemBtn: Locator;
  readonly userManagementBtn: Locator;
  readonly dataSourcesBtn: Locator;
  readonly eventsBtn: Locator;
  readonly settingsBtn: Locator;

  /**
   * Initializes a new instance of the MainMenu class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/');
    this.menu = this.page.locator('nav[class*="MuiList-root"]');
    this.homeBtn = this.menu.getByTestId('btn_home');
    this.recommendationsBtn = this.menu.getByTestId('btn_recommend');
    this.resourcesBtn = this.menu.getByTestId('btn_resources');
    this.poolsBtn = this.menu.getByTestId('btn_pools');
    this.finOpsBtn = this.menu.getByRole('button', { name: 'FinOps' });
    this.costExplorerBtn = this.menu.getByTestId('btn_cost_explorer_page');
    this.mlOpsBtn = this.menu.getByRole('button', { name: 'MLOps' });
    this.tasksBtn = this.menu.getByTestId('btn_ml_tasks');
    this.modelsBtn = this.menu.getByTestId('btn_ml_models');
    this.datasetsBtn = this.menu.getByTestId('btn_ml_datasets');
    this.artifactsBtn = this.menu.getByTestId('btn_ml_artifacts');
    this.hypertuningBtn = this.menu.getByTestId('btn_ml_runsets');
    this.metricsBtn = this.menu.getByTestId('btn_ml_metrics');
    this.policiesBtn = this.menu.getByRole('button', { name: 'Policies' });
    this.anomaliesBtn = this.menu.getByTestId('btn_anomalies');
    this.quotasAndBudgetsBtn = this.menu.getByTestId('btn_quotas_and_budgets');
    this.taggingBtn = this.menu.getByTestId('btn_tagging_policies');
    this.systemBtn = this.menu.getByRole('button', { name: 'System' });
    this.userManagementBtn = this.menu.getByTestId('btn_user_management');
    this.dataSourcesBtn = this.menu.getByTestId('btn_data_sources');
    this.eventsBtn = this.menu.getByTestId('btn_events');
    this.settingsBtn = this.menu.getByTestId('btn_settings');
  }

  /**
   * Expands the menu sections if they are not already expanded.
   * @returns {Promise<void>}
   */
  async expandMenu() {
    if ((await this.finOpsBtn.isVisible()) && (await this.finOpsBtn.getAttribute('aria-expanded')) === 'false') {
      await this.finOpsBtn.click();
    }
    if ((await this.mlOpsBtn.isVisible()) && (await this.mlOpsBtn.getAttribute('aria-expanded')) === 'false') {
      await this.mlOpsBtn.click();
    }
    if ((await this.policiesBtn.isVisible()) && (await this.policiesBtn.getAttribute('aria-expanded')) === 'false') {
      await this.policiesBtn.click();
    }
    if ((await this.systemBtn.isVisible()) && (await this.systemBtn.getAttribute('aria-expanded')) === 'false') {
      await this.systemBtn.click();
    }
  }

  /**
   * Asserts that the navigation to a menu link results in the expected URL.
   * @param {Locator} menuLink - The menu link to click.
   * @param {string} expectedUrl - The expected URL after navigation.
   * @returns {Promise<void>}
   */
  async assertMenuNavigation(menuLink: Locator, expectedUrl: string): Promise<void> {
    const baseURL = process.env.BASE_URL;
    await menuLink.click();
    const currentUrl = this.page.url();
    expect(currentUrl.startsWith(`${baseURL}${expectedUrl}`)).toBe(true);
  }

  /**
   * Clicks the Home button and waits for all canvases to load.
   *
   * This method is used to navigate to the Home page and ensures that
   * all necessary elements on the page are fully loaded before proceeding.
   *
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  async clickHomeBtn(): Promise<void> {
    await this.homeBtn.click();
    await this.waitForLoadingPageImgToDisappear();
    await this.waitForAllProgressBarsToDisappear();
    await this.waitForAllCanvases();
  }

  /**
   * Clicks the User Management button.
   * @returns {Promise<void>}
   */
  async clickUserManagement(): Promise<void> {
    if ((await this.systemBtn.getAttribute('aria-expanded')) === 'false') {
      await this.systemBtn.click();
    }
    await this.userManagementBtn.click();
  }

  /**
   * Clicks the Recommendations button.
   * @returns {Promise<void>}
   */
  async clickRecommendations(): Promise<void> {
    await this.recommendationsBtn.click();
  }

  /**
   * Clicks the Resources button.
   * @returns {Promise<void>}
   */
  async clickResources(): Promise<void> {
    await this.resourcesBtn.click();
  }

  /**
   * Clicks the Settings button.
   * This method is used to navigate to the Settings page.
   * @returns {Promise<void>} A promise that resolves when the Settings button is clicked.
   */
  async clickSettings(): Promise<void> {
    await this.settingsBtn.click();
  }
}
