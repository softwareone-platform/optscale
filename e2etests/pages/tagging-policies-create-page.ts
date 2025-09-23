import {BaseCreatePage} from "./base-create-page";
import {Locator, Page} from "@playwright/test";

/**
 * Represents the Tagging Policies Create Page.
 * Extends the BaseCreatePage class.
 */
export class TaggingPoliciesCreatePage extends BaseCreatePage {
  readonly heading: Locator;
  readonly startDateSelect: Locator;
  readonly requiredTagsBtn: Locator;
  readonly prohibitedTagsBtn: Locator;
  readonly tagsCorrelationTagsBtn: Locator;
  readonly requiredTagInput: Locator;
  readonly prohibitedTagInput: Locator;
  readonly primaryTagInput: Locator;
  readonly correlatedTagInput: Locator;

  /**
   * Initializes a new instance of the TaggingPoliciesCreatePage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, "/tagging-policies/create");
    this.heading = this.main.getByTestId('lbl_create_tagging_policy');
    this.startDateSelect = this.main.getByTestId('input_startDate');
    this.requiredTagsBtn = this.main.getByTestId('tags_strategy_taggingPolicy.requiredTag');
    this.prohibitedTagsBtn = this.main.getByTestId('tags_strategy_taggingPolicy.prohibitedTag');
    this.tagsCorrelationTagsBtn = this.main.getByTestId('tags_strategy_taggingPolicy.tagsCorrelation');
    this.requiredTagInput = this.main.getByTestId('input_requiredTagField');
    this.prohibitedTagInput = this.main.getByTestId('input_prohibitedTagField');
    this.primaryTagInput = this.main.getByTestId('input_tagsCorrelationPrimaryTag');
    this.correlatedTagInput = this.main.getByTestId('input_tagsCorrelationCorrelatedTag');
  }
}
