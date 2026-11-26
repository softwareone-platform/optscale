import { test } from "../../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { InterceptionEntry } from "../../types/interceptor.types";
import { EventsRegressionResponse } from "../mocks/events.mocks";

test.describe('FFC: Events @swo_regression', () => {
  const apiInterceptions: InterceptionEntry[] = [{ mock: EventsRegressionResponse, gql: "events" }];

  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: apiInterceptions, failOnInterceptionMissing: true } });

  test('Page matches screenshots', async ({ eventsPage }) => {
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
