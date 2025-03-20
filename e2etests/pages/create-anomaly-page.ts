import { Locator, Page } from "@playwright/test";
import { BaseCreatePage } from "./base-create-page";

/**
 * Represents the Create Anomaly Page.
 * Extends the BaseCreatePage class.
 */
export class CreateAnomalyPage extends BaseCreatePage {
    readonly heading: Locator;
    readonly evaluationPeriodInput: Locator;
    readonly thresholdInput: Locator;

    /**
     * Initializes a new instance of the CreateAnomalyPage class.
     * @param {Page} page - The Playwright page object.
     */
    constructor(page: Page) {
        super(page, '/anomalies/create');
        this.heading = this.main.getByTestId('lbl_create_anomaly_detection_policy');
        this.evaluationPeriodInput = this.main.getByTestId('input_evaluationPeriod');
        this.thresholdInput = this.main.getByTestId('input_threshold');
    }

    /**
     * Selects a type from the type combo box.
     * @param {string} type - The type to select.
     * @returns {Promise<void>}
     */
    async selectType(type: string) {
        await this.selectFromComboBox(this.typeSelect, type);
    }

    /**
     * Selects a suggested filter from the suggested filters combo box.
     * @param {string} filter - The filter to select.
     * @returns {Promise<void>}
     */
    async selectSuggestedFilters(filter: string) {
        await this.selectFromComboBox(this.suggestedFiltersFilter, filter);
    }

    /**
     * Selects a data source from the data source combo box.
     * @param {string} dataSource - The data source to select.
     * @returns {Promise<void>}
     */
    async selectDataSource(dataSource: string) {
        await this.selectFromComboBox(this.dataSourceFilter, dataSource);
    }

    /**
     * Selects a pool from the pool combo box.
     * @param {string} pool - The pool to select.
     * @returns {Promise<void>}
     */
    async selectPool(pool: string) {
        await this.selectFromComboBox(this.poolFilter, pool);
    }

    /**
     * Selects an owner from the owner combo box.
     * @param {string} owner - The owner to select.
     * @returns {Promise<void>}
     */
    async selectOwner(owner: string) {
        await this.selectFromComboBox(this.ownerFilter, owner);
    }

    /**
     * Selects a region from the region combo box.
     * @param {string} region - The region to select.
     * @returns {Promise<void>}
     */
    async selectRegion(region: string) {
        await this.selectFromComboBox(this.regionFilter, region);
    }

    /**
     * Selects a service from the service combo box.
     * @param {string} service - The service to select.
     * @returns {Promise<void>}
     */
    async selectService(service: string) {
        await this.selectFromComboBox(this.serviceFilter, service);
    }

    /**
     * Selects a resource type from the resource type combo box.
     * @param {string} resourceType - The resource type to select.
     * @returns {Promise<void>}
     */
    async selectResourceType(resourceType: string) {
        await this.selectFromComboBox(this.resourceTypeFilter, resourceType);
    }

    /**
     * Selects a resource state from the resource state combo box.
     * @param {string} resourceState - The resource state to select.
     * @returns {Promise<void>}
     */
    async selectResourceState(resourceState: string) {
        await this.selectFromComboBox(this.resourceStateFilter, resourceState);
    }

    /**
     * Selects an available savings option from the available savings combo box.
     * @param {string} availableSavings - The available savings option to select.
     * @returns {Promise<void>}
     */
    async selectWithAvailableSavings(availableSavings: string) {
        await this.selectFromComboBox(this.withAvailableSavingsFilter, availableSavings);
    }

    /**
     * Selects a violated constraints option from the violated constraints combo box.
     * @param {string} violatedConstraints - The violated constraints option to select.
     * @returns {Promise<void>}
     */
    async selectWithViolatedConstraints(violatedConstraints: string) {
        await this.selectFromComboBox(this.withViolatedConstraintsFilter, violatedConstraints);
    }

    /**
     * Selects a Kubernetes node from the Kubernetes node combo box.
     * @param {string} k8sNode - The Kubernetes node to select.
     * @returns {Promise<void>}
     */
    async selectK8sNode(k8sNode: string) {
        await this.selectFromComboBox(this.k8sNodeFilter, k8sNode);
    }

    /**
     * Selects a Kubernetes namespace from the Kubernetes namespace combo box.
     * @param {string} k8sNamespace - The Kubernetes namespace to select.
     * @returns {Promise<void>}
     */
    async selectK8sNamespace(k8sNamespace: string) {
        await this.selectFromComboBox(this.k8sNamespaceFilter, k8sNamespace);
    }

    /**
     * Selects a Kubernetes service from the Kubernetes service combo box.
     * @param {string} k8sService - The Kubernetes service to select.
     * @returns {Promise<void>}
     */
    async selectK8sService(k8sService: string) {
        await this.selectFromComboBox(this.k8ServiceFilter, k8sService);
    }

    /**
     * Selects a tag from the tag combo box.
     * @param {string} tag - The tag to select.
     * @returns {Promise<void>}
     */
    async selectTag(tag: string) {
        await this.selectFromComboBox(this.tagFilter, tag);
    }

    /**
     * Selects a without tag option from the without tag combo box.
     * @param {string} withoutTag - The without tag option to select.
     * @returns {Promise<void>}
     */
    async selectWithoutTag(withoutTag: string) {
        await this.selectFromComboBox(this.withoutTagFilter, withoutTag);
    }
}