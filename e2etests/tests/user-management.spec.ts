import {test} from "../fixtures/page-fixture";
import {getValueFromAuthResponse} from "../utils/auth-storage/auth-helpers";
import {EUserRole} from "../utils/enums";
import {expect} from "@playwright/test";
import {restoreUserSessionInLocalForage} from "../utils/auth-storage/localforage-service";


test.describe.skip("User Management tests", () => {
    let email: string;
    let userID: string;

    test.beforeAll(() => {
        email = getValueFromAuthResponse(EUserRole.tempUser, 'user_email');
        userID = getValueFromAuthResponse(EUserRole.tempUser, 'user_id');
    });

    test.beforeEach(async ({loginPage, page}) => {
        await test.step('Login as FinOps user', async () => {
            await restoreUserSessionInLocalForage(page);
            await loginPage.navigateToURL();
        });
    });

    test("Login with new user and verify present in user management list", async ({mainMenu, usersPage}) => {
        await mainMenu.clickUserManagement();
        const user = await usersPage.getUserEmailInTable(email);
        await expect(user).toBeVisible();
    })
})
