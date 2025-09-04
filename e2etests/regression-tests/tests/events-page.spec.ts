import {test} from "../../fixtures/page-object-fixtures";
import {expect} from "@playwright/test";
import {roundElementDimensions} from "../utils/roundElementDimensions";
import {IInterceptor} from "../../utils/api-requests/interceptor";
import {EventsResponse} from "../../mocks";

const apiInterceptions: IInterceptor[] = [
  {
    mock: EventsResponse,
    graphQlOperationName: "events"
  },
];

test.use({restoreSession: true, interceptAPI: {list: apiInterceptions}});

test.describe('FFC: Events @swo_regression', () => {

  test('Events page matches screenshots', async ({eventsPage}) => {
    if (process.env.SCREENSHOT_UPDATE_DELAY) test.slow();

    await test.step('Navigate to Events page', async () => {
      await eventsPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await eventsPage.heading.hover();
      await eventsPage.screenshotUpdateDelay();
      await roundElementDimensions(eventsPage.main);
      await expect(eventsPage.main).toHaveScreenshot('Events-screenshot.png');
    });
  })
})
