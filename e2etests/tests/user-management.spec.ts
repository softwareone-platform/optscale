import {test} from "../fixtures/page-object-fixtures";
import {getValueFromAuthResponse} from "../utils/auth-session-storage/auth-helpers";
import {EUserRole} from "../types/enums";
import {expect} from "@playwright/test";
import {IInterceptor} from "../utils/api-requests/interceptor";
import {EmployeesResponse, UsersPoolsPermissionsResponse} from "../mocks/user.mocks";

const apiInterceptions: IInterceptor[] = [
    {  urlPattern: `/v2/organizations/[^/]+/employees`, mock: EmployeesResponse},
    {

        urlPattern: `/v2/organizations/[^/]+/pools\\?permission=INFO_ORGANIZATION`,
        mock: UsersPoolsPermissionsResponse
    },
];

test.use({restoreSession: true, interceptAPI: {list: apiInterceptions}});


test.describe.skip("User Management tests", () => {
    let email: string;
    let userID: string;

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
