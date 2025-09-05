import {test} from "../fixtures/page-object-fixtures";
import {getValueFromAuthResponse} from "../utils/auth-session-storage/auth-helpers";
import {EUserRole} from "../types/enums";
import {expect} from "@playwright/test";

test.describe.skip("User Management tests", () => {
  let email: string;
  let userID: string;

  test.use({restoreSession: true});

  test.beforeAll(() => {
    email = getValueFromAuthResponse(EUserRole.tempUser, 'user_email');
    userID = getValueFromAuthResponse(EUserRole.tempUser, 'user_id');
  });

  test.beforeEach(async ({loginPage, page}) => {
    await test.step('Login as FinOps user', async () => {
      await loginPage.navigateToURL();
    });
  });

  test("Login with new user and verify present in user management list", async ({mainMenu, usersPage}) => {
    await mainMenu.clickUserManagement();
    const user = await usersPage.getUserEmailInTable(email);
    await expect(user).toBeVisible();
  })
})
