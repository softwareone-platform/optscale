import {Locator, Page} from "@playwright/test";
import {BasePage} from "./base-page";

export class UsersPage extends BasePage {
    readonly page: Page;
    readonly usersHeading: Locator;

    constructor(page: Page) {
        super(page, '/users');
        this.page = page;
        this.usersHeading = this.page.getByTestId('lbl_users');
    }
}