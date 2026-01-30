import { BaseCreatePage } from './base-create-page';
import { Locator, Page } from '@playwright/test';
import { ETaggingPolicyType } from '../types/enums';
import { debugLog } from '../utils/debug-logging';

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
  readonly requiredTagComboBox: Locator;
  readonly prohibitedTagInput: Locator;
  readonly prohibitedTagComboBox: Locator;
  readonly primaryTagInput: Locator;
  readonly primaryTagComboBox: Locator;
  readonly correlatedTagInput: Locator;
  readonly correlatedTagComboBox: Locator;

  /**
   * Initializes a new instance of the TaggingPoliciesCreatePage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/tagging-policies/create');
    this.heading = this.main.getByTestId('lbl_create_tagging_policy');
    this.startDateSelect = this.main.getByTestId('input_startDate');
    this.requiredTagsBtn = this.main.getByTestId('tags_strategy_taggingPolicy.requiredTag');
    this.prohibitedTagsBtn = this.main.getByTestId('tags_strategy_taggingPolicy.prohibitedTag');
    this.tagsCorrelationTagsBtn = this.main.getByTestId('tags_strategy_taggingPolicy.tagsCorrelation');
    this.requiredTagInput = this.main.getByTestId('input_requiredTagField');
    this.requiredTagComboBox = this.requiredTagInput.locator('xpath=..');
    this.prohibitedTagInput = this.main.getByTestId('input_prohibitedTagField');
    this.prohibitedTagComboBox = this.prohibitedTagInput.locator('xpath=..');
    this.primaryTagInput = this.main.getByTestId('input_tagsCorrelationPrimaryTag');
    this.primaryTagComboBox = this.primaryTagInput.locator('xpath=..');
    this.correlatedTagInput = this.main.getByTestId('input_tagsCorrelationCorrelatedTag');
    this.correlatedTagComboBox = this.correlatedTagInput.locator('xpath=..');
  }

  /**
   * Creates a tagging policy based on the specified type and parameters.
   *
   * This method handles the creation of tagging policies, including required tags,
   * prohibited tags, and tags correlation. It performs the necessary actions
   * based on the provided type, such as selecting buttons, waiting for progress
   * bars to disappear, and filling in the required fields. If the `tagsCorrelation`
   * type is selected, a secondary tag must be provided. Optionally, a filter can
   * be applied to the tagging policy.
   *
   * @param {ETaggingPolicyType} type - The type of tagging policy to create.
   *   Possible values are:
   *   - `ETaggingPolicyType.requiredTag`: A policy for required tags.
   *   - `ETaggingPolicyType.prohibitedTag`: A policy for prohibited tags.
   *   - `ETaggingPolicyType.tagsCorrelation`: A policy for correlating tags.
   * @param {string} name - The name of the tagging policy.
   * @param {string} primaryTag - The primary tag to be used in the policy.
   * @param {string} [secondaryTag] - The secondary tag, required for the
   *   `tagsCorrelation` type.
   * @param {string} [filter] - The name of the filter to apply (optional).
   * @param {string} [filterOption] - The specific filter option to apply (optional).
   * @returns {Promise<void>} A promise that resolves when the tagging policy is created.
   * @throws {Error} If the `tagsCorrelation` type is selected and no secondary tag is provided.
   * @throws {Error} If an unsupported tagging policy type is specified.
   */
  async createTaggingPolicy(
    type: ETaggingPolicyType,
    name: string,
    primaryTag: string,
    secondaryTag?: string,
    filter?: string,
    filterOption?: string
  ): Promise<void> {
    debugLog(`Creating tagging policy with the following parameters:
    Type: ${type}
    Name: ${name}
    Primary Tag: ${primaryTag}
    Secondary Tag: ${secondaryTag ?? 'N/A'}
    Filter: ${filter ?? 'N/A'}
    Filter Option: ${filterOption ?? 'N/A'}`);
    await this.nameInput.fill(name);
    await this.setTime();

    switch (type) {
      case ETaggingPolicyType.requiredTag:
        await this.clickButtonIfNotActive(this.requiredTagsBtn);
        await this.waitForAllProgressBarsToDisappear();
        await this.selectFromComboBox(this.requiredTagComboBox, primaryTag);
        break;
      case ETaggingPolicyType.prohibitedTag:
        await this.clickButtonIfNotActive(this.prohibitedTagsBtn);
        await this.waitForAllProgressBarsToDisappear();
        await this.selectFromComboBox(this.prohibitedTagComboBox, primaryTag);
        break;
      case ETaggingPolicyType.tagsCorrelation:
        if (!secondaryTag) {
          throw new Error('Secondary tag must be provided for Tags Correlation policy type.');
        }
        await this.clickButtonIfNotActive(this.tagsCorrelationTagsBtn);
        await this.waitForAllProgressBarsToDisappear();
        await this.selectFromComboBox(this.primaryTagComboBox, primaryTag);
        await this.selectFromComboBox(this.correlatedTagComboBox, secondaryTag);
        break;
      default:
        throw new Error(`Unsupported tagging policy type: ${type}`);
    }
    if (filter) await this.selectFilterByText(filter, filterOption);
    await this.saveBtn.click();
  }
}
