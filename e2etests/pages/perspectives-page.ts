import { BasePage } from './base-page';
import { Locator, Page } from '@playwright/test';
import { debugLog } from '../utils/debug-logging';

/**
 * Represents the Perspectives Page.
 * Extends the BasePage class.
 */
export class PerspectivesPage extends BasePage {
  readonly heading: Locator;
  readonly breakdownByColumn: Locator;
  readonly categorizeByColumn: Locator;
  readonly groupByColumn: Locator;
  readonly filtersColumn: Locator;
  readonly noPerspectivesMessage: Locator;
  readonly totalCountValue: Locator;
  readonly deleteSideModal: Locator;
  readonly sideModalDeleteButton: Locator;
  readonly allDeleteButtons: Locator;

  /**
   * Initializes a new instance of the PerspectivesPage class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/resources/perspectives');
    this.heading = this.page.getByTestId('lbl_perspectives');
    this.breakdownByColumn = this.page.locator('//td[2]');
    this.categorizeByColumn = this.page.locator('//td[3]');
    this.groupByColumn = this.page.locator('//td[4]');
    this.filtersColumn = this.page.locator('//td[5]');
    this.noPerspectivesMessage = this.table.locator('td', { hasText: 'No perspectives' });
    this.totalCountValue = this.main.locator('//div[contains(text(), "Total")]/following-sibling::div');
    this.deleteSideModal = this.page.getByTestId('smodal_delete_perspective');
    this.sideModalDeleteButton = this.deleteSideModal.getByRole('button', { name: 'Delete' });
    this.allDeleteButtons = this.table.locator('//*[@data-testid="DeleteOutlinedIcon"]');
  }

  /**
   * Gets the table row element for a specific perspective by its name.
   *
   * This method uses XPath to find the anchor tag containing the perspective name
   * and returns the ancestor table row element.
   *
   * @param {string} perspectiveName - The name of the perspective to locate in the table.
   * @returns {Promise<Locator>} A promise that resolves to the locator for the table row containing the perspective.
   *
   * @example
   * // Get the row for "My Custom Perspective"
   * const row = await perspectivesPage.getTableRowByPerspectiveName("My Custom Perspective");
   */
  async getTableRowByPerspectiveName(perspectiveName: string): Promise<Locator> {
    return this.table.locator(`//a[contains(text(), "${perspectiveName}")]/ancestor::tr`);
  }

  /**
   * Clicks the delete button for a specific perspective.
   *
   * This method performs the following steps:
   * 1. Locates the table row containing the specified perspective name
   * 2. Finds the delete icon button within that row
   * 3. Clicks the delete button to initiate the deletion process
   *
   * @param {string} perspectiveName - The name of the perspective to delete.
   * @returns {Promise<void>} A promise that resolves when the delete button is clicked.
   *
   * @example
   * // Delete a perspective named "Temporary Perspective"
   * await perspectivesPage.clickDeleteButtonForPerspective("Temporary Perspective");
   *
   * @remarks
   * This method only clicks the delete button. You may need to confirm the deletion
   * in a subsequent modal dialog depending on the application's workflow.
   */
  async clickDeleteButtonForPerspective(perspectiveName: string): Promise<void> {
    const perspectiveRow = await this.getTableRowByPerspectiveName(perspectiveName);
    const deleteButton = perspectiveRow.locator('//*[@data-testid="DeleteOutlinedIcon"]');
    await deleteButton.click();
  }

  /**
   * Deletes a perspective by name.
   *
   * This method performs the complete deletion workflow:
   * 1. Clicks the delete button for the specified perspective
   * 2. Confirms the deletion by clicking the delete button in the side modal
   * 3. Waits for the side modal to close (detached from DOM)
   *
   * @param {string} perspectiveName - The name of the perspective to delete.
   * @returns {Promise<void>} A promise that resolves when the perspective is deleted and the modal is closed.
   *
   * @example
   * // Delete a perspective named "My Custom Perspective"
   * await perspectivesPage.deletePerspective("My Custom Perspective");
   *
   * @remarks
   * This method waits for the delete modal to be detached, ensuring the deletion
   * operation is complete before proceeding with subsequent actions.
   */
  async deletePerspective(perspectiveName: string): Promise<void> {
    await this.clickDeleteButtonForPerspective(perspectiveName);
    await this.sideModalDeleteButton.click();
    await this.sideModalDeleteButton.waitFor({ state: 'detached' });
  }

  /**
   * Retrieves the total count of perspectives displayed on the page.
   *
   * This method extracts the numeric value from the "Total" count element,
   * which displays the number of perspectives currently available.
   *
   * @returns {Promise<number>} A promise that resolves to the total number of perspectives.
   *
   * @example
   * // Get the current count of perspectives
   * const count = await perspectivesPage.getPerspectivesCount();
   * console.log(`Total perspectives: ${count}`);
   *
   * @example
   * // Use in an assertion
   * const initialCount = await perspectivesPage.getPerspectivesCount();
   * await perspectivesPage.deletePerspective("Test Perspective");
   * const newCount = await perspectivesPage.getPerspectivesCount();
   * expect(newCount).toBe(initialCount - 1);
   *
   * @remarks
   * The method parses the text content as an integer and logs the value for debugging purposes.
   */
  async getPerspectivesCount(): Promise<number> {
    const totalCountText = (await this.totalCountValue.textContent()).trim();
    debugLog(`Total count text: ${totalCountText}`);
    return parseInt(totalCountText, 10);
  }

  /**
   * Deletes all perspectives from the page.
   *
   * This method checks if there are any perspectives present (by checking if the
   * "No perspectives" message is not visible). If perspectives exist, it continuously
   * deletes the first perspective until none remain:
   * 1. Checks if delete buttons exist
   * 2. Clicks the first delete button
   * 3. Confirms deletion in the side modal
   * 4. Waits for the modal to close
   * 5. Repeats until no delete buttons remain
   *
   * @returns {Promise<void>} A promise that resolves when all perspectives are deleted.
   *
   * @example
   * // Delete all perspectives before starting a test
   * await perspectivesPage.deleteAllPerspectives();
   *
   * @example
   * // Clean up after test
   * test.afterEach(async ({ perspectivesPage }) => {
   *   await perspectivesPage.deleteAllPerspectives();
   * });
   *
   * @remarks
   * This method safely handles the case where no perspectives exist by checking
   * for the "No perspectives" message first. It uses a while loop to always delete
   * the first button, which prevents issues with re-indexing after each deletion.
   */
  async deleteAllPerspectives(): Promise<void> {
    if(!await this.noPerspectivesMessage.isVisible()) {
      debugLog(`Deleting all perspectives...`);
      while ((await this.allDeleteButtons.count()) > 0) {
        await this.allDeleteButtons.first().click();
        await this.sideModalDeleteButton.click();
        await this.sideModalDeleteButton.waitFor({ state: 'detached' });
      }
    }
  }
}
