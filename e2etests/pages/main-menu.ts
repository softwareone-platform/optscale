import {BasePage} from "./base-page";
import {defineConfig, expect, Locator, Page} from "@playwright/test";


export class MainMenu extends BasePage {
    readonly page: Page;
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

    constructor(page: Page) {
        super(page, '/');
        this.page = page;
        this.menu = this.page.locator('nav[class*="MuiList-root"]');
        this.homeBtn = this.menu.getByTestId('btn_home');
        this.recommendationsBtn = this.menu.getByTestId('btn_recommend');
        this.resourcesBtn = this.menu.getByTestId('btn_resources');
        this.poolsBtn = this.menu.getByTestId('btn_pools');
        this.finOpsBtn =  this.menu.getByRole('button', { name: 'FinOps' });
        this.costExplorerBtn = this.menu.getByTestId('btn_cost_explorer_page');
        this.mlOpsBtn = this.menu.getByRole('button', { name: 'MLOps' });
        this.tasksBtn = this.menu.getByTestId('btn_ml_tasks');
        this.modelsBtn = this.menu.getByTestId('btn_ml_models');
        this.datasetsBtn = this.menu.getByTestId('btn_ml_datasets');
        this.artifactsBtn = this.menu.getByTestId('btn_ml_artifacts');
        this.hypertuningBtn = this.menu.getByTestId('btn_ml_runsets');
        this.metricsBtn = this.menu.getByTestId('btn_ml_metrics');
        this.policiesBtn =  this.menu.getByRole('button', { name: 'Policies' });
        this.anomaliesBtn =  this.menu.getByTestId('btn_anomalies');
        this.quotasAndBudgetsBtn =  this.menu.getByTestId('btn_quotas_and_budgets');
        this.taggingBtn =  this.menu.getByTestId('btn_tagging_policies');
        this.systemBtn = this.menu.getByRole('button', { name: 'System' });
        this.userManagementBtn = this.menu.getByTestId('btn_user_management');
        this.dataSourcesBtn = this.menu.getByTestId('btn_data_sources');
        this.eventsBtn = this.menu.getByTestId('btn_events');
        this.settingsBtn = this.menu.getByTestId('btn_settings');
    }
    async expandMenu() {
        if (await this.finOpsBtn.isVisible() && await this.finOpsBtn.getAttribute('aria-expanded') === 'false') {
            await this.finOpsBtn.click();
        }
        if (await this.mlOpsBtn.isVisible() && await this.mlOpsBtn.getAttribute('aria-expanded') === 'false') {
            await this.mlOpsBtn.click();
        }
        if (await this.policiesBtn.isVisible() && await this.policiesBtn.getAttribute('aria-expanded') === 'false') {
            await this.policiesBtn.click();
        }
        if (await this.systemBtn.isVisible() && await this.systemBtn.getAttribute('aria-expanded') === 'false') {
            await this.systemBtn.click();
        }
    }
    async assertMenuNavigation(menuLink: Locator, expectedUrl: string) {
        const baseURL = process.env.baseURL;
        await menuLink.click();
        await expect(this.page).toHaveURL(new RegExp(`^${baseURL}${expectedUrl.replace(/^\//, '')}`));
    }
}