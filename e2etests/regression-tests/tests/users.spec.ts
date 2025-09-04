import {test} from "../../fixtures/page-object-fixtures";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {IInterceptor} from "../../utils/api-requests/interceptor";
import {EmployeesResponse} from "../../mocks";
import {UsersPoolsPermissionsResponse} from "../../mocks/user-resp";
const apiInterceptions: IInterceptor[] = [
  {  urlPattern: `/v2/organizations/[^/]+/employees`, mock: EmployeesResponse},
  {

    urlPattern: `/v2/organizations/[^/]+/pools\\?permission=INFO_ORGANIZATION`,
    mock: UsersPoolsPermissionsResponse
  },
];

test.use({restoreSession: true, interceptAPI: {list: apiInterceptions}});

test.describe('FFC: Users @swo_regression', () => {
 test('Users page matches screenshots', async ({usersPage, usersInvitePage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();

    await test.step('Navigate to Users page', async () => {
      await usersPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await usersPage.heading.hover();
      await usersPage.screenshotUpdateDelay();
      await roundElementDimensions(usersPage.main);
      await expect(usersPage.main).toHaveScreenshot('Users-screenshot.png');
    });

    await test.step('Invite user page', async () => {
      await usersPage.clickInviteBtn();
      await usersPage.screenshotUpdateDelay();
      await roundElementDimensions(usersInvitePage.main);
      await expect(usersInvitePage.main).toHaveScreenshot('Users-invite-screenshot.png');
    });
  })
})
