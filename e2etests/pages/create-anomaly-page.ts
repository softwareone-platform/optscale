import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class CreateAnomalyPage extends BasePage {
    readonly page: Page;
    readonly createAnomalyHeading: Locator;
    readonly nameInput: Locator;
    readonly typeSelect: Locator;
    readonly evaluationPeriodInput: Locator;
    readonly thresholdInput: Locator;
    readonly suggestedFilterSelect: Locator;
    readonly poolSelect: Locator;
    readonly ownerSelect: Locator;
    readonly regionSelect: Locator;
    readonly serviceSelect: Locator;
    readonly resourceTypeSelect: Locator;
    readonly resourceStateSelect: Locator;
    readonly withAvailableSavingsSelect: Locator;
    readonly withViolatedConstraintsSelect: Locator;
    readonly k8sNodeSelect: Locator;
    readonly k8sNamespaceSelect: Locator;
    readonly k8sServiceSelect: Locator;
    readonly tagSelect: Locator;
    readonly withoutTagSelect: Locator;
    readonly saveBtn: Locator;
    readonly cancelBtn: Locator;


    constructor(page: Page) {
        super(page, '/anomalies/create');
        this.page = page;
        this.createAnomalyHeading = this.page.getByTestId('lbl_create_anomaly_detection_policy');
        this.nameInput = this.page.getByTestId('input_name');
        this.typeSelect = this.page.getByTestId('type-selector');
        this.evaluationPeriodInput = this.page.getByTestId('input_evaluationPeriod');
        this.thresholdInput = this.page.getByTestId('input_threshold');
        this.suggestedFilterSelect = this.page.getByTestId('selector_suggestedFilters');
        this.poolSelect = this.page.getByTestId('selector_poolId');
        this.ownerSelect = this.page.getByTestId('selector_ownerId');
        this.regionSelect = this.page.getByTestId('selector_region');
        this.serviceSelect = this.page.getByTestId('selector_serviceName');
        this.resourceTypeSelect = this.page.getByTestId('selector_resourceType');
        this.resourceStateSelect = this.page.getByTestId('selector_active');
        this.withAvailableSavingsSelect = this.page.getByTestId('selector_availableSavings');
        this.withViolatedConstraintsSelect = this.page.getByTestId('selector_constraintViolated');
        this.k8sNodeSelect = this.page.getByTestId('selector_k8sNode');
        this.k8sNamespaceSelect = this.page.getByTestId('selector_k8sNamespace');
        this.k8sServiceSelect = this.page.getByTestId('selector_k8sService');
        this.tagSelect = this.page.getByTestId('selector_tag');
        this.withoutTagSelect = this.page.getByTestId('selector_withoutTag');
        this.saveBtn = this.page.getByTestId('btn_create');
        this.cancelBtn = this.page.getByTestId('btn_cancel');
    }

    async selectType(type: string) {
        await this.selectFromComboBox(this.typeSelect, type);
    }

    async selectSuggestedFilters(filter: string) {
        await this.selectFromComboBox(this.suggestedFilterSelect, filter);
    }

    async selectPool(pool: string) {
        await this.selectFromComboBox(this.poolSelect, pool);
    }

    async selectOwner(owner: string) {
        await this.selectFromComboBox(this.ownerSelect, owner);
    }

    async selectRegion(region: string) {
        await this.selectFromComboBox(this.regionSelect, region);
    }

    async selectService(service: string) {
        await this.selectFromComboBox(this.serviceSelect, service);
    }

    async selectResourceType(resourceType: string) {
        await this.selectFromComboBox(this.resourceTypeSelect, resourceType);
    }

    async selectResourceState(resourceState: string) {
        await this.selectFromComboBox(this.resourceStateSelect, resourceState);
    }

    async selectWithAvailableSavings(availableSavings: string) {
        await this.selectFromComboBox(this.withAvailableSavingsSelect, availableSavings);
    }

    async selectWithViolatedConstraints(violatedConstraints: string) {
        await this.selectFromComboBox(this.withViolatedConstraintsSelect, violatedConstraints);
    }

    async selectK8sNode(k8sNode: string) {
        await this.selectFromComboBox(this.k8sNodeSelect, k8sNode);
    }

    async selectK8sNamespace(k8sNamespace: string) {
        await this.selectFromComboBox(this.k8sNamespaceSelect, k8sNamespace);
    }

    async selectK8sService(k8sService: string) {
        await this.selectFromComboBox(this.k8sServiceSelect, k8sService);
    }

    async selectTag(tag: string) {
        await this.selectFromComboBox(this.tagSelect, tag);
    }

    async selectWithoutTag(withoutTag: string) {
        await this.selectFromComboBox(this.withoutTagSelect, withoutTag);
    }

}