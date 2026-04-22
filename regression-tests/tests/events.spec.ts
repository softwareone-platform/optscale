import { test } from "../fixtures/page.fixture";
import { expect } from "@playwright/test";
import { roundElementDimensions } from "../utils/roundElementDimensions";
import { eventsInterceptions } from "../mocks/events.mocks";

test.describe('FFC: Events', () => {
  test.use({ restoreSession: true, setFixedTime: true, interceptAPI: { entries: eventsInterceptions } });

  test('Page matches screenshots', async ({ eventsPage }) => {
    await test.step('Navigate to Events page', async () => {
      await eventsPage.navigateToURL();
    });

    await test.step('Page content', async () => {
      await eventsPage.heading.hover();
      await roundElementDimensions(eventsPage.main);
      await eventsPage.clickEventsTable();
      await expect(eventsPage.main).toHaveScreenshot('Events-Container--Expanded.png');
    });
  })
})
