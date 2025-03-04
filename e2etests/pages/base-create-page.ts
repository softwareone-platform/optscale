import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export abstract class BaseCreatePage extends BasePage {
    readonly nameInput: Locator;
    readonly typeSelect: Locator;
    readonly suggestedFiltersFilter: Locator;
    readonly dataSourceFilter: Locator;
    readonly poolFilter: Locator;
    readonly ownerFilter: Locator;
    readonly regionFilter: Locator;
    readonly serviceFilter: Locator;
    readonly resourceTypeFilter: Locator;
    readonly resourceStateFilter: Locator;
    readonly withAvailableSavingsFilter: Locator;
    readonly withViolatedConstraintsFilter: Locator;
    readonly k8sNodeFilter: Locator;
    readonly k8sNamespaceFilter: Locator;
    readonly k8ServiceFilter: Locator;
    readonly tagFilter: Locator;
    readonly withoutTagFilter: Locator;
    readonly saveBtn: Locator;
    readonly cancelBtn: Locator;


    protected constructor(page: Page, url: string) {
        super(page, '');
        this.nameInput = this.main.getByTestId('input_name');
        this.typeSelect = this.main.getByTestId('type-selector-select');
        this.suggestedFiltersFilter = this.main.getByTestId('selector_suggestedFilters');
        this.dataSourceFilter = this.main.getByTestId('selector_cloudAccountId');
        this.poolFilter = this.main.getByTestId('selector_poolId');
        this.ownerFilter = this.main.getByTestId('selector_ownerId');
        this.regionFilter = this.main.getByTestId('selector_region');
        this.serviceFilter = this.main.getByTestId('selector_serviceName');
        this.resourceTypeFilter = this.main.getByTestId('selector_resourceType');
        this.resourceStateFilter = this.main.getByTestId('selector_active');
        this.withAvailableSavingsFilter = this.main.getByTestId('selector_availableSavings');
        this.withViolatedConstraintsFilter = this.main.getByTestId('selector_constraintViolated');
        this.k8sNodeFilter = this.main.getByTestId('selector_k8sNode');
        this.k8sNamespaceFilter = this.main.getByTestId('selector_k8sNamespace');
        this.k8ServiceFilter = this.main.getByTestId('selector_k8sService');
        this.tagFilter = this.main.getByTestId('selector_tag');
        this.withoutTagFilter = this.main.getByTestId('selector_withoutTag');
        this.saveBtn = this.main.getByTestId('btn_create');
        this.cancelBtn = this.main.getByTestId('btn_cancel');
    }
}
