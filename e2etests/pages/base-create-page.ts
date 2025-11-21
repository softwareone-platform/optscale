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
    this.filterApplyButton = this.filterPopover.getByRole('button' , { name: 'Apply' });

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

    this.saveBtn = this.main.getByTestId('btn_create');
    this.cancelBtn = this.main.getByTestId('btn_cancel');
  }
}
