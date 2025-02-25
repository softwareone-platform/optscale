
import {Locator, Page} from "@playwright/test";
import {BaseCreatePage} from "./base-create-page";

export class CreateAnomalyPage extends BaseCreatePage {
    readonly heading: Locator;
    readonly evaluationPeriodInput: Locator;
    readonly thresholdInput: Locator;



    constructor(page: Page) {
        super(page, '/anomalies/create');
        this.heading = this.main.getByTestId('lbl_create_anomaly_detection_policy');
        this.evaluationPeriodInput = this.main.getByTestId('input_evaluationPeriod');
        this.thresholdInput = this.main.getByTestId('input_threshold');
    }

    async selectType(type: string) {
        await this.selectFromComboBox(this.typeSelect, type);
    }

    async selectSuggestedFilters(filter: string) {
        await this.selectFromComboBox(this.suggestedFiltersFilter, filter);
    }
    async selectDataSource(dataSource: string) {
        await this.selectFromComboBox(this.dataSourceFilter, dataSource);
    }

    async selectPool(pool: string) {
        await this.selectFromComboBox(this.poolFilter, pool);
    }

    async selectOwner(owner: string) {
        await this.selectFromComboBox(this.ownerFilter, owner);
    }

    async selectRegion(region: string) {
        await this.selectFromComboBox(this.regionFilter, region);
    }

    async selectService(service: string) {
        await this.selectFromComboBox(this.serviceFilter, service);
    }

    async selectResourceType(resourceType: string) {
        await this.selectFromComboBox(this.resourceTypeFilter, resourceType);
    }

    async selectResourceState(resourceState: string) {
        await this.selectFromComboBox(this.resourceStateFilter, resourceState);
    }

    async selectWithAvailableSavings(availableSavings: string) {
        await this.selectFromComboBox(this.withAvailableSavingsFilter, availableSavings);
    }

    async selectWithViolatedConstraints(violatedConstraints: string) {
        await this.selectFromComboBox(this.withViolatedConstraintsFilter, violatedConstraints);
    }

    async selectK8sNode(k8sNode: string) {
        await this.selectFromComboBox(this.k8sNodeFilter, k8sNode);
    }

    async selectK8sNamespace(k8sNamespace: string) {
        await this.selectFromComboBox(this.k8sNamespaceFilter, k8sNamespace);
    }

    async selectK8sService(k8sService: string) {
        await this.selectFromComboBox(this.k8ServiceFilter, k8sService);
    }

    async selectTag(tag: string) {
        await this.selectFromComboBox(this.tagFilter, tag);
    }

    async selectWithoutTag(withoutTag: string) {
        await this.selectFromComboBox(this.withoutTagFilter, withoutTag);
    }

}