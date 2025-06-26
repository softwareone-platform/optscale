import {test} from "../fixtures/page-fixture";
import {getValueFromAuthResponse} from "../utils/auth-helpers";
import {EUserRole} from "../utils/enums";
import {expect} from "@playwright/test";


test.describe.skip("User Management tests", () => {
    let email: string;
    let userID: string;

    test.beforeAll(() => {
        email = getValueFromAuthResponse(EUserRole.tempUser, 'user_email');
        userID = getValueFromAuthResponse(EUserRole.tempUser, 'user_id');
    });

    test.beforeEach(async ({loginPage}) => {
        await test.step('Login as FinOps user', async () => {
            const password = process.env.DEFAULT_USER_PASSWORD;
            await loginPage.login(email, password);
        });
    });

    test("Login with new user and verify present in user management list", async ({mainMenu, usersPage}) => {
        await mainMenu.clickUserManagement();
        const user = await usersPage.getUserEmailInTable(email);
        await expect(user).toBeVisible();
    })
})
