import {BasePage} from "./base-page";
import {Locator, Page} from "@playwright/test";

export class Header extends BasePage {
    readonly page: Page;
    readonly header: Locator;
    readonly swoLogo: Locator;
    readonly organizationSelect: Locator;
    readonly documentationBtn: Locator;
    readonly productTourBtn: Locator;
    readonly profileBtn: Locator;
    readonly profileUserName: Locator;
    readonly profileUserEmail: Locator;
    readonly profileSignOutBtn: Locator;

    constructor(page: Page) {
        super(page, '/');
        this.page = page;
        this.header = this.page.locator('header');
        this.swoLogo = this.header.getByTestId('img_logo');
        this.organizationSelect = this.header.getByTestId('organization-selector-select');
        this.documentationBtn = this.header.getByTestId('btn_doc');
        this.productTourBtn = this.header.getByTestId('btn_product_tour');
        this.profileBtn = this.header.getByTestId('btn_profile');
        this.profileUserName = this.page.getByTestId('p_user_name');
        this.profileUserEmail = this.page.getByTestId('p_user_email');
        this.profileSignOutBtn = this.page.getByTestId('btn_signout');
    }

    async selectOrganization(organization: string) {
        await this.organizationSelect.click();
        await this.page.getByRole('option', { name: organization }).click();
    }

    async openProfileMenu() {
        await this.profileBtn.click();
    }
}
