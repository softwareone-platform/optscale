import { test } from '../fixtures/page.fixture';
import { eventsInterceptions } from '../mocks/events.mocks';
import { captureScreenshot, regressionOptions } from '../utils/test-helpers';

test.use(regressionOptions(eventsInterceptions));

test('FFC: Events — page matches screenshots', async ({ eventsPage }) => {
  await eventsPage.navigateToURL();
  await eventsPage.clickEventsTable();
  await captureScreenshot(eventsPage.main, 'Events-Container--Expanded.png', eventsPage.heading);
});
