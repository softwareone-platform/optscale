import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

/**
 * Represents the Header component of the page.
 * Extends the BasePage class.
 */
export class Header extends BasePage {
  readonly header: Locator;
  readonly swoLogo: Locator;
  readonly liveDemoAlert: Locator;
  readonly organizationSelect: Locator;
  readonly documentationBtn: Locator;
  readonly productTourBtn: Locator;
  readonly profileBtn: Locator;
  readonly profileUserName: Locator;
  readonly profileUserEmail: Locator;
  readonly profileSignOutBtn: Locator;

  /**
   * Initializes a new instance of the Header class.
   * @param {Page} page - The Playwright page object.
   */
  constructor(page: Page) {
    super(page, '/');
    this.header = this.page.locator('header').first();
    this.swoLogo = this.header.getByTestId('img_logo');
    this.liveDemoAlert = this.page.getByRole('alert').locator('div').filter({hasText: 'You are in a live demo mode'});
    this.organizationSelect = this.header.getByTestId('organization-selector-select');
    this.documentationBtn = this.header.getByTestId('btn_doc');
    this.productTourBtn = this.header.getByTestId('btn_product_tour');
    this.profileBtn = this.header.getByTestId('btn_profile');
    this.profileUserName = this.page.getByTestId('p_user_name');
    this.profileUserEmail = this.page.getByTestId('p_user_email');
    this.profileSignOutBtn = this.page.getByTestId('btn_signout');
  }

  /**
   * Selects an organization from the organization selector.
   * Only selects the organization if it is not already selected.
   * @param {string} organization - The name of the organization to select.
   * @returns {Promise<void>}
   */
  async selectOrganization(organization: string) {
    if (!(await this.organizationSelect.textContent()).includes(organization)) {
      await this.organizationSelect.click();
      await this.page.getByRole('option', {name: organization}).click();
    }
  }

  /**
   * Opens the profile menu.
   * @returns {Promise<void>}
   */
  async openProfileMenu() {
    await this.profileBtn.click();
  }

  /**
   * Signs out the current user.
   * @returns {Promise<void>}
   */
  async signOut() {
    await this.openProfileMenu();
    await this.profileSignOutBtn.click();
  }
}
